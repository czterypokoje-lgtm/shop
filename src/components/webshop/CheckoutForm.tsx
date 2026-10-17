'use client';

import React, { useState, useSyncExternalStore, useCallback } from 'react';
import Link from 'next/link';
import styles from './CheckoutForm.module.css';
import {
  readCart,
  priceCart,
  CART_EVENT,
  SERVICE_LABEL,
  SERVICE_NEEDS,
} from '@/lib/cart';
import { formatPrice } from '@/lib/money';

type Slim = { slug: string; titleNl: string; price: number | null; image: string | null; category: string | null };

let cache: ReturnType<typeof readCart> = [];
let loaded = false;
function subscribe(cb: () => void) {
  const h = () => { cache = readCart(); loaded = true; cb(); };
  window.addEventListener(CART_EVENT, h);
  return () => window.removeEventListener(CART_EVENT, h);
}
function snapshot() { if (!loaded) { cache = readCart(); loaded = true; } return cache; }
/*
 * The same array every call. A fresh `[]` each time makes React think the
 * store changed on every render — the "getServerSnapshot should be cached"
 * loop, which on a phone reads as a page that never settles.
 */
const EMPTY: ReturnType<typeof readCart> = [];
const serverSnapshot = () => EMPTY;

/**
 * Checkout.
 *
 * Guest checkout only — in this category a customer buys about once a year, so
 * forcing an account before payment costs more orders than it saves.
 *
 * The totals shown here are recalculated on the server before the payment is
 * created; nothing the browser sends can change what is charged.
 */
