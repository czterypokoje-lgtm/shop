/**
 * New-order alert to Slack, alongside the office e-mail in
 * src/lib/email.ts — same trigger, same data, a second channel so a Resend
 * outage isn't the only thing standing between a paid order and someone
 * noticing it.
 *
 * Uses a plain Incoming Webhook (one POST, no SDK, no bot token) rather than
 * the Slack Web API: an order notification needs no replies, no threads, no
 * reactions — just "it happened, go look." If that ever changes, upgrade
 * then.
 */

interface OrderLine {
  title: string;
  quantity: number;
  lineTotal: number;
}

const euro = (n: number) => `€${n.toFixed(2).replace('.', ',')}`;

export async function notifySlackOrder(order: {
  order_number: string;
  name: string;
  email: string;
  phone: string | null;
  postcode: string;
  city: string;
  total_inc: number;
  needs_technician: boolean;
  items: OrderLine[];
}): Promise<void> {
  const url = process.env.SLACK_ORDERS_WEBHOOK_URL;
  if (!url) return; // Not configured — silent, like the rest of this webhook's optional side effects.

  const lines = order.items.map((i) => `${i.quantity}× ${i.title}`).join('\n');
  const text = [
    `${order.needs_technician ? '🔧 *MONTEUR* — ' : '💰 '}*Nieuwe bestelling ${order.order_number}* — ${euro(order.total_inc)}`,
    lines,
    `${order.name} — ${order.email}${order.phone ? ` — ${order.phone}` : ''}`,
    `${order.postcode} ${order.city}`,
    order.needs_technician ? '_Bel de klant binnen één werkdag._' : undefined,
  ].filter(Boolean).join('\n');

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    // Never block or fail the webhook over a Slack hiccup — the e-mail already went out.
    console.error('[slack] order notification failed', error);
  }
}
