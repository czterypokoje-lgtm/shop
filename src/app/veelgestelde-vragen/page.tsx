import type { Metadata } from 'next';
import Link from 'next/link';
import { ADVIES } from '@/content/advies';
import { SHOP_FAQ } from '@/content/shopFaq';
import { SITE_CONFIG, WHATSAPP_URL } from '@/config/site.config';
import s from '../advies/Advies.module.css';

export const metadata: Metadata = {
  title: 'Veelgestelde vragen over autosleutels',
  description: 'Antwoorden op alle vragen over autosleutels, behuizingen, inleren, frezen, batterijen, verzending en retour. Kort en duidelijk.',
  alternates: { canonical: `${SITE_CONFIG.domain}/veelgestelde-vragen` },
};

/*
 * Every question we answer anywhere, on one page: the shop's own and the
 * ones from each advice article. One FAQPage for all of it, so a search
 * engine or an assistant finds the answer here without reading twelve pages.
 */
export default function FaqPage() {
  const groups = [
    ...SHOP_FAQ,
    { group: 'Over autosleutels', items: ADVIES.flatMap((a) => a.faq.map((f) => ({ ...f, href: `/advies/${a.slug}` }))) },
  ];
  const all = groups.flatMap((g) => g.items);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: all.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={s.hero}>
        <div className={`${s.wrap} ${s.narrow}`}>
          <nav className={s.crumbs} aria-label="Kruimelpad"><Link href="/">Webshop</Link> › <span>Veelgestelde vragen</span></nav>
          <h1>Veelgestelde vragen</h1>
          <p className={s.lead}>{all.length} vragen over autosleutels, bestellen, frezen, inleren, verzending en retour, kort beantwoord.</p>
        </div>
      </section>
      <div className={`${s.wrap} ${s.narrow}`}>
        {groups.map((g) => (
          <section key={g.group} className={s.faq} style={{ marginTop: '1.25rem' }}>
            <h2>{g.group}</h2>
            {g.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>
                  {f.a}
                  {'href' in f && f.href ? <> <Link href={f.href as string}>Lees meer →</Link></> : null}
                </p>
              </details>
            ))}
          </section>
        ))}
        <div className={s.help}>
          <p><b>Staat uw vraag er niet bij?</b>Stuur ons een bericht of een foto van uw sleutel.</p>
          <a className={s.wa} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Vraag het via WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
