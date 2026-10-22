/*
 * Kept free of the catalogue on purpose: a client component that imported
 * formatPrice from '@/lib/catalog' pulled the whole catalogue JSON — supplier
 * slugs, raw descriptions, purchase prices — into the browser bundle.
 */

/**
 * Shipping: €4,99, free from €25 (the office's rule, October 2026) — matches
 * the market reference rather than undercutting or trailing it.
 */
export const SHIPPING_COST = 4.99;
export const FREE_SHIPPING_FROM = 25.0;

export function shippingFor(basketTotal: number): number {
  return basketTotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
}

export function formatPrice(value: number | null): string {
  if (value == null) return 'op aanvraag';
  return `€${value.toFixed(2).replace('.', ',')}`;
}

export const VAT_RATE = 0.21;
