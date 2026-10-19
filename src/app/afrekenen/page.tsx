import React from 'react';
import type { Metadata } from 'next';
import CheckoutForm from '@/components/webshop/CheckoutForm';
import { getShopProducts } from '@/lib/shopCatalog';
import { isB2B } from '@/lib/b2b';
import PaymentMethods from '@/components/webshop/PaymentMethods';

export const metadata: Metadata = {
  title: { absolute: 'Afrekenen | Autosleutel24' },
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const slim = (await getShopProducts((await isB2B()) ? 'all' : 'public')).map((p) => ({
    slug: p.slug, titleNl: p.titleNl, price: p.price, image: p.image, category: p.category,
  }));

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
        Afrekenen
      </h1>
      <CheckoutForm products={slim} paymentStrip={<PaymentMethods compact />} />
    </div>
  );
}
