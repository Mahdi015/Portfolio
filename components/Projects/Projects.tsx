import Image from "next/image";
import Link from "next/link";
import PinnedReel from "@/components/motion/PinnedReel";
import Tilt from "@/components/motion/Tilt";
import { projects } from "@/data/portfolio";
import { hasProjectDetail } from "@/lib/projects";
import styles from "./Projects.module.css";

/**
 * The inverted band.
 *
 * Deliberately the only dark zone on a paper page: 3D tilt and a glass surface
 * need a ground that can hold a highlight, and a gear-change mid-page is an
 * editorial device rather than an inconsistency.
 */
export default function Projects() {
  return (
    <section id="projects" className={`band ${styles.section}`} data-nav-dark="">
      <PinnedReel
        trackClassName={styles.track}
        header={
          <div className={styles.head}>
            {/* The site's shared heading, so the band doesn't read as a
                lesser section than the two it sits between. The size cap
                against viewport height lives in this module — this header
                shares a pinned 100vh with a full-size card. */}
            <h2 className={`sectionTitle ${styles.heading}`}>Selected work</h2>
            <span className="sectionMarker" aria-hidden="true" />
          </div>
        }
      >
        {projects.map((project, index) => {
          const detailHref =
            hasProjectDetail(project) && project.slug
              ? `/projects/${project.slug}`
              : null;

          const media =
            project.imageStyle === "iconBackground" ? (
              <div className={`${styles.media} ${styles.iconMedia}`}>
                <Image
                  src={project.image}
                  alt={`${project.title} app icon`}
                  width={96}
                  height={96}
                  className={styles.appIcon}
                />
              </div>
            ) : (
              <div className={styles.media}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={640}
                  height={400}
                  className={styles.image}
                />
              </div>
            );

          const body = (
            <>
              {media}
              <div className={styles.body}>
                <i className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                  {project.company ? ` · ${project.company}` : ""}
                </i>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                {project.subtitle && (
                  <p className={styles.subtitle}>{project.subtitle}</p>
                )}
                {project.description && (
                  <p className={styles.description}>{project.description}</p>
                )}
                <span className={styles.cta}>
                  {detailHref ? "View project" : project.linkLabel ?? "Live demo"}
                  <span aria-hidden="true">&#8599;</span>
                </span>
              </div>
            </>
          );

          return (
            <Tilt key={project.title} className={styles.tilt} max={7} lift={12}>
              {detailHref ? (
                <Link href={detailHref} className={styles.card}>
                  {body}
                </Link>
              ) : project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  {body}
                </a>
              ) : (
                <article className={styles.card}>{body}</article>
              )}
            </Tilt>
          );
        })}
      </PinnedReel>
    </section>
  );
}
