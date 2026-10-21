import { withBase } from '@/lib/base';
import React from 'react';
import Link from 'next/link';
import { existsSync } from 'fs';
import path from 'path';
import ProductCard from '@/components/webshop/ProductCard';
import { PAYMENT_METHODS } from '@/lib/payments';
import { formatPrice, FREE_SHIPPING_FROM } from '@/lib/catalog';
import { slugify } from '@/lib/utils';
import { SITE_CONFIG, WHATSAPP_URL } from '@/config/site.config';
import type { getShopProducts } from '@/lib/shopCatalog';
import s from './HomeSections.module.css';

type Products = Awaited<ReturnType<typeof getShopProducts>>;

/* Every promise here is one the shop already makes elsewhere: 2-3 days, Mollie's methods, BW 6:230o. */
const TRUST = [
  { icon: 'truck', title: 'Levertijd 2–3 werkdagen', text: `Gratis verzending vanaf ${formatPrice(FREE_SHIPPING_FROM)}` },
  { icon: 'chat', title: 'Hulp via WhatsApp', text: 'Twijfelt u welke sleutel past? Stuur een foto.' },
  { icon: 'lock', title: 'Veilig betalen', text: 'iDEAL, Bancontact of creditcard' },
  { icon: 'return', title: '14 dagen bedenktijd', text: 'Ongebruikt retour, geld terug' },
];

const ICON: Record<string, React.ReactNode> = {
  truck: <><rect x="1" y="6" width="14" height="10" rx="1" /><path d="M15 9h4l3 3v4h-7" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.3A8 8 0 1 1 21 12z" />,
  lock: <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  return: <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></>,
};
const Icon = ({ name }: { name: string }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICON[name]}</svg>
);

