import type { Metadata } from 'next';
import CatalogPage from '../../catalogus/page';
import { catalogMetadata } from '../../catalogus/meta';
import { permanentRedirect } from 'next/navigation';
import { isProCategory } from '@/lib/focus';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** The clean, indexable URL for a category: the catalogue with that one filter. */
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = await catalogMetadata({ ...(await searchParams), category: slug }, `/categorie/${slug}`);
  // Workshop ranges stay browsable but are not what we want to be found for.
  return isProCategory(slug) ? { ...meta, robots: { index: false, follow: true } } : meta;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  // /categorie/a?category=b was an old filter link: send it to the page it meant.
  const asked = Array.isArray(sp.category) ? sp.category[0] : sp.category;
  if (asked && asked !== slug) {
    const rest = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) {
      if (k === 'category' || k === 'page' || v === undefined) continue;
      rest.set(k, Array.isArray(v) ? v[0] : v);
    }
    const qs = rest.toString();
    permanentRedirect(`/categorie/${encodeURIComponent(asked)}${qs ? `?${qs}` : ''}`);
  }
  return CatalogPage({ searchParams: Promise.resolve({ ...sp, category: slug }) });
}
