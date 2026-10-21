import { SITE_CONFIG } from '@/config/site.config';
import { formatPrice, FREE_SHIPPING_FROM } from '@/lib/money';
import { GOOGLE_REVIEWS } from '@/data/googleReviews';
import s from './HomeTrustBands.module.css';

const I = ({ d }: { d: string }) => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

/** "Waarom Autosleutel24?": four facts, each one true for every order. */
export function HomeWhyBand() {
  const items = [
    { d: 'M3 7h18v10H3zM7 11h2M11 11h6M7 14h10', title: 'Kenteken-check', text: 'Wij tonen alleen wat past' },
    { d: 'M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', title: 'Gratis verzending', text: `Vanaf ${formatPrice(FREE_SHIPPING_FROM)} · 2–3 werkdagen` },
    { d: 'M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3', title: '14 dagen bedenktijd', text: 'Ongebruikt retour sturen' },
    { d: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z', title: 'Monteur aan huis', text: 'Inleren door een specialist' },
  ];
  return (
    <section className={s.why}>
      <div className={s.wrap}>
        <h2 className={s.title}>Waarom Autosleutel24?</h2>
        <ul className={s.whyGrid}>
          {items.map((i) => (
            <li key={i.title}>
              <span className={s.icon}><I d={i.d} /></span>
              <strong>{i.title}</strong>
              <span>{i.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Real Google reviews of our key service, with the rating and a way to the profile. */
export function HomeReviewsBand() {
  const rating = SITE_CONFIG.rating.replace('.', ',');
  return (
    <section className={s.reviews}>
      <div className={s.wrap}>
        <h2 className={s.title}>Wat klanten zeggen</h2>
        <p className={s.score}>
          <b>Uitstekend</b> <span className={s.stars} aria-hidden="true">★★★★★</span> <b>{rating}</b> op Google · {SITE_CONFIG.reviewCount} reviews
        </p>
        <ul className={s.reviewGrid}>
          {GOOGLE_REVIEWS.slice(0, 4).map((r) => (
            <li key={r.name}>
              <div className={s.reviewHead}>
                <strong>{r.name}</strong>
                <span className={s.stars} aria-label="5 van 5 sterren">★★★★★</span>
              </div>
              <span className={s.verified}>✓ Google-review</span>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
        <p className={s.note}>
          Reviews over de sleutelservice van Autosleutel24, letterlijk overgenomen van ons Google-profiel.{' '}
          <a href={SITE_CONFIG.social.google} target="_blank" rel="noopener noreferrer">Bekijk alle reviews op Google</a>
        </p>
      </div>
    </section>
  );
}
