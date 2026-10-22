import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { reviewTokenValid } from '@/lib/reviewToken';
import { reviewsDb } from '@/lib/reviews';
import { getProductBySlug } from '@/lib/catalog';

export const metadata: Metadata = { title: { absolute: 'Review goedkeuren | Autosleutel24' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/*
 * The office's approve link from the e-mail. Opening it only shows the
 * review; publishing takes the button. Mail scanners open every link in a
 * message, and a GET that published would let them approve everything.
 */
export default async function ApproveReview({ params }: { params: Promise<{ id: string; token: string }> }) {
  const { id, token } = await params;
  if (!UUID.test(id) || !reviewTokenValid(`approve:${id}`, token)) notFound();
  const db = reviewsDb();
  if (!db) notFound();
  const { data: r } = await db.from('product_reviews').select('id, product_slug, rating, title, body, author_name, published_at').eq('id', id).maybeSingle();
  if (!r) notFound();
  const product = getProductBySlug(r.product_slug, true);

  async function approve() {
    'use server';
    if (!reviewTokenValid(`approve:${id}`, token)) return;
    await reviewsDb()?.from('product_reviews').update({ published_at: new Date().toISOString() }).eq('id', id).is('published_at', null);
    redirect(`/review/goedkeuren/${id}/${token}`);
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
      <h1 style={{ fontSize: '1.5rem', margin: '0 0 1rem' }}>Review {r.published_at ? 'staat online' : 'goedkeuren'}</h1>
      <p style={{ color: '#475569', margin: '0 0 .5rem' }}>{product?.titleNl ?? r.product_slug}</p>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem 1.25rem', margin: '0 0 1.25rem' }}>
        <div style={{ color: '#f59e0b', fontSize: '1.3rem' }}>{'★'.repeat(r.rating)}<span style={{ color: '#d1d5db' }}>{'★'.repeat(5 - r.rating)}</span></div>
        {r.title && <strong>{r.title}</strong>}
        <p style={{ whiteSpace: 'pre-line' }}>{r.body}</p>
        <small>{r.author_name} · niet geverifieerd</small>
      </div>
      {r.published_at ? (
        <p style={{ color: '#15803d', fontWeight: 700 }}>✓ Goedgekeurd. Hij staat op de productpagina met het label &quot;Niet geverifieerd&quot;.</p>
      ) : (
        <form action={approve}>
          <button style={{ background: '#15803d', color: '#fff', border: 0, borderRadius: 8, padding: '.85rem 1.4rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Goedkeuren en plaatsen</button>
          <p style={{ color: '#64748b', fontSize: '.9rem' }}>Niet goed? Sluit deze pagina; zonder goedkeuring komt de review nooit online.</p>
        </form>
      )}
    </div>
  );
}
