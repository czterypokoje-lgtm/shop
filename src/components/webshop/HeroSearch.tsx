'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { withBase } from '@/lib/base';
import { track } from '@/lib/track';
import { CAR_MODELS } from '@/data/carModels';
import brands from '@/lib/brands.json';
import { WHATSAPP_URL } from '@/config/site.config';
import s from './HeroSearch.module.css';

type Tab = 'kenteken' | 'auto' | 'code';
type Found = { ok: boolean; error?: string; car?: { make: string; model: string; year: string }; modelMatched?: boolean; count?: number; url?: string | null };

const MAKES = (brands as { make: string }[]).map((b) => b.make).sort((a, b) => a.localeCompare(b, 'nl'));
const norm = (x: string) => x.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/**
 * The one thing a visitor came for: the part that fits their car. Kenteken
 * first (no knowledge needed), then make/model, then article code for people
 * holding an old key. The plate goes to our API only, never into the URL.
 */
export default function HeroSearch() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('kenteken');
  const [plate, setPlate] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const modelKey = Object.keys(CAR_MODELS).find((k) => norm(k) === norm(make));
  const models = modelKey ? CAR_MODELS[modelKey] : [];

  const byPlate = async () => {
    const k = plate.replace(/[^A-Za-z0-9]/g, '');
    if (k.length < 4) return setMsg({ ok: false, text: 'Vul uw kenteken in, bijvoorbeeld 12-ABC-3.' });
    setBusy(true);
    setMsg(null);
    try {
      const r: Found = await fetch(withBase(`/api/kenteken/onderdelen?kenteken=${k}`)).then((x) => x.json());
      if (!r.ok || !r.car) {
        track('kenteken_search', { found: false });
        return setMsg({ ok: false, text: r.error ?? 'Geen auto gevonden. Kies uw merk en model.' });
      }
      const car = `${r.car.make} ${r.car.model}${r.car.year ? ` (${r.car.year})` : ''}`;
      track('kenteken_search', { found: true, make: r.car.make, model: r.car.model, year: r.car.year, results: r.count ?? 0 });
      if (!r.url || !r.count) return setMsg({ ok: false, text: `${car}: nog niet in de shop. App ons een foto van uw sleutel, dan zoeken wij het op.` });
      setMsg({ ok: true, text: `${car} gevonden · ${r.count} passende onderdelen` });
      router.push(r.url);
    } catch {
      setMsg({ ok: false, text: 'De kentekencheck werkt even niet. Kies uw merk en model.' });
    } finally {
      setBusy(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'kenteken') return void byPlate();
    if (tab === 'auto') {
      if (!make) return setMsg({ ok: false, text: 'Kies eerst het merk.' });
      track('car_finder', { make, model: model || undefined });
      const p = new URLSearchParams({ make });
      if (model) p.set('q', model);
      return router.push(`/catalogus?${p}`);
    }
    if (code.trim().length < 2) return setMsg({ ok: false, text: 'Vul een artikelcode of zoekwoord in.' });
    track('search', { search_term: code.trim() });
    router.push(`/zoeken?q=${encodeURIComponent(code.trim())}`);
  };

  const TABS: [Tab, string][] = [['kenteken', 'Kenteken'], ['auto', 'Merk & model'], ['code', 'Artikelcode']];

  return (
    <form className={s.card} onSubmit={submit}>
      <div className={s.tabs} role="tablist">
        {TABS.map(([t, label]) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? s.tabOn : s.tab} onClick={() => { setTab(t); setMsg(null); }}>
            {label}
          </button>
        ))}
      </div>

      <div className={s.row}>
        {tab === 'kenteken' && (
          <label className={s.plate}>
            <span className={s.nl} aria-hidden="true">NL</span>
            <input value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} placeholder="12-ABC-3" aria-label="Kenteken" autoComplete="off" spellCheck={false} maxLength={10} />
          </label>
        )}
        {tab === 'auto' && (
          <div className={s.selects}>
            <select value={make} onChange={(e) => { setMake(e.target.value); setModel(''); }} aria-label="Merk" className={s.field}>
              <option value="">Merk</option>
              {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={model} onChange={(e) => setModel(e.target.value)} aria-label="Model" className={s.field} disabled={!models.length}>
              <option value="">Alle modellen</option>
              {models.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        )}
        {tab === 'code' && (
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Bijv. HU66 of Golf behuizing" aria-label="Artikelcode of zoekwoord" className={`${s.field} ${s.codeField}`} />
        )}
        <button type="submit" className={s.go} disabled={busy}>
          {busy ? 'Zoeken…' : tab === 'kenteken' ? 'Vind mijn sleutel' : 'Toon onderdelen'}
        </button>
      </div>

      {msg ? (
        <p className={msg.ok ? s.ok : s.err} role="status">{msg.text}</p>
      ) : (
        <p className={s.help}>
          {tab === 'kenteken' ? 'Wij zoeken uw auto op bij de RDW en tonen alleen wat past.' : 'Twijfelt u?'}{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Stuur een foto van uw sleutel via WhatsApp</a>
        </p>
      )}
    </form>
  );
}
