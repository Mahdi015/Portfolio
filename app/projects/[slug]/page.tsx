import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/Projects/ProjectDetail";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Mahdi Feriani`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Mahdi Feriani`,
      description: project.description,
      images: project.gallery?.length ? [project.gallery[0]] : [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.highlights?.length) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
