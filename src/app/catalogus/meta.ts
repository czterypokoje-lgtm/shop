import type { Metadata } from 'next';
import { facetLabel, type Filters } from '@/lib/catalog';
import { SITE_CONFIG } from '@/config/site.config';

type Params = Record<string, string | string[] | undefined>;

export function parseFilters(sp: Record<string, string | string[] | undefined>): Filters {
  const one = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const buttons = one('buttons');
  return {
    category: one('category'),
    subcategory: one('subcategory'),
    make: one('make'),
    manufacturer: one('manufacturer'),
    condition: one('condition'),
    buttons: buttons ? Number(buttons) : undefined,
    frequency: one('frequency'),
    chip: one('chip'),
    blade: one('blade'),
    q: one('q'),
  };
}

/**
 * One indexable URL per category and per car make (/categorie/x, /merk/x);
 * every other filter, sort or page combination is noindex with a canonical
 * back to the clean view it narrows.
 */
export function catalogMetadata(sp: Params, path?: string): Metadata {
  const f = parseFilters(sp);
  const extra = Object.keys(sp).filter((k) => !['category', 'make'].includes(k) && sp[k]);
  const onlyCategory = f.category && !f.make;
  const onlyMake = f.make && !f.category;

  const title = onlyCategory
    ? `${facetLabel('category', f.category!)} kopen`
    : onlyMake
      ? `Autosleutels en onderdelen voor ${f.make}`
      : f.make && f.category
        ? `${facetLabel('category', f.category)} voor ${f.make}`
        : 'Catalogus — autosleutels en onderdelen';
  const canonical =
    path ?? (onlyCategory ? `/categorie/${f.category}` : onlyMake ? `/merk/${sp.make}` : '/catalogus');

  return {
    title,
    description: onlyMake
      ? `Autosleutels, behuizingen en afstandsbedieningen voor ${f.make}. Prijzen incl. btw, levertijd 3–5 werkdagen.`
      : 'Sleutelbehuizingen, afstandsbedieningen, smart keys, transponders en batterijen. Filter op automerk, type en aantal knoppen.',
    alternates: { canonical: `${SITE_CONFIG.domain}${canonical}` },
    ...(extra.length || (f.category && f.make) ? { robots: { index: false, follow: true } } : {}),
  };
}
