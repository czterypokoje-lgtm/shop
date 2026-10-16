import React from 'react';
import type { Metadata } from 'next';
import { isB2B } from '@/lib/b2b';
import AccountClient from './AccountClient';

export const metadata: Metadata = {
  title: 'Inloggen Vakhandel | Autosleutel24',
};

export default async function AccountPage() {
  const b2b = await isB2B();

  return <AccountClient isB2B={b2b} />;
}
