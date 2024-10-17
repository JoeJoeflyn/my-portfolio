import {
  getNotionChildrenPage,
  getNotionPage,
  getPage
} from "@/app/api/notion";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse
} from "@notionhq/client/build/src/api-endpoints";
import { MetadataRoute } from "next";

export async function generateStaticParams() {
  const { results } = await getNotionPage();

  if (!results) {
    console.error("No pages found in Notion response.");
    return [];
  }

  return results.map(
    (
      page:
        | PageObjectResponse
        | PartialPageObjectResponse
        | PartialDatabaseObjectResponse
        | DatabaseObjectResponse
    ) => ({
      id: `${page.id}`,
    })
  );
}

export default async function sitemap({ params }: { params: { id: string } }): Promise<MetadataRoute.Sitemap> {
  let staticRoutes = [
    {
      url: `https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/projects`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/blogs`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/waka-time`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  try {
    const [results, heading] = await Promise.all([
      getNotionChildrenPage(params.id),
      getPage(params.id),
    ]);

    if (!heading || !Array.isArray(heading)) {
      console.error("Invalid heading data from Notion.");
      return staticRoutes;
    }

    const blogRoutes = heading.map((blog) => ({
      url: `https://my-portfolio-pbiwtvvm8-joejoeflyns-projects.vercel.app/blogs/${blog.id}`,
      lastModified: new Date(blog.created_time),
      priority: 0.8,
    }));

    return [...staticRoutes, ...blogRoutes];

  } catch (error) {
    console.error("Error fetching data for sitemap:", error);
    return staticRoutes;
  }
}
