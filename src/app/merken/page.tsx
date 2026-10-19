import { withBase } from '@/lib/base';
import React from 'react';
import Link from 'next/link';
import MerkenHero from '@/components/webshop/MerkenHero';
import brandData from '@/lib/brands.json';
import { slugify } from '@/lib/utils';
import { readdirSync } from 'fs';
import { join } from 'path';
import credits from '@/data/brand-photo-credits.json';

/*
 * The makes we stock, from the catalogue rather than from VEHICLE_DATA.
 *
 * VEHICLE_DATA is the list of cars we can drive out to and open — it is not
 * the list of keys we sell, and the two are not the same. Every make in it
 * without a product behind it opened an empty catalogue page.
 */
const BRANDS = brandData as { make: string; count: number }[];

const FAMILIES: [string, string[]][] = [
  ['Volkswagen Groep', ['Volkswagen', 'Audi', 'Seat', 'Škoda', 'Porsche', 'Bentley', 'Lamborghini']],
  ['Franse merken', ['Renault', 'Peugeot', 'Citroën', 'Dacia']],
  ['Duitse merken', ['BMW', 'Mercedes-Benz', 'Opel', 'Mini', 'Smart']],
  ['Aziatische merken', ['Toyota', 'Hyundai', 'Kia', 'Honda', 'Nissan', 'Mazda', 'Lexus', 'Suzuki', 'Mitsubishi', 'Subaru', 'Infiniti', 'Isuzu', 'SsangYong', 'Daewoo']],
  ['Italiaanse merken', ['Fiat', 'Alfa Romeo', 'Lancia', 'Abarth', 'Ferrari', 'Maserati', 'Iveco']],
  ['Amerikaanse merken', ['Ford', 'Chrysler', 'Jeep', 'Dodge', 'Chevrolet', 'Cadillac', 'Buick']],
  ['Britse en Zweedse merken', ['Land Rover', 'Jaguar', 'Rover', 'MG', 'Aston Martin', 'Volvo', 'Saab']],
  ['Motoren en scooters', ['Yamaha', 'Kawasaki', 'Piaggio', 'Aprilia', 'Kymco', 'Ducati', 'KTM']],
];
const byMake = new Map(BRANDS.map((b) => [b.make, b]));
const grouped = new Set(FAMILIES.flatMap(([, m]) => m));
const GROUPS = [
  ...FAMILIES.map(([title, makes]) => ({ title, makes: makes.flatMap((m) => byMake.get(m) ?? []) })),
  { title: 'Overige merken', makes: BRANDS.filter((b) => !grouped.has(b.make) && !/^(GM|General Motors)$/.test(b.make)) },
].filter((g) => g.makes.length);

/** Photos present in public/images/brands (slug.webp); others show the wordmark. */
const PHOTOS = new Set(readdirSync(join(process.cwd(), 'public/images/brands')).filter((f) => f.endsWith('.webp')).map((f) => f.slice(0, -5)));

export default function MerkenPage() {

  return (
    <div style={{ background: '#f6f4eb', minHeight: '100vh', paddingBottom: '6rem', fontFamily: 'Inter, sans-serif' }}>
      
      <MerkenHero />

      {/* Main Content Area (Beige background) */}
      <div className="container" style={{ paddingTop: '1.5rem' }}>
        
        {/* CSS for hover effects on these specific cards */}
        <style>{`
          .brand-row { margin-bottom: 2rem; }
          .brand-row-title { font-size: 1.15rem; font-weight: 800; color: #0f172a; margin: 0 0 .75rem; }
          .brand-row-scroll { display: flex; gap: .85rem; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: .5rem; scrollbar-width: thin; }
          .brand-square-card { flex: 0 0 200px; scroll-snap-align: start; background: #fff; border-radius: 12px; overflow: hidden; text-decoration: none; color: #0f172a; border: 1px solid #e2e8f0; transition: transform .2s, box-shadow .2s; }
          .brand-square-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0,0,0,.08); }
          .brand-photo { aspect-ratio: 16 / 10; background: #fff; display: flex; align-items: center; justify-content: center; }
          .brand-photo img { width: 100%; height: 100%; object-fit: contain; }
          .brand-wordmark { font-size: 1rem; padding: 0 .5rem; text-align: center; overflow-wrap: anywhere; font-weight: 800; color: #cbd5e1; letter-spacing: .06em; text-transform: uppercase; }
          .brand-name { font-size: 1.05rem; font-weight: 800; margin: .7rem .85rem 0; }
          .brand-count { font-size: .8rem; color: #64748b; margin: .15rem .85rem .85rem; }
          @media (max-width: 600px) { .brand-square-card { flex-basis: 150px; } }
          .brand-credits { margin-top: 2rem; font-size: .75rem; color: #64748b; }
          .brand-credits a { color: inherit; }
        `}</style>

        {/* Grouped by family, one swipeable row each: a customer finds his make without scrolling a wall of tiles. */}
        {GROUPS.map(({ title, makes }) => (
          <section key={title} className="brand-row">
            <h2 className="brand-row-title">{title}</h2>
            <div className="brand-row-scroll">
              {makes.map(({ make, count }) => (
                <Link href={`/merk/${slugify(make)}`} key={make} className="brand-square-card">
                  <div className="brand-photo">
                    {PHOTOS.has(slugify(make)) ? (
                      <img src={withBase(`/images/brands/${slugify(make)}.webp`)} alt={`${make} auto`} loading="lazy" width={320} height={200} />
                    ) : (
                      <span className="brand-wordmark">{make}</span>
                    )}
                  </div>
                  <h3 className="brand-name">{make}</h3>
                  <p className="brand-count">{count} {count === 1 ? 'artikel' : 'artikelen'}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
        {/* Required by the CC licences: who took each photo, under which licence. */}
        <details className="brand-credits" id="fotos">
          <summary>Foto&apos;s: Wikimedia Commons</summary>
          <p>
            {Object.values(credits as Record<string, { model: string; author: string; license: string; source: string }>).map((c, i) => (
              <span key={c.source}>{i > 0 && ' · '}<a href={c.source} rel="nofollow noopener" target="_blank">{c.model}</a> — {c.author}, {c.license}, achtergrond verwijderd</span>
            ))}
          </p>
        </details>
      </div>

    </div>
  );
}
