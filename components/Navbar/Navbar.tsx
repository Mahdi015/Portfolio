"use client";

import { useEffect, useState } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { navLinks } from "@/data/portfolio";
import { useTheme } from "@/lib/theme";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 90);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      id="nav"
      className={`${styles.navbar} ${scrolled ? styles.active : ""}`}
      style={{ backgroundColor: "var(--color-navbar)" }}
    >
      <div className={styles.logo}>
        <a href="#nav">Mahdi</a>
      </div>

      <nav className={styles.links} aria-label="Main navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={handleNavClick}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.themeToggle}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={theme === "light"}
            onChange={toggleTheme}
            aria-label="Toggle theme"
          />
          <span className={styles.ball} />
          <span className={styles.sun}>
            <BsFillSunFill />
          </span>
          <span className={styles.moon}>
            <BsFillMoonFill />
          </span>
        </label>
      </div>

      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <RiCloseLine size={35} /> : <RiMenu3Line size={35} />}
      </button>

      {menuOpen && (
        <nav
          className={`${styles.mobileMenu} scale-up-center`}
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavClick}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
