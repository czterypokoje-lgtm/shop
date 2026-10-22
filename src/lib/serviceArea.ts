/*
 * Where "Monteur aan huis" is a normal booking and where it is by appointment.
 *
 * The technicians work Noord-Holland, Zuid-Holland, Utrecht and Gelderland
 * as standard; anywhere else in the Netherlands they come by appointment.
 * Nothing is refused on this: a postcode outside the ranges only means the
 * customer is told we will call to plan a date, and the office sees the
 * order marked so. That is why approximate postcode ranges are good enough —
 * a wrong guess changes a sentence, never whether someone can buy.
 */
const CORE_RANGES: [number, number][] = [
  [1000, 2199], // Noord-Holland (Amsterdam, Gooi, Haarlem, Hoofddorp, Noord) and Almere
  [2200, 3399], // Zuid-Holland (Leiden, Den Haag, Rotterdam, Dordrecht)
  [3400, 3999], // Utrecht, Amersfoort and the Veluwe edge (Barneveld, Harderwijk)
  [4000, 4299], // Betuwe (Tiel, Culemborg) and Gorinchem
  [6500, 7399], // Gelderland (Nijmegen, Arnhem, Ede, Doetinchem, Apeldoorn, Zutphen)
  [8050, 8099], // Hattem, Elburg, Nunspeet
];

export const CORE_PROVINCES = 'Noord-Holland, Zuid-Holland, Utrecht en Gelderland';

/** True when a technician visit to this postcode is a normal booking. */
export function inCoreArea(postcode: string): boolean {
  const n = Number(postcode.replace(/\s/g, '').slice(0, 4));
  if (!Number.isInteger(n) || n < 1000) return true; // cannot tell: no warning rather than a wrong one
  return CORE_RANGES.some(([from, to]) => n >= from && n <= to);
}

export const BY_APPOINTMENT_TEXT =
  'Buiten Noord-Holland, Zuid-Holland, Utrecht en Gelderland komt de monteur op afspraak: na uw bestelling bellen wij u om een datum te plannen.';
