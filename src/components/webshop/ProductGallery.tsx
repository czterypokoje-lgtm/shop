'use client';
import { withBase } from '@/lib/base';
import React, { useRef, useState } from 'react';
import styles from './ProductGallery.module.css';

/*
 * Plain <img>, not next/image: the photos are already 800px WebP, and
 * on-demand optimisation of ~5,000 product photos would burn the Vercel image
 * quota for little gain.
 */
export default function ProductGallery({ images, title = '' }: { images?: string[]; title?: string }) {
  const photos = images && images.length > 0 ? images : [withBase('/images/product-placeholder.svg')];
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const go = (step: number) => setActive((i) => (i + step + photos.length) % photos.length);

  return (
    <div className={styles.gallery}>
      <div
        className={styles.main}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40 && photos.length > 1) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[active]}
          alt={photos.length > 1 ? `${title} — foto ${active + 1} van ${photos.length}` : title}
          width={800}
          height={550}
          fetchPriority={active === 0 ? 'high' : undefined}
          className={styles.photo}
        />
        {photos.length > 1 && (
          <>
            <button type="button" aria-label="Vorige foto" onClick={() => go(-1)} className={`${styles.arrow} ${styles.prev}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button type="button" aria-label="Volgende foto" onClick={() => go(1)} className={`${styles.arrow} ${styles.next}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <span className={styles.counter}>{active + 1} / {photos.length}</span>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className={styles.thumbs}>
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Toon foto ${i + 1}`}
              aria-current={i === active}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => setActive(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" width={60} height={60} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
