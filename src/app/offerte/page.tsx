import type { Metadata } from 'next';
import QuoteRequest from '@/components/webshop/QuoteRequest';

export const metadata: Metadata = {
  title: 'Prijsaanvraag autosleutel | Autosleutel24',
  description: 'Uw sleutel niet in de webshop? Vul uw auto in en ontvang binnen één werkdag een vrijblijvende prijs.',
  alternates: { canonical: '/offerte' },
};

export default async function OffertePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const one = (v: unknown) => (typeof v === 'string' ? v : '');
  return (
    <main className="shop-container" style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <QuoteRequest make={one(sp.make)} model={one(sp.model)} title="Prijsaanvraag" />
    </main>
  );
}
