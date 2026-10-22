import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/webshop/ProductCard';
import { ADVIES, adviceBySlug, type Block } from '@/content/advies';
import { facetLabel } from '@/lib/catalog';
import { formatPrice } from '@/lib/money';
import { getShopProducts } from '@/lib/shopCatalog';
import { isConsumerProduct } from '@/lib/focus';
import { withBase } from '@/lib/base';
import { SITE_CONFIG, WHATSAPP_URL } from '@/config/site.config';
import s from '../Advies.module.css';

export function generateStaticParams() {
  return ADVIES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = adviceBySlug((await params).slug);
  if (!a) return {};
  return {
    title: a.seoTitle,
    description: a.description,
    alternates: { canonical: `${SITE_CONFIG.domain}/advies/${a.slug}` },
    openGraph: { type: 'article', title: a.title, description: a.description },
  };
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return blocks.map((b, i) => {
    if (b.type === 'p') return <p key={i}>{b.text}</p>;
    if (b.type === 'list') return <ul key={i}>{b.items.map((t) => <li key={t}>{t}</li>)}</ul>;
    if (b.type === 'tip') return <p key={i} className={s.tip}><strong>Tip: </strong>{b.text}</p>;
    return (
      <ol key={i} className={s.steps}>
        {b.items.map((st) => <li key={st.title}><b>{st.title}</b>{st.text}</li>)}
      </ol>
    );
  });
}

export default async function AdviesArticle({ params }: { params: Promise<{ slug: string }> }) {
  const a = adviceBySlug((await params).slug);
  if (!a) notFound();

  // A few products from the first linked category, so the reader can go on to buy.
  const cat = a.links[0]?.href.split('/').pop();
  const products = (await getShopProducts()).filter((p) => p.category === cat && p.image && isConsumerProduct(p)).slice(0, 4);

  const base = SITE_CONFIG.domain;
  const url = `${base}/advies/${a.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: a.description,
      dateModified: a.updated,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: SITE_CONFIG.name },
      publisher: { '@type': 'Organization', name: SITE_CONFIG.name },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Webshop', item: base },
        { '@type': 'ListItem', position: 2, name: 'Advies', item: `${base}/advies` },
        { '@type': 'ListItem', position: 3, name: a.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <div className={s.page}>
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <section className={s.hero}>
        <div className={`${s.wrap} ${s.narrow}`}>
          <nav className={s.crumbs} aria-label="Kruimelpad">
            <Link href="/">Webshop</Link> › <Link href="/advies">Advies</Link> › <span>{a.title.split(':')[0]}</span>
          </nav>
          <h1>{a.title}</h1>
          <p className={s.lead}>{a.intro}</p>
          <p className={s.meta}>Bijgewerkt op {new Date(a.updated).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </section>

      <div className={`${s.wrap} ${s.narrow}`}>
        <article className={s.body}>
          {a.sections.map((sec) => (
            <section key={sec.h2}>
              <h2>{sec.h2}</h2>
              <Blocks blocks={sec.blocks} />
            </section>
          ))}
        </article>

        <div className={s.help}>
          <p><b>Twijfelt u welke u nodig heeft?</b>Stuur een foto van uw sleutel, wij zoeken het juiste onderdeel voor u op.</p>
          <a className={s.wa} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Foto sturen via WhatsApp</a>
        </div>

        <nav className={s.links} aria-label="Naar de winkel">
          {a.links.map((l) => <Link key={l.href} href={l.href}>{l.label} →</Link>)}
        </nav>
      </div>

      {products.length > 0 && cat && (
        <div className={`${s.wrap} ${s.products}`}>
          <h2>Populair in {facetLabel('category', cat)}</h2>
          <div className={s.grid}>
            {products.map((p) => (
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
        </div>
      )}

      <div className={`${s.wrap} ${s.narrow}`}>
        <section className={s.faq}>
          <h2>Veelgestelde vragen</h2>
          {a.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>

        <section className={s.related}>
          <h2>Meer advies</h2>
          <nav className={s.links}>
            {ADVIES.filter((o) => o.slug !== a.slug).map((o) => <Link key={o.slug} href={`/advies/${o.slug}`}>{o.title.split(':')[0]}</Link>)}
          </nav>
        </section>
      </div>
    </div>
  );
}
