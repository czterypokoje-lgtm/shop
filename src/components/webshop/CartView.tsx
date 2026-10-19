'use client';

import React, { useSyncExternalStore, useCallback, useEffect } from 'react';
import Link from 'next/link';
import styles from './CartView.module.css';
import {
  readCart, pruneCart, setQuantity, removeLine, priceCart,
  CART_EVENT, SERVICE_LABEL, type ServiceOption,
} from '@/lib/cart';
import { formatPrice, FREE_SHIPPING_FROM } from '@/lib/money';
import { track, tagSession } from '@/lib/track';

/**
 * Basket contents.
 *
 * The catalogue is passed in from the server as a slim lookup rather than
 * imported here, so the 2 MB catalogue never reaches the browser bundle.
 */

type Slim = { slug: string; titleNl: string; price: number | null; image: string | null; category: string | null };

let cache: ReturnType<typeof readCart> = [];
let loaded = false;

function subscribe(cb: () => void) {
  const h = () => { cache = readCart(); loaded = true; cb(); };
  window.addEventListener(CART_EVENT, h);
  return () => window.removeEventListener(CART_EVENT, h);
}
function snapshot() {
  if (!loaded) { cache = readCart(); loaded = true; }
  return cache;
}
/*
 * localStorage does not exist during SSR, so the basket is read through an
 * external store rather than an effect + setState.
 *
 * The server snapshot has to be the *same* array every call. Returning a
 * fresh `[]` makes React compare two different references, decide the store
 * changed, and render again — "The result of getServerSnapshot should be
 * cached to avoid an infinite loop", which on a phone shows up as a page that
 * never settles and buttons that do not respond.
 */
const EMPTY: ReturnType<typeof readCart> = [];
const serverSnapshot = () => EMPTY;

export default function CartView({ products }: { products: Slim[] }) {
  const lines = useSyncExternalStore(subscribe, snapshot, serverSnapshot);

  // Lines for products that are gone would count in the badge but never show here.
  useEffect(() => pruneCart((slug) => products.some((x) => x.slug === slug)), [products]);

  const lookup = useCallback(
    (slug: string) => {
      const p = products.find((x) => x.slug === slug);
      return p
        ? { titleNl: p.titleNl, price: p.price, image: p.image, category: p.category }
        : undefined;
    },
    [products]
  );

  const totals = priceCart(lines, lookup);
  const shown = totals.lines.length;
  useEffect(() => {
    if (shown) { track('view_cart', { value: totals.totalInc, items: totals.lines.map((l) => ({ item_id: l.slug, item_name: l.title, item_variant: l.service, quantity: l.quantity, price: Math.round((l.lineTotal / l.quantity) * 100) / 100 })) }); tagSession('step', 'cart'); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  if (!totals.lines.length) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>Uw winkelmand is leeg</p>
        <p className={styles.emptyText}>Zoek het onderdeel dat op uw auto past — filter op automerk of zoek op artikelcode.</p>
        <Link href="/catalogus" className={styles.primary}>Naar de catalogus</Link>
      </div>
    );
  }

  const toGo = Math.max(0, FREE_SHIPPING_FROM - totals.subtotalInc);
  const progress = Math.min(100, Math.round((totals.subtotalInc / FREE_SHIPPING_FROM) * 100));

  return (
    <div className={styles.grid}>
      <ul className={styles.lines}>
        {totals.lines.map((l) => (
          <li key={`${l.slug}-${l.service}`} className={styles.line}>
            <div className={styles.thumb}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {l.image && <img src={l.image} alt="" width={78} height={78} />}
            </div>

            <div className={styles.body}>
              <Link href={`/product/${l.slug}`} className={styles.name}>{l.title}</Link>
              <div className={styles.service}>
                {SERVICE_LABEL[l.service]}
                {l.serviceSurcharge > 0 && ` — ${formatPrice(l.serviceSurcharge)}`}
              </div>

              {l.requiresProgramming && l.service === 'product_only' && (
                <div className={styles.warn}>
                  Let op: deze sleutel moet nog op uw auto worden ingeleerd. Zonder programmering
                  opent hij wel, maar start de auto niet.{' '}
                  <Link href={`/product/${l.slug}`}>Laat het ons doen</Link>
                </div>
              )}

              <div className={styles.controls}>
                <label>
                  Aantal{' '}
                  <select
                    value={l.quantity}
                    onChange={(e) => setQuantity(l.slug, l.service as ServiceOption, Number(e.target.value))}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </label>
                <button type="button" className={styles.remove} onClick={() => removeLine(l.slug, l.service as ServiceOption)}>
                  Verwijderen
                </button>
              </div>
            </div>

            <div className={styles.lineTotal}>{formatPrice(l.lineTotal)}</div>
          </li>
        ))}
      </ul>

      <aside className={styles.summary}>
        <h2 className={styles.h2}>Overzicht</h2>

        <div className={styles.freeShip}>
          <div className={styles.bar} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Voortgang gratis verzending">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>{toGo > 0 ? <>Nog <strong>{formatPrice(toGo)}</strong> tot gratis verzending</> : <strong>U krijgt gratis verzending</strong>}</p>
        </div>

        <dl className={styles.totals}>
          <div><dt>Subtotaal</dt><dd>{formatPrice(totals.subtotalInc)}</dd></div>
          <div><dt>Verzending</dt><dd>{totals.shipping === 0 ? 'Gratis' : formatPrice(totals.shipping)}</dd></div>
          <div className={styles.grand}><dt>Totaal</dt><dd>{formatPrice(totals.totalInc)}</dd></div>
          <div className={styles.vat}><dt>waarvan btw (21%)</dt><dd>{formatPrice(totals.totalVat)}</dd></div>
        </dl>

        <Link href="/afrekenen" className={styles.primary}>Afrekenen</Link>
        <Link href="/catalogus" className={styles.secondary}>Verder winkelen</Link>
      </aside>
    </div>
  );
}
