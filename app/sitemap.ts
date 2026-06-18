import { MetadataRoute } from "next";
import { LINKS } from "@/app/shared/constant";
import { getBaseUrl } from "./lib/base-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getBaseUrl();

  return LINKS.map(({ href }) => ({
    url: `${base}${href}`,
    lastModified: new Date(),
    priority: 0.8,
  }));
}
