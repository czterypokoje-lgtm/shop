import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import { getShopProducts } from '@/lib/shopCatalog';
import brands from '@/lib/brands.json';
import { slugify } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.domain;
  const pages = ['', '/catalogus', '/merken', '/aanbiedingen', '/contact', '/verzending-en-retour',
    '/algemene-voorwaarden', '/privacybeleid', '/cookiebeleid'];
  const products = await getShopProducts();
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))] as string[];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, priority: p === '' ? 1 : 0.6 })),
    ...categories.map((c) => ({ url: `${base}/categorie/${c}`, priority: 0.8 })),
    ...(brands as { make: string }[]).map((b) => ({ url: `${base}/merk/${slugify(b.make)}`, priority: 0.8 })),
    ...products.map((p) => ({
      url: `${base}/product/${p.urlSlug}`,
      images: p.image ? [`${SITE_CONFIG.origin}${p.image}`] : undefined,
      priority: 0.7,
    })),
  ];
}
