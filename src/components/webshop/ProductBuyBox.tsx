'use client';
import { CORE_PROVINCES } from '@/lib/serviceArea';
import { PAYMENT_METHODS } from '@/lib/payments';
import { LOGOS } from '@/components/webshop/PaymentMethods';
import { withBase } from '@/lib/base';
import { formatPrice, FREE_SHIPPING_FROM, SHIPPING_COST } from '@/lib/money';
import React, { useState } from 'react';
import {
  addToCart,
  servicesFor,
  SERVICE_SURCHARGE,
  SERVICE_LABEL,
  SERVICE_DESCRIPTION,
  SERVICE_NEEDS,
  type ServiceOption,
} from '@/lib/cart';
import Link from 'next/link';
import { SITE_CONFIG, WHATSAPP_URL } from '@/config/site.config';
import styles from './ProductBuyBox.module.css';

/**
 * The note under the description depends on what the product is.
 *
 * A single hard-coded paragraph used to tell every visitor that "dit is alleen
 * een sleutelbehuizing en bevat geen interne elektronica, transponder of
 * batterij" — printed underneath complete remote keys, transponders and
 * circuit boards alike. On a complete key it is simply false, and it is the
 * one line that decides whether someone buys the part or not.
 */
const CATEGORY_NOTE: Record<string, string> = {
  behuizingen:
    'Dit is alleen een sleutelbehuizing en bevat geen interne elektronica, transponder of ' +
    'batterij. Zet de elektronica uit uw huidige afstandsbediening over in deze nieuwe ' +
    'behuizing voor een snelle reparatie.',
  printplaten:
    'Dit is alleen de printplaat (PCB). Behuizing en sleutelbaard zitten er niet bij; de ' +
    'plaat moet na montage op uw auto worden ingeleerd.',
  sleutelbaarden:
    'Dit is een ongefreesde sleutelbaard. Hij moet op uw slot worden gefreesd voordat ' +
    'hij past.',
  transponders:
    'Dit is een losse transponderchip zonder behuizing of afstandsbediening. De chip moet ' +
    'op uw auto worden ingeleerd.',
  noodsleutels:
    'Dit is een noodsleutel zonder elektronica: hij opent het portier, maar start de auto ' +
    'niet.',
  afstandsbedieningen:
    'Complete sleutel inclusief behuizing, elektronica en transponder. De sleutelbaard ' +
    'wordt op uw slot gefreesd en de sleutel wordt op uw auto ingeleerd.',
  'smart-keys':
    'Complete smart key inclusief elektronica en transponder. Moet op uw auto worden ' +
    'ingeleerd voordat hij werkt.',
  'universal-remotes':
    'Universele sleutel: hij wordt met een programmeertool (KeyDIY, Xhorse, Autel of IEA) ' +
    'op het gewenste voertuig gezet.',
};

