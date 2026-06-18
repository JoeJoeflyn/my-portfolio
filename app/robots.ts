import { MetadataRoute } from 'next';
import { getBaseUrl } from './lib/base-url';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = await getBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: base,
    sitemap: `${base}/sitemap.xml`,
  };
}
