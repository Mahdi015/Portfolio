import type Lenis from "lenis";

/**
 * The page's smooth-scroll instance, published by SmoothScroll.
 *
 * Lenis owns the scroll position while it is running, which means
 * `window.scrollTo({ behavior: "smooth" })` lands as an instant jump — the
 * stylesheet sets `scroll-behavior: auto !important` under `html.lenis`, so
 * the native easing is deliberately off. Anything that scrolls the page from
 * code therefore has to go through the same instance the wheel does, or the
 * site has two different scroll feels depending on what moved it.
 *
 * A module singleton rather than a context: SmoothScroll renders null and is
 * mounted beside its consumers, not above them.
 */
let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

/**
 * Freezes the page while an overlay owns the screen.
 *
 * `body { overflow: hidden }` on its own does not do this once Lenis is
 * running: Lenis reads the wheel and touch events itself and moves the window
 * from code, so it goes on scrolling the page behind a menu that is supposed
 * to have stopped it. Stopping the instance is the only thing it honours. The
 * overflow rule stays for the native path — under reduced motion there is no
 * Lenis to stop.
 */
export function setScrollLock(locked: boolean) {
  document.body.style.overflow = locked ? "hidden" : "";

  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}

/** Eased by Lenis where it is running, native smooth where it isn't. */
export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0);
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}
