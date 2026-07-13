"use client";

import { useEffect, useState } from "react";
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
import { heroContent, socialLinks } from "@/data/portfolio";
import type { SocialIcon } from "@/types/portfolio";
import styles from "./Header.module.css";

const socialIcons: Record<SocialIcon, IconType> = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  instagram: FaInstagram,
  twitter: FaTwitter,
  globe: FaGlobe,
};

export default function Header() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((index) => (index + 1) % heroContent.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className={styles.container}>
      <div className={styles.content}>
        <p className={styles.greeting}>{heroContent.greeting}</p>

        <h1 className={styles.title}>
          <span>I Am </span>
          <span key={roleIndex} className={styles.role}>
            {heroContent.roles[roleIndex]}
          </span>
        </h1>

        <p className={styles.bio}>{heroContent.bio}</p>

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

      <div className={styles.imageWrapper}>
        <div className={styles.imageGlow} aria-hidden="true" />
        <div className={styles.imageFrame}>
          <div className={styles.imageInner}>
            <Image
              src={heroContent.image}
              alt="Mahdi Feriani"
              width={520}
              height={380}
              priority
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
