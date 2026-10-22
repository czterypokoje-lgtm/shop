import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage, { infoStyles as s } from '@/components/webshop/InfoPage';
import { SITE_CONFIG } from '@/config/site.config';

export const metadata: Metadata = {
  title: 'Betaalmethoden: iDEAL, Bancontact, creditcard, PayPal',
  description: 'Bij Autosleutel24 betaalt u veilig met iDEAL, Bancontact, creditcard of PayPal via Mollie. Alle prijzen zijn inclusief btw.',
  alternates: { canonical: `${SITE_CONFIG.domain}/betaalmethoden` },
};

const METHODS = [
  { name: 'iDEAL', text: 'Direct betalen via uw eigen bank. De meest gebruikte manier in Nederland.' },
  { name: 'Bancontact', text: 'Voor klanten met een Belgische bankrekening.' },
  { name: 'Creditcard', text: 'Visa en Mastercard, beveiligd met 3D Secure.' },
  { name: 'PayPal', text: 'Betalen met uw PayPal-account.' },
];

export default function PaymentPage() {
  return (
    <InfoPage crumb="Betaalmethoden" title="Betaalmethoden" lead="U betaalt veilig via Mollie, een Nederlandse betaalprovider. Wij zien of bewaren uw bank- of kaartgegevens nooit.">
      <h2>Zo kunt u betalen</h2>
      <ul>{METHODS.map((m) => <li key={m.name}><strong>{m.name}</strong>: {m.text}</li>)}</ul>
      <h2>Goed om te weten</h2>
      <ul>
        <li>Alle prijzen in de webshop zijn inclusief 21% btw.</li>
        <li>U betaalt bij het afronden van uw bestelling. Wij verzenden na ontvangst van de betaling.</li>
        <li>Mislukt de betaling? Dan wordt uw bestelling niet verwerkt en u kunt het opnieuw proberen.</li>
        <li>Achteraf betalen (Klarna) is op dit moment niet mogelijk.</li>
      </ul>
      <p className={s.tip}><strong>Zakelijke klant? </strong>Bekijk <Link href="/zakelijk-bestellen">zakelijk bestellen</Link> voor een factuur op naam van uw bedrijf.</p>
    </InfoPage>
  );
}
