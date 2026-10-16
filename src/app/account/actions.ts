'use server';

import { cookies, headers } from 'next/headers';
import { B2B_COOKIE, B2B_MAX_AGE, newSessionValue, passwordMatches } from '@/lib/b2b';
import { rateLimit } from '@/lib/rateLimit';

export async function loginB2B(password: string) {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const limit = await rateLimit(`b2b-login:${ip}`, 10, 3600);
  if (!limit.ok) return { success: false, error: 'Te veel pogingen. Probeer het over een uur opnieuw.' };

  if (typeof password !== 'string' || !passwordMatches(password)) {
    return { success: false, error: 'Ongeldig wachtwoord.' };
  }
  (await cookies()).set(B2B_COOKIE, newSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: B2B_MAX_AGE,
  });
  return { success: true };
}

export async function logoutB2B() {
  (await cookies()).delete(B2B_COOKIE);
  return { success: true };
}
