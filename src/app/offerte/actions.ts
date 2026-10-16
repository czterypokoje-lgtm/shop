'use server';

import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { SITE_CONFIG } from '@/config/site.config';
import { sendMail } from '@/lib/email';
import { rateLimit } from '@/lib/rateLimit';

export type QuoteState = { ok: boolean; error?: string };

const field = (f: FormData, k: string, max = 120) => String(f.get(k) ?? '').trim().slice(0, max);

/**
 * "Niet in de webshop? Vraag een prijs aan." Lands in the CRM's leads table
 * (source webshop_quote, quoted_price filled in by the office) and in the inbox.
 */
export async function requestQuote(_prev: QuoteState, form: FormData): Promise<QuoteState> {
  if (field(form, 'company')) return { ok: true }; // honeypot

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!(await rateLimit(`quote:${ip}`, 5, 3600)).ok) return { ok: false, error: 'Te veel aanvragen. Bel of app ons even.' };

  const q = {
    name: field(form, 'name'), phone: field(form, 'phone', 40), email: field(form, 'email', 160),
    make: field(form, 'make', 40), model: field(form, 'model', 60), year: field(form, 'year', 4),
    kenteken: field(form, 'kenteken', 12).toUpperCase(), need: field(form, 'need', 60), note: field(form, 'note', 1000),
    page: (h.get('referer') ?? '').slice(0, 200),
  };
  if (!q.name || (!q.phone && !q.email)) return { ok: false, error: 'Vul uw naam en telefoon of e-mail in.' };
  if (q.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(q.email)) return { ok: false, error: 'Controleer uw e-mailadres.' };
  if (!q.make && !q.kenteken) return { ok: false, error: 'Vul het merk of het kenteken in.' };

  const car = [q.make, q.model, q.year].filter(Boolean).join(' ');
  const text = `Prijsaanvraag via de webshop

Auto: ${car || '—'}${q.kenteken ? `\nKenteken: ${q.kenteken}` : ''}
Gezocht: ${q.need || '—'}
${q.note ? `\n${q.note}\n` : ''}
Klant: ${q.name}${q.phone ? ` — ${q.phone}` : ''}${q.email ? ` — ${q.email}` : ''}
Vanaf: ${q.page || '—'}`;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.storage_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.storage_SUPABASE_SERVICE_ROLE_KEY;
  const saved = url && key
    ? !(await createClient(url, key).from('leads').insert([{
        brand: q.make || 'Onbekend', model: q.model || null, service: q.need || 'Prijsaanvraag',
        kenteken: q.kenteken || null, name: q.name, phone: q.phone || null, email: q.email || null,
        scenario: [q.year && `Bouwjaar ${q.year}`, q.note].filter(Boolean).join(' — ') || null,
        source: 'webshop_quote',
      }])).error
    : false;
  const mailed = await sendMail({ to: SITE_CONFIG.email, subject: `Prijsaanvraag: ${car || q.kenteken}`, text, replyTo: q.email || undefined });

  // Neither the CRM nor the inbox got it: say so, never pretend.
  return saved || mailed ? { ok: true } : { ok: false, error: `Versturen lukte niet. Bel of app ons op ${SITE_CONFIG.phone}.` };
}
