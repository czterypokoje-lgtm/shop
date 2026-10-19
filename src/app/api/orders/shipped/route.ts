import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { timingSafeEqual } from 'crypto';
import { sendMail, orderShipped } from '@/lib/email';

/**
 * Called by the database (supabase/0077_order_shipped_webhook.sql) the moment
 * the office sets an order to "shipped" in the CRM. The payload only says which
 * order; everything mailed is read back from the database, so a forged call can
 * at most re-send a real customer their own track & trace.
 */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const sameSecret = (a: string, b: string) =>
  a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export async function POST(request: Request) {
  const secret = process.env.ORDER_WEBHOOK_SECRET;
  const given = request.headers.get('x-webhook-secret') ?? '';
  if (!secret || !sameSecret(given, secret)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = (await request.json().catch(() => null)) as { record?: { id?: string; status?: string }; old_record?: { status?: string } } | null;
  const id = body?.record?.id;
  if (!id || !UUID.test(id)) return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  if (body?.old_record?.status === 'shipped') return NextResponse.json({ skipped: 'already shipped' });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.storage_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.storage_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: 'Not configured' }, { status: 503 });

  const { data: order } = await createClient(url, key)
    .from('orders')
    .select('order_number, name, email, postcode, status, carrier, tracking_code')
    .eq('id', id)
    .maybeSingle();
  if (!order || order.status !== 'shipped' || !order.tracking_code || !order.email) {
    return NextResponse.json({ skipped: 'not shipped or no tracking code' });
  }

  const sent = await sendMail(orderShipped(order));
  return NextResponse.json({ sent }, { status: sent ? 200 : 502 });
}
