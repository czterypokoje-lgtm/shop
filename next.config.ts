import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Set to /webshop when the shop is served at www.autosleutel24.nl/webshop through a rewrite on the main site.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  // Review photos are shrunk in the browser to ~300 KB each; three plus the form fit in 4 MB (Vercel caps a request at 4.5 MB).
  experimental: { serverActions: { bodySizeLimit: '4mb' } },
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
        ],
      },
    ];
  },
};

export default nextConfig;
