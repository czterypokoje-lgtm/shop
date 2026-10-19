'use client';

import { track } from '@/lib/track';
import React, { useState } from 'react';
import { CAR_MODELS } from '@/data/carModels';
import brands from '@/lib/brands.json';
import styles from './CarFinder.module.css';

/** Only makes the catalogue actually stocks, so the result is never empty. */
const MAKES = (brands as { make: string; count: number }[])
  .map((b) => b.make)
  .sort((a, b) => a.localeCompare(b, 'nl'));

// "Škoda" in the catalogue, "Skoda" in the model list.
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/**
 * "Zoek op uw auto": make, then model, into the catalogue. A plain GET form,
 * so it works before hydration; the model list only fills in once JS runs.
 */
export default function CarFinder() {
  const [make, setMake] = useState('');
  const key = Object.keys(CAR_MODELS).find((k) => norm(k) === norm(make));
  const models = key ? CAR_MODELS[key] : [];

  return (
    <form action="/catalogus" method="get" className={styles.finder} onSubmit={(e) => { const f = new FormData(e.currentTarget); track('car_finder', { make: f.get('make'), model: f.get('model') || f.get('q') || undefined, year: f.get('year') || undefined }); }}>
      <span className={styles.label}>Zoek op uw auto</span>
      <select name="make" required aria-label="Merk" value={make} onChange={(e) => setMake(e.target.value)} className={styles.field}>
        <option value="">Merk</option>
        {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <select name="q" aria-label="Model" disabled={!models.length} className={styles.field} defaultValue="">
        <option value="">Alle modellen</option>
        {models.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <button type="submit" className={styles.go}>Toon onderdelen</button>
    </form>
  );
}
