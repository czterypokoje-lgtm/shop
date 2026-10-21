import { cache } from 'react';
import 'server-only';
import { createClient } from '@supabase/supabase-js';

export type Review = { id: string; rating: number; title: string | null; body: string; author_name: string; photos: string[]; published_at: string };

const db = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.storage_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.storage_SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key) : null;
};
export { db as reviewsDb };

/** Published reviews of one product, newest first. Empty when the database or table is not there yet. */
export async function reviewsFor(slug: string): Promise<Review[]> {
  const s = db();
  if (!s) return [];
  const { data, error } = await s.from('product_reviews')
    .select('id, rating, title, body, author_name, photos, published_at')
    .eq('product_slug', slug).not('published_at', 'is', null)
    .order('published_at', { ascending: false }).limit(50);
  return error ? [] : (data as Review[]);
}

export const photoUrl = (path: string) => {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.storage_SUPABASE_URL;
  return path.startsWith('http') ? path : `${base}/storage/v1/object/public/review-photos/${path}`;
};

/**
 * Average and count per product, for the stars on product cards. One query per
 * request (React cache), not one per card. Empty map without a database.
 */
export const ratingSummaries = cache(async (): Promise<Map<string, { avg: number; count: number }>> => {
  const out = new Map<string, { avg: number; count: number }>();
  const s = db();
  if (!s) return out;
  const { data, error } = await s.from('product_reviews').select('product_slug, rating').not('published_at', 'is', null).limit(10000);
  if (error || !data) return out;
  const sum = new Map<string, [number, number]>();
  for (const r of data as { product_slug: string; rating: number }[]) {
    const v = sum.get(r.product_slug) ?? [0, 0];
    sum.set(r.product_slug, [v[0] + r.rating, v[1] + 1]);
  }
  for (const [slug, [total, count]] of sum) out.set(slug, { avg: total / count, count });
  return out;
});
