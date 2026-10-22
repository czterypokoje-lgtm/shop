import { getShopProducts } from '@/lib/shopCatalog';
import { isConsumerProduct } from '@/lib/focus';
import { modelPages } from '@/lib/models';
import { ADVIES } from '@/content/advies';
import { SHOP_FAQ } from '@/content/shopFaq';
import { facetLabel } from '@/lib/catalog';
import { formatPrice, FREE_SHIPPING_FROM, SHIPPING_COST } from '@/lib/money';
import { SERVICE_SURCHARGE } from '@/lib/services';
import { SITE_CONFIG } from '@/config/site.config';
import { slugify } from '@/lib/utils';

/*
 * llms.txt (llmstxt.org): a plain summary for AI assistants of what this shop
 * sells, for which cars, at what price, and where each answer lives. Built
 * from the same catalogue and constants as the pages, so it cannot go stale.
 */
export const revalidate = 86400;

export async function GET() {
  const base = SITE_CONFIG.domain;
  const products = (await getShopProducts()).filter(isConsumerProduct);
  const byCategory = new Map<string, number[]>();
  for (const p of products) {
    if (!p.category || p.price == null) continue;
    byCategory.set(p.category, [...(byCategory.get(p.category) ?? []), p.price]);
  }
  const makes = new Map<string, number>();
  for (const m of modelPages(products)) makes.set(m.make, (makes.get(m.make) ?? 0) + 1);

  const lines = [
    `# ${SITE_CONFIG.name} Webshop`,
    '',
    `> Webshop voor autosleutels, sleutelbehuizingen, afstandsbedieningen, smart keys, printplaten en sleutelbatterijen, voor autobezitters in Nederland. Prijzen incl. btw. Levering in 3–5 werkdagen, verzending ${formatPrice(SHIPPING_COST)}, gratis vanaf ${formatPrice(FREE_SHIPPING_FROM)}. Optioneel: frezen op sleutelcode (${formatPrice(SERVICE_SURCHARGE.cut_only)}), elektronica overzetten (${formatPrice(SERVICE_SURCHARGE.send_in)}) of een monteur aan huis die de sleutel freest en inleert (${formatPrice(SERVICE_SURCHARGE.mobile_tech)}). Verkoper: ${SITE_CONFIG.fullName}, KvK ${SITE_CONFIG.kvk}, ${SITE_CONFIG.address.city}.`,
    '',
    '## Zoeken',
    `- [Zoek op kenteken, merk/model of artikelcode](${base}/): kenteken wordt via de RDW omgezet naar merk en model`,
    `- [Alle merken](${base}/merken)`,
    '',
    '## Categorieën',
    ...[...byCategory.entries()]
      .sort((a, b) => b[1].length - a[1].length)
      .map(([c, prices]) => `- [${facetLabel('category', c)}](${base}/categorie/${c}): ${prices.length} artikelen, vanaf ${formatPrice(Math.min(...prices))}`),
    '',
    '## Sleutels per merk en model',
    ...[...makes.entries()].sort((a, b) => b[1] - a[1]).map(([make, n]) => `- [${make}](${base}/merk/${slugify(make)}): ${n} modelpagina's`),
    '',
    '## Advies',
    ...ADVIES.map((a) => `- [${a.title}](${base}/advies/${a.slug}): ${a.description}`),
    '',
    '## Veelgestelde vragen',
    `- [Alle vragen en antwoorden](${base}/veelgestelde-vragen)`,
    ...SHOP_FAQ.flatMap((g) => g.items).map((f) => `- ${f.q} ${f.a}`),
    '',
    '## Service',
    `- [Hoe bestellen](${base}/bestellen)`,
    `- [Betaalmethoden](${base}/betaalmethoden): iDEAL, Bancontact, creditcard, PayPal`,
    `- [Verzending, retour en garantie](${base}/verzending-en-retour)`,
    `- [Zakelijk bestellen](${base}/zakelijk-bestellen): garages en sleutelmakers, prijs op aanvraag, factuur op bedrijfsnaam`,
    `- [Over ons](${base}/over-ons)`,
    `- [Contact](${base}/contact): ${SITE_CONFIG.phone}, ${SITE_CONFIG.email}, WhatsApp`,
    `- Sleutelservice aan huis (spoed, alle sleutels kwijt): https://www.autosleutel24.nl`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
