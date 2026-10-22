import type { Metadata } from 'next';
import CatalogPage from '../../catalogus/page';
import { catalogMetadata } from '../../catalogus/meta';
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
  return CatalogPage({ searchParams: Promise.resolve({ ...sp, category: slug }) });
}
