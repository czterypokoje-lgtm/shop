import { SITE_CONFIG } from '@/config/site.config';

/**
 * Transactional e-mail.
 *
 * A customer who pays currently receives nothing at all: no order number, no
 * confirmation of what was bought, no statement of the fourteen days they have
 * to change their mind. Sending that confirmation is not optional — BW 6:230v
 * lid 7 requires the trader to confirm the agreement on a durable medium
 * within a reasonable time after the order.
 *
 * Resend is used because it needs one API key and no SDK. Set:
 *
 *   RESEND_API_KEY=re_…
 *   MAIL_FROM="Autosleutel24 <bestellingen@autosleutel24.nl>"   (optional)
 *
 * With no key configured nothing is sent and the failure is logged loudly
 * rather than swallowed — an order that silently sends no confirmation is a
 * complaint waiting to happen, and the log is where that gets noticed.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export interface Mail {
  to: string;
  subject: string;
  /** Plain text. Line breaks are turned into paragraphs for the HTML part. */
  text: string;
  replyTo?: string;
}

/** Very small text-to-HTML: paragraphs only, everything escaped. */
function asHtml(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const body = escaped
    .split(/\n{2,}/)
    .map((block) => `<p style="margin:0 0 1em">${block.replace(/\n/g, '<br>')}</p>`)
    .join('');

  return `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:15px;line-height:1.6;color:#0f172a;max-width:600px">${body}</div>`;
}

export async function sendMail({ to, subject, text, replyTo }: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error(
      `[email] RESEND_API_KEY is not configured — "${subject}" to ${to} was not sent`
    );
    return false;
  }

  const from = process.env.MAIL_FROM ?? `${SITE_CONFIG.name} <${SITE_CONFIG.email}>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        html: asHtml(text),
        reply_to: replyTo ?? SITE_CONFIG.email,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.error('[email] provider rejected the message', await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('[email] send failed', error);
    return false;
  }
}

interface OrderLine {
  title: string;
  quantity: number;
  lineTotal: number;
  /** Supplier's article number; office mail only. */
  supplierCode?: string | null;
}

const euro = (value: number) => `€${value.toFixed(2).replace('.', ',')}`;

/**
 * The confirmation the customer gets once Mollie reports the payment as paid.
 *
 * It carries what the law asks for on a durable medium: what was bought, what
 * it cost, where it goes, and the fourteen days — including the fact that a
 * key cut or programmed for their car is excluded from it.
 */
export function orderConfirmation(order: {
  order_number: string;
  name: string;
  email: string;
  street: string;
  postcode: string;
  city: string;
  items: OrderLine[];
  total_inc: number;
  shipping_cost: number;
  needs_technician: boolean;
}): Mail {
  const lines = order.items
    .map((i) => `  ${i.quantity}× ${i.title} — ${euro(i.lineTotal)}`)
    .join('\n');

  const text = `Beste ${order.name},

Bedankt voor uw bestelling bij ${SITE_CONFIG.name}. Wij hebben uw betaling ontvangen.

Bestelnummer: ${order.order_number}

${lines}

Verzendkosten: ${order.shipping_cost === 0 ? 'gratis' : euro(order.shipping_cost)}
Totaal betaald: ${euro(order.total_inc)} (incl. btw)
Waarvan btw (21%): ${euro(order.total_inc - order.total_inc / 1.21)}

Bezorgadres:
${order.name}
${order.street}
${order.postcode} ${order.city}

${
  order.needs_technician
    ? 'U heeft gekozen voor een monteurbezoek. Wij bellen u binnen één werkdag om een tijd af te spreken. Houd uw kenteken en een legitimatiebewijs bij de hand — zonder eigendomsbewijs werken wij niet aan een voertuig.'
    : 'Uw bestelling is binnen 3 tot 5 werkdagen bij u. U ontvangt een bericht zodra het pakket onderweg is.'
}

Bedenktijd: u mag de bestelling binnen 14 dagen na ontvangst retourneren, zolang het artikel ongebruikt is. Uit de verpakking halen en bekijken mag. Sleutels die wij op uw verzoek hebben gefreesd of ingeleerd zijn op maat gemaakt en vallen daarbuiten. Is een sleutel ingeleerd (of is dat geprobeerd), gefreesd, geopend of is er elektronica in overgezet, dan is hij niet meer te verkopen en krijgt u bij retour niets terug. De volledige regeling staat op ${SITE_CONFIG.domain}/verzending-en-retour#retour.

