"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { aboutContent } from "@/data/portfolio";
import styles from "./About.module.css";

export default function About() {
  const [imageRef, imageInView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const [textRef, textInView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="about" className={styles.container}>
      <div
        ref={imageRef}
        className={
          imageInView ? `${styles.image} slide-in-blurred-left` : `${styles.image} animate-pending`
        }
      >
        <Image
          src={aboutContent.image}
          alt="About Mahdi Feriani"
          width={200}
          height={200}
          className={styles.avatar}
        />
      </div>

      <div
        ref={textRef}
        className={
          textInView ? `${styles.text} slide-in-blurred-left` : `${styles.text} animate-pending`
        }
      >
        <h2>{aboutContent.title}</h2>
        <p>{aboutContent.bio}</p>

        <dl className={styles.details}>
          {aboutContent.details.map((item) => (
            <div key={item.label} className={styles.detailRow}>
              <dt>{item.label} :</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        <a
          className={styles.cvButton}
          href={aboutContent.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View CV
        </a>
      </div>
    </section>
  );
}
