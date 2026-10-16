import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG, WHATSAPP_URL, isBtwConfigured } from '@/config/site.config';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Vragen over een autosleutel, uw bestelling of het inleren? Bel, WhatsApp of mail Autosleutel24.',
  alternates: { canonical: `${SITE_CONFIG.domain}/contact` },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.lead}>
        Twijfelt u of een sleutel op uw auto past, of heeft u een vraag over uw bestelling? Stuur
        ons een foto van uw huidige sleutel via WhatsApp — dan zoeken wij het juiste artikel voor u.
      </p>

      <div className={styles.channels}>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.channel}>
          <strong>WhatsApp</strong>
          <span>Het snelst, ook met een foto</span>
        </a>
        <a href={`tel:${SITE_CONFIG.phoneTel}`} className={styles.channel}>
          <strong>{SITE_CONFIG.phone}</strong>
          <span>Bellen</span>
        </a>
        <a href={`mailto:${SITE_CONFIG.email}`} className={styles.channel}>
          <strong>{SITE_CONFIG.email}</strong>
          <span>E-mail, ook voor retouren</span>
        </a>
      </div>

      <dl className={styles.facts}>
        <dt>Bedrijf</dt>
        <dd>{SITE_CONFIG.fullName}, {SITE_CONFIG.address.city}</dd>
        <dt>KvK</dt>
        <dd>{SITE_CONFIG.kvk}</dd>
        {isBtwConfigured() && (<><dt>Btw</dt><dd>{SITE_CONFIG.btw}</dd></>)}
      </dl>

      <p className={styles.more}>
        Retourneren of een klacht? Zie <Link href="/verzending-en-retour">verzending, retour en garantie</Link>.
      </p>
    </div>
  );
}
