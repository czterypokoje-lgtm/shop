import { NextResponse } from 'next/server';
import { rateLimit, getClientIp, tooManyRequests } from '@/lib/rateLimit';
import { getShopProducts } from '@/lib/shopCatalog';
import { filterProducts } from '@/lib/catalog';
import brands from '@/lib/brands.json';

/*
 * Kenteken → the right parts. Looks the plate up at the RDW, matches the make
 * and model to what the catalogue stocks, and returns the catalogue link.
 *
 * The plate stays in this request only: it is not put in the page URL (where
 * analytics would record it) and it is not stored.
 */
export const dynamic = 'force-dynamic';

const RATE_LIMIT = 30;
const RATE_WINDOW = 3600;

/** "B.M.W." / "Škoda" / "MERCEDES-BENZ" → "bmw" / "skoda" / "mercedesbenz". */
const key = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
/** For model names: keep word breaks so "3-SERIE" and "3 Serie" match. */
const words = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const MAKES = (brands as { make: string }[]).map((b) => b.make);

export async function GET(request: Request) {
  const kenteken = (new URL(request.url).searchParams.get('kenteken') ?? '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (kenteken.length < 4 || kenteken.length > 8) {
    return NextResponse.json({ ok: false, error: 'Vul een geldig kenteken in.' }, { status: 400 });
  }
  const limit = await rateLimit(`kenteken:${getClientIp(request)}`, RATE_LIMIT, RATE_WINDOW);
  if (!limit.ok) return tooManyRequests(RATE_WINDOW);

  let vehicle: Record<string, string> | undefined;
  try {
    const res = await fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${kenteken}`, {
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(String(res.status));
    vehicle = ((await res.json()) as Record<string, string>[])[0];
  } catch {
    return NextResponse.json({ ok: false, error: 'De kentekencheck werkt even niet. Kies hieronder uw merk en model.' }, { status: 502 });
  }
  if (!vehicle) {
    return NextResponse.json({ ok: false, error: 'Geen auto gevonden bij dit kenteken. Klopt het kenteken?' }, { status: 404 });
  }

  const rdwMake = String(vehicle.merk ?? '').trim();
  const rdwModel = String(vehicle.handelsbenaming ?? '').trim();
  const year = String(vehicle.datum_eerste_toelating ?? '').slice(0, 4);
  const make = MAKES.find((m) => key(m) === key(rdwMake)) ?? MAKES.find((m) => key(rdwMake).startsWith(key(m)));
  const car = { make: make ?? rdwMake, model: rdwModel, year };

  if (!make) {
    return NextResponse.json({ ok: true, car, count: 0, url: null });
  }

  const forMake = filterProducts(await getShopProducts(), { make });
  // The longest catalogue model name that the RDW name starts with: "GOLF SPORTSVAN" → "Golf Sportsvan", not "Golf".
  // RDW names the engine variant, the catalogue the range: "C 180" is a C-Klasse, "320D" a 3-serie.
  const raw = words(rdwModel);
  const alias =
    key(make) === 'mercedesbenz' ? raw.match(/^([a-z]{1,3}) ?\d/)?.[1]?.replace(/^ml$/, 'm').concat(' klasse')
    : key(make) === 'bmw' ? raw.match(/^(\d)\d\d/)?.[1]?.concat(' serie')
    : undefined;
  const hb = alias ?? raw;
  const models = [...new Set(forMake.flatMap((p) => p.fitment.filter((f) => key(f.make) === key(make)).map((f) => f.model)).filter(Boolean))];
  const model = models
    .filter((m) => { const w = words(m); return w && (hb === w || hb.startsWith(`${w} `) || hb.split(' ').includes(w)); })
    .sort((a, b) => b.length - a.length)[0];
  const forModel = model ? filterProducts(forMake, { make, q: model }) : [];

  const params = new URLSearchParams({ make });
  if (forModel.length) params.set('q', model!);
  return NextResponse.json({
    ok: true,
    car: { ...car, model: model ?? rdwModel.toLowerCase().replace(/(^|[\s-])\S/g, (c) => c.toUpperCase()) },
    modelMatched: forModel.length > 0,
    count: forModel.length || forMake.length,
    url: `/catalogus?${params}`,
  });
}
