import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { reviewTokenValid } from '@/lib/reviewToken';
import { reviewsDb } from '@/lib/reviews';
import { getShopProductBySlug } from '@/lib/shopCatalog';
import ReviewForm from '@/components/webshop/ReviewForm';

export const metadata: Metadata = { title: { absolute: 'Uw review | Autosleutel24' }, robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const PAID = ['paid', 'processing', 'shipped', 'delivered'];

export default async function ReviewPage({ params }: { params: Promise<{ order: string; token: string }> }) {
  const { order: orderId, token } = await params;
  if (!reviewTokenValid(orderId, token)) notFound();
  const db = reviewsDb();
  if (!db) notFound();
  const { data: order } = await db.from('orders').select('id, status, name, items').eq('id', orderId).maybeSingle();
  if (!order || !PAID.includes(order.status)) notFound();
  const { data: done } = await db.from('product_reviews').select('product_slug').eq('order_id', orderId);
  const reviewed = new Set((done ?? []).map((r) => r.product_slug));

  const slugs = [...new Set((order.items as { slug?: string }[]).map((l) => l.slug).filter(Boolean) as string[])];
  const products = (await Promise.all(slugs.map((s) => getShopProductBySlug(s, true)))).filter(Boolean);
  const firstName = String(order.name ?? '').split(' ')[0];

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
      <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', margin: '0 0 .4rem' }}>Hoe bevalt uw bestelling?</h1>
      <p style={{ color: '#475569', margin: '0 0 1.75rem' }}>
        Uw ervaring helpt andere automobilisten de juiste sleutel te kiezen. Alleen klanten met een bestelling kunnen een review schrijven.
      </p>
      {products.map((p) => (
        <ReviewForm key={p!.slug} orderId={orderId} token={token} slug={p!.slug} title={p!.titleNl} image={p!.image} defaultName={firstName} done={reviewed.has(p!.slug)} />
      ))}
    </div>
  );
}
