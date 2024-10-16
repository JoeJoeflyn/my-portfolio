import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/',
      lastModified: new Date(),
    },
    {
      url: 'https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/projects',
      lastModified: new Date(),
    },
    {
      url: 'https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/blogs',
      lastModified: new Date(),
    },
    {
      url: 'https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/waka-time',
      lastModified: new Date(),
    },
  ];
}
