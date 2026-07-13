"use client";

import { FaLaptopCode, FaMobileAlt, FaServer } from "react-icons/fa";
import type { IconType } from "react-icons";
import { useInView } from "react-intersection-observer";
import { services } from "@/data/portfolio";
import { useTheme } from "@/lib/theme";
import type { ServiceIcon } from "@/types/portfolio";
import SectionTitle from "@/components/SectionTitle";
import styles from "./Services.module.css";

const serviceIcons: Record<ServiceIcon, IconType> = {
  laptop: FaLaptopCode,
  server: FaServer,
  mobile: FaMobileAlt,
};

export default function Services() {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ threshold: 0, triggerOnce: true });
  const borderColor = theme === "light" ? "#7A77B9" : "#fff";

  return (
    <section id="services" className={styles.section}>
      <SectionTitle highlight=" Services">My</SectionTitle>

      <div
        ref={ref}
        className={inView ? `${styles.grid} bounce-in-top` : `${styles.grid} animate-pending`}
      >
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <article
              key={service.title}
              className={styles.card}
              style={{ borderColor }}
            >
              <Icon className={styles.icon} aria-hidden="true" />
              <h3>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
