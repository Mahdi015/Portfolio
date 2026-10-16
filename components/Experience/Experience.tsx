import { revealProps } from "@/components/motion/Reveal";
import { workExperience } from "@/data/portfolio";
import styles from "./Experience.module.css";

/**
 * The work timeline.
 *
 * Typographically a sibling of Education on purpose: the site's shared section
 * heading and marker, the same weight-800 sans for the entry name, the same
 * muted sans beneath it, and the same wide-tracked mono for dates. The two
 * sections sit next to each other on the page, so any divergence between them
 * read as an inconsistency rather than a contrast.
 *
 * No hooks and no state, so it stays a server component — the reveals are the
 * project's CSS-only Reveal, which means every word is in the server-rendered
 * HTML and nothing is parked at opacity 0 waiting on hydration. That matters
 * more here than anywhere else: this is the section a recruiter reads, and
 * increasingly the one a crawler reads.
 */
export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <h2 className="sectionTitle">Experience</h2>
          <span className="sectionMarker" aria-hidden="true" />
        </header>

        <ol className={styles.timeline}>
          {workExperience.map((job, i) => (
            <li key={`${job.company}-${job.period}`} className={styles.entry}>
              {/* Sits in the spine's gutter, not in the card — the ring is
                  what punches the running line open at each role. */}
              <span className={styles.node} aria-hidden="true" />

              <article {...revealProps(i, "rise", styles.card)}>
                <div className={styles.cardHead}>
                  <p className={styles.period}>{job.period}</p>
                  <span className={styles.index} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className={styles.role}>{job.role}</h3>

                <p className={styles.org}>
                  {job.company}
                  {job.location ? (
                    <span className={styles.location}>, {job.location}</span>
                  ) : null}
                </p>

                <p className={styles.summary}>{job.summary}</p>

                <ul className={styles.points}>
                  {job.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <ul className={styles.stack} aria-label={`${job.role} stack`}>
                  {job.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
