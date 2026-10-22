import Link from 'next/link';
import { getShopProducts } from '@/lib/shopCatalog';
import { modelPages } from '@/lib/models';
import { slugify } from '@/lib/utils';
import s from './ModelLinks.module.css';

/** "Kies uw model": links from a make page to its model pages, most products first. */
export default async function ModelLinks({ make }: { make: string }) {
  const makeSlug = slugify(make);
  const models = modelPages(await getShopProducts())
    .filter((m) => m.makeSlug === makeSlug)
    .sort((a, b) => b.products.length - a.products.length || a.model.localeCompare(b.model, 'nl'));
  if (!models.length) return null;
  return (
    <section className={s.box} aria-label={`Modellen van ${make}`}>
      <h2>Kies uw {make}-model</h2>
      <ul>
        {models.map((m) => (
          <li key={m.modelSlug}>
            <Link href={`/merk/${m.makeSlug}/${m.modelSlug}`}>
              {m.model} <span>{m.products.length}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
