import { revealProps } from "@/components/motion/Reveal";
import { education } from "@/data/portfolio";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <section
      id="education"
      className={`band ${styles.section}`}
      data-nav-dark=""
    >
      <span className={styles.gridLines} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <h2 className="sectionTitle">Education</h2>
          <span className="sectionMarker" aria-hidden="true" />
        </header>

        <ol className={styles.list}>
          {education.map((item, index) => (
            <li key={item.school} {...revealProps(index, "rise", styles.row)}>
              <h3 className={styles.school}>{item.school}</h3>
              <p className={styles.degree}>
                {item.degree}
                {item.location && (
                  <span className={styles.location}>, {item.location}</span>
                )}
              </p>
              <time className={styles.period}>{item.period}</time>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
