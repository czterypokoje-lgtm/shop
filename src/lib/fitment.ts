import type { Fitment } from './catalog';

export type Verdict = 'fits' | 'no' | 'unknown';

export interface CarSpec {
  chips: string[];
  blades: string[];
  frequencies: string[];
}

const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, ''); // RDW says SKODA, we say Škoda

/**
 * Does this part fit this car?
 *
 * Only the supplier's own fitment list can say "fits". A car that is missing
 * from our data is "unknown", never a yes — the widget used to confirm any car
 * it knew nothing about, which was most of them. A known chip, blade or
 * frequency that contradicts the part is a "no".
 */
export function fitmentVerdict(
  car: { make: string; model: string; year: number },
  fitment: Fitment[],
  part: { chip?: string | null; blade?: string | null; frequency?: string | null },
  spec?: CarSpec
): Verdict {
  const make = norm(car.make);
  const model = norm(car.model);
  const listed = fitment.filter((f) => norm(f.make) === make && f.model);
  const sameModel = listed.filter((f) => {
    const m = norm(f.model);
    // Prefix, not substring: Mazda "3" must not match a CX-3.
    return m && (model.startsWith(m) || m.startsWith(model));
  });
  // A missing year (0, 9999 or null) means "not stated" for that end only.
  const yearOk = (f: Fitment) =>
    car.year >= (f.from > 0 ? f.from : 0) && car.year <= (f.to && f.to < 9999 ? f.to : Infinity);
  if (sameModel.some(yearOk)) return 'fits';

  if (spec) {
    if (part.chip && spec.chips.length && !spec.chips.includes(part.chip)) return 'no';
    if (part.blade && spec.blades.length && !spec.blades.includes(part.blade)) return 'no';
    if (part.frequency && spec.frequencies.length && !spec.frequencies.includes(part.frequency)) return 'no';
  }
  // Listed for this make, but for other models or other years only.
  if (listed.length) return 'no';
  return 'unknown';
}
