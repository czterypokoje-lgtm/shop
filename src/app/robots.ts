import { MetadataRoute } from 'next';
import { SITE_CONFIG, SHOP_INDEXABLE } from '@/config/site.config';

/*
 * Served at /webshop/robots.txt. Crawlers on www.autosleutel24.nl read the
 * main site's /robots.txt instead, so that file must list this sitemap too;
 * this one matters when the shop runs on its own domain.
 *
 * Closed until SHOP_INDEXABLE=1 (see layout.tsx). When open: everything a
 * customer reads, nothing that is a basket, an account or an API.
 */
export default function robots(): MetadataRoute.Robots {
  if (!SHOP_INDEXABLE) {
    return { rules: [{ userAgent: '*', disallow: '/' }], sitemap: `${SITE_CONFIG.domain}/sitemap.xml` };
  }
  const privatePaths = ['/api/', '/winkelmand', '/afrekenen', '/bedankt', '/account', '/review/', '/zoeken'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: privatePaths },
      // Named so the AI crawlers that only obey their own block are let in explicitly.
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot'],
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  };
}
