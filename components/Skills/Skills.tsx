import Image from "next/image";
import { skills } from "@/data/portfolio";
import styles from "./Skills.module.css";

function SkillSet({
  suffix,
  hidden = false,
  duplicate = false,
}: {
  suffix: string;
  hidden?: boolean;
  duplicate?: boolean;
}) {
  return (
    <ul
      className={`${styles.set} ${duplicate ? styles.duplicate : ""}`}
      aria-hidden={hidden || undefined}
    >
      {skills.map((skill) => (
        <li key={`${skill.name}-${suffix}`} className={styles.item}>
          <Image
            src={skill.image}
            alt={skill.name}
            width={skill.width}
            height={skill.height}
            className={styles.logo}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Skills() {
  return (
    <section className={styles.carousel} aria-label="Tech stack">
      <div className={styles.fade} aria-hidden="true" />
      <div className={styles.track}>
        <div className={styles.scroll}>
          <SkillSet suffix="a" />
          <SkillSet suffix="b" hidden duplicate />
        </div>
      </div>
    </section>
  );
}
