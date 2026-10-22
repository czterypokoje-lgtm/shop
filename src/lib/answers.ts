import type { ShopProduct } from '@/lib/shopCatalog';
import { formatPrice, FREE_SHIPPING_FROM, SHIPPING_COST } from '@/lib/money';
import { SERVICE_SURCHARGE, servicesFor } from '@/lib/services';

/*
 * A complete, plain answer for every product, built from its own data.
 *
 * Search engines and AI assistants quote the page that answers the question
 * in its first sentences. The supplier gave us "Sleutelbehuizing voor 2
 * Mazda-modellen." — true, and useless to someone asking whether it fits their
 * Mazda 6. Everything here comes from the product's fitment, specs and
 * category; nothing is promised that the data does not say.
 */

export interface ProductAnswer {
  /** Two or three sentences: what it is, what it fits, what happens next. */
  summary: string;
  faq: { q: string; a: string }[];
}

const realYear = (y: number) => y > 1950 && y < 2100;

/** "Mazda 2 (2007–2011), Mazda 6 (2007–2010) en 4 andere modellen". */
export function fitsList(fitment: ShopProduct['fitment'], max = 6): string {
  const byModel = new Map<string, { from: number; to: number }>();
  for (const f of fitment) {
    const key = `${f.make} ${f.model}`.trim();
    const cur = byModel.get(key);
    byModel.set(key, cur ? { from: Math.min(cur.from, f.from), to: Math.max(cur.to, f.to) } : { from: f.from, to: f.to });
  }
  const items = [...byModel.entries()].map(([name, y]) =>
    realYear(y.from) ? `${name} (${y.from}–${realYear(y.to) ? y.to : 'heden'})` : name
  );
  if (items.length <= max) return items.length > 1 ? `${items.slice(0, -1).join(', ')} en ${items.at(-1)}` : items[0] ?? '';
  return `${items.slice(0, max).join(', ')} en ${items.length - max} andere modellen`;
}

const spec = (p: ShopProduct, label: string) => p.specs.find(([l]) => l === label)?.[1];

