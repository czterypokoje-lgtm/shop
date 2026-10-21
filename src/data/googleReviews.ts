/*
 * Real Google reviews of Autosleutel24 (the key service), copied from the
 * main site's REVIEWS (src/components/GoogleReviewsCta in the main repo),
 * which transcribes the Google Business Profile. Never add one that is not
 * on that profile (BW 6:193c). Reviews Google truncates with "…" are quoted
 * up to their last complete sentence only.
 */
const RAW = [
  { name: 'Stijn Van Arkel', text: 'De monteur kwam netjes bij mij op locatie en heeft binnen één uur twee nieuwe autosleutels ingeleerd op de auto. Alles werkte direct en de service was snel en …' },
  { name: 'Julia Van Doorn', text: 'Uitstekende service! Autosleutel voor Mercedes, twee uur later klaar. …' },
  { name: 'Baran Kaya', text: 'Good service, They make key for my bmw m5 in 30 minute, Very friendly and professional service. i recommend' },
  { name: 'ışıl güvercin', text: 'Fast and trustful service. The young technician took care of everything; he opened my Golf door in approximately 1 minute. Very professional and clean work. I highly recommend him' },
  { name: 'xXx XxX', text: 'Very friendly and competent service. They were able to make two complete replacement keys for a 2011 Mercedes Vito W639 at a fair and transparent price. I recommend.' },
  { name: 'Cahit Keskin', text: 'Their workmanship was excellent and fast; I was very pleased' },
];

function completeSentences(text: string): string {
  if (!text.includes('…')) return text;
  const cut = text.slice(0, text.lastIndexOf('…'));
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return end > 0 ? cut.slice(0, end + 1) : cut.trim();
}

export const GOOGLE_REVIEWS = RAW.map((r) => ({ name: r.name, text: completeSentences(r.text) }));
