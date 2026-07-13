import { projects } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects
    .map((project) => project.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export function hasProjectDetail(project: Project): boolean {
  return Boolean(project.slug && project.highlights?.length);
}
