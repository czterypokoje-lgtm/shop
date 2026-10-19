'use client';

import { useEffect } from 'react';
import { track, tagSession, type TrackItem } from '@/lib/track';

/** Fires one analytics event when a server-rendered page is shown (view_item, view_item_list, search …). */
export default function TrackView({ event, params, tag }: { event: string; params?: Record<string, unknown> & { items?: TrackItem[] }; tag?: [string, string] }) {
  const key = JSON.stringify([event, params, tag]);
  useEffect(() => {
    track(event, params);
    if (tag) tagSession(tag[0], tag[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return null;
}

/**
 * Taps on WhatsApp and phone links anywhere in the shop, under the same event
 * names the service site marks as key events (click_to_whatsapp, click_to_call).
 */
export function ContactClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      const href = a?.getAttribute('href') ?? '';
      if (/wa\.me|whatsapp/i.test(href)) track('click_to_whatsapp', { link_url: href.split('?')[0], page_location: location.pathname });
      else if (href.startsWith('tel:')) track('click_to_call', { page_location: location.pathname });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
