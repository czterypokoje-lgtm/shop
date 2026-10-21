'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { withBase } from '@/lib/base';
import { track } from '@/lib/track';
import styles from './CarFinder.module.css';

type Result = { ok: boolean; error?: string; car?: { make: string; model: string; year: string }; modelMatched?: boolean; count?: number; url?: string | null };

/** Dutch plate in, the parts for that car out. The plate itself is never sent to analytics. */
export default function KentekenFinder() {
  const router = useRouter();
  const [plate, setPlate] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const k = plate.replace(/[^A-Za-z0-9]/g, '');
    if (k.length < 4) return setMsg({ tone: 'err', text: 'Vul uw kenteken in, bijvoorbeeld 12-ABC-3.' });
    setBusy(true);
    setMsg(null);
    try {
      const res: Result = await fetch(withBase(`/api/kenteken/onderdelen?kenteken=${k}`)).then((r) => r.json());
      if (!res.ok || !res.car) {
        track('kenteken_search', { found: false });
        setMsg({ tone: 'err', text: res.error ?? 'Geen auto gevonden. Kies hieronder uw merk en model.' });
        return;
      }
      const { make, model, year } = res.car;
      track('kenteken_search', { found: true, make, model, year, results: res.count ?? 0 });
      if (!res.url || !res.count) {
        setMsg({ tone: 'err', text: `${make} ${model}${year ? ` (${year})` : ''}: hiervoor hebben wij nog niets in de shop. App ons een foto van uw sleutel, dan zoeken wij het voor u op.` });
        return;
      }
      setMsg({ tone: 'ok', text: `${make} ${model}${year ? ` (${year})` : ''} · ${res.count} onderdelen${res.modelMatched ? '' : ` voor ${make}`}` });
      router.push(res.url);
    } catch {
      setMsg({ tone: 'err', text: 'De kentekencheck werkt even niet. Kies hieronder uw merk en model.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className={styles.plateForm}>
      <span className={styles.label}>Zoek op kenteken</span>
      <label className={styles.plate}>
        <span className={styles.plateNl} aria-hidden="true">NL</span>
        <input
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          placeholder="12-ABC-3"
          aria-label="Kenteken"
          autoComplete="off"
          spellCheck={false}
          maxLength={10}
          inputMode="text"
        />
      </label>
      <button type="submit" className={styles.go} disabled={busy}>{busy ? 'Zoeken…' : 'Vind mijn onderdelen'}</button>
      {msg && <p className={msg.tone === 'ok' ? styles.ok : styles.err} role="status">{msg.text}</p>}
    </form>
  );
}
