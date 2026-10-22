import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import { getShopProducts } from '@/lib/shopCatalog';
import brands from '@/lib/brands.json';
import { slugify } from '@/lib/utils';
import { modelPages } from '@/lib/models';
import { ADVIES } from '@/content/advies';
import { isConsumerProduct, isProCategory } from '@/lib/focus';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.domain;
  const pages = ['', '/catalogus', '/merken', '/aanbiedingen', '/contact', '/verzending-en-retour', '/advies', '/veelgestelde-vragen', '/bestellen', '/betaalmethoden', '/over-ons', '/zakelijk-bestellen',
    '/algemene-voorwaarden', '/privacybeleid', '/cookiebeleid'];
  // Only what a car owner buys; workshop stock is for sale but not advertised.
  const products = (await getShopProducts()).filter(isConsumerProduct);
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))] as string[];
  const shownCategories = categories.filter((c) => !isProCategory(c));
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, priority: p === '' ? 1 : 0.6 })),
    ...shownCategories.map((c) => ({ url: `${base}/categorie/${c}`, priority: 0.8 })),
    ...(brands as { make: string }[]).map((b) => ({ url: `${base}/merk/${slugify(b.make)}`, priority: 0.8 })),
    ...ADVIES.map((a) => ({ url: `${base}/advies/${a.slug}`, lastModified: a.updated, priority: 0.6 })),
    ...modelPages(products).map((m) => ({ url: `${base}/merk/${m.makeSlug}/${m.modelSlug}`, priority: 0.75 })),
    ...products.map((p) => ({
      url: `${base}/product/${p.urlSlug}`,
      images: p.image ? [`${SITE_CONFIG.origin}${p.image}`] : undefined,
      priority: 0.7,
    })),
  ];
}
