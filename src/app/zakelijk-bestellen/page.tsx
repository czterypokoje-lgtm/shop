import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage, { infoStyles as s } from '@/components/webshop/InfoPage';
import { SITE_CONFIG, WHATSAPP_URL } from '@/config/site.config';

export const metadata: Metadata = {
  title: 'Zakelijk bestellen voor garages en sleutelmakers',
  description: 'Garage, sleutelmaker of autobedrijf? Bestel zakelijk bij Autosleutel24: vaste contactpersoon, prijs op aanvraag bij volume, factuur op bedrijfsnaam en artikelen buiten ons assortiment.',
  alternates: { canonical: `${SITE_CONFIG.domain}/zakelijk-bestellen` },
};

/*
 * Only what the office actually offers (agreed 22-10-2026): a quote for
 * volume, articles outside the shop, one contact person, and an invoice in
 * the company's name. No fixed discount percentage and no pay-later.
 */
export default function BusinessPage() {
  return (
    <InfoPage crumb="Zakelijk bestellen" title="Zakelijk bestellen" lead="Voor garages, sleutelmakers, autobedrijven en leasemaatschappijen die regelmatig sleutels, behuizingen of onderdelen nodig hebben.">
      <h2>Wat u krijgt als zakelijke klant</h2>
      <ul>
        <li><strong>Vaste contactpersoon:</strong> één aanspreekpunt via WhatsApp, telefoon of e-mail.</li>
        <li><strong>Prijs op aanvraag:</strong> bestelt u grotere aantallen of regelmatig? Vraag een offerte; wij maken een prijs op maat.</li>
        <li><strong>Artikelen buiten ons assortiment:</strong> staat een sleutel, printplaat of gereedschap niet in de webshop? Wij vragen het na bij onze leveranciers.</li>
        <li><strong>Factuur op bedrijfsnaam:</strong> met uw bedrijfsnaam, KvK-nummer en desgewenst uw eigen referentie, voor uw administratie.</li>
      </ul>
      <h2>Zo werkt het</h2>
      <ol className={s.steps}>
        <li><b>Stuur uw bedrijfsgegevens</b>Bedrijfsnaam, KvK-nummer, contactpersoon en wat u ongeveer bestelt, naar {SITE_CONFIG.email}.</li>
        <li><b>Wij nemen contact op</b>Uw vaste contactpersoon belt of mailt u zo snel mogelijk.</li>
        <li><b>Bestellen</b>Via de webshop, of stuur uw lijst per e-mail of WhatsApp en ontvang een offerte.</li>
      </ol>
      <p className={s.tip}><strong>Vakhandel: </strong>programmeerapparatuur, frezen, sleutelmachines en werkplaatsbenodigdheden vindt u onder <Link href="/categorie/accessoires">Vakhandel</Link>.</p>
      <p>
        <a className={s.wa} href={`mailto:${SITE_CONFIG.email}?subject=Zakelijk%20account%20aanvragen`}>Zakelijk account aanvragen</a>{' '}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">of via WhatsApp</a>
      </p>
    </InfoPage>
  );
}
