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
