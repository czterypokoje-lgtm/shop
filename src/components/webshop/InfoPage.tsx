import Link from 'next/link';
import type { ReactNode } from 'react';
import { WHATSAPP_URL } from '@/config/site.config';
import s from '@/app/advies/Advies.module.css';

/*
 * The shared frame for the shop's own information pages (bestellen,
 * betaalmethoden, over ons, zakelijk): same hero, column and help bar as the
 * advice articles, so every "how does it work" page looks like one site.
 */
export default function InfoPage({ crumb, title, lead, children, jsonLd }: {
  crumb: string; title: string; lead: string; children: ReactNode; jsonLd?: object[];
}) {
  return (
    <div className={s.page}>
      {jsonLd?.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <section className={s.hero}>
        <div className={`${s.wrap} ${s.narrow}`}>
          <nav className={s.crumbs} aria-label="Kruimelpad"><Link href="/">Webshop</Link> › <span>{crumb}</span></nav>
          <h1>{title}</h1>
          <p className={s.lead}>{lead}</p>
        </div>
      </section>
      <div className={`${s.wrap} ${s.narrow}`}>
        <article className={s.body}>{children}</article>
        <div className={s.help}>
          <p><b>Vragen?</b>Stuur ons een bericht, ook met een foto van uw sleutel.</p>
          <a className={s.wa} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp ons</a>
        </div>
      </div>
    </div>
  );
}

export { s as infoStyles };
