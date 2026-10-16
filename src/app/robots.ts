import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site.config';

/*
 * Closed until launch (own product copy, own domain). At launch: allow '/',
 * keep '/api/', and remove the noindex in layout.tsx in the same change.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', disallow: '/' }],
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  };
}
