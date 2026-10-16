import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, FREE_SHIPPING_FROM } from '@/lib/catalog';

/*
 * The image is a composite of six keys we actually sell — clean product photos,
 * cut out and arranged — not a stock or generated picture.
 */
export default function WebshopHero() {
  return (
    <section className="webshop-hero">
      <div className="container webshop-hero-inner">
        <div className="webshop-hero-content">
          <h1 className="webshop-hero-title">
            Wie slim is, <br />
            <span style={{ fontStyle: 'italic' }}>betaalt minder.</span>
          </h1>
          <p className="webshop-hero-subtitle">
            Autosleutels, behuizingen en printplaten voor vrijwel elk merk — voor minder dan bij de dealer.
          </p>
          <div className="webshop-hero-actions">
            <Link href="/catalogus" className="webshop-btn-dark">
              Bekijk alle onderdelen
            </Link>
            <Link href="/merken" className="webshop-btn-ghost">
              Zoek op automerk
            </Link>
          </div>
          <ul className="webshop-hero-facts">
            <li>Prijzen incl. btw</li>
            <li>Gratis verzending vanaf {formatPrice(FREE_SHIPPING_FROM)}</li>
            <li>14 dagen bedenktijd</li>
          </ul>
        </div>

        <div className="webshop-hero-visual">
          <Image
            src="/images/hero-keys.webp"
            alt="Autosleutels uit ons assortiment: klapsleutel, smart keys en sleutelkaart"
            width={1120}
            height={920}
            priority
            sizes="(max-width: 767px) 90vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
