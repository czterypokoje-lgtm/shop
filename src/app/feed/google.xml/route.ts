import { SITE_CONFIG } from '@/config/site.config';
import { getShopProducts } from '@/lib/shopCatalog';
import { FREE_SHIPPING_FROM, SHIPPING_COST } from '@/lib/money';

/*
 * Product feed for Google Merchant Center (and any feed tool that reads the
 * Google format, e.g. Channable for Marktplaats Admarkt). Same products and
 * prices as the shop itself: getShopProducts already drops hidden, trade-only
 * and out-of-stock items.
 *
 * No gtin/mpn: these are aftermarket parts without a GTIN, and the article
 * code we show is our own, so identifier_exists is "no".
 */
export const revalidate = 3600;

const CATEGORY_NAME: Record<string, string> = {
  afstandsbedieningen: 'Afstandsbedieningen',
  behuizingen: 'Sleutelbehuizingen',
  transpondersleutels: 'Transpondersleutels',
  'smart-keys': 'Smart keys',
  'sleutels-zonder-chip': 'Sleutels zonder chip',
  printplaten: 'Printplaten',
  batterijen: 'Batterijen',
  noodsleutels: 'Noodsleutels',
  transponders: 'Transponders',
  sleutelbaarden: 'Sleutelbaarden',
  'universal-remotes': 'Universele afstandsbedieningen',
  motorsleutels: 'Motorsleutels',
  woningsleutels: 'Woningsleutels',
  accessoires: 'Accessoires',
  sloten: 'Sloten',
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const plain = (html: string) =>
  html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_CONFIG.origin}${path}`);

export async function GET() {
  const products = (await getShopProducts()).filter((p) => p.price && p.image);

  const items = products.map((p) => {
    const price = p.price!;
    const extra = p.images.filter((u) => u !== p.image).slice(0, 10);
    const tag = (name: string, value: string | number | null | undefined) =>
      value === null || value === undefined || value === '' ? '' : `<g:${name}>${esc(String(value))}</g:${name}>`;
    return [
      '<item>',
      tag('id', p.id),
      `<title>${esc(p.titleNl.slice(0, 150))}</title>`,
      `<description>${esc(plain(p.descriptionNl).slice(0, 5000))}</description>`,
      `<link>${esc(`${SITE_CONFIG.domain}/product/${p.urlSlug}`)}</link>`,
      tag('image_link', abs(p.image!)),
      ...extra.map((u) => tag('additional_image_link', abs(u))),
      tag('availability', 'in_stock'),
      tag('price', `${price.toFixed(2)} EUR`),
      tag('condition', 'new'),
      tag('brand', p.manufacturer ?? SITE_CONFIG.name),
      tag('identifier_exists', 'no'),
      tag('product_type', p.category ? CATEGORY_NAME[p.category] ?? p.category : null),
      tag('custom_label_0', p.category),
      tag('custom_label_1', p.makes[0] ?? null),
      `<g:shipping><g:country>NL</g:country><g:price>${(price >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST).toFixed(2)} EUR</g:price></g:shipping>`,
      '</item>',
    ].join('');
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel>
<title>${esc(SITE_CONFIG.name)} Webshop</title><link>${esc(SITE_CONFIG.domain)}</link><description>Autosleutels, behuizingen en onderdelen</description>
${items.join('\n')}
</channel></rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600' },
  });
}
