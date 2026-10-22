import type { CatalogProduct } from '@/lib/catalog';

/*
 * Who an article is for: a car owner, or a locksmith.
 *
 * About a third of what A-Key lists is workshop stock — grip bags and key
 * rings by the hundred, Xhorse adapters, KeyDIY remotes that only a
 * programming device can bring to life, AA and hearing-aid batteries, blank
 * keys known only by a supplier code. They stay for sale (a locksmith can
 * still search and order them), but they are not what this shop is about, and
 * a search engine or an AI answer that sees them first reads us as a
 * wholesaler. So they are kept out of everything that tells the outside world
 * what we sell: the index, the sitemap, the Shopping feed, the homepage, the
 * make and model pages and llms.txt.
 */

const PRO_CATEGORIES = new Set([
  'accessoires',
  'gereedschap',
  'programmeerapparatuur',
  'sleutelmachines',
  'frezen-en-tasters',
  'woningsleutels',
  'sloten',
  // A blank chip or a universal remote needs a programming device to do anything.
  'transponders',
  'universal-remotes',
]);

/** Coin cells that go in a car key; not AA packs or hearing-aid batteries. */
const KEY_BATTERY = /\b(CR\s?\d{4}|CR\s?\d{3}|V\s?3\d\d|SR\s?\d{2,3}|LR\s?\d{2,3}|knoopcel)/i;

export function isConsumerProduct(p: Pick<CatalogProduct, 'category' | 'titleNl' | 'makes'>): boolean {
  const category = p.category ?? '';
  if (PRO_CATEGORIES.has(category)) return false;
  if (category === 'batterijen') return KEY_BATTERY.test(p.titleNl) && !/hoortoestel/i.test(p.titleNl);
  // A blank known only by its supplier code says nothing to a car owner.
  if (category === 'sleutels-zonder-chip') return (p.makes ?? []).length > 0;
  return true;
}

/** Categories whose own page is workshop stock: not indexed, not in the sitemap. */
export const isProCategory = (slug: string) => PRO_CATEGORIES.has(slug);
