import type { Metadata } from 'next';
import Link from 'next/link';
import { ADVIES } from '@/content/advies';
import { SITE_CONFIG } from '@/config/site.config';
import s from './Advies.module.css';

export const metadata: Metadata = {
  title: 'Advies over autosleutels',
  description: 'Welke autosleutel heeft u, wat doet de transponder en hoe vervangt u zelf een behuizing of batterij? Heldere uitleg van Autosleutel24.',
  alternates: { canonical: `${SITE_CONFIG.domain}/advies` },
};

export default function AdviesIndex() {
  const base = SITE_CONFIG.domain;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Advies over autosleutels',
    itemListElement: ADVIES.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}/advies/${a.slug}`, name: a.title })),
  };
  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={s.hero}>
        <div className={s.wrap}>
          <nav className={s.crumbs} aria-label="Kruimelpad"><Link href="/">Webshop</Link> › <span>Advies</span></nav>
          <h1>Advies over autosleutels</h1>
          <p className={s.lead}>Voordat u bestelt: zo weet u welke sleutel u heeft, wat de chip doet en wat u zelf kunt vervangen.</p>
        </div>
      </section>
      <div className={s.wrap}>
        <div className={s.cards}>
          {ADVIES.map((a) => (
            <Link key={a.slug} href={`/advies/${a.slug}`} className={s.card}>
              <h2>{a.title}</h2>
              <p>{a.description}</p>
              <span className={s.more}>Lees verder →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
