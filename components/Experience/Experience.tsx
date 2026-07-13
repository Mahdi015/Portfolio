"use client";

import { FaGraduationCap } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { education, workExperience } from "@/data/portfolio";
import type { TimelineItem, TimelineType } from "@/types/portfolio";
import styles from "./Experience.module.css";

interface TimelineColumnProps {
  items: TimelineItem[];
  type: TimelineType;
  title: string;
  highlight: string;
}

function TimelineColumn({ items, type, title, highlight }: TimelineColumnProps) {
  return (
    <div className={styles.columnGroup}>
      <div className={styles.subTitleHeader}>
        <h3 className={styles.subTitle}>
          {title}
          <span>{highlight}</span>
        </h3>
        <div className={styles.subBorder} />
      </div>

      <div className={styles.column}>
        <div className={styles.line} />
        {items.map((item) => (
          <article key={`${item.period}-${item.title}`} className={styles.item}>
            <div className={styles.icon}>
              {type === "education" ? <FaGraduationCap /> : <MdWork />}
            </div>
            <time className={styles.period}>{item.period}</time>
            <h4 className={styles.itemTitle}>{item.title}</h4>
            <p className={styles.itemSubtitle}>{item.subtitle}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.content}>
        <TimelineColumn
          items={education}
          type="education"
          title="My "
          highlight="Education"
        />
        <TimelineColumn
          items={workExperience}
          type="work"
          title="My "
          highlight="Work Experience"
        />
      </div>
    </section>
  );
}
