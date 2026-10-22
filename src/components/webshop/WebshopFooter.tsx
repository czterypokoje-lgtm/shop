import Link from 'next/link';
import { CARRIERS, LOGOS } from '@/components/webshop/PaymentMethods';
import ConsentPreferencesButton from '@/components/ConsentBanner/ConsentPreferencesButton';
import { SITE_CONFIG, WHATSAPP_URL } from '@/config/site.config';
import { PAYMENT_METHODS } from '@/lib/payments';
import { FREE_SHIPPING_FROM } from '@/lib/money';
import { withBase } from '@/lib/base';
import styles from './WebshopFooter.module.css';

/*
 * Dark footer: three promises on top (reachable, help choosing, rated), four
 * link/logo columns below. Every claim is one we can back: the 24/7 line is
 * SITE_CONFIG.hours, the rating is the real Google score, the logos are the
 * Mollie methods and carriers we actually use. Every link goes to a page that exists.
 */

const Icon = ({ d }: { d: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const PHONE = 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z';
const CAMERA = 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z';
const STAR = 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z';
const EURO = 'M18 7a7 7 0 1 0 0 10M4 10h10M4 14h10';
const TRUCK = 'M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z';
const INFO = 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01';

const Logo = ({ id, label }: { id: string; label: string }) => (
  <li className={styles.tile} title={label}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={withBase(`/images/logos/${id}.svg`)} alt={label} loading="lazy" />
  </li>
);

const SERVICE: [string, string][] = [
  ['/verzending-en-retour', 'Betaling & verzending'],
  ['/verzending-en-retour', 'Retourneren (14 dagen)'],
  ['/offerte', 'Prijsaanvraag'],
  ['/contact', 'Contact'],
  ['/account', 'Zakelijk inloggen'],
];
const COMPANY: [string, string][] = [
  ['/catalogus', 'Alle producten'],
  ['/merken', 'Merken'],
  ['/advies', 'Advies & uitleg'],
  ['/veelgestelde-vragen', 'Veelgestelde vragen'],
  ['/algemene-voorwaarden', 'Algemene voorwaarden'],
  ['/privacybeleid', 'Privacybeleid'],
  ['/cookiebeleid', 'Cookiebeleid'],
];

export default function WebshopFooter() {
  const payLogos = PAYMENT_METHODS.flatMap((m) => LOGOS[m.id] ?? []);
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <section>
            <h4 className={styles.head}><Icon d={PHONE} />Wij zijn er voor u</h4>
            <ul className={styles.contact}>
              <li>
                <span className={styles.dot} aria-hidden="true" />
                <div>
                  <a href={`tel:${SITE_CONFIG.phoneTel}`}>{SITE_CONFIG.phone}</a>
                  <small>{SITE_CONFIG.hoursShort}</small>
                </div>
              </li>
              <li>
                <span className={styles.dot} aria-hidden="true" />
                <div>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  <small>Stuur een foto, wij reageren snel</small>
                </div>
              </li>
              <li>
                <span className={styles.dot} aria-hidden="true" />
                <div>
                  <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
                  <small>Voor bestellingen en retouren</small>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h4 className={styles.head}><Icon d={CAMERA} />Twijfelt u welke sleutel?</h4>
            <div className={styles.promo}>
              <div className={styles.promoTile}>
                <strong>Foto</strong>
                <span>= juiste sleutel</span>
              </div>
              <div>
                <p>Stuur een foto van uw huidige sleutel via WhatsApp. Wij zoeken het juiste artikel voor u op, gratis en vrijblijvend.</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.outline}>Stuur een foto</a>
              </div>
            </div>
          </section>

          <section>
            <h4 className={styles.head}><Icon d={STAR} />Beoordeeld met {SITE_CONFIG.rating.replace('.', ',')} op Google</h4>
            <div className={styles.promo}>
              <div className={styles.badge}>
                <small>Google</small>
                <strong>{SITE_CONFIG.rating.replace('.', ',')}</strong>
                <span aria-hidden="true">★★★★★</span>
                <small>{SITE_CONFIG.reviewCount} reviews</small>
              </div>
              <div>
                <p>Onze klanten geven ons gemiddeld een <b>{SITE_CONFIG.rating.replace('.', ',')}</b>. Lees zelf wat zij over onze service zeggen.</p>
                <a href={SITE_CONFIG.social.google} target="_blank" rel="noopener noreferrer" className={styles.outline}>Lees de reviews</a>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.bottomGrid}>
          <section>
            <h4 className={styles.head}><Icon d={EURO} />Veilig betalen</h4>
            <ul className={styles.tiles}>{payLogos.map((l) => <Logo key={l.id} {...l} />)}</ul>
          </section>
          <section>
            <h4 className={styles.head}><Icon d={TRUCK} />Snel geleverd</h4>
            <ul className={styles.tiles}>{CARRIERS.map((c) => <Logo key={c.id} {...c} />)}</ul>
            <p className={styles.note}>3–5 werkdagen · gratis vanaf €{FREE_SHIPPING_FROM} · met track &amp; trace</p>
          </section>
          <section>
            <h4 className={styles.head}><Icon d={INFO} />Klantenservice</h4>
            <nav className={styles.links}>
              {SERVICE.map(([href, label]) => <Link key={label} href={href}>{label}</Link>)}
            </nav>
          </section>
          <section>
            <h4 className={styles.head}><Icon d={INFO} />Webshop</h4>
            <nav className={styles.links}>
              {COMPANY.map(([href, label]) => <Link key={label} href={href}>{label}</Link>)}
              <ConsentPreferencesButton className={styles.linkButton} />
            </nav>
          </section>
        </div>

        <div className={styles.legal}>
          <p>
            Deze webshop wordt geëxploiteerd door {SITE_CONFIG.fullName}, {SITE_CONFIG.address.street}, {SITE_CONFIG.address.postal} {SITE_CONFIG.address.city} (KvK {SITE_CONFIG.kvk}
            {SITE_CONFIG.btw ? ` · btw ${SITE_CONFIG.btw}` : ''}). De mobiele sleutelservice is van Autosleutel24 (KvK 42123555).
          </p>
          <p>Alle prijzen incl. btw · <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> · <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></p>
        </div>
      </div>
    </footer>
  );
}
