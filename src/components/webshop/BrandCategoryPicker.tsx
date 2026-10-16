import React from 'react';
import Link from 'next/link';
import { facetLabel, type CatalogProduct } from '@/lib/catalog';
import { slugify } from '@/lib/utils';
import s from './BrandCategoryPicker.module.css';

/*
 * "Ik rijd een Opel" is where most visits start. Before a list of 109 parts,
 * the visitor picks what kind of part — and the one line under each tile says
 * which one they need, because "behuizing" and "afstandsbediening" mean the
 * same thing to most drivers until someone tells them the difference.
 *
 * Order is what people come for first, not what the catalogue holds most of.
 */
const ORDER: [string, string][] = [
  ['afstandsbedieningen', 'Complete sleutel met knoppen en elektronica'],
  ['smart-keys', 'Keyless: de auto opent en start zonder sleutel'],
  ['behuizingen', 'Alleen de buitenkant — uw eigen elektronica gaat erin'],
  ['transpondersleutels', 'Sleutel met chip, zonder knoppen'],
  ['sleutels-zonder-chip', 'Gewone sleutel voor deur of contact'],
  ['noodsleutels', 'Losse noodsleutel voor in uw smart key'],
  ['printplaten', 'Elektronica voor in een behuizing'],
  ['universal-remotes', 'Universeel, in te leren met een programmeerapparaat'],
  ['sleutelbaarden', 'Losse baard voor een klapsleutel'],
  ['batterijen', 'Nieuwe batterij voor uw sleutel'],
  ['transponders', 'Losse chip voor een nieuwe sleutel'],
  ['accessoires', 'Kabels, adapters en andere extra’s'],
  ['gereedschap', 'Gereedschap voor sleutelwerk'],
  ['motorsleutels', 'Sleutels voor scooter en motor'],
];
const rank = (c: string) => { const i = ORDER.findIndex(([k]) => k === c); return i < 0 ? 99 : i; };

export default function BrandCategoryPicker({ make, products, active }: { make: string; products: CatalogProduct[]; active?: string }) {
  const mine = products.filter((p) => p.category && p.makes.some((m) => m.toLowerCase() === make.toLowerCase()));
  const groups = new Map<string, CatalogProduct[]>();
  for (const p of mine) groups.set(p.category!, [...(groups.get(p.category!) ?? []), p]);
  const tiles = [...groups].sort((a, b) => rank(a[0]) - rank(b[0]) || b[1].length - a[1].length);
  if (tiles.length < 2) return null;

  const base = `/merk/${slugify(make)}`;

  // Once chosen, the tiles shrink to one row of pills: the products are what the visitor came for now.
  if (active) {
    return (
      <nav className={s.pills} aria-label={`Andere categorieën voor ${make}`}>
        <Link href={base} className={s.pill}>Alles ({mine.length})</Link>
        {tiles.map(([cat, list]) => (
          <Link key={cat} href={active === cat ? base : `${base}?category=${cat}`} className={`${s.pill} ${active === cat ? s.pillOn : ''}`} aria-current={active === cat ? 'true' : undefined}>
            {facetLabel('category', cat)} <span>{list.length}</span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <section className={s.picker} aria-label={`Kies een categorie voor ${make}`}>
      <h2 className={s.title}>Wat zoekt u voor uw {make}?</h2>
      <div className={s.row}>
        {tiles.map(([cat, list]) => {
          // A part for this make, with a clean photo if there is one: the tile shows their kind of key.
          const photo = (list.find((p) => p.cleanPhoto && p.image) ?? list.find((p) => p.image))?.image;
          const on = active === cat;
          return (
            <Link key={cat} href={on ? base : `${base}?category=${cat}`} className={`${s.tile} ${on ? s.on : ''}`} aria-current={on ? 'true' : undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {photo ? <img src={photo} alt="" loading="lazy" width={120} height={120} /> : <span className={s.noimg} />}
              <strong>{facetLabel('category', cat)}</strong>
              <small>{ORDER.find(([k]) => k === cat)?.[1] ?? ''}</small>
              <span className={s.count}>{list.length} {list.length === 1 ? 'artikel' : 'artikelen'}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
