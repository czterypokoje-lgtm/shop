import React, { Suspense } from 'react';
import TrackView from '@/components/webshop/TrackView';
import Link from 'next/link';
import QuoteRequest from '@/components/webshop/QuoteRequest';
import { isB2B } from '@/lib/b2b';
import type { Metadata } from 'next';
import CatalogFilters from '@/components/webshop/CatalogFilters';
import ProductCardList from '@/components/webshop/ProductCardList';
import {
  filterProducts,
  buildFacets,
  facetLabel,
  sortProducts,
  type FacetKey,
  type SortKey,
} from '@/lib/catalog';
import { getShopProducts } from '@/lib/shopCatalog';
import { slugify } from '@/lib/utils';
import { parseFilters, catalogMetadata } from './meta';
import { CATEGORY_COPY, BRAND_COPY } from '@/content/shopCopy';
import CatalogCopy from './CatalogCopy';
import BrandCategoryPicker from '@/components/webshop/BrandCategoryPicker';

/**
 * Faceted catalogue browse page.
 *
 * Renders on the server from the URL, so a filtered view is shareable and
 * crawlable-if-we-choose. It is currently noindex along with the rest of
 * /webshop; when the shop opens, only the unfiltered category views should be
 * indexed and every ?filter= combination must stay noindex with a canonical
 * back to the clean category URL.
 */

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  return catalogMetadata(await searchParams);
}

/*
 * Fabrikant sits second, right after the car make.
 *
 * It used to be sixth, which was right while the field was empty — 296 of 389
 * products had no manufacturer at all. Now that Xhorse, KeyDIY, Autel and
 * Lonsdor are detected, "which brand of universal key" is one of the two
 * questions a customer actually arrives with.
 */
const FACET_ORDER: FacetKey[] = [
  'make', 'manufacturer', 'category', 'subcategory', 'buttons', 'frequency', 'chip', 'blade',
  'condition',
];

/** Brands worth a one-click entry point of their own. */
const BRAND_SHORTCUTS = ['Xhorse', 'KeyDIY', 'Autel', 'Lonsdor', 'Silca'];

const PAGE_SIZE = 24;

