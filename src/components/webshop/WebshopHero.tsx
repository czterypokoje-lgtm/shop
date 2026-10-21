import { withBase } from '@/lib/base';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, FREE_SHIPPING_FROM } from '@/lib/catalog';
import { SITE_CONFIG } from '@/config/site.config';
import HeroSearch from './HeroSearch';

/*
 * Above the fold: what fits my car, is it cheaper than the dealer, can I trust
 * them. The search answers the first, the facts row the other two. The image
 * is a composite of keys we actually sell, not a stock picture.
 */
const QUICK: [string, string][] = [
  ['behuizingen', 'Sleutelbehuizing'],
  ['afstandsbedieningen', 'Afstandsbediening'],
  ['smart-keys', 'Smart key'],
  ['batterijen', 'Batterij'],
];

/** `count`: products for sale right now, from the merged catalogue — never a rounded-up number. */
export default function WebshopHero({ count }: { count: number }) {
  return (
    <section className="webshop-hero">
      <div className="container webshop-hero-inner">
        <div className="webshop-hero-content">
          <p className="webshop-hero-kicker">{count.toLocaleString('nl-NL')} autosleutels en onderdelen op voorraad<span className="webshop-hero-kicker-more"> · minder dan bij de dealer</span></p>
          <h1 className="webshop-hero-title">Vind de sleutel die past op uw auto</h1>
          <p className="webshop-hero-subtitle">Vul uw kenteken in en zie direct welke sleutels, behuizingen en onderdelen passen.</p>

          <HeroSearch />

          <div className="webshop-hero-quick">
            <span>Of kies direct:</span>
            {QUICK.map(([slug, label]) => <Link key={slug} href={`/categorie/${slug}`}>{label}</Link>)}
          </div>

          <ul className="webshop-hero-facts">
            <li><strong>★ {SITE_CONFIG.rating.replace('.', ',')}</strong> op Google</li>
            <li>2–3 werkdagen in huis</li>
            <li>Gratis vanaf {formatPrice(FREE_SHIPPING_FROM)}</li>
            <li>14 dagen bedenktijd</li>
          </ul>
        </div>

        <div className="webshop-hero-visual">
          <Image
            src={withBase('/images/brand/hero-monteur-wijst.webp')}
            alt="Autosleutelspecialist met een klapsleutel wijst naar de kentekenzoeker"
            width={1000}
            height={1250}
            priority
            sizes="(max-width: 767px) 90vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
