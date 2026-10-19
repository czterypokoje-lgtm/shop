import { withBase } from '@/lib/base';
import type { Metadata } from 'next';
import TrackView from '@/components/webshop/TrackView';
import Link from 'next/link';
import QuoteRequest from '@/components/webshop/QuoteRequest';
import ProductCardList from '@/components/webshop/ProductCardList';
import { getShopProducts } from '@/lib/shopCatalog';
import { searchProducts as search } from '@/lib/search';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Zoeken | Autosleutel24',
  // A search result page has nothing of its own to offer a search engine.
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? '').slice(0, 80);

  const products = await getShopProducts('public');
  const hits = query ? search(products, query) : [];

  return (
    <div style={{ background: '#f6f4eb', minHeight: '100vh', paddingBottom: '6rem', fontFamily: 'Inter, sans-serif' }}>
      {/* A search without results is a customer we are about to lose: its own event, to read what they wanted. */}
      {query && <TrackView event={hits.length ? 'search' : 'search_no_results'} tag={['page_type', 'search']} params={{ search_term: query, results: hits.length }} />}
      <div style={{ background: '#fff', padding: '1.5rem 0 2rem', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: 1600, width: 'calc(100% - 2rem)', margin: '0 auto' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>
              Webshop
            </Link>{' '}
            / Zoeken
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            {query ? `Zoekresultaten voor “${query}”` : 'Zoeken'}
          </h1>
          {query && (
            <p style={{ color: '#475569', marginTop: '0.5rem' }}>
              {hits.length === 0
                ? 'Geen resultaten.'
                : `${hits.length} ${hits.length === 1 ? 'resultaat' : 'resultaten'}`}
            </p>
          )}

          {/* A second search box, so a failed search can be corrected here. */}
          <form action={withBase("/zoeken")} method="get" style={{ display: 'flex', maxWidth: 620, marginTop: '1rem' }}>
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Artikelcode, merk of omschrijving"
              style={{ flex: 1, padding: '0.75rem 1rem', border: '2px solid #94a3b8', borderRadius: '4px 0 0 4px', fontSize: '1rem', outline: 'none' }}
            />
            <button
              type="submit"
              style={{ background: '#b93c20', color: '#fff', border: 'none', padding: '0 1.5rem', borderRadius: '0 4px 4px 0', cursor: 'pointer', fontWeight: 700 }}
            >
              Zoek
            </button>
          </form>
        </div>
      </div>

      <div style={{ maxWidth: 1600, width: 'calc(100% - 2rem)', margin: '2rem auto 0' }}>
        {query && hits.length === 0 && (
          <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: '2.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: 600, margin: 0 }}>
              Niets gevonden voor “{query}”.
            </p>
            <p style={{ color: '#475569', marginTop: '0.75rem', lineHeight: 1.6 }}>
              Zoek op de artikelcode van uw sleutel (bijvoorbeeld <strong>JPR105E</strong>),
              op merk, of op het soort onderdeel. Weet u het niet zeker?{' '}
              <Link href="/contact" style={{ color: '#b93c20' }}>
                Geef uw kenteken door
              </Link>{' '}
              — dan zoeken wij het voor u op.
            </p>
          </div>
        )}
        {query && hits.length === 0 && (
          <div style={{ maxWidth: 720, margin: '1.25rem auto 0' }}>
            <QuoteRequest title="Of vraag direct een prijs aan" />
          </div>
        )}

        {hits.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {hits.map(({ product }) => (
              <ProductCardList
                key={product.slug}
                slug={product.slug}
                urlSlug={product.urlSlug}
                title={product.titleNl || product.title}
                subtitle={product.directAnswer}
                specs={product.specs}
                inStock={product.stockQuantity === null ? null : product.inStock}
                category={product.category ?? 'Onderdeel'}
                price={product.price}
                img={product.image || withBase('/images/product-placeholder.svg')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
