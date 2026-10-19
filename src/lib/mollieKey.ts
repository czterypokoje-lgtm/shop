/**
 * The Mollie API key as Mollie expects it. A key pasted into Vercel with a
 * trailing newline, quotes or a leading "Bearer " made every payment fail with
 * "Invalid Authorization header".
 */
export function mollieKey(): string | null {
  const k = (process.env.MOLLIE_API_KEY ?? '').trim().replace(/^["']|["']$/g, '').replace(/^Bearer\s+/i, '').trim();
  return k || null;
}
