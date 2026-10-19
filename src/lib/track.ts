'use client';

import { PROD_HOSTNAMES } from '@/lib/consent';

/**
 * One way to report what a visitor does: GA4 (through gtag, so Consent Mode
 * decides what is stored) and Microsoft Clarity (event + tag, so a recording
 * can be found by what happened in it). Nothing leaves a dev or demo host.
 *
 * GA4 e-commerce names on purpose (view_item, add_to_cart, begin_checkout …):
 * GA4 builds its purchase funnel and Google Ads its shopping reports from them.
 */
export type TrackItem = {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  price?: number | null;
  quantity?: number;
  item_variant?: string;
};

type Params = Record<string, unknown> & { items?: TrackItem[]; value?: number; currency?: string };

// localStorage.as24_track_debug = '1' prints every event to the console on any host, and sends nothing.
const debug = () => { try { return localStorage.getItem('as24_track_debug') === '1'; } catch { return false; } };

export function track(event: string, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  const body = params.items ? { currency: 'EUR', ...params } : params;
  if (debug()) { console.info('[track]', event, body); return; }
  if (!PROD_HOSTNAMES.includes(window.location.hostname)) return;
  window.gtag?.('event', event, body);
  window.clarity?.('event', event);
}

/** A Clarity tag on this session (e.g. step=checkout), to filter recordings. */
export function tagSession(key: string, value: string | number): void {
  if (typeof window === 'undefined' || !PROD_HOSTNAMES.includes(window.location.hostname)) return;
  window.clarity?.('set', key, String(value));
}
