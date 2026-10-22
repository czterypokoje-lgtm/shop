import { SITE_CONFIG } from '@/config/site.config';
import { FREE_SHIPPING_FROM } from '@/lib/money';
import { withBase } from '@/lib/base';
import styles from './ProductTrustBar.module.css';

/*
 * Three reasons to buy, under the product. Only claims we can back: the real
 * Google score, the delivery time from /verzending-en-retour, the Mollie
 * methods we accept and the legal 14-day cooling-off period.
 */
export default function ProductTrustBar() {
  const rating = SITE_CONFIG.rating.replace('.', ',');
  return (
    <section className={styles.bar} aria-label="Waarom bij ons bestellen">
      <a href={SITE_CONFIG.social.google} target="_blank" rel="noopener noreferrer" className={styles.item}>
        <span className={styles.badge} aria-hidden="true">
          <small>Google</small>
          <strong>{rating}</strong>
          <i>★★★★★</i>
        </span>
        <span>
          <strong className={styles.title}>{rating} op Google</strong>
          <span className={styles.sub}>Uit {SITE_CONFIG.reviewCount} klantreviews</span>
        </span>
      </a>
      <div className={styles.item}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
        </svg>
        <span>
          <strong className={styles.title}>3–5 werkdagen in huis</strong>
          <span className={styles.sub}>Gratis vanaf €{FREE_SHIPPING_FROM} · track &amp; trace</span>
        </span>
      </div>
      <div className={styles.item}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.logo} src={withBase('/images/logos/ideal.svg')} alt="" />
        <span>
          <strong className={styles.title}>Veilig betalen met iDEAL</strong>
          <span className={styles.sub}>Of creditcard · 14 dagen bedenktijd</span>
        </span>
      </div>
    </section>
  );
}
