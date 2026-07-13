import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";
import { getProjectSlugs } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = getProjectSlugs().map((slug) => ({
    url: `${siteConfig.url}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
  ];
}