const SORT_KEYS: SortKey[] = ['prijs-oplopend', 'prijs-aflopend', 'naam'];

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const b2b = await isB2B();
  const filters = parseFilters(sp);

  // Public catalogue only. Trade lines (lock picks, key programmers) are
  // excluded at the data layer, not hidden in the UI.
  const all = await getShopProducts(b2b ? 'all' : 'public');
  const matched = filterProducts(all, filters);
  const facets = buildFacets(all, filters, FACET_ORDER);

  // In-stock and sort are display ordering/narrowing on top of the real
  // filters, not facets themselves — kept out of Filters/matches() since
  // `inStock` only exists on the shop's own ShopProduct, not the base
  // CatalogProduct every other facet operates on.
  const onlyInStockRaw = Array.isArray(sp.inStock) ? sp.inStock[0] : sp.inStock;
  const onlyInStock = onlyInStockRaw === '1';
  const sortRaw = Array.isArray(sp.sort) ? sp.sort[0] : sp.sort;
  const sort = SORT_KEYS.find((s) => s === sortRaw);

  // The clean category or brand view gets its own heading and copy.
  const onlyCategory = filters.category && !filters.make ? filters.category : null;
  const onlyMake = filters.make && !filters.category ? filters.make : null;
  const copy = onlyCategory ? CATEGORY_COPY[onlyCategory] : onlyMake ? BRAND_COPY[onlyMake] : undefined;
  const heading = onlyCategory
    ? facetLabel('category', onlyCategory)
    : onlyMake
      ? `Autosleutels en onderdelen voor ${onlyMake}`
      : filters.make && filters.category
        ? `${facetLabel('category', filters.category)} voor ${filters.make}`
        : 'Catalogus';

  const narrowed = onlyInStock ? matched.filter((p) => p.inStock) : matched;
  const sorted = sortProducts(narrowed, sort);
  // On a brand page the brand's own parts lead; a Renault housing that also fits the Opel Vivaro comes after.
  const own = (p: (typeof sorted)[number]) => p.makes[0]?.toLowerCase() === filters.make?.toLowerCase();
  const results = filters.make && !sort ? [...sorted.filter(own), ...sorted.filter((p) => !own(p))] : sorted;

  const page = Math.max(1, Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1);
  const pageItems = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(results.length / PAGE_SIZE);

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
      <TrackView
        event={pageItems.length ? 'view_item_list' : 'empty_list'}
        tag={['page_type', 'list']}
        params={{ item_list_name: heading, results: results.length, make: filters.make, category: filters.category, items: pageItems.slice(0, 20).map((p, i) => ({ item_id: p.slug, item_name: p.titleNl, item_category: p.category ?? undefined, price: p.price, index: i })) }}
      />
      <nav style={{ fontSize: '.85rem', color: '#64748b', marginBottom: '1rem' }}>
        <Link href="/" style={{ color: '#64748b' }}>Home</Link>
        <span aria-hidden="true"> › </span>
        {filters.make && filters.category ? (
          <>
            <Link href={`/merk/${slugify(filters.make)}`} style={{ color: '#64748b' }}>{filters.make}</Link>
            <span aria-hidden="true"> › </span>
            <span>{facetLabel('category', filters.category)}</span>
          </>
        ) : (
          <span>{heading}</span>
        )}
      </nav>

      <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '.35rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {heading}
        {b2b && (
          <span style={{ fontSize: '0.8rem', background: '#16a34a', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: 99, fontWeight: 700, verticalAlign: 'middle' }}>
            B2B Modus Actief
          </span>
        )}
      </h1>
      <p style={{ color: '#475569', marginBottom: '1.75rem', maxWidth: '62ch' }}>
        {copy?.intro ?? (filters.make && filters.category
          ? `${results.length} ${facetLabel('category', filters.category).toLowerCase()} voor ${filters.make}, op voorraad en binnen 2–3 werkdagen bij u. Twijfelt u welke past? Kies hieronder een ander type of app ons een foto.`
          : undefined) ??
          'Sleutelbehuizingen, afstandsbedieningen, smart keys, transponders en batterijen. Filter op automerk en type — of laat onze monteur het hele werk doen.'}
      </p>

      {filters.make && <BrandCategoryPicker make={filters.make} products={all} active={filters.category} />}

      {/*
        * Brand shortcuts. The universal keys here are made by a handful of
        * brands, and a customer who owns a Xhorse tool wants that brand's
        * blanks — not every remote that fits their car.
        */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '1.25rem' }}>
        {BRAND_SHORTCUTS.filter((b) =>
          (facets.manufacturer ?? []).some((o) => o.value === b)
        ).map((brand) => {
          const active = filters.manufacturer === brand;
          const count = (facets.manufacturer ?? []).find((o) => o.value === brand)?.count ?? 0;
          return (
            <Link
              key={brand}
              href={active ? '/catalogus' : `/catalogus?manufacturer=${encodeURIComponent(brand)}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                padding: '.45rem .85rem', borderRadius: 999,
                border: `1px solid ${active ? '#b93c20' : '#cbd5e1'}`,
                background: active ? '#fff7ed' : '#fff',
                color: active ? '#b93c20' : '#0f172a',
                fontSize: '.85rem', fontWeight: 700, textDecoration: 'none',
              }}
            >
              {brand}
              <span style={{ color: '#64748b', fontWeight: 500 }}>{count}</span>
            </Link>
          );
        })}
      </div>

      <div className="shop-catalog-grid">
        <Suspense fallback={<div />}>
          <CatalogFilters facets={facets} order={FACET_ORDER} resultCount={results.length} />
        </Suspense>

        {/* Without results there may be no filter column: take the full width. */}
        <div style={pageItems.length === 0 ? { gridColumn: '1 / -1' } : undefined}>
          {pageItems.length === 0 ? (
            <QuoteRequest
              make={typeof sp.make === 'string' ? sp.make : ''}
              model={typeof sp.q === 'string' ? sp.q : ''}
              title="Dit hebben wij niet online — wel via een prijsaanvraag"
            />
          ) : (
            <div className="shop-catalog-list">
              {pageItems.map((p) => {
                return (
                  <ProductCardList
                    key={p.slug}
                    slug={p.slug}
                urlSlug={p.urlSlug}
                    title={p.titleNl || p.title}
                    subtitle={p.directAnswer}
                    specs={p.specs}
                    category={p.category ? facetLabel('category', p.category) : 'Onderdeel'}
                    price={p.price}
                    img={p.image || '/images/product-placeholder.svg'}
                  />
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {page > 1 ? (
                <Link
                  href={{ query: { ...sp, page: page - 1 } }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                    padding: '.6rem 1.2rem', borderRadius: 8,
                    border: '1px solid #cbd5e1', background: '#fff',
                    fontWeight: 600, fontSize: '.9rem', color: '#0f172a',
                    textDecoration: 'none',
                  }}
                >
                  ← Vorige
                </Link>
              ) : (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                  padding: '.6rem 1.2rem', borderRadius: 8,
                  border: '1px solid #e5e7eb', background: '#f8fafc',
                  fontWeight: 600, fontSize: '.9rem', color: '#94a3b8',
                  cursor: 'not-allowed',
                }}>
                  ← Vorige
                </span>
              )}

              <span style={{ fontSize: '.88rem', color: '#475569' }}>
                Pagina {page} van {totalPages} — {results.length} producten
              </span>

              {page < totalPages ? (
                <Link
                  href={{ query: { ...sp, page: page + 1 } }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                    padding: '.6rem 1.2rem', borderRadius: 8,
                    border: '1px solid #cbd5e1', background: '#fff',
                    fontWeight: 600, fontSize: '.9rem', color: '#0f172a',
                    textDecoration: 'none',
                  }}
                >
                  Volgende →
                </Link>
              ) : (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.4rem',
                  padding: '.6rem 1.2rem', borderRadius: 8,
                  border: '1px solid #e5e7eb', background: '#f8fafc',
                  fontWeight: 600, fontSize: '.9rem', color: '#94a3b8',
                  cursor: 'not-allowed',
                }}>
                  Volgende →
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {copy && (sp.page === undefined || sp.page === '1') && (
        <CatalogCopy copy={copy} make={onlyMake} products={matched} />
      )}
    </div>
  );
}
