import type { ShopProduct } from '@/lib/shopCatalog';

/** `JPR105E`, `jpr-105 e` and `jpr105e` all have to find the same article. */
function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export interface Hit {
  product: ShopProduct;
  score: number;
}

/**
 * Ranked search over the catalogue.
 *
 * The single most common query in this trade is an article code copied off an
 * old key or a supplier's quote — so an exact code match has to come first and
 * on its own. Everything else is a fallback for people who do not have a code.
 */
export function searchProducts(products: ShopProduct[], query: string): Hit[] {
  const q = query.trim();
  if (q.length < 2) return [];

  const nq = normalise(q);
  const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 1);

  const hits: Hit[] = [];

  for (const product of products) {
    const code = normalise(product.articleCode ?? '');
    const title = (product.titleNl || product.title || '').toLowerCase();
    const nTitle = normalise(title);
    const makes = (product.makes ?? []).map((m) => m.toLowerCase());

    let score = 0;

    const fitsModel = product.fitment.some(
      (f) => nq.length >= 3 && normalise(`${f.make}${f.model}`).includes(nq)
    );
    if (fitsModel) score += 150;

    if (code && code === nq) score += 1000;
    else if (code && code.startsWith(nq) && nq.length >= 3) score += 500;
    else if (nq.length >= 3 && nTitle.includes(nq)) score += 200;

    /*
     * Every word has to appear somewhere, so "bmw smart key" does not match a
     * product that is merely a BMW something.
     *
     * Dutch plurals are matched loosely on purpose: the catalogue says
     * "printplaten" and "behuizingen" while a customer types "printplaat" and
     * "behuizing". Without this, the most natural search term for a category
     * returns nothing.
     */
    const haystack = [
      title,
      makes.join(' '),
      product.category ?? '',
      product.subcategory ?? '',
      product.chip ?? '',
      product.blade ?? '',
      product.frequency ?? '',
      // The models it fits: "combo", "grande punto" and "megane" are what
      // people actually type, and until the fitment list was read off the
      // supplier's pages there was nothing here to match them against.
      product.fitment.map((f) => `${f.make} ${f.model}`).join(' '),
    ]
      .join(' ')
      .toLowerCase();

    const matchesWord = (word: string): boolean => {
      if (haystack.includes(word)) return true;
      // printplaat -> printplat(en), behuizing -> behuizingen, sleutel -> sleutels
      const stem = word.replace(/(en|s)$/, '').replace(/([aeiou])\1/g, '$1');
      return stem.length >= 4 && haystack.includes(stem);
    };

    if (words.length > 0 && words.every(matchesWord)) {
      score += 100 + words.length;
    }

    if (score > 0) hits.push({ product, score });
  }

  return hits
    .sort((a, b) => b.score - a.score || a.product.titleNl.localeCompare(b.product.titleNl))
    .slice(0, 120);
}
