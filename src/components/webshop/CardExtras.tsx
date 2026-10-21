import { ratingSummaries } from '@/lib/reviews';
import { FREE_SHIPPING_FROM, formatPrice } from '@/lib/money';
import { PAYMENT_METHODS } from '@/lib/payments';
import { LOGOS } from '@/components/webshop/PaymentMethods';
import { withBase } from '@/lib/base';
import s from './CardExtras.module.css';

/** Stars from real reviews only (nothing when there are none). */
export async function CardRating({ slug }: { slug?: string }) {
  if (!slug) return null;
  const r = (await ratingSummaries()).get(slug);
  if (!r) return null;
  return (
    <div className={s.rating} aria-label={`${r.avg.toFixed(1).replace('.', ',')} van 5 sterren, ${r.count} reviews`}>
      <span className={s.stars} style={{ ['--fill' as string]: `${(r.avg / 5) * 100}%` }} aria-hidden="true">★★★★★</span>
      <span className={s.count}>({r.count})</span>
    </div>
  );
}

/** The offer and payment rows under a card's price, as the big shops list them. Only real offers. */
export function CardRows({ price, compact = false }: { price: number | null; compact?: boolean }) {
  const logos = PAYMENT_METHODS.flatMap((m) => LOGOS[m.id] ?? []).filter((l) => l.id !== 'bancontact');
  return (
    <div className={s.rows}>
      <div className={s.offer}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.4 11.6 12.4 2.6A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7c0 .5.2 1 .6 1.4l9 9a2 2 0 0 0 2.8 0l7-7a2 2 0 0 0 0-2.8ZM6.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" /></svg>
        {price != null && price >= FREE_SHIPPING_FROM
          ? <span><b>Gratis verzending</b></span>
          : <span><b>Gratis verzending</b> vanaf {formatPrice(FREE_SHIPPING_FROM)}</span>}
      </div>
      <div className={s.pay}>
        <span className={s.logos} aria-hidden="true">
          {logos.map((l) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={l.id} src={withBase(`/images/logos/${l.id}.svg`)} alt="" />
          ))}
        </span>
        {!compact && <span>Veilig betalen</span>}
      </div>
    </div>
  );
}
