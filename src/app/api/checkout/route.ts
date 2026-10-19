import { NextResponse } from 'next/server';
import { mollieKey as getMollieKey } from '@/lib/mollieKey';
import { createClient } from '@supabase/supabase-js';
import { SITE_CONFIG } from '@/config/site.config';
import { shippingFor, VAT_RATE } from '@/lib/catalog';
import { getShopProductBySlug, overridesHealthy } from '@/lib/shopCatalog';
/*
 * From lib/services, not lib/cart: cart.ts is a client module, and a server
 * route importing from one gets client references instead of the values —
 * SERVICE_OPTIONS.includes() threw and every order 500'd.
 */
import {
  serviceTotal,
  SERVICE_LABEL,
  SERVICE_NEEDS,
  SERVICE_OPTIONS,
  servicesFor,
  type ServiceOption,
} from '@/lib/services';
import { isB2B } from '@/lib/b2b';
import { rateLimit, rateLimitConfigured, getClientIp, tooManyRequests } from '@/lib/rateLimit';

/**
 * Creates an order and starts a Mollie payment.
 *
 * This replaces a mock that returned `{ url: '/success' }` without
 * taking any money — a checkout that reports success without a payment is
 * worse than no checkout at all, so this route fails closed: with no
 * MOLLIE_API_KEY configured it returns 503 and creates nothing.
 *
 * Prices are recalculated here from the catalogue. The basket lives in the
 * customer's localStorage and carries only slugs, quantities and a service
 * choice, so nothing the client sends can change what is charged.
 *
 * Required environment:
 *   MOLLIE_API_KEY   live_… or test_…
 * Optional:
 *   NEXT_PUBLIC_SITE_URL   for the redirect/webhook host in preview builds
 */

export const dynamic = 'force-dynamic';

const RATE_LIMIT = 20;
const RATE_WINDOW = 3600;

const MOLLIE_API = 'https://api.mollie.com/v2/payments';

interface IncomingLine {
  slug: unknown;
  quantity: unknown;
  service: unknown;
}

// The list lives in one place; a service added there is accepted here.
const SERVICES = SERVICE_OPTIONS;

const clean = (v: unknown, max: number): string | null => {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
};

/**
 * AS24-26-K7Q2XM — random, so it can neither be guessed nor collide in the way
 * Date.now() % 100000 did. A collision is still retried against the unique
 * constraint below.
 */
