import React from 'react';
import { photoUrl, type Review } from '@/lib/reviews';
import s from './Reviews.module.css';

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
          <span className={s.verified}>Geverifieerde aankoop</span>
          <strong>{r.author_name}</strong>
          <time dateTime={r.published_at}>{new Date(r.published_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
        </div>
      </div>
    </li>
  );
}

/** Reviews of this product by customers who bought it. Nothing is shown — and nothing claimed — without any. */
export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  const count = reviews.length;
  const avg = count ? reviews.reduce((a, r) => a + r.rating, 0) / count : 0;
  const share = (stars: number) => (count ? Math.round((reviews.filter((r) => r.rating === stars).length / count) * 100) : 0);

  return (
    <section id="reviews" className={s.section}>
      <h2>Klantbeoordelingen</h2>
      {count > 0 && (
        <div className={s.summary}>
          <span>{count} {count === 1 ? 'beoordeling' : 'beoordelingen'}</span>
          <Stars n={avg} size="lg" />
          <span>{fmt(avg)} / 5,00</span>
        </div>
      )}

      <div className={count > 0 ? s.layout : undefined}>
        <div className={s.bars}>
          {count > 0 ? (
            [5, 4, 3, 2, 1].map((n) => (
              <div key={n} className={s.barRow}>
                <span>{n} {n === 1 ? 'ster' : 'sterren'}</span>
                <span className={s.track}><span style={{ width: `${share(n)}%` }} /></span>
                <span className={s.pct}>{share(n)}%</span>
              </div>
            ))
          ) : (
            <p className={s.empty}>
              Nog geen beoordelingen voor dit product. Na uw bestelling ontvangt u een persoonlijke link om er een te
              schrijven, met foto&apos;s als u wilt.
            </p>
          )}
          <p className={s.note}>Alleen klanten die dit product bij ons hebben besteld kunnen een beoordeling plaatsen. Wij plaatsen alle beoordelingen, ook kritische.</p>
        </div>

        {count > 0 && (
          <div>
            <ul className={s.list}>{reviews.slice(0, FIRST).map((r) => <Card key={r.id} r={r} />)}</ul>
            {count > FIRST && (
              <details className={s.more}>
                <summary>Meer beoordelingen tonen ({count - FIRST})</summary>
                <ul className={s.list}>{reviews.slice(FIRST).map((r) => <Card key={r.id} r={r} />)}</ul>
              </details>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
