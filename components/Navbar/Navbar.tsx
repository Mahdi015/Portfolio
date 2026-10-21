"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { navLinks, navCta, siteConfig } from "@/data/portfolio";
import { setScrollLock } from "@/lib/lenis";
import styles from "./Navbar.module.css";

/** Initials, taken from the configured name so it can't drift out of sync. */
const monogram = siteConfig.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .toUpperCase();

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" className={styles.sparkle} aria-hidden="true">
      <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" />
    </svg>
  );
}

export default function Navbar() {
  /**
   * The bar now appears on project pages too, where none of the sections it
   * links to exist. The data keeps bare hashes — the scroll-spy matches on
   * them as selectors — and the prefix is what makes them work off-route: on
   * `/projects/msafer`, `#about` has to be `/#about` or it goes nowhere.
   */
  const pathname = usePathname();
  const onHome = pathname === "/";
  const hrefFor = (hash: string) => (onHome ? hash : `/${hash}`);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /* Seeded per route: the home page opens on the dark hero, every other page
     opens on paper, and guessing wrong paints the bar's ink its own background
     colour until the first scroll handler runs. */
  const [onDark, setOnDark] = useState(pathname === "/");
  const [activeId, setActiveId] = useState("");
  const barRef = useRef<HTMLElement>(null);
  /**
   * The progress line is written to directly rather than held in state.
   * It changes on every scroll frame, and a state value that changes every
   * frame re-renders the whole bar every frame — the rail, the toggle, the
   * CTA and the mobile menu — to move one element by a sub-pixel amount.
   * The other three values below are booleans and a string that each change a
   * handful of times per page, so React's bail-on-equal keeps them free.
   */
  const progressRef = useRef<HTMLSpanElement>(null);
  /** Mirrors --nav-h for the scroll handler, which needs it without re-running. */
  const heightRef = useRef(0);

  /**
   * The bar is fixed, so the hero's reserved band and `scroll-padding-top` can
   * only clear it by being told how tall it is. Publishing the measured height
   * beats keeping a matching clamp in the stylesheet: that copy silently drifts
   * whenever the bar's type or padding changes, and the drift shows up as
   * content tucked under the glass panel rather than as anything obvious here.
   *
   * Declared before the scroll effect so heightRef is populated by the time
   * that effect takes its first measurement.
   */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const publish = () => {
      const { height } = el.getBoundingClientRect();
      heightRef.current = height;
      document.documentElement.style.setProperty("--nav-h", `${height}px`);
    };

    publish();

    const observer = new ResizeObserver(publish);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Cached so the scroll handler isn't re-querying the DOM every frame.
    let targets: HTMLElement[] = [];
    /** Same reason: the dark zones are a fixed set between layout changes. */
    let darkZones: HTMLElement[] = [];
    /**
     * Cached because reading `scrollHeight` forces the browser to flush
     * layout, and doing that once per scroll frame — in a handler that then
     * reads a rect off every section — is the most expensive thing the bar
     * does. It only changes when the page's height does, which is what the
     * observer below watches for.
     */
    let scrollable = 0;

    const measurePage = () => {
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
    };

    const collect = () => {
      targets = navLinks
        .map((link) => document.querySelector<HTMLElement>(link.href))
        .filter((el): el is HTMLElement => el !== null);

      darkZones = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-dark]"),
      );

      /**
       * The bar is driven by data while the sections live in the page tree, so
       * nothing links the two at build time — a renamed or removed section
       * leaves a link that scrolls nowhere and silently never activates. Cheap
       * to catch here, invisible otherwise until someone clicks it.
       */
      // Only the home route is expected to hold these sections.
      if (process.env.NODE_ENV !== "production" && onHome) {
        // The CTA is checked too: it aims at a section like any rail item.
        const missing = [...navLinks, navCta]
          .filter((link) => !document.querySelector(link.href))
          .map((link) => link.href);

        if (missing.length > 0) {
          console.warn(
            `Navbar: no section on the page for ${missing.join(", ")}. ` +
              "Update navLinks/navCta in data/portfolio.ts or add the section.",
          );
        }
      }
    };

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const bar = progressRef.current;
      if (bar) {
        const ratio = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0;
        bar.style.transform = `scaleX(${ratio})`;
      }

      /**
       * The bar crosses a dark hero, a paper body and a dark projects band, so
       * it can't commit to one palette. Any section marked `data-nav-dark`
       * currently under the bar flips it to its light-on-dark treatment.
       */
      const probe = (heightRef.current || 88) / 2; // the bar's vertical centre
      let dark = false;

      for (const zone of darkZones) {
        const rect = zone.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom >= probe) {
          dark = true;
          break;
        }
      }

      setOnDark(dark);

      /**
       * Whichever target has crossed the probe line most recently is the one
       * being read. Comparing measured positions rather than array order means
       * the nav can list sections in a different order than the page does.
       */
      const line = window.innerHeight * 0.34;
      let current = "";
      let nearest = -Infinity;

      for (const target of targets) {
        const top = target.getBoundingClientRect().top;
        if (top <= line && top > nearest) {
          nearest = top;
          current = target.id;
        }
      }

      setActiveId(current);
    };

    collect();
    measurePage();
    update();

    /**
     * Coalesced to one run per frame. A trackpad or a smooth-scroll library
     * can deliver several scroll events inside a single frame, and every one
     * of them would otherwise pay for the rect reads above.
     */
    let queued = 0;
    const onScroll = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        update();
      });
    };

    const onResize = () => {
      collect();
      measurePage();
      update();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    /**
     * The page's height is not fixed: the projects reel sizes its own scroll
     * track once it has measured its cards, and the stack cube swaps between
     * a pinned track and a flat grid. Both land after this effect runs, and
     * before this the progress line was scaled against a stale height.
     */
    const pageObserver = new ResizeObserver(() => {
      // Re-collected rather than just re-measured: a height change is the one
      // signal that sections have mounted, swapped branch or gone away, which
      // is exactly when the two cached node lists go stale.
      collect();
      measurePage();
      update();
    });
    pageObserver.observe(document.body);

    return () => {
      if (queued) cancelAnimationFrame(queued);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      pageObserver.disconnect();
    };
  }, [onHome]);

  useEffect(() => {
    setScrollLock(menuOpen);
    return () => setScrollLock(false);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const classes = [
    styles.navbar,
    scrolled ? styles.scrolled : "",
    onDark ? styles.onDark : styles.onLight,
    menuOpen ? styles.menuOpen : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header ref={barRef} className={classes}>
      <a
        href={hrefFor("#home")}
        className={styles.logo}
        onClick={() => setMenuOpen(false)}
      >
        {monogram}
        <Sparkle />
      </a>

      <nav className={styles.rail} aria-label="Main navigation">
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={hrefFor(link.href)}
                aria-current={link.href === `#${activeId}` ? "true" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        <a href={hrefFor(navCta.href)} className={styles.cta}>
          {navCta.label}
        </a>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <RiCloseLine size={26} /> : <RiMenu3Line size={26} />}
        </button>
      </div>

      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={hrefFor(link.href)}
              onClick={() => setMenuOpen(false)}
              style={{ "--i": i } as React.CSSProperties}
            >
              {link.label}
            </a>
          ))}
          <a
            href={hrefFor(navCta.href)}
            className={styles.mobileCta}
            onClick={() => setMenuOpen(false)}
            style={{ "--i": navLinks.length } as React.CSSProperties}
          >
            {navCta.label}
          </a>
        </nav>
      )}

      {/* Ties the bar into the hero: an inset hairline while it's still part
          of the title card, gone once it detaches into the glass bar. */}
      <span className={styles.rule} aria-hidden="true" />

      {/* Scroll progress, sitting on the bar's own bottom edge. Scaled by the
          scroll handler through the ref — see progressRef. */}
      <span ref={progressRef} className={styles.progress} aria-hidden="true" />
    </header>
  );
}
