import type { ProductAnswer } from '@/lib/answers';

/*
 * The product's questions and answers, written out in the HTML and as
 * FAQPage data. Open <details> by default for the first two, so the answers
 * are in the visible text an assistant quotes, not only behind a click.
 */
export default function ProductAnswers({ title, answer }: { title: string; answer: ProductAnswer }) {
  if (!answer.faq.length) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answer.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <section style={{ maxWidth: 1136, margin: '2rem auto 0', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.25rem 1.5rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h2 style={{ margin: '0 0 .5rem', fontSize: '1.3rem', color: '#111827' }}>Vragen over {title}</h2>
      <p style={{ margin: '0 0 1rem', color: '#334155', lineHeight: 1.65 }}><strong>Kort antwoord:</strong> {answer.summary}</p>
      {answer.faq.map((f, i) => (
        <details key={f.q} open={i < 2} style={{ borderTop: '1px solid #eef0f3', padding: '.75rem 0' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#111827' }}>{f.q}</summary>
          <p style={{ margin: '.5rem 0 0', color: '#475569', lineHeight: 1.6 }}>{f.a}</p>
        </details>
      ))}
    </section>
  );
}
