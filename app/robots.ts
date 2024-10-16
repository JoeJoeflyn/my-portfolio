import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/',
    sitemap: 'https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/sitemap.xml',
  };
}
