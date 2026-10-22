import Link from 'next/link';
import { formatPrice, FREE_SHIPPING_FROM } from '@/lib/money';
import { withBase } from '@/lib/base';
import { WHATSAPP_URL } from '@/config/site.config';
import s from './HomeService.module.css';

/*
 * The people side of the shop, in the style of the big service retailers:
 * photo cards ("waarom bij ons") and two service banners.
 *
 * The photos are AI-generated brand images of a fictional technician. They
 * illustrate the service; they are never presented as a named employee and
 * never placed next to a review.
 */

const MAIN_SITE = 'https://www.autosleutel24.nl';

const WHY: { img: string; alt: string; title: string; text: string; cta: string; href: string; external?: boolean }[] = [
  {
    img: '/images/brand/monteur-inleren-bij-auto.webp',
    alt: 'Monteur leert een nieuwe autosleutel in bij de auto',
    title: 'Ingeleerd door een specialist',
    text: 'Kies bij uw bestelling voor inleren door onze monteur: bij u aan huis of uw sleutel opgestuurd. Dan weet u zeker dat hij werkt.',
    cta: 'Zo werkt inleren',
    href: `${MAIN_SITE}/diensten/autosleutel-bijmaken`,
    external: true,
  },
  {
    img: '/images/brand/bestelling-inpakken.webp',
    alt: 'Een bestelling met een autosleutel wordt ingepakt',
    title: 'Binnen 3–5 werkdagen in huis',
    text: `Op werkdagen verzonden, met track & trace. Gratis verzending vanaf ${formatPrice(FREE_SHIPPING_FROM)} en 14 dagen bedenktijd.`,
    cta: 'Verzending en retour',
    href: '/verzending-en-retour',
  },
  {
    img: '/images/brand/advies-whatsapp.webp',
    alt: 'Advies over de juiste sleutel via WhatsApp',
    title: 'Twijfelt u? App ons een foto',
    text: 'Stuur een foto van uw sleutel. Wij zoeken het juiste artikel voor u op, gratis en vrijblijvend.',
    cta: 'Stuur een foto via WhatsApp',
    href: WHATSAPP_URL,
    external: true,
  },
];

export function HomeWhyUs() {
  return (
    <section className={s.section}>
      <div className="container">
        <h2 className={s.h2}>Waarom bij Autosleutel24</h2>
        <div className={s.why}>
          {WHY.map((w) => {
            const body = (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withBase(w.img)} alt={w.alt} loading="lazy" width={1400} height={930} />
                <div className={s.whyBody}>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                  <span className={s.link}>{w.cta} <span aria-hidden="true">›</span></span>
                </div>
              </>
            );
            return w.external ? (
              <a key={w.title} href={w.href} {...(w.href.includes("wa.me") && { target: "_blank", rel: "noopener noreferrer" })} className={s.card}>{body}</a>
            ) : (
              <Link key={w.title} href={w.href} className={s.card}>{body}</Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const BANNERS = [
  {
    img: '/images/brand/monteur-bus.webp',
    alt: 'Monteur stapt uit de servicebus',
    title: 'Monteur aan huis',
    sub: 'Wij komen naar u toe.',
    cta: 'Bekijk de sleutelservice',
    href: `${MAIN_SITE}/`,
  },
  {
    img: '/images/brand/monteur-sleutel-overhandigen.webp',
    alt: 'Monteur overhandigt een nieuwe autosleutel aan een klant',
    title: 'Sleutel kwijt',
    sub: 'Ter plekke een nieuwe.',
    cta: 'Lees hoe het werkt',
    href: `${MAIN_SITE}/autosleutel-kwijt`,
  },
];

export function HomeServiceBanners() {
  return (
    <section className={s.section}>
      <div className={`container ${s.banners}`}>
        {BANNERS.map((b) => (
          <a key={b.title} href={b.href} className={s.banner}>
            <div className={s.bannerText}>
              <strong className={s.bannerTitle}>{b.title}<span className={s.dot}>.</span></strong>
              <span className={s.bannerSub}>{b.sub}</span>
              <span className={s.bannerCta}><span aria-hidden="true">›</span> {b.cta}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase(b.img)} alt={b.alt} loading="lazy" width={1400} height={930} />
          </a>
        ))}
      </div>
    </section>
  );
}
