import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/webshop/ProductCard';
import HeroSearch from '@/components/webshop/HeroSearch';
import { facetLabel } from '@/lib/catalog';
import { formatPrice, FREE_SHIPPING_FROM } from '@/lib/money';
import { SERVICE_SURCHARGE } from '@/lib/services';
import { getShopProducts } from '@/lib/shopCatalog';
import { modelPage } from '@/lib/models';
import { withBase } from '@/lib/base';
import { SITE_CONFIG } from '@/config/site.config';
import s from './ModelPage.module.css';

export const revalidate = 3600;

type Props = { params: Promise<{ merk: string; model: string }> };

/* "kopen" wording on purpose: the main site's /merken pages are about having a
   key made by a technician; these are about buying the part. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { merk, model } = await params;
  const page = modelPage(await getShopProducts(), merk, model);
  if (!page) return {};
  const from = Math.min(...page.products.map((p) => p.price!).filter(Boolean));
  const name = `${page.make} ${page.model}`;
  return {
    title: `Sleutel voor ${name} kopen`,
    description: `${page.products.length} autosleutels, behuizingen en afstandsbedieningen voor de ${name}, vanaf ${formatPrice(from)}. Zoek op kenteken, gratis verzending vanaf ${formatPrice(FREE_SHIPPING_FROM)}.`,
    alternates: { canonical: `${SITE_CONFIG.domain}/merk/${page.makeSlug}/${page.modelSlug}` },
  };
}

export default async function ModelPage({ params }: Props) {
  const { merk, model } = await params;
  const page = modelPage(await getShopProducts(), merk, model);
  if (!page) notFound();

  const name = `${page.make} ${page.model}`;
  const prices = page.products.map((p) => p.price!).filter(Boolean);
  const from = Math.min(...prices);
  const groups = new Map<string, typeof page.products>();
  for (const p of page.products) {
    const k = p.category ?? 'overig';
    groups.set(k, [...(groups.get(k) ?? []), p]);
  }
  const ordered = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
  const uniq = (xs: (string | null | undefined)[]) => [...new Set(xs.filter(Boolean) as string[])];
  const freqs = uniq(page.products.map((p) => p.frequency)).slice(0, 4);
  const chips = uniq(page.products.map((p) => p.chip)).slice(0, 5);
  const blades = uniq(page.products.map((p) => p.blade)).slice(0, 5);

  const faq = [
    { q: `Welke sleutel past op mijn ${name}?`, a: `Let op het aantal knoppen, de vorm (klapsleutel of vaste sleutel) en de sleutelbaard. Vul hierboven uw kenteken in, dan tonen wij alleen wat past. Twijfelt u? Stuur een foto van uw sleutel via WhatsApp, dan zoeken wij het voor u op.` },
    { q: `Wat kost een sleutel voor de ${name}?`, a: `Wij hebben ${page.products.length} artikelen voor de ${name}, vanaf ${formatPrice(from)} inclusief btw — van een losse behuizing tot een complete afstandsbediening.` },
    { q: 'Kunnen jullie de sleutel ook frezen en de elektronica overzetten?', a: `Ja. Frezen op uw sleutelcode kost ${formatPrice(SERVICE_SURCHARGE.cut_only)}, de elektronica uit uw oude sleutel overzetten ${formatPrice(SERVICE_SURCHARGE.send_in)}. Liever alles in één keer bij u aan huis? Onze monteur komt voor ${formatPrice(SERVICE_SURCHARGE.mobile_tech)}.` },
    { q: 'Hoe snel heb ik hem?', a: `Binnen 3–5 werkdagen in huis, met track & trace. Gratis verzending vanaf ${formatPrice(FREE_SHIPPING_FROM)} en 14 dagen bedenktijd.` },
  ];

  const base = SITE_CONFIG.domain;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Webshop', item: base },
        { '@type': 'ListItem', position: 2, name: page.make, item: `${base}/merk/${page.makeSlug}` },
        { '@type': 'ListItem', position: 3, name: page.model, item: `${base}/merk/${page.makeSlug}/${page.modelSlug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Sleutels voor ${name}`,
      itemListElement: page.products.slice(0, 30).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}/product/${p.urlSlug}`, name: p.titleNl })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <div className={s.page}>
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}

      <section className={s.hero}>
        <div className={s.wrap}>
          <nav className={s.crumbs} aria-label="Kruimelpad">
            <Link href="/">Webshop</Link> › <Link href={`/merk/${page.makeSlug}`}>{page.make}</Link> › <span>{page.model}</span>
          </nav>
          <div className={s.heroGrid}>
            <div>
              <h1>Sleutels &amp; behuizingen voor de {name}</h1>
              <p className={s.lead}>
                {page.products.length} artikelen die passen op de {name}, vanaf <b>{formatPrice(from)}</b>. Zoek op kenteken om zeker te zijn, of kies hieronder.
              </p>
              {(freqs.length > 0 || chips.length > 0 || blades.length > 0) && (
                <ul className={s.facts}>
                  {freqs.length > 0 && <li><span>Frequentie</span>{freqs.join(' · ')}</li>}
                  {chips.length > 0 && <li><span>Transponder</span>{chips.join(' · ')}</li>}
                  {blades.length > 0 && <li><span>Sleutelbaard</span>{blades.join(' · ')}</li>}
                </ul>
              )}
            </div>
            <HeroSearch />
          </div>
        </div>
      </section>

      <div className={s.wrap}>
        <nav className={s.jump} aria-label="Soorten">
          {ordered.map(([cat, list]) => (
            <a key={cat} href={`#${cat}`}>{facetLabel('category', cat)} <span>{list.length}</span></a>
          ))}
        </nav>

        {ordered.map(([cat, list]) => (
          <section key={cat} id={cat} className={s.group}>
            <h2>{facetLabel('category', cat)} voor de {name}</h2>
            <div className={s.grid}>
              {list.map((p) => (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  urlSlug={p.urlSlug}
                  title={p.titleNl}
                  category={facetLabel('category', cat)}
                  categorySlug={p.category}
                  price={formatPrice(p.price)}
                  amount={p.price}
                  img={p.image ?? withBase('/images/product-placeholder.svg')}
                  inStock={p.inStock}
                />
              ))}
            </div>
          </section>
        ))}

        <section className={s.faq}>
          <h2>Veelgestelde vragen over sleutels voor de {name}</h2>
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>

        <p className={s.back}><Link href={`/merk/${page.makeSlug}`}>← Alle sleutels voor {page.make}</Link></p>
      </div>
    </div>
  );
}
