import Image from "next/image";
import Link from "next/link";
import ProjectCarousel from "@/components/Projects/ProjectCarousel";
import type { Project } from "@/types/portfolio";
import styles from "./ProjectDetail.module.css";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const hasGallery = Boolean(project.gallery?.length);

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <Link href="/#projects" className={styles.backLink}>
          ← Back to Projects
        </Link>
      </header>

      <main className={styles.content}>
        <section className={hasGallery ? styles.hero : styles.heroSingle}>
          <div className={styles.heroText}>
            {project.imageStyle === "iconBackground" ? (
              <div className={styles.iconWrap}>
                <Image
                  src={project.image}
                  alt={`${project.title} app icon`}
                  width={88}
                  height={88}
                  className={styles.appIcon}
                />
              </div>
            ) : (
              <div className={styles.coverWrap}>
                <Image
                  src={project.image}
                  alt={`${project.title} cover`}
                  width={420}
                  height={260}
                  className={styles.coverImage}
                />
              </div>
            )}

            <h1>{project.title}</h1>
            {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
            {(project.company || project.location) && (
              <p className={styles.meta}>
                {[project.company, project.location].filter(Boolean).join(" — ")}
              </p>
            )}
            {project.description && (
              <p className={styles.description}>{project.description}</p>
            )}
          </div>

          {hasGallery && (
            <div className={styles.carouselWrap}>
              <ProjectCarousel
                images={project.gallery!}
                title={project.title}
                aspectRatio={project.galleryAspectRatio}
                maxWidth={project.galleryMaxWidth}
              />
            </div>
          )}
        </section>

        {project.highlights && project.highlights.length > 0 && (
          <section className={styles.highlights}>
            <h2>Key Contributions</h2>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>
        )}

        {project.quickStart && (
          <section className={styles.highlights}>
            <h2>Quick start</h2>
            <ul>
              {project.quickStart.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            {project.quickStart.commands && project.quickStart.commands.length > 0 && (
              <pre className={styles.codeBlock}>
                <code>{project.quickStart.commands.join("\n")}</code>
              </pre>
            )}
            {project.quickStart.note && (
              <p className={styles.quickStartNote}>{project.quickStart.note}</p>
            )}
          </section>
        )}

        {project.demoUrl && (
          <div className={styles.actions}>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoButton}
            >
              {project.linkLabel ?? "Live Demo"}
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
