import React from 'react';
import { photoUrl, type Review } from '@/lib/reviews';
import s from './Reviews.module.css';
import ReviewForm from './ReviewForm';
import { OPEN_REVIEWS } from '@/config/site.config';

const Stars = ({ n, size }: { n: number; size?: 'lg' }) => (
  <span className={`${s.starRow}${size === 'lg' ? ` ${s.starLg}` : ''}`} aria-label={`${n.toFixed(1).replace('.', ',')} van 5 sterren`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={s.star} style={{ ['--fill' as string]: `${Math.max(0, Math.min(1, n - i + 1)) * 100}%` }}>★</span>
    ))}
  </span>
);

const fmt = (n: number) => n.toFixed(2).replace('.', ',');
const initials = (name: string) => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || '?';
const AVATAR_COLOURS = ['#b93c20', '#0f766e', '#1d4ed8', '#7c3aed', '#b45309', '#be185d', '#334155'];
const colour = (name: string) => AVATAR_COLOURS[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLOURS.length];

/** Shown straight away; the rest open with "Meer reviews tonen" (no JavaScript needed). */
const FIRST = 4;

function Card({ r }: { r: Review }) {
  return (
    <li className={s.card}>
      <span className={s.avatar} style={{ background: colour(r.author_name) }} aria-hidden="true">{initials(r.author_name)}</span>
      <div className={s.cardBody}>
        <div className={s.cardTop}>
          <Stars n={r.rating} />
          <span className={s.score}>{fmt(r.rating)} / 5,00</span>
        </div>
        {r.title && <h3>{r.title}</h3>}
        <p>{r.body}</p>
        {r.photos.length > 0 && (
          <div className={s.photos}>
            {r.photos.map((p) => (
              <a key={p} href={photoUrl(p)} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoUrl(p)} alt={`Foto van ${r.author_name}`} loading="lazy" width={96} height={96} />
              </a>
            ))}
          </div>
        )}
        <div className={s.meta}>
          <span className={r.verified ? s.verified : s.unverified}>{r.verified ? 'Geverifieerde aankoop' : 'Niet geverifieerd'}</span>
          <strong>{r.author_name}</strong>
          <time dateTime={r.published_at}>{new Date(r.published_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
        </div>
      </div>
    </li>
  );
}

/** The open form behind one button; native <details>, so it works before JavaScript loads. */
function WriteReview({ slug, title, label }: { slug: string; title: string; label: string }) {
  if (!OPEN_REVIEWS) return null;
  return (
    <details className={s.write}>
      <summary className={s.writeBtn}>{label}</summary>
      <div className={s.writeBody}><ReviewForm slug={slug} title={title} image={null} /></div>
    </details>
  );
}

/*
 * Reviews of this product. Buyers' reviews are marked "Geverifieerde
 * aankoop"; while OPEN_REVIEWS is on, anyone can write one, which appears
 * after the office approves it and is marked "Niet geverifieerd". Nothing is
 * shown, and nothing claimed, that a real person did not write here.
 */
export default function ProductReviews({ reviews, slug, title }: { reviews: Review[]; slug: string; title: string }) {
  const count = reviews.length;
  const avg = count ? reviews.reduce((a, r) => a + r.rating, 0) / count : 0;
  const share = (stars: number) => (count ? Math.round((reviews.filter((r) => r.rating === stars).length / count) * 100) : 0);
  const note = OPEN_REVIEWS
    ? 'Reviews met "Geverifieerde aankoop" zijn van klanten die dit product bij ons kochten. Andere reviews controleren wij voordat ze online komen; ze zijn gemarkeerd als "Niet geverifieerd". Wij plaatsen ook kritische reviews.'
    : 'Alleen klanten die dit product bij ons hebben besteld kunnen een beoordeling plaatsen. Wij plaatsen alle beoordelingen, ook kritische.';

  if (count === 0) {
    return (
      <section id="reviews" className={s.section}>
        <div className={s.emptyBox}>
          <div className={s.emptyStars} aria-hidden="true">★★★★★</div>
          <h2>Nog geen reviews voor dit product</h2>
          <p className={s.empty}>{OPEN_REVIEWS ? 'Heeft u dit product of een vergelijkbare sleutel? Vertel andere automobilisten hoe het bevalt.' : 'Na uw bestelling ontvangt u een persoonlijke link om een review te schrijven.'}</p>
          <WriteReview slug={slug} title={title} label="Schrijf de eerste review" />
          <p className={s.note}>{note}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className={s.section}>
      <div className={s.headRow}>
        <h2>Klantbeoordelingen</h2>
        <WriteReview slug={slug} title={title} label="Schrijf een review" />
      </div>
      <div className={s.summary}>
        <span>{count} {count === 1 ? 'beoordeling' : 'beoordelingen'}</span>
        <Stars n={avg} size="lg" />
        <span>{fmt(avg)} / 5,00</span>
      </div>

      <div className={s.layout}>
        <div className={s.bars}>
          {[5, 4, 3, 2, 1].map((n) => (
            <div key={n} className={s.barRow}>
              <span>{n} {n === 1 ? 'ster' : 'sterren'}</span>
              <span className={s.track}><span style={{ width: `${share(n)}%` }} /></span>
              <span className={s.pct}>{share(n)}%</span>
            </div>
          ))}
          <p className={s.note}>{note}</p>
        </div>

        <div>
          <ul className={s.list}>{reviews.slice(0, FIRST).map((r) => <Card key={r.id} r={r} />)}</ul>
          {count > FIRST && (
            <details className={s.more}>
              <summary>Meer beoordelingen tonen ({count - FIRST})</summary>
              <ul className={s.list}>{reviews.slice(FIRST).map((r) => <Card key={r.id} r={r} />)}</ul>
            </details>
          )}
        </div>
      </div>
    </section>
  );
}
