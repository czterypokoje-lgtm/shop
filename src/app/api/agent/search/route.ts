import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/config/site.config';
import { getShopProducts } from '@/lib/shopCatalog';
import { searchProducts } from '@/lib/search';
import { getClientIp, rateLimit, tooManyRequests } from '@/lib/rateLimit';

/*
 * Product search for the ElevenLabs chat agent ("webhook tool" in the agent
 * console). Same search and the same public catalogue as /zoeken: title, our
 * article code, price incl. btw and the product link. Nothing internal.
 *
 * GET /webshop/api/agent/search?q=golf 7 sleutel
 */
const RATE_LIMIT = 60;
const RATE_WINDOW = 60;

export async function GET(request: Request) {
  const limit = await rateLimit(`agent-search:${getClientIp(request)}`, RATE_LIMIT, RATE_WINDOW);
  if (!limit.ok) return tooManyRequests(RATE_WINDOW);

  const q = (new URL(request.url).searchParams.get('q') ?? '').slice(0, 80);
  const hits = searchProducts(await getShopProducts(), q).filter((h) => h.product.price).slice(0, 5);

  return NextResponse.json({
    query: q,
    count: hits.length,
    results: hits.map(({ product: p }) => ({
      title: p.titleNl,
      code: p.articleCode ?? null,
      price: `€ ${p.price!.toFixed(2).replace('.', ',')} incl. btw`,
      fits: [...new Set(p.fitment.map((f) => `${f.make} ${f.model}`))].slice(0, 8),
      url: `${SITE_CONFIG.domain}/product/${p.urlSlug}`,
    })),
    note: hits.length ? undefined : 'Niets gevonden. Vraag om een foto van de sleutel via WhatsApp.',
  });
}
