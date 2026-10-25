"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerLenis } from "@/lib/lenis";

/**
 * Smooth scroll, mounted once.
 *
 * This is what makes the scroll-linked effects feel deliberate instead of
 * steppy — a mouse wheel fires in coarse jumps, and every scrub reads those
 * jumps directly. Skipped entirely under reduced motion, where the native
 * scroll is the correct behaviour.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /**
     * Touch devices get the platform's own scrolling. `syncTouch` is off
     * below, so on a phone Lenis smooths nothing — but it still runs a
     * requestAnimationFrame loop for the life of the page, doing work on
     * every frame the user scrolls and changing none of the output. Bail
     * before constructing it rather than paying for an instance that cannot
     * affect anything.
     */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      // Leave touch scrolling to the platform.
      syncTouch: false,
    });

    // Published so anything that scrolls the page from code is eased the same
    // way the wheel is — see lib/lenis.ts.
    registerLenis(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    /**
     * Lenis scrolls the page itself, so the browser never gets to apply
     * `scroll-padding-top` and anchors would land under the fixed bar. Reading
     * that property's computed value hands Lenis the same band the native path
     * uses, and keeps the one declaration in globals.css authoritative for
     * both — it resolves --nav-h, which the bar measures onto the root.
     */
    const landingOffset = () => {
      const pad = parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
      );
      return Number.isFinite(pad) ? pad : 0;
    };

    // Hand same-page anchors to Lenis so nav clicks are eased too.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const id = anchor?.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -landingOffset() });
    };

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
