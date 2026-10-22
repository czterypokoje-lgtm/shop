import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage, { infoStyles as s } from '@/components/webshop/InfoPage';
import { SITE_CONFIG } from '@/config/site.config';
import { formatPrice, FREE_SHIPPING_FROM, SHIPPING_COST } from '@/lib/money';
import { SERVICE_SURCHARGE } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Hoe bestellen? In 4 stappen uw autosleutel',
  description: 'Zo bestelt u een autosleutel, behuizing of afstandsbediening bij Autosleutel24: zoeken op kenteken, dienst kiezen, betalen en levering in 3–5 werkdagen.',
  alternates: { canonical: `${SITE_CONFIG.domain}/bestellen` },
};

const STEPS = [
  { title: 'Zoek uw sleutel', text: 'Vul uw kenteken in bovenaan de webshop. Wij zoeken merk en model op bij de RDW en tonen wat past. U kunt ook zoeken op merk en model, of op de artikelcode van uw sleutel.' },
  { title: 'Controleer en kies een dienst', text: `Vergelijk het aantal knoppen en de sleutelbaard met uw huidige sleutel. Vink desgewenst aan: frezen op sleutelcode (${formatPrice(SERVICE_SURCHARGE.cut_only)}), elektronica overzetten (${formatPrice(SERVICE_SURCHARGE.send_in)}) of een monteur aan huis (${formatPrice(SERVICE_SURCHARGE.mobile_tech)}).` },
  { title: 'Afrekenen', text: 'Vul uw gegevens in en betaal met iDEAL, Bancontact, creditcard of PayPal. Voor frezen, overzetten of een monteur vragen wij uw kenteken. U ontvangt direct een bevestiging per e-mail.' },
  { title: 'Levering', text: `Binnen 3–5 werkdagen in huis, met track & trace. Verzending ${formatPrice(SHIPPING_COST)}, gratis vanaf ${formatPrice(FREE_SHIPPING_FROM)}. Bij een monteur aan huis bellen wij u om een afspraak te maken.` },
];

export default function OrderingPage() {
  const jsonLd = [{
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Een autosleutel bestellen bij Autosleutel24',
    step: STEPS.map((st, i) => ({ '@type': 'HowToStep', position: i + 1, name: st.title, text: st.text })),
  }];
  return (
    <InfoPage crumb="Bestellen" title="Hoe bestelt u bij Autosleutel24?" lead="In vier stappen van uw kenteken naar een sleutel die past. Zonder account; u bestelt als gast." jsonLd={jsonLd}>
      <h2>In 4 stappen</h2>
      <ol className={s.steps}>{STEPS.map((st) => <li key={st.title}><b>{st.title}</b>{st.text}</li>)}</ol>
      <h2>Na uw bestelling</h2>
      <ul>
        <li>U ontvangt een orderbevestiging met uw bestelnummer (bijv. AS24-26-ABC123).</li>
        <li>Zodra uw pakket onderweg is, krijgt u een e-mail met track &amp; trace.</li>
        <li>Heeft u &quot;Elektronica overzetten&quot; gekozen? Dan ontvangt u per e-mail het adres om uw oude sleutel naartoe te sturen.</li>
      </ul>
      <p className={s.tip}><strong>Tip: </strong>twijfelt u welke sleutel u nodig heeft? Lees <Link href="/advies/welke-autosleutel-heb-ik">Welke autosleutel heb ik?</Link> of stuur ons een foto via WhatsApp.</p>
      <h2>Meer informatie</h2>
      <ul>
        <li><Link href="/betaalmethoden">Betaalmethoden</Link></li>
        <li><Link href="/verzending-en-retour">Verzending, levertijd, retour en garantie</Link></li>
        <li><Link href="/zakelijk-bestellen">Zakelijk bestellen</Link></li>
        <li><Link href="/veelgestelde-vragen">Veelgestelde vragen</Link></li>
      </ul>
    </InfoPage>
  );
}
