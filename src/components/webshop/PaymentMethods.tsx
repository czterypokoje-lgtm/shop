import { withBase } from '@/lib/base';
import React from 'react';
import { PAYMENT_METHODS as METHODS } from '@/lib/payments';

/**
 * The payment methods a customer will actually be offered, and who delivers.
 *
 * Methods come from src/lib/payments.ts — the ones enabled on our Mollie
 * account — so a logo never promises a method checkout cannot take. Logos are
 * the official vector marks in public/images/logos.
 */

/** Who we hand the parcel to. Never list a carrier we do not actually ship with. */
export const CARRIERS = [
  { id: 'dhl', label: 'DHL' }, { id: 'postnl', label: 'PostNL' }, { id: 'ups', label: 'UPS' }, { id: 'gls', label: 'GLS' },
];

/* Official vector logos (public/images/logos); "creditcard" at Mollie is Visa and Mastercard. */
export const LOGOS: Record<string, { id: string; label: string }[]> = {
  ideal: [{ id: 'ideal', label: 'iDEAL' }],
  bancontact: [{ id: 'bancontact', label: 'Bancontact' }],
  creditcard: [{ id: 'visa', label: 'Visa' }, { id: 'mastercard', label: 'Mastercard' }],
  paypal: [{ id: 'paypal', label: 'PayPal' }],
};

const Tile = ({ id, label }: { id: string; label: string }) => (
  <li className="pay-tile" title={label}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={withBase(`/images/logos/${id}.svg`)} alt={label} loading="lazy" />
  </li>
);

export default function PaymentMethods({
  compact = false,
}: {
  /** In a sidebar or a footer column, where the row has to stay small. */
  compact?: boolean;
}) {
  const methods = METHODS.flatMap((m) => LOGOS[m.id] ?? []);
  return (
    <div className={`pay-strip${compact ? ' pay-strip--compact' : ''}`}>
      <div className="pay-strip-group">
        <span className="pay-strip-label">Veilig betalen met</span>
        <ul className="pay-strip-list">{methods.map((m) => <Tile key={m.id} {...m} />)}</ul>
      </div>
      <div className="pay-strip-group">
        <span className="pay-strip-label">Verzonden met</span>
        <ul className="pay-strip-list">{CARRIERS.map((c) => <Tile key={c.id} {...c} />)}</ul>
      </div>
    </div>
  );
}
