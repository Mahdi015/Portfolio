"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import CountUp from "@/components/motion/CountUp";
import Magnetic from "@/components/motion/Magnetic";
import Particles from "./Particles";
import {
  heroContent,
  heroDetails,
  heroStats,
  heroTags,
  principles,
  siteConfig,
  socialLinks,
} from "@/data/portfolio";
import type { SocialIcon } from "@/types/portfolio";
import styles from "./Hero.module.css";

const socialIcons: Record<SocialIcon, IconType> = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  instagram: FaInstagram,
  twitter: FaTwitter,
  globe: FaGlobe,
};

const [firstName, ...restName] = siteConfig.name.split(" ");
const lastName = restName.join(" ");

/**
 * True on phone-width viewports, matching Hero.module.css's 760px breakpoint.
 *
 * The scroll-driven split below moves each half of the wordmark by 88% of its
 * own width. There is room for that beside a centred figure on a wide screen;
 * at 390px it just drives the longer word off the right edge, which is what
 * clipped FERIANI to "FERIA" on every phone. Starts false so the server markup
 * and the first client render agree, then corrects on mount.
 */
function useCompactViewport() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px)");
    const sync = () => setCompact(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return compact;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const compact = useCompactViewport();
  const cinematicRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cinematicRef,
    offset: ["start start", "end end"],
  });

  // The chrome clears out first, so the split reads against an empty frame.
  // The lift has to stay inside --nav-gap (20-32px): the bar turns opaque at
  // 24px of scroll while the chrome is still fading, so anything that travels
  // further than the gap finishes the fade underneath the glass panel.
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const chromeY = useTransform(scrollYProgress, [0, 0.28], [0, -14]);

  // Names part and dim, but never fully leave — they frame the character.
  const firstX = useTransform(scrollYProgress, [0, 1], ["0%", "-88%"]);
  const lastX = useTransform(scrollYProgress, [0, 1], ["0%", "88%"]);
  const nameOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [1, 0.55, 0.14],
  );

  // Character holds the centre and comes forward as everything else recedes.
  const characterScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.95]);

  const motionStyle = (style: Record<string, unknown>) =>
    reduce ? undefined : style;

  return (
    <section id="home" className={styles.hero}>
      <div
        ref={cinematicRef}
        className={styles.cinematic}
        /* Tells the navbar to use its light-on-dark palette here. */
        data-nav-dark=""
        style={{ height: reduce ? "100vh" : "250vh" }}
      >
        <div className={styles.sticky}>
          <Particles />
          <span className={styles.frame} aria-hidden="true" />

          <motion.div
            className={styles.chromeTop}
            style={motionStyle({ opacity: chromeOpacity, y: chromeY })}
          >
            <ul className={styles.tags}>
              {heroTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className={styles.status}>
              <i aria-hidden="true" />
              Open to work &mdash; {heroContent.location}
            </span>
          </motion.div>

          <div className={styles.stage}>
            {/* The page's h1, and the reason it is wrapped rather than applied
                to .stage: the two halves of the wordmark are the only text in
                the heading. `display: contents` hands them straight back to
                .stage's flex layout, so the markup gains a real heading
                without the character — whose alt describes the portrait — or
                the year landing inside the heading's accessible name. */}
            <h1 className={styles.wordmark}>
              <motion.span
                className={`${styles.name} ${styles.nameFirst}`}
                style={motionStyle(
                  compact
                    ? { opacity: nameOpacity }
                    : { x: firstX, opacity: nameOpacity },
                )}
              >
                {firstName}
              </motion.span>

              <motion.span
                className={`${styles.name} ${styles.nameLast}`}
                style={motionStyle(
                  compact
                    ? { opacity: nameOpacity }
                    : { x: lastX, opacity: nameOpacity },
                )}
              >
                {lastName}
              </motion.span>
            </h1>

            <motion.div
              className={styles.character}
              /* The -65% is layout, not animation — it pairs with left:50% to
                 place the figure — so unlike the scroll-driven values it has
                 to survive reduced motion, or the character lands half its
                 own width to the right of where it belongs. */
              style={
                reduce
                  ? { x: "-65%" }
                  : { x: "-65%", scale: characterScale }
              }
            >
              <motion.span
                className={styles.characterGlow}
                aria-hidden="true"
                style={motionStyle({ opacity: glowOpacity })}
              />
              <Image
                src={heroContent.character}
                alt={`${siteConfig.name}, ${heroContent.role}`}
                width={592}
                height={750}
                priority
                className={styles.characterImage}
              />
            </motion.div>

            <span className={styles.year} aria-hidden="true">
              [ {heroContent.year} ]
            </span>
          </div>

          <motion.div
            className={styles.chromeBottom}
            style={motionStyle({ opacity: chromeOpacity })}
          >
            <span className={styles.ruler} aria-hidden="true" />
            <div className={styles.chromeBottomRow}>
              <Magnetic>
                <a href="#projects" className={styles.cta}>
                  See the work <span aria-hidden="true">&#8599;</span>
                </a>
              </Magnetic>
              <span className={styles.scrollHint}>
                Scroll <span aria-hidden="true">&#8595;</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* The about section proper: everything the cinematic opener leaves out.
          It carries #about because the nav links there and there is only one
          about block on the page now — the standalone one was merged in here. */}
      <div id="about" className={`container ${styles.intro}`}>
        <div className={styles.introGrid}>
          <div>
            <p className={styles.bio}>
              <b>{heroContent.bioLead}</b>
              {heroContent.bio}
            </p>

            <p className={styles.bioSecondary}>{heroContent.bioSecondary}</p>

            <Magnetic className={styles.cvWrap}>
              <a
                className={styles.cv}
                href={heroContent.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View CV
                <span className={styles.cvRule} aria-hidden="true" />
              </a>
            </Magnetic>

            <ul className={styles.social}>
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon];
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.meta}>
            <dl className={styles.details}>
              {heroDetails.map((detail) => (
                <div key={detail.label} className={styles.detailRow}>
                  <dt className={styles.detailLabel}>{detail.label}</dt>
                  <dd className={styles.detailValue}>
                    {detail.href ? (
                      <a href={detail.href}>{detail.value}</a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <dl className={styles.stats}>
              {heroStats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt className={styles.statValue}>
                    <CountUp
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </dt>
                  <dd className={styles.statLabel}>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ul className={styles.principles}>
          {principles.map((principle, i) => (
            <li key={principle.title} className={styles.principle}>
              <span className={styles.principleIndex} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleBody}>{principle.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
