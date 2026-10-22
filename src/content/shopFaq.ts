import { formatPrice, FREE_SHIPPING_FROM, SHIPPING_COST } from '@/lib/money';
import { SERVICE_SURCHARGE } from '@/lib/services';
import { SITE_CONFIG } from '@/config/site.config';

/*
 * The shop's own questions: ordering, paying, delivery, returns, services.
 * Every number comes from the constants the checkout charges, so an answer
 * here can never disagree with the basket.
 */
export const SHOP_FAQ: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: 'Bestellen en betalen',
    items: [
      { q: 'Hoe vind ik de juiste sleutel voor mijn auto?', a: 'Vul uw kenteken in bovenaan de webshop: wij zoeken merk en model op bij de RDW en tonen alleen wat past. U kunt ook zoeken op merk en model, of op de artikelcode. Twijfelt u, stuur dan een foto van uw sleutel via WhatsApp.' },
      { q: 'Hoe kan ik betalen?', a: 'Met iDEAL, Bancontact, creditcard of PayPal, via onze betaalprovider Mollie.' },
      { q: 'Zijn de prijzen inclusief btw?', a: 'Ja, alle prijzen in de webshop zijn inclusief 21% btw.' },
      { q: 'Wie is de verkoper?', a: `De webshop wordt geëxploiteerd door ${SITE_CONFIG.fullName}, KvK ${SITE_CONFIG.kvk}, ${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.postal} ${SITE_CONFIG.address.city}.` },
    ],
  },
  {
    group: 'Verzending en levering',
    items: [
      { q: 'Wat kost verzending?', a: `${formatPrice(SHIPPING_COST)} per bestelling. Vanaf ${formatPrice(FREE_SHIPPING_FROM)} verzenden wij gratis.` },
      { q: 'Hoe snel heb ik mijn bestelling?', a: 'Binnen 3–5 werkdagen, met track & trace.' },
      { q: 'Leveren jullie ook in België?', a: 'Op dit moment verzenden wij alleen binnen Nederland. België volgt binnenkort.' },
    ],
  },
  {
    group: 'Frezen, overzetten en monteur',
    items: [
      { q: 'Kunnen jullie mijn nieuwe sleutel frezen?', a: `Ja. Kies bij het artikel "Frezen op sleutelcode" (${formatPrice(SERVICE_SURCHARGE.cut_only)}) en geef uw kenteken op. Wij frezen de baard op de code van uw auto.` },
      { q: 'Kunnen jullie de elektronica van mijn oude sleutel overzetten?', a: `Ja. Kies "Elektronica overzetten" (${formatPrice(SERVICE_SURCHARGE.send_in)}). U stuurt uw oude sleutel op, wij zetten printplaat en transponder in de nieuwe behuizing en sturen hem terug.` },
      { q: 'Kan ik frezen én overzetten samen kiezen?', a: `Ja, dat zijn twee aparte diensten die u allebei kunt aanvinken (samen ${formatPrice(SERVICE_SURCHARGE.cut_and_send)}).` },
      { q: 'Kan een monteur de sleutel bij mij thuis maken en inleren?', a: `Ja. Kies "Monteur aan huis" (${formatPrice(SERVICE_SURCHARGE.mobile_tech)}). De monteur freest de sleutel en leert hem aan uw auto, bij u voor de deur.` },
    ],
  },
  {
    group: 'Retour en garantie',
    items: [
      { q: 'Kan ik mijn bestelling retourneren?', a: 'Ja, binnen 14 dagen na ontvangst, zonder opgaaf van reden, zolang het artikel ongebruikt is: uit de verpakking halen en bekijken mag. Een sleutel die is ingeleerd (of waarmee dat is geprobeerd), gefreesd, geopend of waarin elektronica is overgezet, kunnen wij niet opnieuw verkopen; dan krijgt u niets terug. Door ons gefreesd of ingeleerd is op maat gemaakt en valt buiten de bedenktijd.' },
      { q: 'Kunnen zakelijke klanten retourneren?', a: 'De wettelijke bedenktijd geldt alleen voor consumenten. Voor bestellingen door een bedrijf is herroeping uitgesloten; bij een defect product helpen wij u natuurlijk wel.' },
      { q: 'Wat als het onderdeel niet past?', a: 'Neem contact op via WhatsApp of e-mail met een foto. Ongebruikte en niet-gefreesde artikelen kunt u binnen 14 dagen retourneren.' },
    ],
  },
];
