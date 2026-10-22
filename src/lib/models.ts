import { slugify } from '@/lib/utils';
import type { ShopProduct } from '@/lib/shopCatalog';

/*
 * Make + model landing pages ("sleutel voor de Volkswagen Golf"), built from
 * the fitment the catalogue already carries. Only pairs with enough products
 * get a page — a model page with one article is a thin page, not a landing
 * page — and fitment rows that are really programmer modules (CAS, ECU,
 * tacho) are left out.
 */
export const MIN_PRODUCTS_PER_MODEL = 3;
const NOT_A_MODEL = /\b(ecu|tacho|cas\d?|frm|isn|liest|eeprom|b48|b58|n20|bdc|fem)\b/i;

export interface ModelPage {
  make: string;
  model: string;
  makeSlug: string;
  modelSlug: string;
  products: ShopProduct[];
}

export function modelPages(products: ShopProduct[]): ModelPage[] {
  const map = new Map<string, ModelPage>();
  for (const p of products) {
    const seen = new Set<string>();
    for (const f of p.fitment) {
      if (!f.make || !f.model || NOT_A_MODEL.test(f.model)) continue;
      const makeSlug = slugify(f.make);
      const modelSlug = slugify(f.model);
      if (!makeSlug || !modelSlug) continue;
      const key = `${makeSlug}/${modelSlug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const page = map.get(key) ?? { make: f.make, model: f.model, makeSlug, modelSlug, products: [] };
      page.products.push(p);
      map.set(key, page);
    }
  }
  return [...map.values()].filter((m) => m.products.length >= MIN_PRODUCTS_PER_MODEL);
}

export function modelPage(products: ShopProduct[], makeSlug: string, modelSlug: string): ModelPage | undefined {
  return modelPages(products).find((m) => m.makeSlug === makeSlug && m.modelSlug === modelSlug);
}
