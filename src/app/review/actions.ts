'use server';

import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { headers } from 'next/headers';
import { reviewToken, reviewTokenValid } from '@/lib/reviewToken';
import { reviewsDb } from '@/lib/reviews';
import { rateLimit } from '@/lib/rateLimit';
import { sendMail } from '@/lib/email';
import { SITE_CONFIG, OPEN_REVIEWS } from '@/config/site.config';
import { getProductBySlug } from '@/lib/catalog';

export type ReviewState = { ok: boolean; error?: string; published?: boolean };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PAID = ['paid', 'processing', 'shipped', 'delivered'];
const text = (f: FormData, k: string, max: number) => String(f.get(k) ?? '').trim().slice(0, max);

export async function submitReview(_prev: ReviewState, form: FormData): Promise<ReviewState> {
  const orderId = text(form, 'order', 40);
  const token = text(form, 'token', 64);
  const slug = text(form, 'slug', 120);
  // No order: an open review from the product page (see OPEN_REVIEWS).
  if (!orderId) return submitOpenReview(form, slug);
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

  const uploaded = await uploadPhotos(db, form, slug);
  if ('error' in uploaded) return { ok: false, error: uploaded.error };
  const photos = uploaded.photos;

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

/** Photos: at most 3, re-encoded here — which also drops EXIF, including the GPS location phones add. */
async function uploadPhotos(db: NonNullable<ReturnType<typeof reviewsDb>>, form: FormData, slug: string): Promise<{ photos: string[] } | { error: string }> {
  const photos: string[] = [];
  for (const f of form.getAll('photos').slice(0, 3)) {
    if (!(f instanceof File) || !f.size) continue;
    if (f.size > 4 * 1024 * 1024 || !/^image\//.test(f.type)) return { error: 'Een foto is te groot of geen afbeelding.' };
    let webp: Buffer;
    try {
      webp = await sharp(Buffer.from(await f.arrayBuffer())).rotate().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
    } catch { return { error: 'Een foto kon niet worden gelezen. Probeer JPG of PNG.' }; }
    const path = `${slug}/${randomUUID()}.webp`;
    const up = await db.storage.from('review-photos').upload(path, webp, { contentType: 'image/webp' });
    if (up.error) return { error: 'Foto uploaden lukte niet. Probeer het zonder foto of later opnieuw.' };
    photos.push(path);
  }
  return { photos };
}

/**
 * A review from anyone, written on the product page.
 *
 * Saved unpublished and marked unverified: the office gets an e-mail with a
 * link to approve it, and only then does it appear, labelled "Niet
 * geverifieerd" (BW 6:193g lid 1 sub f: say whether and how reviews are
 * checked). The e-mail address is asked so the office can tell a person from
 * a script; it is never shown.
 */
async function submitOpenReview(form: FormData, slug: string): Promise<ReviewState> {
  if (!OPEN_REVIEWS) return { ok: false, error: 'Reviews kunnen alleen via de link in uw bestelmail.' };
  if (text(form, 'website', 200)) return { ok: true }; // honeypot: a bot is told it worked
  const product = getProductBySlug(slug, true);
  if (!product) return { ok: false, error: 'Dit product bestaat niet (meer).' };

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!(await rateLimit(`review-open:${ip}`, 3, 3600)).ok) return { ok: false, error: 'Even te veel tegelijk. Probeer het later opnieuw.' };

  const rating = Number(form.get('rating'));
  const body = text(form, 'body', 2000);
  const name = text(form, 'name', 40);
  const email = text(form, 'email', 120);
  if (!(rating >= 1 && rating <= 5)) return { ok: false, error: 'Kies 1 tot 5 sterren.' };
  if (body.length < 10) return { ok: false, error: 'Schrijf minstens een korte zin (10 tekens).' };
  if (!name) return { ok: false, error: 'Vul uw naam in (bijv. alleen voornaam).' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: 'Vul een geldig e-mailadres in (wordt niet getoond).' };
  if (/https?:\/\/|www\./i.test(body)) return { ok: false, error: 'Links zijn niet toegestaan in een review.' };

  const db = reviewsDb();
  if (!db) return { ok: false, error: 'Reviews zijn nog niet beschikbaar.' };

  /*
   * An order number turns this into a buyer's review: the order must exist,
   * be paid, belong to the same e-mail address and contain this product.
   * Both together, so a number read off someone else's parcel is not enough.
   * Then it is verified and goes online at once, like the e-mail link.
   */
  const orderNumber = text(form, 'orderNumber', 30).toUpperCase().replace(/\s+/g, '');
  let order: { id: string; order_number: string } | null = null;
  if (orderNumber) {
    const { data: o } = await db.from('orders').select('id, order_number, status, email, items').eq('order_number', orderNumber).maybeSingle();
    const hasProduct = (o?.items as { slug?: string }[] | undefined)?.some((l) => l.slug === slug || (l.slug && getProductBySlug(l.slug, true)?.slug === slug));
    if (!o || !PAID.includes(o.status) || String(o.email).toLowerCase() !== email.toLowerCase() || !hasProduct) {
      return { ok: false, error: 'Dit bestelnummer hoort niet bij dit e-mailadres of dit product. Controleer het, of laat het veld leeg.' };
    }
    order = { id: o.id, order_number: o.order_number };
  }

  const uploaded = await uploadPhotos(db, form, slug);
  if ('error' in uploaded) return { ok: false, error: uploaded.error };

  const { data, error } = await db.from('product_reviews').insert({
    product_slug: slug, order_id: order?.id ?? null, verified: Boolean(order), email, rating,
    title: text(form, 'title', 120) || null, body, author_name: name, photos: uploaded.photos,
    published_at: order ? new Date().toISOString() : null,
  }).select('id').single();
  if (error || !data) return { ok: false, error: error?.code === '23505' ? 'U heeft dit product al beoordeeld. Bedankt!' : 'Opslaan lukte niet. Probeer het later opnieuw.' };

  if (order) {
    await sendMail({
      to: SITE_CONFIG.email,
      subject: `Nieuwe review (${rating}★, geverifieerd): ${product.titleNl}`,
      text: `${name} gaf ${rating} van 5 sterren voor ${product.titleNl} (bestelling ${order.order_number}).\n\n${body}\n\n${uploaded.photos.length} foto('s). Staat direct online: ${SITE_CONFIG.domain}/product/${product.urlSlug}#reviews`,
    });
    return { ok: true, published: true };
  }

  const token = reviewToken(`approve:${data.id}`);
  await sendMail({
    to: SITE_CONFIG.email,
    subject: `Review ter goedkeuring (${rating}★): ${product.titleNl}`,
    text: `${name} (${email}) gaf ${rating} van 5 sterren voor ${product.titleNl}. Niet geverifieerd: geen bestelling.\n\n${body}\n\n${uploaded.photos.length} foto('s).\n\nGoedkeuren: ${SITE_CONFIG.domain}/review/goedkeuren/${data.id}/${token}\nNiet goedkeuren: niets doen, dan komt hij nooit online.`,
  });
  return { ok: true };
}
