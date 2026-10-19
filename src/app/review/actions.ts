'use server';

import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { headers } from 'next/headers';
import { reviewTokenValid } from '@/lib/reviewToken';
import { reviewsDb } from '@/lib/reviews';
import { rateLimit } from '@/lib/rateLimit';
import { sendMail } from '@/lib/email';
import { SITE_CONFIG } from '@/config/site.config';
import { getProductBySlug } from '@/lib/catalog';

export type ReviewState = { ok: boolean; error?: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PAID = ['paid', 'processing', 'shipped', 'delivered'];
const text = (f: FormData, k: string, max: number) => String(f.get(k) ?? '').trim().slice(0, max);

export async function submitReview(_prev: ReviewState, form: FormData): Promise<ReviewState> {
  const orderId = text(form, 'order', 40);
  const token = text(form, 'token', 64);
  const slug = text(form, 'slug', 120);
  if (!UUID.test(orderId) || !reviewTokenValid(orderId, token)) return { ok: false, error: 'Deze link is niet (meer) geldig.' };

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!(await rateLimit(`review:${ip}`, 10, 3600)).ok) return { ok: false, error: 'Even te veel tegelijk. Probeer het later opnieuw.' };

  const rating = Number(form.get('rating'));
  const body = text(form, 'body', 2000);
  const name = text(form, 'name', 40);
  if (!(rating >= 1 && rating <= 5)) return { ok: false, error: 'Kies 1 tot 5 sterren.' };
  if (body.length < 10) return { ok: false, error: 'Schrijf minstens een korte zin (10 tekens).' };
  if (!name) return { ok: false, error: 'Vul uw naam in (bijv. alleen voornaam).' };

  const db = reviewsDb();
  if (!db) return { ok: false, error: 'Reviews zijn nog niet beschikbaar.' };
  const { data: order } = await db.from('orders').select('id, status, items, order_number').eq('id', orderId).maybeSingle();
  if (!order || !PAID.includes(order.status)) return { ok: false, error: 'Deze bestelling is niet gevonden of nog niet betaald.' };
  // Orders placed before the product keys changed still carry the old one: compare the products, not the strings.
  const line = (order.items as { slug?: string; title: string }[]).find((l) => l.slug === slug || (l.slug && getProductBySlug(l.slug, true)?.slug === slug));
  if (!line) return { ok: false, error: 'Dit product hoort niet bij deze bestelling.' };

  // Photos: at most 3, re-encoded here — which also drops EXIF, including the GPS location phones add.
  const photos: string[] = [];
  for (const f of form.getAll('photos').slice(0, 3)) {
    if (!(f instanceof File) || !f.size) continue;
    if (f.size > 4 * 1024 * 1024 || !/^image\//.test(f.type)) return { ok: false, error: 'Een foto is te groot of geen afbeelding.' };
    let webp: Buffer;
    try {
      webp = await sharp(Buffer.from(await f.arrayBuffer())).rotate().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
    } catch { return { ok: false, error: 'Een foto kon niet worden gelezen. Probeer JPG of PNG.' }; }
    const path = `${slug}/${randomUUID()}.webp`;
    const up = await db.storage.from('review-photos').upload(path, webp, { contentType: 'image/webp' });
    if (up.error) return { ok: false, error: 'Foto uploaden lukte niet. Probeer het zonder foto of later opnieuw.' };
    photos.push(path);
  }

  const { error } = await db.from('product_reviews').insert({
    product_slug: slug, order_id: orderId, rating, title: text(form, 'title', 120) || null, body, author_name: name, photos,
    // Only buyers can get here; the office can take a review down in the CRM.
    published_at: new Date().toISOString(),
  });
  if (error) return { ok: false, error: error.code === '23505' ? 'U heeft dit product al beoordeeld. Bedankt!' : 'Opslaan lukte niet. Probeer het later opnieuw.' };

  await sendMail({
    to: SITE_CONFIG.email,
    subject: `Nieuwe review (${rating}★): ${line.title}`,
    text: `${name} gaf ${rating} van 5 sterren voor ${line.title} (bestelling ${order.order_number}).\n\n${body}\n\n${photos.length} foto('s). Staat direct online: ${SITE_CONFIG.domain}/product/${slug}#reviews\nOngepast? Zet published_at op leeg in product_reviews.`,
  });
  return { ok: true };
}
