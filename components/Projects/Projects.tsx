"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { projects } from "@/data/portfolio";
import { hasProjectDetail } from "@/lib/projects";
import SectionTitle from "@/components/SectionTitle";
import styles from "./Projects.module.css";

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0, triggerOnce: true });

  return (
    <section id="projects" className={styles.section}>
      <SectionTitle highlight=" Projects">My</SectionTitle>

      <div
        ref={ref}
        className={inView ? `${styles.grid} fade-in` : `${styles.grid} animate-pending`}
      >
        {projects.map((project) => {
          const showDetailPage = hasProjectDetail(project);
          const detailHref =
            showDetailPage && project.slug
              ? `/projects/${project.slug}`
              : null;

          const media =
            project.imageStyle === "iconBackground" ? (
              <div className={styles.iconBanner}>
                <div className={styles.iconBannerOverlay} />
                <Image
                  src={project.image}
                  alt={`${project.title} app icon`}
                  width={88}
                  height={88}
                  className={styles.appIcon}
                />
              </div>
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                width={310}
                height={200}
                className={styles.image}
              />
            );

          const body = (
            <>
              {media}
              <div className={styles.details}>
                <h3>{project.title}</h3>
                {project.subtitle && (
                  <p className={styles.subtitle}>{project.subtitle}</p>
                )}
                {project.description && (
                  <p className={styles.description}>{project.description}</p>
                )}
              </div>
            </>
          );

          if (detailHref) {
            return (
              <Link
                key={project.title}
                href={detailHref}
                className={`${styles.card} ${styles.cardLink}`}
              >
                {body}
                <span className={styles.button}>View Project</span>
              </Link>
            );
          }

          return (
            <article key={project.title} className={styles.card}>
              {body}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.button}
                >
                  {project.linkLabel ?? "Live Demo"}
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
