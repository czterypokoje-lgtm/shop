'use client';

import { useEffect } from 'react';
import { clearCart } from '@/lib/cart';

/** Once per paid order: empty the basket and report the purchase to GA4/Ads via dataLayer. */
export default function PaidEffects({ orderNumber, value, items }: {
  orderNumber: string;
  value: number;
  items: { item_id: string; item_name: string; price: number; quantity: number }[];
}) {
  useEffect(() => {
    clearCart();
    const key = `as24_purchase_${orderNumber}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, '1');
    } catch {}
    const w = window as unknown as { dataLayer?: unknown[] };
    (w.dataLayer ??= []).push({ ecommerce: null });
    w.dataLayer.push({
      event: 'purchase',
      ecommerce: { transaction_id: orderNumber, currency: 'EUR', value, items },
    });
  }, [orderNumber, value, items]);
  return null;
}
