import Link from 'next/link';
import PaymentMethods from '@/components/webshop/PaymentMethods';
import ConsentPreferencesButton from '@/components/ConsentBanner/ConsentPreferencesButton';
import { SITE_CONFIG, WHATSAPP_URL } from '@/config/site.config';
import styles from './WebshopFooter.module.css';

/** Every link here goes to a page that exists. */
const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Webshop',
    links: [
      ['/catalogus', 'Alle producten'],
      ['/merken', 'Merken'],
      ['/aanbiedingen', 'Aanbiedingen'],
      ['/winkelmand', 'Winkelmand'],
    ],
  },
  {
    title: 'Klantenservice',
    links: [
      ['/offerte', 'Prijsaanvraag'],
      ['/contact', 'Contact'],
      ['/verzending-en-retour', 'Verzending en levertijd'],
      ['/verzending-en-retour', 'Retourneren (14 dagen)'],
      ['/account', 'Zakelijk inloggen'],
    ],
  },
  {
    title: 'Juridisch',
    links: [
      ['/algemene-voorwaarden', 'Algemene voorwaarden'],
      ['/privacybeleid', 'Privacybeleid'],
      ['/cookiebeleid', 'Cookiebeleid'],
    ],
  },
];

export default function WebshopFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          {COLUMNS.map((col) => (
            <div key={col.title} className={styles.col}>
              <h4 className={styles.heading}>{col.title}</h4>
              {col.links.map(([href, label]) => (
                <Link key={label} href={href} className={styles.link}>{label}</Link>
              ))}
              {col.title === 'Juridisch' && <ConsentPreferencesButton className={styles.linkButton} />}
            </div>
          ))}
        </div>

        <div className={styles.help}>
          <h4 className={styles.helpTitle}>Hulp nodig?</h4>
          <p className={styles.helpText}>
            Stuur een foto van uw sleutel — wij zoeken het juiste artikel voor u.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.helpCta}>WhatsApp ons</a>
          <a href={`tel:${SITE_CONFIG.phoneTel}`} className={styles.helpPhone}>{SITE_CONFIG.phone}</a>
          <div className={styles.social}>
            <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <PaymentMethods compact />
        <p className={styles.legal}>
          {SITE_CONFIG.fullName} · KvK {SITE_CONFIG.kvk} ·{SITE_CONFIG.btw ? ` Btw ${SITE_CONFIG.btw} ·` : ''}{' '}
          <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a> · Alle prijzen incl. btw
        </p>
      </div>
    </footer>
  );
}