export default function CheckoutForm({
  products,
  paymentStrip,
}: {
  products: Slim[];
  /** Rendered on the server — the icon list reads the filesystem. */
  paymentStrip?: React.ReactNode;
}) {
  const lines = useSyncExternalStore(subscribe, snapshot, serverSnapshot);

  const lookup = useCallback(
    (slug: string) => {
      const p = products.find((x) => x.slug === slug);
      return p ? { titleNl: p.titleNl, price: p.price, image: p.image, category: p.category } : undefined;
    },
    [products]
  );
  const totals = priceCart(lines, lookup);
  const needsTechnician = totals.lines.some((l) => l.service === 'mobile_tech');
  /*
   * Cutting a blade and programming a key both need the vehicle, and both are
   * refused without proof the car is the customer's. Read from the service
   * definition so a service added later cannot skip the question.
   */
  const needsKenteken = totals.lines.some((l) => SERVICE_NEEDS[l.service].kenteken);
  const needsOldKey = totals.lines.some((l) => SERVICE_NEEDS[l.service].oldKey);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lines,
          company: honeypot,
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          street: `${fd.get('street') ?? ''} ${fd.get('housenumber') ?? ''}`.trim(),
          postcode: fd.get('postcode'),
          city: fd.get('city'),
          kenteken: fd.get('kenteken'),
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? 'Er ging iets mis. Probeer het opnieuw.');
        setBusy(false);
        return;
      }
      if (json.checkoutUrl) {
        // The basket is cleared on /bedankt once Mollie says paid, so a
        // cancelled payment comes back to a full basket.
        window.location.href = json.checkoutUrl;
        return;
      }
      setError('De betaling kon niet worden gestart.');
      setBusy(false);
    } catch {
      setError('Netwerkfout. Controleer uw verbinding en probeer het opnieuw.');
      setBusy(false);
    }
  }

  if (!totals.lines.length) {
    return (
      <p className={styles.empty}>
        Uw winkelmand is leeg. <Link href="/catalogus">Naar de catalogus</Link>
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={styles.grid}>
      <div className={styles.card}>
        <h2 className={styles.h2}>Uw gegevens</h2>

        <label><span className={styles.label}>Naam *</span><input name="name" required autoComplete="name" className={styles.field} /></label>
        <label><span className={styles.label}>E-mailadres *</span><input name="email" type="email" required autoComplete="email" className={styles.field} /></label>
        <label><span className={styles.label}>Telefoonnummer</span><input name="phone" type="tel" autoComplete="tel" className={styles.field} /></label>

        <div className={styles.pair}>
          <label><span className={styles.label}>Postcode *</span><input name="postcode" required autoComplete="postal-code" placeholder="1011 AB" pattern="\s*[1-9][0-9]{3}\s?[a-zA-Z]{0,2}\s*" className={styles.field} /></label>
          <label><span className={styles.label}>Huisnummer *</span><input name="housenumber" required autoComplete="address-line2" inputMode="text" className={styles.field} /></label>
        </div>
        <label><span className={styles.label}>Straat *</span><input name="street" required autoComplete="address-line1" className={styles.field} /></label>
        <label><span className={styles.label}>Plaats *</span><input name="city" required autoComplete="address-level2" className={styles.field} /></label>

        {needsKenteken && (
          <div className={styles.warn}>
            <p>
              {needsTechnician
                ? 'U heeft gekozen voor een monteurbezoek. Wij hebben uw kenteken nodig om de juiste sleutel voor te bereiden.'
                : 'Voor frezen en overzetten hebben wij uw kenteken nodig — daarmee bepalen wij het juiste sleutelprofiel.'}
            </p>
            <label><span className={styles.label}>Kenteken *</span><input name="kenteken" required placeholder="XX-XXX-X" className={`${styles.field} ${styles.plate}`} /></label>
            <p className={styles.small}>
              Wij werken alleen aan een voertuig als u kunt aantonen dat het van u is. Onze
              monteur vraagt ter plaatse om een legitimatie; bij opsturen vragen wij een kopie
              van het kentekenbewijs.
            </p>
          </div>
        )}

        {needsOldKey && (
          <div className={styles.info}>
            <p>
              <strong>U stuurt uw oude sleutel naar ons op.</strong> Na uw betaling ontvangt u
              per e-mail het verzendadres en een korte instructie. Wij zetten de elektronica
              over, frezen de baard en sturen alles binnen twee werkdagen na ontvangst terug —
              verzekerd en met track &amp; trace.
            </p>
          </div>
        )}

        {/* Honeypot — hidden from people, tempting to bots. */}
        <input
          type="text" name="company" value={honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true"
          onChange={(e) => setHoneypot(e.target.value)}
          className={styles.honeypot}
        />

        <p className={styles.terms}>
          Door te bestellen gaat u akkoord met onze{' '}
          <Link href="/algemene-voorwaarden">algemene voorwaarden</Link> en{' '}
          <Link href="/privacybeleid">privacybeleid</Link>. U heeft 14 dagen
          herroepingsrecht (<Link href="/verzending-en-retour">retourneren</Link>).
        </p>
      </div>

      <aside className={`${styles.card} ${styles.summary}`}>
        <h2 className={styles.h2}>Uw bestelling</h2>

        <ul className={styles.lines}>
          {totals.lines.map((l) => (
            <li key={`${l.slug}-${l.service}`}>
              <span>
                {l.quantity}× {l.title}
                <span className={styles.service}>{SERVICE_LABEL[l.service]}</span>
              </span>
              <span className={styles.amount}>{formatPrice(l.lineTotal)}</span>
            </li>
          ))}
        </ul>

        <dl className={styles.totals}>
          <div><dt>Subtotaal</dt><dd>{formatPrice(totals.subtotalInc)}</dd></div>
          <div><dt>Verzending</dt><dd>{totals.shipping === 0 ? 'Gratis' : formatPrice(totals.shipping)}</dd></div>
          <div className={styles.grand}><dt>Totaal</dt><dd>{formatPrice(totals.totalInc)}</dd></div>
          <div className={styles.vat}><dt>waarvan btw (21%)</dt><dd>{formatPrice(totals.totalVat)}</dd></div>
        </dl>

        {error && <p role="alert" className={styles.error}>{error}</p>}

        {/* BW 6:230v lid 3: the button must say that ordering means paying. */}
        <button type="submit" disabled={busy} className={styles.submit}>
          {busy ? 'Bezig…' : 'Bestellen en betalen'}
        </button>

        <div className={styles.payments}>{paymentStrip}</div>
      </aside>
    </form>
  );
}