Vragen? Bel ${SITE_CONFIG.phone} of antwoord op deze e-mail.

${SITE_CONFIG.fullName}, ${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.postal} ${SITE_CONFIG.address.city}
KvK ${SITE_CONFIG.kvk}${SITE_CONFIG.btw ? ` · Btw ${SITE_CONFIG.btw}` : ''}
${SITE_CONFIG.email} · ${SITE_CONFIG.domain}

---
Modelformulier voor herroeping
(alleen invullen en terugsturen als u de overeenkomst wilt herroepen)

Aan: ${SITE_CONFIG.fullName}, ${SITE_CONFIG.email}
Ik deel u hierbij mede dat ik onze overeenkomst betreffende de verkoop van de volgende producten herroep:
Bestelnummer: ${order.order_number}
Besteld op / ontvangen op:
Naam:
Adres:
Datum:`;

  return {
    to: order.email,
    subject: `Bestelling ${order.order_number} — bevestiging`,
    text,
  };
}

/** The copy that goes to the office, so an order cannot be missed. */
export function orderNotification(order: {
  order_number: string;
  name: string;
  email: string;
  phone: string | null;
  postcode: string;
  city: string;
  total_inc: number;
  needs_technician: boolean;
  items: OrderLine[];
}): Mail {
  const text = `Nieuwe betaalde bestelling: ${order.order_number}

${order.items.map((i) => `  ${i.quantity}× ${i.title}${i.supplierCode ? `  → bestellen als ${i.supplierCode}` : ''}`).join('\n')}

Totaal: ${euro(order.total_inc)}
Klant: ${order.name} — ${order.email}${order.phone ? ` — ${order.phone}` : ''}
Bezorging: ${order.postcode} ${order.city}
${order.needs_technician ? 'MONTEURBEZOEK — bel de klant binnen één werkdag.' : ''}

Open in het CRM: ${SITE_CONFIG.origin}/admin/orders`;

  return {
    to: SITE_CONFIG.email,
    subject: `${order.needs_technician ? '[MONTEUR] ' : ''}Bestelling ${order.order_number} betaald`,
    text,
    replyTo: order.email,
  };
}

/** Where the customer follows the parcel. PostNL needs the postcode in the link. */
export function trackingUrl(carrier: string | null, code: string, postcode = ''): string {
  const c = encodeURIComponent(code.trim());
  const pc = postcode.replace(/\s/g, '').toUpperCase();
  switch ((carrier ?? '').toLowerCase().replace(/[^a-z]/g, '')) {
    case 'postnl': return `https://jouw.postnl.nl/track-and-trace/${c}-NL-${pc}`;
    case 'dhl': return `https://www.dhl.com/nl-nl/home/tracking/tracking-parcel.html?submit=1&tracking-id=${c}`;
    case 'ups': return `https://www.ups.com/track?loc=nl_NL&tracknum=${c}`;
    case 'gls': return `https://gls-group.com/NL/nl/pakket-volgen?match=${c}`;
    case 'dpd': return `https://tracking.dpd.de/status/nl_NL/parcel/${c}`;
    default: return '';
  }
}

/** Sent once, when the office marks the order shipped in the CRM. */
export function orderShipped(order: {
  order_number: string;
  name: string;
  email: string;
  postcode: string;
  carrier: string | null;
  tracking_code: string;
  reviewUrl?: string | null;
}): Mail {
  const url = trackingUrl(order.carrier, order.tracking_code, order.postcode);
  const text = `Beste ${order.name},

Uw bestelling ${order.order_number} is onderweg.

Vervoerder: ${order.carrier ?? '—'}
Track & trace: ${order.tracking_code}${url ? `\nVolg uw pakket: ${url}` : ''}

Meestal wordt het pakket binnen 1 tot 2 werkdagen bezorgd.
${order.reviewUrl ? `\nTevreden? Na ontvangst kunt u hier een review schrijven, met foto's als u wilt:\n${order.reviewUrl}\n` : ''}
Vragen? Bel ${SITE_CONFIG.phone} of antwoord op deze e-mail.

${SITE_CONFIG.fullName} · ${SITE_CONFIG.domain}`;

  return { to: order.email, subject: `Uw bestelling ${order.order_number} is verzonden`, text };
}
