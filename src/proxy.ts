import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next 16 renamed the `middleware` file convention to `proxy`.
 *
 * Countries blocked at the office's request (zero-click sessions only). Never
 * applied to /api/* — the Mollie webhook can call in from anywhere — nor to a
 * known crawler.
 */
const BLOCKED_COUNTRIES = new Set(['IN']);

const KNOWN_CRAWLER =
  /bot|crawl|spider|slurp|googlebot|bingbot|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|applebot|petalbot|gptbot|chatgpt-user|claudebot|claude-web|google-extended|perplexitybot|youbot|amazonbot|anthropic-ai|bytespider/i;

export function proxy(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country') ?? '';
  const userAgent = request.headers.get('user-agent') ?? '';
  if (BLOCKED_COUNTRIES.has(country) && !KNOWN_CRAWLER.test(userAgent)) {
    return new NextResponse('Not available in your region.', {
      status: 403,
      headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/|_next/static|_next/image|favicon\\.ico|apple-icon\\.png|icon\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)',
  ],
};
