import type { Metadata } from 'next';
import CatalogPage from '../../catalogus/page';
import { catalogMetadata } from '../../catalogus/meta';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** The clean, indexable URL for a category: the catalogue with that one filter. */
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  return catalogMetadata({ ...(await searchParams), category: slug }, `/categorie/${slug}`);
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  return CatalogPage({ searchParams: Promise.resolve({ ...sp, category: slug }) });
}
