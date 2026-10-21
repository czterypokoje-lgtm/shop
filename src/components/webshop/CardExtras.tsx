import { ratingSummaries } from '@/lib/reviews';
import { FREE_SHIPPING_FROM, formatPrice } from '@/lib/money';
import { PAYMENT_METHODS } from '@/lib/payments';
import { SERVICE_LABEL, SERVICE_SURCHARGE, servicesFor, type ServiceOption } from '@/lib/services';
import { LOGOS } from '@/components/webshop/PaymentMethods';
import { WHATSAPP_URL } from '@/config/site.config';
import { withBase } from '@/lib/base';
import s from './CardExtras.module.css';

/*
 * The buy block under a product card, in the layout the big parts retailers
 * use: rating, price (red with "BESPAAR" only for a real sale), the fitting
 * service as an add-on, one offer box, payment, help, wishlist. Every line is
 * a fact from the catalogue; nothing is shown that is not true for this item.
 */

/** The service a customer most often adds, as Halfords shows its fitting. */
const ADDON_ORDER: ServiceOption[] = ['mobile_tech', 'send_in', 'cut_only'];

export async function CardBuyBlock({
  slug,
  title,
  price,
  oldPrice = null,
  category,
}: {
  slug?: string;
  title: string;
  price: number | null;
  oldPrice?: number | null;
  category?: string | null;
}) {
  const rating = slug ? (await ratingSummaries()).get(slug) : undefined;
  const onSale = price != null && oldPrice != null && oldPrice > price;
  const options = servicesFor(category);
  const addon = ADDON_ORDER.find((o) => options.includes(o));
  const logos = PAYMENT_METHODS.flatMap((m) => LOGOS[m.id] ?? []).filter((l) => l.id === 'ideal' || l.id === 'paypal');
  const free = price != null && price >= FREE_SHIPPING_FROM;

  return (
    <div className={s.block}>
      {rating && (
        <div className={s.rating} aria-label={`${rating.avg.toFixed(1).replace('.', ',')} van 5 sterren, ${rating.count} reviews`}>
          <span className={s.stars} style={{ ['--fill' as string]: `${(rating.avg / 5) * 100}%` }} aria-hidden="true">★★★★★</span>
          <span className={s.count}>({rating.count})</span>
        </div>
      )}

      <div className={s.priceRow}>
        <span className={onSale ? s.priceSale : s.price}>{formatPrice(price)}</span>
        {onSale && <s className={s.was}>{formatPrice(oldPrice)}</s>}
        {onSale && <span className={s.save}>BESPAAR {formatPrice(oldPrice! - price!)}</span>}
      </div>

      {addon && (
        <div className={s.addon}>
          <span className={s.plus}>+</span>
          <span className={s.addonBadge}>{SERVICE_LABEL[addon]}</span>
          <span>{formatPrice(SERVICE_SURCHARGE[addon])}</span>
        </div>
      )}

      <div className={s.offer}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.4 11.6 12.4 2.6A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7c0 .5.2 1 .6 1.4l9 9a2 2 0 0 0 2.8 0l7-7a2 2 0 0 0 0-2.8ZM6.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" /></svg>
        <span>
          <b>GRATIS VERZENDING</b> {free ? <>bij dit artikel</> : <>vanaf {formatPrice(FREE_SHIPPING_FROM)}</>}
        </span>
      </div>

      <div className={s.line}>
        <span className={s.logos} aria-hidden="true">
          {logos.map((l) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={l.id} src={withBase(`/images/logos/${l.id}.svg`)} alt="" />
          ))}
        </span>
        <span><b>Veilig betalen</b><br />met iDEAL, PayPal of creditcard</span>
      </div>

      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${s.line} ${s.help}`}>
        <span className={s.wa} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4Z" /></svg>
        </span>
        <span>Twijfelt u? <b>Gratis advies</b> via WhatsApp</span>
        <span className={s.chev} aria-hidden="true">›</span>
      </a>

    </div>
  );
}
