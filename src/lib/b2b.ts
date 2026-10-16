import 'server-only';
import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

/**
 * Trade (B2B) access. The password and the signing secret live in env; without
 * them the trade catalogue is simply closed. The cookie carries an expiry
 * signed with B2B_SECRET, so it cannot be set by hand the way
 * `b2b_session=true` could.
 */
export const B2B_COOKIE = 'b2b_session';
const MAX_AGE = 60 * 60 * 24 * 30;

const secret = () => process.env.B2B_SECRET ?? '';
const sign = (exp: string) => createHmac('sha256', secret()).update(`b2b:${exp}`).digest('hex');

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export function b2bConfigured(): boolean {
  return Boolean(process.env.B2B_PASSWORD && secret().length >= 32);
}

export function passwordMatches(password: string): boolean {
  return b2bConfigured() && same(password, process.env.B2B_PASSWORD!);
}

export function newSessionValue(): string {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE);
  return `${exp}.${sign(exp)}`;
}

export function sessionValid(value: string | undefined): boolean {
  if (!value || !b2bConfigured()) return false;
  const [exp, mac] = value.split('.');
  if (!exp || !mac || Number(exp) < Date.now() / 1000) return false;
  return same(mac, sign(exp));
}

export async function isB2B(): Promise<boolean> {
  return sessionValid((await cookies()).get(B2B_COOKIE)?.value);
}

export const B2B_MAX_AGE = MAX_AGE;