export default function ProductBuyBox({ title, subtitle, brand, price, oldPrice, description, slug, category, inStock = true, rating = 0, reviewCount = 0 }: { title: string, subtitle?: string, brand?: string, price: number, oldPrice: number, description?: string, slug?: string, needsProgramming?: boolean, category?: string, inStock?: boolean, rating?: number, reviewCount?: number }) {
  const services = servicesFor(category);
  // Frezen and overzetten are two separate jobs (tick one or both); a technician visit does everything.
  const [cut, setCut] = useState(false);
  const [send, setSend] = useState(false);
  const [tech, setTech] = useState(false);
  const purchaseType: ServiceOption = tech ? 'mobile_tech' : cut && send ? 'cut_and_send' : cut ? 'cut_only' : send ? 'send_in' : 'product_only';
  const [added, setAdded] = useState(false);
  const [openPanel, setOpenPanel] = useState<'description' | null>('description');

  const handleAdd = () => {
    if (!slug || !inStock) return;
    addToCart(slug, purchaseType, { name: title, price, category, brand });
    setAdded(true);
  };

  // One place for the service fee: the basket and the checkout charge
  // SERVICE_SURCHARGE, so the number printed here is the number charged.
  const servicePriceTotal = price + SERVICE_SURCHARGE[purchaseType];
  const note = category ? CATEGORY_NOTE[category] : undefined;
  // A crossed-out price only when there genuinely is one to point at.
  const hasReference = purchaseType === 'product_only' && oldPrice > price;

  return (
    <div className={styles.box}>
      <div className={styles.head}>
        {brand && (
          <Link href={`/catalogus?manufacturer=${encodeURIComponent(brand)}`} className={styles.brand}>
            Alles van {brand}
          </Link>
        )}
        {reviewCount > 0 && (
          <a href="#reviews" className={styles.rating} aria-label={`${rating.toFixed(1).replace('.', ',')} van 5 sterren, ${reviewCount} reviews`}>
            <span className={styles.ratingStars} style={{ ['--fill' as string]: `${(rating / 5) * 100}%` }} aria-hidden="true">★★★★★</span>
            <span className={styles.ratingCount}>({reviewCount})</span>
          </a>
        )}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={`${styles.stock} ${inStock ? '' : styles.soldOut}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          {inStock ? <polyline points="20 6 9 17 4 12" /> : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>}
        </svg>
        {inStock ? 'Op voorraad · levertijd 3–5 werkdagen' : 'Uitverkocht'}
      </div>

      <hr className={styles.rule} />


      <div className={styles.priceRow}>
        <span className={styles.price}>{formatPrice(servicePriceTotal)}</span>
        {hasReference && <span className={styles.oldPrice}>{formatPrice(oldPrice)}</span>}
        <span className={styles.vat}>incl. btw</span>
      </div>

      {/* Offer and payment rows, the way the big shops list them under the price. Only real offers. */}
      <div className={styles.rows}>
        <div className={styles.row}>
          <svg className={styles.tag} width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.4 11.6 12.4 2.6A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7c0 .5.2 1 .6 1.4l9 9a2 2 0 0 0 2.8 0l7-7a2 2 0 0 0 0-2.8ZM6.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" /></svg>
          <span>
            {servicePriceTotal >= FREE_SHIPPING_FROM
              ? <><b className={styles.offer}>Gratis verzending</b> bij deze bestelling</>
              : <>Nog <b className={styles.offer}>{formatPrice(FREE_SHIPPING_FROM - servicePriceTotal)}</b> tot gratis verzending <span className={styles.shipNote}>(verzending {formatPrice(SHIPPING_COST)})</span></>}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.payLogos} aria-hidden="true">
            {PAYMENT_METHODS.flatMap((m) => LOGOS[m.id] ?? []).map((l) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={l.id} src={withBase(`/images/logos/${l.id}.svg`)} alt="" />
            ))}
          </span>
          <span>Veilig betalen met {PAYMENT_METHODS.map((m) => m.label).join(', ').replace(/, ([^,]*)$/, ' of $1')}</span>
        </div>
      </div>

      {services.length > 1 && (
        <div className={styles.services}>
          <h3 className={styles.h3}>Wat moeten wij ermee doen? <span className={styles.h3Sub}>(één of meer aanvinken)</span></h3>
          <div className={styles.serviceList}>
            {([
              ['cut_only', cut, (v: boolean) => { setCut(v); if (v) setTech(false); }],
              ['send_in', send, (v: boolean) => { setSend(v); if (v) setTech(false); }],
              ['mobile_tech', tech, (v: boolean) => { setTech(v); if (v) { setCut(false); setSend(false); } }],
            ] as [ServiceOption, boolean, (v: boolean) => void][])
              .filter(([option]) => services.includes(option))
              .map(([option, on, set]) => (
                <label key={option} className={`${styles.service} ${on ? styles.serviceChosen : ''}`}>
                  <input type="checkbox" checked={on} onChange={(e) => set(e.target.checked)} />
                  <span>
                    <span className={styles.serviceLabel}>{SERVICE_LABEL[option]}</span>
                    <span className={styles.serviceDesc}>{SERVICE_DESCRIPTION[option]}</span>
                  </span>
                  <span className={styles.serviceFee}>+ {formatPrice(SERVICE_SURCHARGE[option])}</span>
                </label>
              ))}
          </div>
          <p className={styles.serviceHint}>
            {purchaseType === 'product_only'
              ? 'Niets aangevinkt: u ontvangt alleen het artikel.'
              : purchaseType === 'cut_and_send'
                ? `Frezen + overzetten: + ${formatPrice(SERVICE_SURCHARGE.cut_and_send)}`
                : purchaseType === 'mobile_tech'
                  ? `Monteur aan huis in ${CORE_PROVINCES}. Elders in Nederland op afspraak.`
                  : null}
          </p>

          {(SERVICE_NEEDS[purchaseType].kenteken || SERVICE_NEEDS[purchaseType].oldKey) && (
            <p className={styles.notice}>
              {SERVICE_NEEDS[purchaseType].oldKey
                ? 'Wij vragen bij het afrekenen uw kenteken. Na uw bestelling ontvangt u het adres waar u uw oude sleutel naartoe stuurt — wij sturen hem binnen twee werkdagen na ontvangst terug.'
                : 'Wij vragen bij het afrekenen uw kenteken. Zonder eigendomsbewijs frezen of programmeren wij niet.'}
            </p>
          )}
        </div>
      )}

      <button id="buy-cta" type="button" className={styles.cta} disabled={!inStock} onClick={handleAdd}>
        {!inStock ? 'Uitverkocht' : added ? 'Toegevoegd ✓' : 'In winkelmand'}
      </button>
      {added && (
        <Link href="/winkelmand" className={styles.toCart}>
          Bekijk winkelmand en reken af →
        </Link>
      )}
      {!inStock && (
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.toCart}>
          Vraag via WhatsApp wanneer hij weer leverbaar is →
        </a>
      )}

      <div className={styles.panels}>
        <div className={styles.panel}>
          <button
            type="button"
            className={styles.panelToggle}
            onClick={() => setOpenPanel((c) => (c ? null : 'description'))}
            aria-expanded={openPanel === 'description'}
          >
            <h3 className={styles.panelTitle}>Beschrijving</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={openPanel ? styles.chevronOpen : ''} aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div hidden={openPanel !== 'description'} className={styles.panelBody}>
            {description ? (
              <div className="product-desc-cleaned" dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              <p>Geen beschrijving beschikbaar voor dit product.</p>
            )}
            {note && (
              <>
                <div className={styles.noteTitle}>Belangrijke informatie:</div>
                <p className={styles.noteText}>{note}</p>
              </>
            )}
          </div>
        </div>

        {/* Always visible: the reasons to buy from a small shop. Each one is in the terms. */}
        <div className={styles.panel}>
          <h3 className={styles.includesTitle}>Bij elke bestelling</h3>
          <ul className={styles.includes}>
            {[
              ['14 dagen bedenktijd', 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'],
              ['12 maanden garantie op elektronica', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
              ['Gratis hulp via WhatsApp bij het inleren', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
              ['Levertijd 3 - 5 werkdagen', 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8z'],
            ].map(([label, path]) => (
              <li key={label}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={path} /></svg>
                {label}
              </li>
            ))}
          </ul>
          <Link href="/verzending-en-retour" className={styles.policyLink}>Verzending, retour en garantie</Link>
        </div>
      </div>

      <div className={styles.expert}>
        <div className={styles.expertFace}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/autosleutel-bijmaken-utrecht-amsterdam-mobiel.webp")} alt="Berkan — expert autosleutels" width={64} height={64} />
          <span>Berkan</span>
        </div>
        <div>
          <h3 className={styles.h3}>Snel en gratis antwoord op je vragen</h3>
          <div className={styles.expertSub}>Expert hulp | Gevestigd in Nederland</div>
          <div className={styles.expertLinks}>
            <a href={`tel:${SITE_CONFIG.phoneTel}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              {SITE_CONFIG.phone}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
