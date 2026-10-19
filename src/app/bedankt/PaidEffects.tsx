'use client';

import { useEffect } from 'react';
import { clearCart } from '@/lib/cart';
import { track, tagSession } from '@/lib/track';

/** Once per paid order: empty the basket and report the purchase to GA4 (key event) and Clarity. */
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
    track('purchase', { transaction_id: orderNumber, value, items });
    tagSession('order', orderNumber);
  }, [orderNumber, value, items]);
  return null;
}
