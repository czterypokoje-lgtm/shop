import React from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/webshop/AddToCartButton';
import { CardBuyBlock } from '@/components/webshop/CardExtras';
import s from './ProductCard.module.css';

interface ProductCardProps {
  slug: string;
  /** The public URL segment; slug stays the basket key. */
  urlSlug?: string;
  title: string;
  /** Display label of the category. */
  category: string;
  /** Catalogue category slug, for the service add-on line. */
  categorySlug?: string | null;
  /** Already formatted by formatPrice; kept for callers, the block formats `amount`. */
  price: string;
  amount?: number | null;
  img: string;
  inStock?: boolean;
}

/*
 * Grid card. No invented badges or ratings: the buy block shows only facts
 * from the catalogue and real, verified-purchase reviews (BW 6:193c).
 */
export default function ProductCard({ slug, urlSlug, title, category, categorySlug = null, amount = null, img, inStock = true }: ProductCardProps) {
  const href = `/product/${urlSlug ?? slug}`;
  return (
    <div className={s.card}>
      <Link href={href} className={s.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={title} width={240} height={240} loading="lazy" />
      </Link>
      <div className={s.category}>{category}</div>
      <Link href={href} className={s.title}>{title}</Link>
      <div className={inStock ? s.stock : s.soldOut}>{inStock ? 'Op voorraad · 3–5 werkdagen' : 'Tijdelijk uitverkocht'}</div>
      <CardBuyBlock slug={slug} title={title} price={amount} category={categorySlug} />
      <div className={s.cta}>
        <AddToCartButton slug={slug} disabled={!inStock} />
      </div>
    </div>
  );
}
