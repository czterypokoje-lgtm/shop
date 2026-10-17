/*
 * Kept free of the catalogue on purpose: a client component that imported
 * formatPrice from '@/lib/catalog' pulled the whole catalogue JSON — supplier
 * slugs, raw descriptions, purchase prices — into the browser bundle.
 */

/**
 * Shipping. The market reference charges €3 and ships free from €25 — worth
 * knowing, because a higher threshold or a higher rate is a visible
 * disadvantage on a €10 basket.
 */
export const SHIPPING_COST = 5.0;
export const FREE_SHIPPING_FROM = 25.0;

export function shippingFor(basketTotal: number): number {
  return basketTotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
}

export function formatPrice(value: number | null): string {
  if (value == null) return 'op aanvraag';
  return `€${value.toFixed(2).replace('.', ',')}`;
}

export const VAT_RATE = 0.21;
