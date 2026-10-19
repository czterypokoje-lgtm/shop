/**
 * The shop can run at the root (demo, local) or under a path on the main site
 * (www.autosleutel24.nl/webshop). Next.js prefixes <Link>s and its own assets;
 * plain <img src>, files from /public and fetch() calls need this.
 * Set NEXT_PUBLIC_BASE_PATH=/webshop at build time to move the shop.
 */
export const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '');

export const withBase = (path: string): string =>
  BASE && path.startsWith('/') && !path.startsWith('//') && !path.startsWith(`${BASE}/`) ? `${BASE}${path}` : path;