function orderNumber(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
  return `AS24-${String(new Date().getFullYear()).slice(2)}-${code}`;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const POSTCODE_NL = /^[1-9]\d{3}\s?[A-Za-z]{2}$/;
const POSTCODE_BE = /^[1-9]\d{3}$/;


export async function POST(request: Request) {
  // An unthrottled order endpoint in production is a config error, not a
  // degraded mode. A transient Upstash failure still lets orders through.
  if (!rateLimitConfigured && process.env.NODE_ENV === 'production') {
    console.error('Rate limiting not configured — refusing checkout');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 503 });
  }
  const ip = getClientIp(request);
  const limit = await rateLimit(`checkout:${ip}`, RATE_LIMIT, RATE_WINDOW);
  if (!limit.ok) return tooManyRequests(RATE_WINDOW);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  // Honeypot — answer 200 so a bot learns nothing, but create nothing.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  /* ── recalculate the basket server-side ── */

  // Without the office's overrides the feed would sell unpublished products at
  // prices nobody set. Refuse rather than guess.
  if (!(await overridesHealthy())) {
    return NextResponse.json(
      { error: `De webshop is even niet bereikbaar. Bel ons op ${SITE_CONFIG.phone}.` },
      { status: 503 }
    );
  }

  const incoming = Array.isArray(body.lines) ? (body.lines as IncomingLine[]) : [];
  if (!incoming.length) {
    return NextResponse.json({ error: 'Winkelmand is leeg' }, { status: 400 });
  }

  const items: {
    slug: string; sku: string; supplierCode: string | null; title: string; quantity: number;
    service: ServiceOption; unitPrice: number; surcharge: number; lineTotal: number;
  }[] = [];

  // What the customer had in the basket but cannot buy now — said out loud,
  // never silently dropped from an order they are about to pay for.
  const unavailable: string[] = [];
  const b2b = await isB2B();
  // Stock is checked against the basket total per product, not per line.
  const wanted = new Map<string, number>();

  for (const raw of incoming.slice(0, 50)) {
    const slug = clean(raw.slug, 120);
    if (!slug) continue;
    /*
     * Through the merged catalogue: a price the office corrected has to be the
     * price that is charged, and a product taken offline or out of stock must
     * not be sellable through a stale basket someone left open.
     */
    const product = await getShopProductBySlug(slug);
    const unitPrice = product?.price;
    const quantity = Math.min(20, Math.max(1, Math.floor(Number(raw.quantity)) || 1));
    const total = (wanted.get(slug) ?? 0) + quantity;
    wanted.set(slug, total);
    if (
      !product ||
      (product.audience !== 'public' && !b2b) ||
      !product.inStock ||
      unitPrice == null ||
      !Number.isFinite(unitPrice) ||
      unitPrice <= 0 ||
      (product.stockQuantity != null && total > product.stockQuantity)
    ) {
      unavailable.push(product?.titleNl ?? slug);
      continue;
    }

    const service =
      SERVICES.includes(raw.service as ServiceOption) &&
      servicesFor(product.category).includes(raw.service as ServiceOption)
        ? (raw.service as ServiceOption)
        : 'product_only';
    const surcharge = serviceTotal(service, quantity);

    items.push({
      slug,
      sku: product.id,
      // What the office orders at the supplier; stays in the order record, never shown to the customer.
      supplierCode: product.supplierCode ?? null,
      title: product.titleNl,
      quantity,
      service,
      unitPrice,
      surcharge,
      lineTotal: Math.round((unitPrice * quantity + surcharge) * 100) / 100,
    });
  }

  if (unavailable.length) {
    return NextResponse.json(
      {
        error: `Niet (meer) leverbaar: ${unavailable.join(', ')}. Pas uw winkelmand aan.`,
        unavailable,
      },
      { status: 409 }
    );
  }
  if (!items.length) {
    return NextResponse.json({ error: 'Geen geldige producten' }, { status: 400 });
  }

  const subtotal = Math.round(items.reduce((s, i) => s + i.lineTotal, 0) * 100) / 100;
  const shipping = shippingFor(subtotal);
  const totalInc = Math.round((subtotal + shipping) * 100) / 100;
  const totalExVat = Math.round((totalInc / (1 + VAT_RATE)) * 100) / 100;

  /* ── customer details ── */

  const email = clean(body.email, 160);
  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const street = clean(body.street, 160);
  const postcode = clean(body.postcode, 12);
  const city = clean(body.city, 80);

  if (!email || !name || !street || !postcode || !city) {
    return NextResponse.json({ error: 'Vul alle verplichte velden in' }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: 'Controleer uw e-mailadres' }, { status: 400 });
  }
  if (!POSTCODE_NL.test(postcode) && !POSTCODE_BE.test(postcode)) {
    return NextResponse.json({ error: 'Controleer uw postcode (bijv. 1234 AB)' }, { status: 400 });
  }

  const needsTechnician = items.some((i) => i.service === 'mobile_tech');
  /*
   * Cutting a blade and programming a key both need the vehicle, and both are
   * work we will not do for someone who cannot show the car is theirs. The
   * requirement is read from the service definition rather than hard-coded to
   * the technician option, so a new service cannot slip past it.
   */
  const needsKenteken = items.some((i) => SERVICE_NEEDS[i.service].kenteken);
  const needsOldKey = items.some((i) => SERVICE_NEEDS[i.service].oldKey);

  const kenteken = clean(body.kenteken, 12);
  if (needsKenteken && !kenteken) {
    return NextResponse.json(
      { error: 'Voor frezen, overzetten of programmeren hebben wij uw kenteken nodig' },
      { status: 400 }
    );
  }

  /* ── fail closed without a payment provider ── */

  const mollieKey = getMollieKey();
  if (!mollieKey) {
    console.error('MOLLIE_API_KEY is not configured — refusing to create an order');
    return NextResponse.json(
      {
        error:
          'Online betalen is nog niet beschikbaar. Bel ons op ' +
          `${SITE_CONFIG.phone} en wij ronden uw bestelling telefonisch af.`,
      },
      { status: 503 }
    );
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.storage_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.storage_SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const base = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.domain;

  let createdId: string | null = null;
  try {
    let order: { id: string; order_number: string } | null = null;
    let error: { code?: string } | null = null;
    for (let attempt = 0; attempt < 3 && !order; attempt++) {
      ({ data: order, error } = await supabase
      .from('orders')
      .insert([
        {
          order_number: orderNumber(),
          status: 'pending',
          email,
          name,
          phone,
          street,
          postcode: postcode.toUpperCase().replace(/\s+/g, ''),
          city,
          kenteken,
          items,
          subtotal_inc: subtotal,
          shipping_cost: shipping,
          total_inc: totalInc,
          total_ex_vat: totalExVat,
          total_vat: Math.round((totalInc - totalExVat) * 100) / 100,
          needs_technician: needsTechnician,
        },
      ])
      .select('id, order_number')
      .single());
      if (error?.code !== '23505') break; // only a duplicate order number is retried
    }

    if (error || !order) {
      console.error('Order insert failed:', error);
      return NextResponse.json({ error: 'Bestelling kon niet worden aangemaakt' }, { status: 500 });
    }
    createdId = order.id;

    const payment = await fetch(MOLLIE_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${mollieKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: { currency: 'EUR', value: totalInc.toFixed(2) },
        description: `Autosleutel24 ${order.order_number}`,
        // No method list: Mollie shows whatever is switched on in the profile. Asking for one that is
        // not active (e.g. creditcard before approval) made Mollie refuse the whole payment.
        locale: 'nl_NL',
        redirectUrl: `${base}/bedankt?order=${order.order_number}`,
        // Mollie refuses a webhook it cannot reach; locally the webhook is called by hand.
        ...(/localhost|127\.0\.0\.1/.test(base) ? {} : { webhookUrl: `${base}/api/checkout/webhook` }),
        metadata: { orderId: order.id, orderNumber: order.order_number },
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!payment.ok) {
      const reason = await payment.text();
      console.error('Mollie rejected the payment', reason);
      await supabase.from('orders').update({ status: 'cancelled' }).eq('id', order.id);
      // Mollie's own title (e.g. "Unauthorized request") helps whoever reads the error; no key or customer data in it.
      const title = (() => { try { return JSON.parse(reason).title as string; } catch { return ''; } })();
      return NextResponse.json({ error: 'Betaling kon niet worden gestart', mollie: title || undefined }, { status: 502 });
    }

    createdId = null; // a payment exists now: never cancel this order from here on
    const json = await payment.json();
    // The webhook also finds the order by metadata.orderId, so a failure here is logged, not fatal.
    const { error: idError } = await supabase
      .from('orders')
      .update({ mollie_payment_id: json.id })
      .eq('id', order.id);
    if (idError) console.error('Could not store Mollie payment id', order.id, idError);

    // A mobile-technician order is also a job for the service side, so it goes
    // into the same leads table the rest of the site writes to.
    if (needsTechnician || needsOldKey) {
      await supabase.from('leads').insert([
        {
          brand: 'Webshop',
          model: items.map((i) => i.title).join(', ').slice(0, 80),
          // Which of the two brought this lead in — a call-out or a parcel.
          service: needsTechnician
            ? SERVICE_LABEL.mobile_tech
            : SERVICE_LABEL.send_in,
          location: postcode,
          postcode,
          phone,
          name,
          email,
          source: 'webshop_service',
        },
      ]).then(undefined, (e) => console.error('Lead insert failed', e));
    }


    return NextResponse.json({
      orderNumber: order.order_number,
      checkoutUrl: json._links?.checkout?.href,
    });
  } catch (err) {
    console.error('Checkout failed:', err);
    // No payment was started (or we never heard back): don't leave a pending order behind.
    if (createdId) await supabase.from('orders').update({ status: 'cancelled' }).eq('id', createdId).eq('status', 'pending').then(undefined, () => {});
    return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 });
  }
}
