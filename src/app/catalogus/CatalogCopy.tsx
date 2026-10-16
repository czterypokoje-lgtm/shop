import { facetLabel, type CatalogProduct } from '@/lib/catalog';
import type { PageCopy } from '@/content/shopCopy';
import { CAR_MODELS } from '@/data/carModels';
import styles from './CatalogCopy.module.css';

/**
 * The written part of a category or brand page, below the products. For a
 * brand it also states what the catalogue actually holds for that make —
 * counts and models straight from the data, so no two brand pages read alike.
 */
export default function CatalogCopy({ copy, make, products }: {
  copy: PageCopy;
  make: string | null;
  products: CatalogProduct[];
}) {
  const byCategory = make
    ? Object.entries(
        products.reduce<Record<string, number>>((acc, p) => {
          if (p.category) acc[p.category] = (acc[p.category] ?? 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1]).slice(0, 5)
    : [];
  // Only names that are real models of this make, spelled the way the model list spells them.
  const norm = (t: string) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const known = make ? CAR_MODELS[Object.keys(CAR_MODELS).find((k) => norm(k) === norm(make)) ?? ''] ?? [] : [];
  const models = [
    ...new Set(
      products.flatMap((p) =>
        p.fitment
          .filter((f) => f.make === make)
          .map((f) => known.find((k) => norm(k) === norm(f.model)))
          .filter((m): m is string => Boolean(m))
      )
    ),
  ].slice(0, 12);

  return (
    <section className={styles.copy}>
      {make && byCategory.length > 0 && (
        <>
          <h2>{make} in ons assortiment</h2>
          <p>
            Wij hebben {products.length} artikelen voor {make}:{' '}
            {byCategory.map(([cat, n]) => `${n} ${facetLabel('category', cat).toLowerCase()}`).join(', ')}.
            {models.length > 0 && <> Met opgegeven pasvorm voor onder meer de {models.join(', ')}.</>}
          </p>
        </>
      )}
      {copy.sections.map((s) => (
        <div key={s.h2}>
          <h2>{s.h2}</h2>
          <p>{s.p}</p>
        </div>
      ))}
      {copy.faq.length > 0 && (
        <>
          <h2>Veelgestelde vragen</h2>
          {copy.faq.map((f) => (
            <details key={f.q} className={styles.faq}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </>
      )}
    </section>
  );
}
