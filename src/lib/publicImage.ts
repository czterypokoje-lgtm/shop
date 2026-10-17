import { createHash } from 'crypto';

/**
 * A product photo as it is served: originals live in assets/products under the
 * supplier's file name, and scripts/build-catalog.mjs publishes each one as
 * /images/products/p-<sha1 of the name>.<ext>. Paths the CRM stored the old way
 * are mapped the same way here.
 */
export function publicImage(url: string | null | undefined): string | null {
  if (!url || !url.startsWith('/images/products/') || /\/p-[0-9a-f]{12}\.\w+$/.test(url)) return url ?? null;
  const name = url.slice('/images/products/'.length);
  const ext = name.includes('.') ? name.slice(name.lastIndexOf('.')) : '';
  return `/images/products/p-${createHash('sha1').update(name).digest('hex').slice(0, 12)}${ext}`;
}
