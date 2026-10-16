'use client';

import { useActionState } from 'react';
import { requestQuote, type QuoteState } from '@/app/offerte/actions';
import { SITE_CONFIG, WHATSAPP_URL } from '@/config/site.config';
import styles from './QuoteRequest.module.css';

const NEEDS = ['Autosleutel met afstandsbediening', 'Sleutelbehuizing', 'Smart key / keyless', 'Reservesleutel zonder knoppen', 'Weet ik niet — adviseer mij'];

/** For the car or part the webshop doesn't list: the office answers with a price. */
export default function QuoteRequest({ make = '', model = '', title = 'Niet gevonden? Wij zoeken het voor u.' }: { make?: string; model?: string; title?: string }) {
  const [state, action, pending] = useActionState<QuoteState, FormData>(requestQuote, { ok: false });
  const wa = `${WHATSAPP_URL}?text=${encodeURIComponent(`Hallo, ik zoek een sleutel voor mijn ${[make, model].filter(Boolean).join(' ') || 'auto'}.`)}`;

  if (state.ok) {
    return (
      <div className={styles.box} role="status">
        <h2 className={styles.title}>Aanvraag ontvangen</h2>
        <p>Wij zoeken de juiste sleutel op en sturen u binnen één werkdag een prijs. Haast? Bel {SITE_CONFIG.phone}.</p>
      </div>
    );
  }

  return (
    <form action={action} className={styles.box}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.lead}>Niet alles staat online. Laat uw auto achter, dan krijgt u binnen één werkdag een prijs — vrijblijvend.</p>
      <div className={styles.grid}>
        <label>Merk<input name="make" defaultValue={make} autoComplete="off" /></label>
        <label>Model<input name="model" defaultValue={model} autoComplete="off" /></label>
        <label>Bouwjaar<input name="year" inputMode="numeric" maxLength={4} placeholder="2015" /></label>
        <label>Kenteken<input name="kenteken" autoCapitalize="characters" placeholder="AB-123-C" /></label>
      </div>
      <label>Wat zoekt u?
        <select name="need" defaultValue={NEEDS[0]}>{NEEDS.map((n) => <option key={n}>{n}</option>)}</select>
      </label>
      <label>Toelichting (optioneel)<textarea name="note" rows={3} placeholder="Bijv. aantal knoppen, sleutel kwijt of kapot" /></label>
      <div className={styles.grid}>
        <label>Naam *<input name="name" required autoComplete="name" /></label>
        <label>Telefoon<input name="phone" type="tel" autoComplete="tel" /></label>
        <label className={styles.wide}>E-mail<input name="email" type="email" autoComplete="email" /></label>
      </div>
      <input name="company" tabIndex={-1} autoComplete="off" className={styles.hp} aria-hidden="true" />
      {state.error && <p className={styles.error} role="alert">{state.error}</p>}
      <button className={styles.send} disabled={pending}>{pending ? 'Versturen…' : 'Vraag een prijs aan'}</button>
      <a className={styles.wa} href={wa} target="_blank" rel="noopener noreferrer">Of stuur het via WhatsApp</a>
    </form>
  );
}
