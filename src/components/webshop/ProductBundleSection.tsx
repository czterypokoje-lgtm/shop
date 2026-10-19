'use client';
import { withBase } from '@/lib/base';
import React, { useState } from 'react';
import Link from 'next/link';
import { addToCart } from '@/lib/cart';
import { formatPrice } from '@/lib/money';

/**
 * "Vaak samen gekocht" — the battery that fits this key.
 *
 * What was here before offered three extras: a "Levenslange Garantie Plan"
 * (€6,95), a "RVS Magnetische Sleutelhanger" (€9,95) and the battery. Two of
 * the three are not products we sell, all three arrived pre-ticked, the yellow
 * banner promised "Bespaar 20%" that nothing anywhere applied, and the "IN
 * WINKELMAND" button did nothing at all.
 *
 * A pre-ticked box for a paid extra is prohibited outright — Richtlijn
 * 2011/83/EU art. 22, implemented in BW 6:230j: extra payments need the
 * customer's express consent, and consent cannot be assumed from a default.
 * The discount claim is a misleading practice under BW 6:193c for the same
 * reason the invented reviews and reference prices were removed.
 *
 * So: only the battery A-Key names for this key, looked up in our own
 * catalogue, unticked, at its real price — and the button writes to the
 * basket. Where the supplier names no cell type, nothing is offered.
 */

interface BatteryData {
  slug: string;
  title: string;
  price: number;
  image: string;
}

export default function ProductBundleSection({
  mainProductSlug,
  mainProductTitle,
  mainProductPrice,
  mainProductImage,
  batteryData,
  offerBatteryLink = false,
}: {
  mainProductSlug?: string;
  mainProductTitle: string;
  mainProductPrice: number;
  mainProductImage: string;
  batteryData: BatteryData | null;
  /** Show the battery category when this product is a key that takes one. */
  offerBatteryLink?: boolean;
}) {
  const [added, setAdded] = useState(false);

  /*
   * No battery is offered when the supplier does not name the cell type.
   * Guessing CR2032 — the most common — would be right most of the time, and
   * wrong for the customer who opens the key and finds a CR1620. Instead the
   * category is one tap away for a complete key.
   */
  if (!batteryData) {
    if (!offerBatteryLink) return null;
    return (
      <div style={{ marginTop: '2rem', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '.5rem 1rem', alignItems: 'center' }}>
        <span style={{ fontSize: '.92rem', color: '#334155' }}>
          Batterij los nodig? Wij hebben alle knoopcellen op voorraad.
        </span>
        <Link href="/categorie/batterijen" style={{ color: '#b93c20', fontWeight: 700, textDecoration: 'none', fontSize: '.92rem' }}>
          Bekijk batterijen →
        </Link>
      </div>
    );
  }

  // A ready-made set the customer chooses on purpose — never a pre-ticked extra (BW 6:230j).
  const total = mainProductPrice + batteryData.price;

  const handleAdd = () => {
    if (mainProductSlug) addToCart(mainProductSlug, 'product_only', { name: mainProductTitle, price: mainProductPrice });
    addToCart(batteryData.slug, 'product_only', { name: batteryData.title, price: batteryData.price, category: 'batterijen' });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <section aria-label="Complete set" style={{ border: '2px solid #111827', borderRadius: 12, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#fff' }}>
      <div>
        <p style={{ margin: 0, fontSize: '.75rem', fontWeight: 800, letterSpacing: '.06em', color: '#b93c20' }}>COMPLETE SET</p>
        <h2 style={{ margin: '.2rem 0 0', fontSize: '1.1rem', color: '#0f172a' }}>Direct klaar voor gebruik: met de juiste batterij</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
        <img src={mainProductImage || withBase('/images/product-placeholder.svg')} alt="" width={72} height={72} style={{ objectFit: 'contain' }} />
        <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#94a3b8' }}>+</span>
        <img src={batteryData.image || withBase('/images/product-placeholder.svg')} alt="" width={72} height={72} style={{ objectFit: 'contain' }} />
      </div>
      <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#334155', fontSize: '.92rem', lineHeight: 1.6 }}>
        <li>{mainProductTitle} — {formatPrice(mainProductPrice)}</li>
        <li>{batteryData.title} — {formatPrice(batteryData.price)}</li>
      </ul>
      <button
        type="button"
        onClick={handleAdd}
        style={{ minHeight: 48, border: 0, borderRadius: 8, background: added ? '#15803d' : '#111827', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
      >
        {added ? 'Set toegevoegd ✓' : `Complete set in winkelmand — ${formatPrice(total)}`}
      </button>
    </section>
  );
}
