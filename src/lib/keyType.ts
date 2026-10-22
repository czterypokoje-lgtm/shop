import type { CatalogProduct } from '@/lib/catalog';

/*
 * What kind of key an article is, in the words people search for:
 * "klapsleutel audi", "smart key golf", "sleutelbehuizing mazda".
 *
 * Only what the supplier's data says. A-Key marks a flip key as
 * "Klappschlüssel" in some titles and not in others, so "Klapsleutel" appears
 * only where it is written down; calling every remote a flip key would put a
 * false word in the title of a product someone then returns.
 */

type Raw = Pick<CatalogProduct, 'category' | 'titleNl' | 'title' | 'excerpt'>;

const text = (p: Raw) => `${p.titleNl} ${p.title ?? ''} ${p.excerpt ?? ''}`;
const isFlip = (p: Raw) => /klapp?(schl|sleutel)|flip/i.test(text(p)) && !/stift|körner/i.test(text(p));
const isSmart = (p: Raw) => /keyless|smart ?key|proximity|kessy/i.test(text(p));

/** The search word for this article, or null where none fits. */
export function keyKind(p: Raw): string | null {
  switch (p.category) {
    case 'smart-keys': return 'Smart key (keyless)';
    case 'afstandsbedieningen': return isFlip(p) ? 'Klapsleutel met afstandsbediening' : isSmart(p) ? 'Smart key (keyless)' : 'Autosleutel met afstandsbediening';
    case 'behuizingen': return isFlip(p) ? 'Klapsleutel behuizing' : isSmart(p) ? 'Smart key behuizing' : 'Sleutelbehuizing';
    case 'printplaten': return 'Printplaat voor autosleutel';
    case 'transpondersleutels': return 'Transpondersleutel';
    case 'noodsleutels': return 'Noodsleutel';
    case 'sleutels-zonder-chip': return 'Autosleutel zonder chip';
    default: return null;
  }
}

/** The filter value: one word per kind, so "Soort sleutel" stays short. */
export function keyTypeFacet(p: Raw): string | null {
  const kind = keyKind(p);
  if (!kind) return null;
  if (kind.startsWith('Klapsleutel')) return 'klapsleutel';
  if (kind.startsWith('Smart key')) return 'smart key';
  if (p.category === 'afstandsbedieningen') return 'met afstandsbediening';
  if (p.category === 'behuizingen') return 'behuizing';
  return null;
}

/** "Elektronica meegeleverd": ja for a working key or board, nee for a shell or blank. */
export function electronicsFacet(p: Pick<CatalogProduct, 'category'>): 'ja' | 'nee' | null {
  if (['afstandsbedieningen', 'smart-keys', 'printplaten', 'transpondersleutels'].includes(p.category ?? '')) return 'ja';
  if (['behuizingen', 'sleutelbaarden', 'noodsleutels', 'sleutels-zonder-chip'].includes(p.category ?? '')) return 'nee';
  return null;
}

/**
 * The customer-facing title: kind, then "geschikt voor" make and models (the
 * wording that is both what people search and what trademark law allows for
 * a compatible part), then buttons, frequency and chip, the article code last.
 * Returns null where the supplier's title is already the better one: sets,
 * universals, articles with no make.
 */
export function customerTitle(p: CatalogProduct): string | null {
  const kind = keyKind(p);
  if (!kind || !p.makes.length) return null;
  if (/set van|stuks|universe|lege behuizing|\bgratis\b/i.test(p.titleNl)) return null;

  const make = p.makes[0]!;
  const models = [...new Set(
    p.fitment
      .filter((f) => f.make === make && f.model)
      .map((f) => f.model.replace(/\s*\(.*?\)\s*/g, ' ').trim())
  )].filter((m) => m && !/^(produkt|alle|diverse|modelle?)$/i.test(m)); // supplier filler, not a model
  const modelText = models.length ? ` ${models.slice(0, 4).join(', ')}${models.length > 4 ? ' e.a.' : ''}` : '';
  const otherMakes = p.makes.slice(1, 2);
  const forText = `${make}${modelText}${otherMakes.length ? ` en ${otherMakes.join(', ')}` : ''}`;

  // A tool brand in front ("Xhorse", "Lonsdor") is part of what people search for.
  const brand = p.manufacturer && p.titleNl.toLowerCase().startsWith(p.manufacturer.toLowerCase()) ? `${p.manufacturer} ` : '';
  // The code the old title showed, which is what the office and the order list use.
  const code = p.titleNl.match(/\(([^()]+)\)\s*$/)?.[1] ?? p.articleCode ?? null;
  const chipId = p.chip?.match(/\bID\s?\d{2}[A-Z]?\b/i)?.[0]?.replace(/\s/, '').toUpperCase();

  const parts = [
    `${brand}${brand ? kind.charAt(0).toLowerCase() + kind.slice(1) : kind} geschikt voor ${forText}`,
    p.buttons ? `${p.buttons} ${p.buttons === 1 ? 'knop' : 'knoppen'}` : null,
    p.frequency,
    chipId,
  ].filter(Boolean);
  return `${parts.join(' – ')}${code ? ` (${code})` : ''}`;
}
