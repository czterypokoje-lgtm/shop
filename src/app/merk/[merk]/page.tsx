import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CatalogPage from '../../catalogus/page';
import { catalogMetadata } from '../../catalogus/meta';
import brands from '@/lib/brands.json';
import { slugify } from '@/lib/utils';

type Props = {
  params: Promise<{ merk: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** "land-rover" → "Land Rover": the make as the catalogue spells it. */
const makeFor = (slug: string) =>
  (brands as { make: string }[]).find((b) => slugify(b.make) === slug.toLowerCase())?.make;

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { merk } = await params;
  const make = makeFor(merk);
  return make ? catalogMetadata({ ...(await searchParams), make }, `/merk/${merk}`) : {};
}

export default async function BrandPage({ params, searchParams }: Props) {
  const { merk } = await params;
  const make = makeFor(merk);
  if (!make) notFound();
  return CatalogPage({ searchParams: Promise.resolve({ ...(await searchParams), make }) });
}