export function HomeTrust() {
  return (
    <section className={s.trust} aria-label="Waarom bij ons bestellen">
      <div className={`container ${s.trustGrid}`}>
        {TRUST.map((t) => (
          <div key={t.title} className={s.trustCard}>
            <span className={s.trustIcon}><Icon name={t.icon} /></span>
            <div><strong>{t.title}</strong><span>{t.text}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

const hasPhoto = (slug: string) => existsSync(path.join(process.cwd(), 'public/images/brands', `${slug}.webp`));

/** Makes people drive, with a real photo of the car and how many parts we can ship for it now. */
export function HomeBrands({ products }: { products: Products }) {
  const count = new Map<string, number>();
  for (const p of products) for (const m of new Set(p.makes)) count.set(m, (count.get(m) ?? 0) + 1);
  const top = [...count].sort((a, b) => b[1] - a[1]).filter(([m]) => hasPhoto(slugify(m))).slice(0, 16);
  if (!top.length) return null;
  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.head}>
          <h2>Zoek op uw automerk</h2>
          <Link href="/merken">Alle merken →</Link>
        </div>
        <div className={s.brandRow}>
          {top.map(([make, n]) => (
            <Link key={make} href={`/merk/${slugify(make)}`} className={s.brandCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase(`/images/brands/${slugify(make)}.webp`)} alt={`${make} auto`} width={320} height={200} loading="lazy" />
              <strong>{make}</strong>
              <span>{n} onderdelen</span>
            </Link>
          ))}
        </div>
        <p className={s.credit}>Foto&apos;s: Wikimedia Commons (CC BY / CC BY-SA), bewerkt — <Link href="/merken#fotos">bronvermelding</Link></p>
      </div>
    </section>
  );
}

/** Our own van and workshop, next to the keys people buy most: the shop and the service in one block. */
export function HomeFavorites({ products }: { products: Products }) {
  if (products.length < 3) return null;
  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.head}>
          <h2>Meest gekozen door klanten</h2>
          <Link href="/catalogus">Alles bekijken →</Link>
        </div>
        <div className={s.fav}>
          <div className={s.favHero}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/images/gallery/autosleutel_specialist_mobiele_werkplaats_utrecht_leidsche_rijn.webp")} alt="Onze mobiele werkplaats met sleutelapparatuur" loading="lazy" />
            <div className={s.favText}>
              <span className={s.kicker}>Liever niet zelf doen?</span>
              <strong>Wij programmeren uw nieuwe sleutel ook</strong>
              <p>Kies bij de sleutel “Monteur aan huis”: wij komen naar uw auto, frezen de sleutel en leren hem in.</p>
              <a href={`${WHATSAPP_URL}?text=${encodeURIComponent('Hallo, ik wil een sleutel laten programmeren.')}`} target="_blank" rel="noopener noreferrer" className={s.favBtn}>WhatsApp ons</a>
            </div>
          </div>
          <div className={s.favGrid}>
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.slug} slug={p.slug} urlSlug={p.urlSlug} title={p.titleNl} category={p.category ?? ''} price={formatPrice(p.price)} amount={p.price} img={p.image ?? withBase('/images/product-placeholder.svg')} inStock={p.inStock} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const GUIDES = [
  { href: '/merken', img: withBase('/images/blog/autosleutel-kenteken-1.webp'), tag: 'Uitleg', title: 'Welke sleutel past op mijn auto?', text: 'Kies merk, model en bouwjaar — of zoek op kenteken.' },
  { href: '/offerte', img: withBase('/images/gallery/autosleutel_volkswagen_golf_reservesleutel_maarssen.webp'), tag: 'Service', title: 'Niet gevonden? Wij zoeken het voor u', text: 'Binnen één werkdag een prijs, vrijblijvend.' },
  { href: '/verzending-en-retour', img: withBase('/images/gallery/autosleutel_toyota_corolla_reservesleutel_zeist.webp'), tag: 'Info', title: 'Verzending, retour en garantie', text: 'Zo werkt bestellen, terugsturen en garantie.' },
];

export function HomeGuides() {
  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.head}><h2>Handig om te weten</h2></div>
        <div className={s.guides}>
          {GUIDES.map((g) => (
            <Link key={g.href} href={g.href} className={s.guide}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.img} alt="" loading="lazy" />
              <div>
                <span className={s.tag}>{g.tag}</span>
                <strong>{g.title}</strong>
                <p>{g.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const BAND = [
  { icon: 'ship', title: 'Snel verzonden', text: 'Levertijd 2–3 werkdagen' },
  { icon: '247', title: '24/7 bereikbaar', text: 'Snel antwoord via WhatsApp' },
  { icon: 'pay', title: 'Veilig online betalen', text: 'Eenvoudig en vertrouwd afrekenen' },
  { icon: 'box', title: 'Bezorgd in NL & BE', text: `Gratis vanaf ${formatPrice(FREE_SHIPPING_FROM)}` },
];

const BAND_ICON: Record<string, React.ReactNode> = {
  ship: <><path d="M20 22h26v20H20z" /><path d="M46 28h8l6 7v7H46" /><circle cx="27" cy="45" r="4" /><circle cx="53" cy="45" r="4" /><path d="M4 26h11M7 32h8M2 38h13" /></>,
  '247': <><path d="M14 18a18 18 0 1 0 5-4" /><path d="M10 10v8h8" /><text x="32" y="38" fontSize="17" fontWeight="700" textAnchor="middle" fill="currentColor" stroke="none">24/7</text></>,
  pay: <><rect x="10" y="16" width="36" height="24" rx="4" /><path d="M10 24h36M16 33h8" /><path d="M48 30l10 4v8c0 6-4 10-10 12-6-2-10-6-10-12v-8z" /><path d="M44 42l3 3 6-6" /></>,
  box: <><path d="M14 26l18-9 18 9-18 9z" /><path d="M14 26v18l18 9 18-9V26M32 35v18" /><path d="M6 12l4 4M58 12l-4 4M32 4v6" /></>,
};

/* Official logos (Wikimedia Commons, vector). Carriers we ship with; methods enabled at Mollie. */
const CARRIER_LOGOS = [
  { id: 'dhl', label: 'DHL' }, { id: 'postnl', label: 'PostNL' }, { id: 'ups', label: 'UPS' }, { id: 'gls', label: 'GLS' },
];
const PAY_LOGOS: Record<string, { id: string; label: string }[]> = {
  ideal: [{ id: 'ideal', label: 'iDEAL' }],
  bancontact: [{ id: 'bancontact', label: 'Bancontact' }],
  creditcard: [{ id: 'visa', label: 'Visa' }, { id: 'mastercard', label: 'Mastercard' }],
};
const Tile = ({ id, label }: { id: string; label: string }) => (
  <li className={s.tile} title={label}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={withBase(`/images/logos/${id}.svg`)} alt={label} loading="lazy" />
  </li>
);

export function HomePartners() {
  const methods = PAYMENT_METHODS.flatMap((m) => PAY_LOGOS[m.id] ?? []);
  return (
    <section className={s.band} aria-label="Verzenden en betalen">
      <div className="container">
        <div className={s.bandRow}>
          {BAND.map((b) => (
            <div key={b.title} className={s.bandItem}>
              <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{BAND_ICON[b.icon]}</svg>
              <div><strong>{b.title}</strong><span>{b.text}</span></div>
            </div>
          ))}
        </div>
        <div className={s.bandBottom}>
          <p className={s.copy}><b>{SITE_CONFIG.name.toUpperCase()}</b> © {new Date().getFullYear()} ALLE RECHTEN VOORBEHOUDEN.</p>
          <div className={s.bandBox}>
            <h3>VERZENDPARTNERS</h3>
            <ul>{CARRIER_LOGOS.map((c) => <Tile key={c.id} {...c} />)}</ul>
          </div>
          <div className={`${s.bandBox} ${s.bandPay}`}>
            <h3>VEILIGE BETAALMETHODEN</h3>
            <ul>{methods.map((m) => <Tile key={m.id} {...m} />)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
