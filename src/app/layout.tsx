import type { Metadata } from 'next';
import { withBase } from '@/lib/base';
import './globals.css';
import Script from 'next/script';
import { ContactClicks } from '@/components/webshop/TrackView';
import ConsentBanner from '@/components/ConsentBanner/ConsentBanner';
import WhatsAppButton from '@/components/WhatsAppButton/WhatsAppButton';
import ChatButton from '@/components/ChatButton/ChatButton';
import AdVisitBeacon from '@/components/Tracking/AdVisitBeacon';
import WebshopNavigation from '@/components/webshop/WebshopNavigation';
import WebshopFooter from '@/components/webshop/WebshopFooter';
import { SITE_CONFIG, SHOP_INDEXABLE } from '@/config/site.config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    template: '%s | Autosleutel24 Shop',
    default: 'Autosleutels, behuizingen en afstandsbedieningen | Autosleutel24 Shop',
  },
  description: 'Autosleutels, sleutelbehuizingen, afstandsbedieningen en batterijen voor alle merken. Prijzen incl. btw, verzonden binnen 3–5 werkdagen.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: `${SITE_CONFIG.name} Shop`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  icons: {
    icon: [
      { url: withBase('/favicon.ico'), sizes: 'any' },
      { url: withBase('/icon.png'), type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: withBase('/apple-icon.png'), sizes: '180x180', type: 'image/png' }],
  },
  /*
   * Open to search engines since 22-10-2026. SHOP_INDEXABLE=0 in Vercel plus
   * a redeploy closes it again; this line and robots.ts both read it. Workshop stock stays noindex either way
   * (src/lib/focus.ts).
   */
  // Google Merchant Center: online store claim (22-10-2026).
  verification: { google: '9pB-P7HYgyVPFmvO7frcVHpa9y7Lv4lYy5zvjbiXXaU' },
  robots: SHOP_INDEXABLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const storeSchema = {
  '@context': 'https://schema.org',
  '@type': 'OnlineStore',
  '@id': `${SITE_CONFIG.domain}/#store`,
  name: `${SITE_CONFIG.name} Shop`,
  // The seller of record; the shop trades under the Autosleutel24 name.
  legalName: SITE_CONFIG.fullName,
  identifier: { '@type': 'PropertyValue', propertyID: 'KvK', value: SITE_CONFIG.kvk },
  // One stock, shipped nationwide: no city pages, the whole country is the area.
  areaServed: { '@type': 'Country', name: 'Nederland', identifier: 'NL' },
  url: SITE_CONFIG.domain,
  email: SITE_CONFIG.email,
  telephone: SITE_CONFIG.phoneTel,
  ...(SITE_CONFIG.btw ? { vatID: SITE_CONFIG.btw } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address.street,
    postalCode: SITE_CONFIG.address.postal,
    addressLocality: SITE_CONFIG.address.city,
    addressCountry: SITE_CONFIG.address.country,
  },
  inLanguage: 'nl-NL',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <meta name="theme-color" content="#0d2137" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          id="schema-store"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
      </head>
      <body>
        {/* Consent Mode v2 defaults: nothing is stored until the visitor accepts. */}
        <Script id="consent-defaults">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent','default',{
              ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied',
              analytics_storage:'denied', functionality_storage:'granted',
              security_storage:'granted', personalization_storage:'denied',
              wait_for_update: 500
            });
            gtag('set','ads_data_redaction', true);
          `}
        </Script>
        {/*
          GA4 straight through gtag.js, into the same property as the service site (G-C4WR7TYCTV): one
          journey from ad or search through service page and shop to payment. Only on the real domain —
          the Vercel demo and localhost never count as visitors. Consent Mode above decides what is stored.

          The Ads conversion ID (AW-18511036958) rides the same gtag.js load — one script, two
          `config` calls, per Google's own multi-product setup.
        */}
        <Script id="ga4">
          {`
            if (['www.autosleutel24.nl','autosleutel24.nl'].indexOf(location.hostname) !== -1) {
              var g = document.createElement('script'); g.async = true;
              g.src = 'https://www.googletagmanager.com/gtag/js?id=G-C4WR7TYCTV';
              document.head.appendChild(g);
              gtag('js', new Date());
              gtag('config', 'G-C4WR7TYCTV', { content_group: 'webshop' });
              gtag('config', 'AW-18511036958');
            }
          `}
        </Script>
        <WebshopNavigation />
        <main className="webshop-main">{children}</main>
        <WebshopFooter />
        <WhatsAppButton />
        <ChatButton />
        <AdVisitBeacon />
        <ConsentBanner />
        <ContactClicks />
      </body>
    </html>
  );
}
