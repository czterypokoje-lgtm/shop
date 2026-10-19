import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { SITE_CONFIG, WHATSAPP_URL } from '@/config/site.config';
import { formatPrice } from '@/lib/catalog';
import PaidEffects from './PaidEffects';
import TrackView from '@/components/webshop/TrackView';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Bedankt voor uw bestelling | Autosleutel24' },
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type Line = { slug?: string; sku?: string; title: string; quantity: number; unitPrice?: number; lineTotal: number };

/**
 * Mollie redirects here for every outcome. The status shown is read back from
 * Mollie itself, for display only — the order row is moved by the webhook.
 * The order number is random, so it does not let anyone page through orders;
 * nothing personal is shown.
 */
async function lookup(orderNumber: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.storage_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.storage_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !/^AS24-\d{2}-[A-Z0-9]{6}$/.test(orderNumber)) return null;
  const { data } = await createClient(url, key)
    .from('orders')
    .select('order_number, status, total_inc, items, mollie_payment_id')
    .eq('order_number', orderNumber)
    .maybeSingle();
  if (!data) return null;

  let status: string = data.status;
  if (status === 'pending' && data.mollie_payment_id && process.env.MOLLIE_API_KEY) {
    try {
      const res = await fetch(`https://api.mollie.com/v2/payments/${data.mollie_payment_id}`, {
        headers: { Authorization: `Bearer ${process.env.MOLLIE_API_KEY}` },
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      });
      // Same check as the webhook: only "paid" when it is this amount.
      const p = res.ok ? await res.json() : null;
      if (p && (p.status !== 'paid' || p.amount?.value === Number(data.total_inc).toFixed(2))) status = p.status;
    } catch {}
  }
  return { ...data, status, items: (Array.isArray(data.items) ? data.items : []) as Line[] };
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const number = (Array.isArray(sp.order) ? sp.order[0] : sp.order) ?? '';
  const order = await lookup(number);
  const paid = order && ['paid', 'processing', 'shipped', 'delivered'].includes(order.status);
  const failed = order && ['canceled', 'cancelled', 'expired', 'failed'].includes(order.status);

  return (
    <div className={styles.page}>
      {failed && <TrackView event="payment_failed" tag={['step', 'payment_failed']} params={{ status: order.status, value: Number(order.total_inc) }} />}
      {paid ? (
        <>
          <h1 className={styles.title}>Bedankt, uw betaling is ontvangen</h1>
          <p className={styles.number}>{order.order_number}</p>
          <p className={styles.text}>
            U ontvangt een bevestiging per e-mail. Wij verzenden binnen 2 - 3 werkdagen.
          </p>
          <ul className={styles.lines}>
            {order.items.map((l, i) => (
              <li key={i}><span>{l.quantity}× {l.title}</span><span>{formatPrice(l.lineTotal)}</span></li>
            ))}
            <li className={styles.total}><span>Totaal incl. btw</span><span>{formatPrice(Number(order.total_inc))}</span></li>
          </ul>
          <PaidEffects
            orderNumber={order.order_number}
            value={Number(order.total_inc)}
            items={order.items.map((l) => ({
              item_id: l.slug ?? l.sku ?? l.title,
              item_name: l.title,
              price: l.unitPrice ?? l.lineTotal / l.quantity,
              quantity: l.quantity,
            }))}
          />
        </>
      ) : failed ? (
        <>
          <h1 className={styles.title}>De betaling is niet gelukt</h1>
          <p className={styles.text}>
            Er is niets afgeschreven. Uw winkelmand staat nog klaar — probeer het opnieuw of kies een
            andere betaalmethode.
          </p>
          <Link href="/winkelmand" className={styles.cta}>Terug naar winkelmand</Link>
        </>
      ) : (
        <>
          <h1 className={styles.title}>Bedankt voor uw bestelling</h1>
          {order && <p className={styles.number}>{order.order_number}</p>}
          <p className={styles.text}>
            Wij wachten nog op de bevestiging van uw bank. Zodra die binnen is, ontvangt u een e-mail.
            Duurt dat langer dan een uur? Bel <a href={`tel:${SITE_CONFIG.phoneTel}`}>{SITE_CONFIG.phone}</a> of{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">stuur een WhatsApp</a>.
          </p>
        </>
      )}

      <Link href="/catalogus" className={styles.more}>Verder winkelen</Link>
    </div>
  );
}
