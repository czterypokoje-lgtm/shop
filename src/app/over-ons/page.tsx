import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage from '@/components/webshop/InfoPage';
import { SITE_CONFIG } from '@/config/site.config';
import { CORE_PROVINCES } from '@/lib/serviceArea';

export const metadata: Metadata = {
  title: 'Over ons',
  description: 'Autosleutel24: monteurs die dagelijks autosleutels maken en inleren, en een webshop voor wie het onderdeel zelf wil bestellen.',
  alternates: { canonical: `${SITE_CONFIG.domain}/over-ons` },
};

export default function AboutPage() {
  const a = SITE_CONFIG.address;
  return (
    <InfoPage crumb="Over ons" title="Over Autosleutel24" lead="Wij maken en programmeren autosleutels, elke dag, bij klanten voor de deur. Deze webshop is er voor wie alleen het onderdeel nodig heeft.">
      <h2>Wie zijn wij?</h2>
      <p>Autosleutel24 begon als mobiele sleutelservice: onze monteurs komen met een servicewagen naar de klant, frezen de sleutel ter plekke en leren hem aan de auto. In de webshop vindt u dezelfde onderdelen die wij zelf gebruiken: behuizingen, afstandsbedieningen, smart keys, printplaten en batterijen.</p>
      <h2>Waarom bij ons bestellen?</h2>
      <ul>
        <li>Wij weten welke sleutel past: zoek op kenteken, of stuur een foto en wij zoeken het voor u op.</li>
        <li>Frezen, elektronica overzetten of een monteur aan huis: u kiest zelf hoeveel u uit handen geeft.</li>
        <li>Monteur aan huis in {CORE_PROVINCES}; elders in Nederland op afspraak.</li>
        <li>Duidelijke prijzen inclusief btw, levering in 3–5 werkdagen, 14 dagen bedenktijd.</li>
      </ul>
      <h2>Bedrijfsgegevens</h2>
      <ul>
        <li>De webshop wordt geëxploiteerd door {SITE_CONFIG.fullName}</li>
        <li>KvK {SITE_CONFIG.kvk}</li>
        <li>{a.street}, {a.postal} {a.city}</li>
        <li>{SITE_CONFIG.email} · {SITE_CONFIG.phone}</li>
      </ul>
      <p>Op zoek naar een monteur die vandaag komt? Bekijk onze <a href="https://www.autosleutel24.nl">sleutelservice aan huis</a>. Of lees eerst ons <Link href="/advies">advies over autosleutels</Link>.</p>
    </InfoPage>
  );
}
