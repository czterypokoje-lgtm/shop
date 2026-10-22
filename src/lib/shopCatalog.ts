import 'server-only';
import { PRODUCT_COPY } from '@/content/productCopy';
import { publicImage } from '@/lib/publicImage';
import { withBase } from '@/lib/base';
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  getProducts,
  getProductBySlug,
  shelfPrice,
  type Audience,
  type CatalogProduct,
} from '@/lib/catalog';

/**
 * The catalogue as the shop should actually show it: the supplier feed with the
 * office's decisions applied on top.
 *
 * `catalog.json` stays the base because it is an import — regenerating it must
 * not throw away a corrected price or a hidden product. The overrides live in
 * Postgres, keyed on slug, and are merged here so every consumer sees one
 * consistent product. Nobody should be reading the raw feed for display again.
 */

export interface ShopProduct extends CatalogProduct {
  /** What the customer pays, after any override. Null when it cannot be priced. */
  price: number | null;
  /** True when the office set the price by hand rather than the margin rule. */
  priceIsManual: boolean;
  inStock: boolean;
  stockQuantity: number | null;
  featured: boolean;
  /** For the <title> tag. Falls back to the on-page title when not set. */
  metaTitle: string;
  /** Extra photos beyond `image`, in display order. */
  images: string[];
  /** Specification rows, when the supplier's data yielded any. */
  specs: [string, string][];
}

interface OverrideRow {
  slug: string;
  published: boolean | null;
  price_override: number | string | null;
  cost_override: number | string | null;
  title_override: string | null;
  description_override: string | null;
  image_override: string | null;
  images: unknown;
  meta_title_override: string | null;
  meta_description_override: string | null;
  excerpt_override: string | null;
  direct_answer_override: string | null;
  track_stock: boolean;
  stock_quantity: number | string;
  featured: boolean;
}

/**
 * One fetch per request, shared by every component that asks.
 *
 * Deliberately not a long-lived cache: an office that changes a price expects
 * the shop to say so on the next reload, and this table is small enough that
 * the query is cheaper than explaining why it did not.
 */
/*
 * null means the read failed — distinct from "no overrides". Pages fall back to
 * the feed; checkout refuses (see overridesHealthy), because the feed alone
 * would sell products the office unpublished at a price it did not set.
 *
 * Read with the service key: the rows carry cost_override and internal notes,
 * which anon should not be able to select.
 */
const loadOverrides = cache(async (): Promise<Map<string, OverrideRow> | null> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.storage_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.storage_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null; // unreadable, not "no overrides": checkout must refuse

  try {
    const db = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const columns =
      'slug, published, price_override, cost_override, title_override, description_override, ' +
      'image_override, images, meta_title_override, meta_description_override, ' +
      'excerpt_override, direct_answer_override, track_stock, stock_quantity, featured';

    /*
     * Paginated, because PostgREST caps a response at 1000 rows by default.
     *
     * With more override rows than that, the unread tail silently behaved as if
     * it had no overrides at all — so products the office had hidden were still
     * on sale, and the shop listed two suppliers' catalogues side by side. A
     * cap that shows up as missing data rather than an error is worth spelling
     * out here.
     */
    const PAGE = 1000;
    const rows: OverrideRow[] = [];

    for (let from = 0; ; from += PAGE) {
      const { data, error } = await db
        .from('product_overrides')
        .select(columns)
        .range(from, from + PAGE - 1);

      if (error) return null;
      if (!data || data.length === 0) break;

      // The select list is built by concatenation, so supabase-js cannot infer
      // the row shape from it; OverrideRow above is the contract instead.
      rows.push(...(data as unknown as OverrideRow[]));
      if (data.length < PAGE) break;
    }

    return new Map(rows.map((row) => [row.slug, row]));
  } catch {
    return null;
  }
});

const overrides = async () => (await loadOverrides()) ?? new Map<string, OverrideRow>();

/** False when the override table could not be read; checkout must not sell then. */
export async function overridesHealthy(): Promise<boolean> {
  return (await loadOverrides()) !== null;
}

function merge(product: CatalogProduct, override: OverrideRow | undefined): ShopProduct {
  const cost =
    override?.cost_override !== null && override?.cost_override !== undefined
      ? Number(override.cost_override)
      : product.costPrice;

  const manual =
    override?.price_override !== null && override?.price_override !== undefined;

  const price = manual ? Number(override!.price_override) : shelfPrice(cost, product.marketPrice);

  const tracked = override?.track_stock === true;
  const quantity = tracked ? Number(override!.stock_quantity) : null;

  const title = override?.title_override ?? product.titleNl;

  return {
    ...product,
    costPrice: cost,
    titleNl: title,
    descriptionNl:
      override?.description_override ??
      (PRODUCT_COPY[product.supplierSlug ?? product.slug] ? `<p>${PRODUCT_COPY[product.supplierSlug ?? product.slug]}</p>\n${product.descriptionNl}` : product.descriptionNl),
    excerpt: override?.excerpt_override ?? product.excerpt,
    directAnswer: override?.direct_answer_override ?? product.directAnswer,
    metaDescriptionNl:
      override?.meta_description_override ?? product.metaDescriptionNl,
    // The feed has no separate meta title, so the on-page one is the fallback.
    metaTitle: override?.meta_title_override ?? title,
    // Shown paths carry the base (/webshop) once the shop lives under the main site.
    image: ((u) => (u ? withBase(u) : null))(publicImage(override?.image_override) ?? product.image),
    specs: product.specs ?? [],
    /*
     * The office's photo order wins when it set one; otherwise the supplier's
     * own gallery. This used to fall back to an empty array, so every product
     * nobody had touched showed a single photo and no gallery at all.
     */
    images: Array.isArray(override?.images) && (override!.images as unknown[]).length
      ? (override!.images as unknown[]).filter(
          (u): u is string => typeof u === 'string'
        ).map((u) => withBase(publicImage(u)!))
      : override?.image_override
        ? [withBase(publicImage(override.image_override)!)]
        : (product.images ?? []).map(withBase),
    price,
    priceIsManual: manual,
    // Untracked: whatever the supplier said at the last sync.
    inStock: tracked ? (quantity ?? 0) > 0 : product.inStock,
    stockQuantity: quantity,
    featured: override?.featured === true,
  };
}

/** Everything for sale to this audience. Products set to unpublished are gone. */
export async function getShopProducts(
  audience: Audience | 'all' = 'public'
): Promise<ShopProduct[]> {
  const map = await overrides();
  // Only what we can ship within 2-3 days: no listing, no page, for anything else.
  return getProducts(audience)
    .filter((p) => map.get(p.supplierSlug ?? p.slug)?.published !== false)
    .map((p) => merge(p, map.get(p.supplierSlug ?? p.slug)))
    // No price, no sale: a card saying "op aanvraag" with a buy button cannot be checked out.
    .filter((p) => p.inStock && p.price != null);
}

/**
 * One product. Returns null for an unpublished one, so a hidden product is a
 * 404 rather than a page that quietly still sells.
 */
export async function getShopProductBySlug(slug: string, internal = false): Promise<ShopProduct | null> {
  const base = getProductBySlug(slug, internal);
  if (!base) return null;

  const override = (await overrides()).get(base.supplierSlug ?? base.slug);
  if (override?.published === false) return null;

  const product = merge(base, override);
  return product.inStock ? product : null;
}
