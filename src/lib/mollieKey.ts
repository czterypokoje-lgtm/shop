/**
 * The Mollie API key as Mollie expects it. A key pasted into Vercel with a
 * trailing newline, quotes or a leading "Bearer " made every payment fail with
 * "Invalid Authorization header".
 */
export function mollieKey(): string | null {
  const k = (process.env.MOLLIE_API_KEY ?? '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // invisible characters from copy-paste
    .trim()
    .replace(/^MOLLIE_API_KEY\s*=\s*/i, '') // the whole .env line pasted
    .replace(/^["']|["']$/g, '')
    .replace(/^Bearer\s+/i, '')
    .trim();
  return k || null;
}
