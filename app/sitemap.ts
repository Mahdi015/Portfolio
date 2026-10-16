import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";
import { getProjectSlugs } from "@/lib/projects";

/**
 * When the content last actually changed — bump it when you edit the copy,
 * the projects or the CV, not on every deploy.
 *
 * This used to be `new Date()`, which stamped the build time onto every URL.
 * That meant a deploy that only touched a stylesheet told Google all five
 * pages had just been rewritten, and Google's documented response to a
 * `lastmod` it finds unreliable is to stop trusting the field for the whole
 * site. A date that only moves when the content does is worth more than a
 * fresh one that is always wrong.
 */
const CONTENT_UPDATED = "2026-10-16";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);

  const projectPages = getProjectSlugs().map((slug) => ({
    url: `${siteConfig.url}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
  ];
}
