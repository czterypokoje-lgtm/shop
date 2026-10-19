import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Review photos are shrunk in the browser to ~300 KB each; three plus the form fit in 4 MB (Vercel caps a request at 4.5 MB).
  experimental: { serverActions: { bodySizeLimit: '4mb' } },
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
