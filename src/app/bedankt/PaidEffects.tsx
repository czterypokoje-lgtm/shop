'use client';

import { useEffect } from 'react';
import { clearCart } from '@/lib/cart';
import { track, tagSession, trackAdsConversion } from '@/lib/track';

/** Ads conversion action: Purchase, AW-18511036958. */
const ADS_PURCHASE_SEND_TO = 'AW-18511036958/6ySuCKero7AdEJ6E4PpE';

/** Once per paid order: empty the basket and report the purchase to GA4 (key event), Google Ads, and Clarity. */
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
    trackAdsConversion(ADS_PURCHASE_SEND_TO, value, orderNumber);
    tagSession('order', orderNumber);
  }, [orderNumber, value, items]);
  return null;
}
