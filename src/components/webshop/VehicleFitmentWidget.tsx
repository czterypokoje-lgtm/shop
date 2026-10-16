'use client';

import React, { useState } from 'react';
import { VEHICLE_DATA, FALLBACK_MODELS, getYears } from '@/lib/vehicleData';
import type { Fitment } from '@/lib/catalog';
import { fitmentVerdict, type Verdict, type CarSpec } from '@/lib/fitment';
import { WHATSAPP_URL } from '@/config/site.config';
import vehicleSpecsJson from '@/lib/vehicleSpecs.json';
import styles from './VehicleFitmentWidget.module.css';

const vehicleSpecs = vehicleSpecsJson as Record<string, CarSpec & { make: string; model: string }>;

/** The car's known chip/blade/frequency, by make|model, loosely matched. */
function specFor(make: string, model: string): CarSpec | undefined {
  const key = `${make}|${model}`.toLowerCase();
  if (vehicleSpecs[key]) return vehicleSpecs[key];
  const loose = Object.keys(vehicleSpecs).find((k) => {
    const [kMake, kModel] = k.split('|');
    return kMake.includes(make.toLowerCase()) && (kModel.includes(model.toLowerCase()) || model.toLowerCase().includes(kModel));
  });
  return loose ? vehicleSpecs[loose] : undefined;
}

export default function VehicleFitmentWidget({
  defaultBrand = '',
  defaultModel = '',
  fitment = [],
  productChip = null,
  productBlade = null,
  productFrequency = null,
}: {
  defaultBrand?: string;
  defaultModel?: string;
  fitment?: Fitment[];
  productChip?: string | null;
  productBlade?: string | null;
  productFrequency?: string | null;
}) {
  const brandFromDefault =
    Object.keys(VEHICLE_DATA).find((b) => b.toLowerCase() === defaultBrand.toLowerCase()) ?? '';

  const [tab, setTab] = useState<'kenteken' | 'handmatig'>('handmatig');
  const [brand, setBrand] = useState(brandFromDefault);
  const [model, setModel] = useState(defaultModel);
  const [year, setYear] = useState('');
  const [kenteken, setKenteken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Verdict | null>(null);

  const brands = Object.keys(VEHICLE_DATA).sort();
  const models = brand ? VEHICLE_DATA[brand] || FALLBACK_MODELS : [];
  const years = getYears();
  const part = { chip: productChip, blade: productBlade, frequency: productFrequency };

  const judge = (make: string, mdl: string, yr: number) =>
    setResult(fitmentVerdict({ make, model: mdl, year: yr }, fitment, part, specFor(make, mdl)));

  const checkKenteken = async () => {
    if (!kenteken) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`/api/kenteken?kenteken=${kenteken.replace(/[^a-zA-Z0-9]/g, '')}`);
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || 'Kenteken niet gevonden');
      } else {
        // The API's own field names: merk, model, bouwjaar.
        const { merk = '', model: mdl = '', bouwjaar = '' } = data.data;
        const yr = parseInt(bouwjaar) || 0;
        setBrand(merk);
        setModel(mdl);
        setYear(String(yr));
        judge(merk, mdl, yr);
      }
    } catch {
      setError('Fout bij ophalen kenteken');
    }
    setLoading(false);
  };

  const car = `${brand} ${model}${year ? ` (${year})` : ''}`;

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2.5 2.5 0 1 1-5 0m5 0a2.5 2.5 0 1 0-5 0m-7 0a2.5 2.5 0 1 1-5 0m5 0a2.5 2.5 0 1 0-5 0" /></svg>
        </div>
        <div>
          <h2 className={styles.title}>Controleer of het onderdeel past</h2>
          <p className={styles.sub}>Vul uw auto in. Twijfelt u? Wij controleren het gratis via WhatsApp.</p>
        </div>
      </div>

      <div className={styles.tabs} role="tablist">
        {(['kenteken', 'handmatig'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'kenteken' ? 'Via kenteken' : 'Handmatig'}
          </button>
        ))}
      </div>

      {tab === 'kenteken' ? (
        <>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="AB-123-C"
              aria-label="Kenteken"
              value={kenteken}
              onChange={(e) => setKenteken(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkKenteken()}
              className={`${styles.field} ${styles.plate}`}
            />
            <button type="button" className={styles.check} onClick={checkKenteken} disabled={!kenteken || loading}>
              {loading ? 'Zoeken…' : 'Controleer'}
            </button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </>
      ) : (
        <div className={styles.row}>
          <select aria-label="Merk" value={brand} className={styles.field}
            onChange={(e) => { setBrand(e.target.value); setModel(''); setYear(''); setResult(null); }}>
            <option value="">Merk</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select aria-label="Model" value={model} className={styles.field} disabled={!brand}
            onChange={(e) => { setModel(e.target.value); setResult(null); }}>
            <option value="">Model</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select aria-label="Bouwjaar" value={year} className={styles.field} disabled={!model}
            onChange={(e) => { setYear(e.target.value); setResult(null); }}>
            <option value="">Bouwjaar</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <button type="button" className={styles.check} disabled={!brand || !model || !year}
            onClick={() => judge(brand, model, parseInt(year))}>
            Controleer
          </button>
        </div>
      )}

      {result === 'fits' && (
        <div className={`${styles.result} ${styles.fits}`}>
          ✓ Volgens de leverancier past dit onderdeel op uw {car}.
        </div>
      )}
      {result === 'no' && (
        <div className={`${styles.result} ${styles.no}`}>
          Dit onderdeel past waarschijnlijk niet op uw {car}.{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Vraag ons het juiste artikel</a>
        </div>
      )}
      {result === 'unknown' && (
        <div className={`${styles.result} ${styles.unknown}`}>
          Voor uw {car} kunnen wij dit niet automatisch bevestigen.{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Stuur een foto van uw sleutel via WhatsApp</a>
          {' '}— wij controleren het gratis.
        </div>
      )}
    </div>
  );
}
