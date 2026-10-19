import React from 'react';
import { photoUrl, type Review } from '@/lib/reviews';
import s from './Reviews.module.css';

const Stars = ({ n }: { n: number }) => (
  <span className={s.starRow} aria-label={`${n} van 5 sterren`}>{'★★★★★'.slice(0, Math.round(n))}<span>{'★★★★★'.slice(Math.round(n))}</span></span>
);

/** Reviews of this product by customers who bought it. Nothing is shown — and nothing claimed — without any. */
export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  return (
    <section id="reviews" className={s.section}>
      <h2>Reviews {reviews.length > 0 && <span className={s.count}>({reviews.length})</span>}</h2>
      {reviews.length ? (
        <>
          <div className={s.summary}><strong>{avg.toFixed(1).replace('.', ',')}</strong><Stars n={avg} /><span>gemiddeld uit {reviews.length} review{reviews.length > 1 ? 's' : ''}</span></div>
          <ul className={s.list}>
            {reviews.map((r) => (
              <li key={r.id}>
                <div className={s.meta}><Stars n={r.rating} /><strong>{r.author_name}</strong><span className={s.verified}>✓ Geverifieerde koper</span><time>{new Date(r.published_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</time></div>
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
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={s.empty}>Nog geen reviews voor dit product. Na uw bestelling ontvangt u een persoonlijke link om er een te schrijven, met foto&apos;s als u wilt.</p>
      )}
      <p className={s.note}>Alleen klanten die dit product bij ons hebben besteld kunnen een review plaatsen. Wij plaatsen alle reviews, ook kritische.</p>
    </section>
  );
}
