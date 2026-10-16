import React from 'react';
import Link from 'next/link';
import {
  Radio,
  PackageOpen,
  Shuffle,
  Antenna,
  CircuitBoard,
  KeySquare,
  Key,
  BatteryFull,
  Wrench,
  ShoppingBag,
  KeyRound,
  Cog,
  Lock,
  Nfc,
  Bike,
  Home,
  Cpu,
  Settings,
  Ruler,
  type LucideIcon,
} from 'lucide-react';
import { facetLabel } from '@/lib/catalog';
import { getShopProducts } from '@/lib/shopCatalog';

/**
 * The category tiles, built from what is in the catalogue.
 *
 * The list used to be hard-coded and had drifted: "Sloten & Cilinders" and
 * "Smart Keys / Keyless" both linked to `?category=`-values that no product
 * carries, so two of the nine tiles on the home page opened an empty
 * catalogue, while "Overige sleutels" (90 products) had no tile at all.
 *
 * Counts come from the same merged catalogue the catalogue page filters, so a
 * tile can never promise products that a click does not deliver.
 */

/** Only for the look of the tile; unknown categories fall back to a key. */
const ICON: Record<string, LucideIcon> = {
  afstandsbedieningen: Radio,
  behuizingen: PackageOpen,
  'universal-remotes': Shuffle,
  transponders: Antenna,
  printplaten: CircuitBoard,
  noodsleutels: KeySquare,
  sleutelbaarden: Key,
  batterijen: BatteryFull,
  gereedschap: Wrench,
  accessoires: ShoppingBag,
  'overige-sleutels': KeyRound,
  diensten: Cog,
  sloten: Lock,
  'smart-keys': Nfc,
  transpondersleutels: KeyRound,
  'sleutels-zonder-chip': Key,
  motorsleutels: Bike,
  woningsleutels: Home,
  programmeerapparatuur: Cpu,
  sleutelmachines: Settings,
  'frezen-en-tasters': Ruler,
};

/*
 * The photo on each tile. A-Key's watermark check misses many of their logos,
 * so these were picked by eye; the rest fall back to the first in-stock
 * product whose photo is not A-Key's (a clean supplier photo).
 */
const TILE_PRODUCT: Record<string, string> = {
  accessoires: 'schluesselanhaenger-brombeer-200-stueck',
  'sleutels-zonder-chip': 'ls3-silca-las8-las-11d-fahrzeugschluessel',
  batterijen: 'cr2354-3v',
  sleutelbaarden: 'hu83fh-or',
  gereedschap: 'spannwerkzeuge-set',
  noodsleutels: 'wt47sab-notschluessel-geeignet-fuer-saab',
  motorsleutels: 'piaggio-rohling-sip22dt',
};

/** Below this a tile is not worth a slot on the home page. */
const MIN_PRODUCTS = 5;

export default async function CategoryGrid() {
  const products = await getShopProducts('public');

  const counts = new Map<string, number>();
  for (const product of products) {
    if (!product.category) continue;
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
  }

  const photoFor = (slug: string) => {
    const inCat = products.filter((p) => p.category === slug && p.inStock && p.image);
    const chosen =
      inCat.find((p) => p.slug === TILE_PRODUCT[slug]) ??
      inCat.find((p) => !/\/akey_/.test(p.image!)) ??
      inCat.find((p) => p.cleanPhoto);
    return chosen?.image ?? null;
  };

  const categories = [...counts.entries()]
    .filter(([, count]) => count >= MIN_PRODUCTS)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="category-grid">
      {categories.map(([slug, count]) => {
        const Icon = ICON[slug] ?? KeyRound;
        const photo = photoFor(slug);
        return (
          <Link
            href={`/categorie/${slug}`}
            key={slug}
            className="category-card"
            style={{ textDecoration: 'none' }}
          >
            <div className="category-card-img-wrapper">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="" loading="lazy" width={160} height={160} className="category-card-photo" />
              ) : (
                <span className="category-card-icon">
                  <Icon size={30} strokeWidth={1.75} />
                </span>
              )}
            </div>
            <div className="category-card-title">{facetLabel('category', slug)}</div>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(15, 23, 42, .75)', fontWeight: 600, paddingBottom: '0.75rem' }}>
              {count} artikelen
            </div>
          </Link>
        );
      })}
    </div>
  );
}
