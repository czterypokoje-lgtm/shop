import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/webshop/ProductCard';
import { facetLabel } from '@/lib/catalog';
import { formatPrice } from '@/lib/money';
import { withBase } from '@/lib/base';
import { getShopProducts, type ShopProduct } from '@/lib/shopCatalog';
import s from './ProductRow.module.css';

/**
 * One shelf of the shop on the home page: a photo cover tile for the category
 * (count and "vanaf" price from the catalogue) beside four real products, the
 * way the large retailers lay out a themed row. On a phone the cover becomes a
 * banner and the products scroll sideways.
 */
export default async function ProductRow({
  category,
  title,
  cover,
  tagline,
  limit = 8,
}: {
  category: string;
  /** Overrides the category's own name when a plainer word reads better. */
  title?: string;
  /** Photo for the cover tile, under /public. */
  cover?: string;
  /** One line on the cover tile. */
  tagline?: string;
  limit?: number;
}) {
  const all = await getShopProducts('public');
  const inCategory = all.filter((p) => p.category === category);

  const products: ShopProduct[] = inCategory
    // A row of placeholders sells nothing; photographed products first.
    .filter((p) => p.image && !p.image.includes('placeholder'))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (b.specs?.length ?? 0) - (a.specs?.length ?? 0);
    })
    .slice(0, limit);

  if (products.length < 4) return null;

  const heading = title ?? facetLabel('category', category);
  const href = `/categorie/${category}`;
  const prices = inCategory.map((p) => p.price).filter((x): x is number => x != null);
  const from = prices.length ? Math.min(...prices) : null;

  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <div className={s.head}>
          <h2>{heading}</h2>
          <Link href={href}>Alles bekijken →</Link>
        </div>
        <div className={s.row}>
          <Link href={href} className={s.cover}>
            {cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={withBase(cover)} alt="" loading="lazy" />
            )}
            <span className={s.coverText}>
              <strong>{heading}<span className={s.dot}>.</span></strong>
              {tagline && <span className={s.tagline}>{tagline}</span>}
              <span className={s.meta}>
                {inCategory.length} op voorraad{from != null && <> · vanaf <b>{formatPrice(from)}</b></>}
              </span>
              <span className={s.coverCta}>Bekijk alle →</span>
            </span>
          </Link>
          <div className={s.cards}>
            {products.map((p) => (
              <div key={p.id} className={s.cell}>
                <ProductCard
                  slug={p.slug}
                  urlSlug={p.urlSlug}
                  title={p.titleNl}
                  category={p.category ? facetLabel('category', p.category) : 'Auto-onderdeel'}
                  categorySlug={p.category}
                  price={formatPrice(p.price)}
                  amount={p.price}
                  img={p.image ?? withBase('/images/product-placeholder.svg')}
                  inStock={p.inStock}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
