import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import type { IconType } from "react-icons";
import { siteConfig, socialLinks } from "@/data/portfolio";
import styles from "./Footer.module.css";

const socialIcons: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
};

/**
 * The page's last line.
 *
 * It was a single centred sentence in an off-scale size with no rule above it,
 * which left the site ending as if it had been cut off rather than closed. It
 * now carries what a visitor who has read to the bottom is looking for — the
 * two profiles and the address — on the site's own type scale.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} {siteConfig.name}
          <span className={styles.rights}>All rights reserved</span>
        </p>

        <nav className={styles.links} aria-label="Elsewhere">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <a
                key={social.href}
                href={social.href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Icon && (
                  <span className={styles.icon} aria-hidden="true">
                    <Icon />
                  </span>
                )}
                {social.label}
              </a>
            );
          })}

          <a href={`mailto:${siteConfig.email}`} className={styles.link}>
            {siteConfig.email}
          </a>
        </nav>
      </div>
    </footer>
  );
}
