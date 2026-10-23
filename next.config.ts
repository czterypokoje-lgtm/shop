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
           * Same policy as the service site's next.config.ts, same reasoning
           * there in full. The one real difference: this app loads IBM Plex
           * Sans from Google Fonts via a <link> (layout.tsx), not next/font,
           * so style-src/font-src actually need fonts.googleapis.com /
           * fonts.gstatic.com here, not just defensively. Mollie's checkout
           * is a full top-level redirect (window.location.href in
           * CheckoutForm.tsx), never an iframe, so it needs nothing in this
           * policy — once the browser leaves for Mollie, Mollie's own CSP
           * applies, not this one.
           */
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://bat.bing.net https://bat.bing.com https://bzrcdn.openai.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://upload.wikimedia.org https://cdn.simpleicons.org https://omqnxprotjfbyqqq.public.blob.vercel-storage.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://bat.bing.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://bzrcdn.openai.com https://*.supabase.co wss://*.supabase.co",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://wa.me https://api.whatsapp.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