export function productAnswer(p: ShopProduct, batteryTitle?: string | null): ProductAnswer {
  const buttons = spec(p, 'Aantal knoppen');
  const blade = p.blade ?? spec(p, 'Sleutelbaard') ?? spec(p, 'Sleutelrohling');
  const freq = p.frequency;
  const chip = p.chip;
  const fits = p.fitment.length ? fitsList(p.fitment) : p.makes.join(', ');
  const knoppen = buttons ? ` met ${buttons} ${buttons === '1' ? 'knop' : 'knoppen'}` : '';
  const forCar = fits ? ` voor ${fits}` : '';
  const services = servicesFor(p.category);

  let what: string;
  let programming: string | null;
  switch (p.category) {
    case 'behuizingen':
      what = `Lege sleutelbehuizing${knoppen}${forCar}${blade ? `, met ongefreesde baard (${blade})` : ''}.`;
      programming = 'U zet de printplaat, de batterij en de transponder van uw oude sleutel over. Omdat u uw eigen elektronica houdt, hoeft de auto de sleutel niet opnieuw te leren.';
      break;
    case 'afstandsbedieningen':
      what = `Complete afstandsbediening${knoppen}${forCar}${freq ? `, ${freq}` : ''}${chip ? `, transponder ${chip}` : ''}.`;
      programming = 'Een nieuwe afstandsbediening moet worden gefreesd en met diagnoseapparatuur aan de auto worden ingeleerd. Zonder inleren opent en start hij de auto niet.';
      break;
    case 'smart-keys':
      what = `Smart key (keyless)${knoppen}${forCar}${freq ? `, ${freq}` : ''}${chip ? `, transponder ${chip}` : ''}.`;
      programming = 'Een smart key moet met diagnoseapparatuur aan de auto worden ingeleerd. De noodsleutel erin wordt op uw sleutelcode gefreesd.';
      break;
    case 'transpondersleutels':
      what = `Sleutel met transponder${chip ? ` (${chip})` : ''}${forCar}${blade ? `, baard ${blade}` : ''}.`;
      programming = 'De sleutel wordt gefreesd en de transponder wordt aan de startonderbreker van de auto geleerd. Pas daarna start de auto.';
      break;
    case 'sleutels-zonder-chip':
    case 'motorsleutels':
      what = `Sleutel zonder chip${forCar}${blade ? `, baard ${blade}` : ''}.`;
      programming = 'Deze sleutel hoeft niet geprogrammeerd te worden: na het frezen op uw sleutelcode werkt hij direct. Alleen geschikt voor voertuigen zonder startonderbreker.';
      break;
    case 'noodsleutels':
      what = `Noodsleutel (insteeksleutel)${forCar}${blade ? `, baard ${blade}` : ''}.`;
      programming = 'Een noodsleutel opent het portier als de batterij van uw smart key leeg is. Hij start de auto niet en hoeft niet ingeleerd te worden; wel gefreesd.';
      break;
    case 'printplaten':
      what = `Losse printplaat (elektronica)${knoppen}${forCar}${freq ? `, ${freq}` : ''}.`;
      programming = 'Een nieuwe printplaat moet aan de auto worden ingeleerd. Past in de bijbehorende behuizing.';
      break;
    case 'sleutelbaarden':
      what = `Ongefreesde sleutelbaard${blade ? ` ${blade}` : ''}${forCar}, voor een klapsleutel.`;
      programming = 'De baard wordt op uw sleutelcode gefreesd en in uw klapsleutel gezet. Programmeren is niet nodig.';
      break;
    case 'batterijen':
      what = `${p.titleNl}.`;
      programming = 'Neem altijd hetzelfde type als de oude batterij; het staat erop gedrukt. Na het vervangen hoeft de sleutel bij de meeste auto\'s niet opnieuw ingeleerd te worden.';
      break;
    default:
      what = `${p.titleNl}.`;
      programming = null;
  }

  const summary = [what, programming].filter(Boolean).join(' ');
  const price = p.price != null ? formatPrice(p.price) : null;
  const shipping = p.price != null && p.price >= FREE_SHIPPING_FROM ? 'gratis verzending' : `verzending ${formatPrice(SHIPPING_COST)} (gratis vanaf ${formatPrice(FREE_SHIPPING_FROM)})`;

  const faq: ProductAnswer['faq'] = [];
  const firstCar = p.fitment[0] ? `${p.fitment[0].make} ${p.fitment[0].model}`.trim() : p.makes[0];
  if (fits) {
    faq.push({
      q: `Past dit op mijn ${firstCar ?? 'auto'}?`,
      a: `Volgens de gegevens van de fabrikant past dit artikel op: ${fitsList(p.fitment, 30) || fits}.${buttons ? ` Controleer ook het aantal knoppen (${buttons})` : ''}${blade ? `${buttons ? ' en' : ' Controleer ook'} de sleutelbaard (${blade})` : ''}${buttons || blade ? '.' : ''} Twijfelt u? Zoek op kenteken of stuur een foto van uw sleutel via WhatsApp.`,
    });
  }
  if (programming) faq.push({ q: 'Moet ik de sleutel laten programmeren of inleren?', a: programming });
  if (services.includes('cut_only')) {
    faq.push({
      q: 'Kunnen jullie de sleutel frezen?',
      a: `Ja. Kies bij het bestellen "Frezen op sleutelcode" (${formatPrice(SERVICE_SURCHARGE.cut_only)}). U geeft uw kenteken op, wij frezen de baard op de code van uw auto.`,
    });
  }
  if (services.includes('send_in')) {
    faq.push({
      q: 'Kunnen jullie de elektronica van mijn oude sleutel overzetten?',
      a: `Ja. Kies "Elektronica overzetten" (${formatPrice(SERVICE_SURCHARGE.send_in)}). U stuurt uw oude sleutel op, wij zetten printplaat en transponder over en sturen hem terug.`,
    });
  }
  if (services.includes('mobile_tech')) {
    faq.push({
      q: 'Kan een monteur het bij mij thuis doen?',
      a: `Ja. Met "Monteur aan huis" (${formatPrice(SERVICE_SURCHARGE.mobile_tech)}) komt een monteur langs om de sleutel te frezen en in te leren.`,
    });
  }
  if (batteryTitle) faq.push({ q: 'Welke batterij zit erin?', a: `${batteryTitle}. U kunt hem bij deze sleutel meebestellen.` });
  if (freq) faq.push({ q: 'Op welke frequentie werkt deze sleutel?', a: `${freq}. De frequentie moet overeenkomen met die van uw auto; die van uw huidige sleutel staat vaak op de printplaat.` });
  if (price) {
    faq.push({
      q: 'Wat kost het en wanneer heb ik het?',
      a: `${price} inclusief btw, ${shipping}. ${p.inStock ? 'Op voorraad, levertijd 3–5 werkdagen' : 'Op dit moment niet op voorraad'}. U heeft 14 dagen bedenktijd, zolang het artikel ongebruikt is (niet ingeleerd, gefreesd of geopend).`,
    });
  }
  return { summary, faq };
}
