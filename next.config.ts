import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Set to /webshop when the shop is served at www.autosleutel24.nl/webshop through a rewrite on the main site.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  // Review photos are shrunk in the browser to ~300 KB each; three plus the form fit in 4 MB (Vercel caps a request at 4.5 MB).
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
      /*
       * The shop is served at www.autosleutel24.nl/webshop through the main
       * site's rewrite, so the browser's Origin is the main domain while this
       * deployment's host is its own. Next refuses a server action whose
       * Origin does not match the host — every form here (reviews, business
       * login) failed with a 500 on the live site and worked locally.
       */
      allowedOrigins: ['www.autosleutel24.nl', 'autosleutel24.nl'],
    },
  },
  // Make slugs used to drop accented letters (citron, koda); keep the old URLs working.
  async redirects() {
    return [
      { source: '/merk/citron/:path*', destination: '/merk/citroen/:path*', permanent: true },
      { source: '/merk/citron', destination: '/merk/citroen', permanent: true },
      { source: '/merk/koda/:path*', destination: '/merk/skoda/:path*', permanent: true },
      { source: '/merk/koda', destination: '/merk/skoda', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(self)' },
          /*
           * A Content-Security-Policy was added here (23 Oct) and reverted
           * the same day: confirmed, via real console CSP violations on the
           * live service site (this app shares the exact same policy), that
           * it silently blocked GA4 (region1.google-analytics.com, not
           * www.google-analytics.com), Clarity (s.clarity.ms, not the host
           * guessed), and most of Google Ads' conversion/remarketing pixels
           * for hours. See next.config.ts in the autoslutel repo for the
           * full account. Re-add only as Content-Security-Policy-Report-Only
           * first, watched for a few days, before ever enforcing again.
           */
        ],
      },
    ];
  },
};

export default nextConfig;
