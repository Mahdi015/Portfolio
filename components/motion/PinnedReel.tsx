"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import styles from "./PinnedReel.module.css";

interface PinnedReelProps {
  children: ReactNode;
  /** Stays on screen with the reel while it scrubs. */
  header?: ReactNode;
  /** Below this width, pinning is replaced by native horizontal scroll. */
  minWidth?: number;
  /**
   * And below this height. The viewport is pinned at 100vh, so a short window
   * has to fit the header, a full card and the bar's reserved band into very
   * little — past a point the only ways out are clipping the card or shrinking
   * it until it is not worth pinning. Dropping to the swipeable row is better
   * than either.
   */
  minHeight?: number;
  trackClassName?: string;
}

interface TrackProps {
  children: ReactNode;
  header?: ReactNode;
  trackClassName?: string;
  /** Owned by the parent: the measurement observes it on either branch. */
  trackRef: RefObject<HTMLDivElement | null>;
}

function trackClasses(trackClassName?: string) {
  return trackClassName ? `${styles.track} ${trackClassName}` : styles.track;
}

/**
 * The pinned branch, and the only place `outerRef` exists.
 *
 * It is a separate component because useScroll throws outright when its target
 * ref never attaches — "Target ref is defined but not hydrated". Called from
 * the parent, the hook ran on every render where pinning was off: the first
 * paint before measurement, every screen under `minWidth`, every reduced-motion
 * reader, and every reel already wide enough not to need scrubbing. In all of
 * those the flow branch is what renders, so `outerRef` stayed null and the hook
 * had nothing to measure.
 *
 * Mounting this only once pinning is decided means the ref is attached before
 * the hook's effect ever looks at it.
 */
function PinnedTrack({
  children,
  header,
  trackClassName,
  trackRef,
  distance,
}: TrackProps & { distance: number }) {
  const outerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <div
      ref={outerRef}
      className={styles.outer}
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className={styles.viewport}>
        {header}
        <motion.div
          ref={trackRef}
          className={trackClasses(trackClassName)}
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

/** The unpinned branch: an ordinary swipeable row, no scroll hooks at all. */
function FlowTrack({ children, header, trackClassName, trackRef }: TrackProps) {
  return (
    <div className={styles.flow}>
      {header}
      <div className={styles.scroller}>
        <div ref={trackRef} className={trackClasses(trackClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * M02 + M03 — one mechanic, not two.
 *
 * A horizontal reel *is* a pinned scrub: the section holds still while vertical
 * scroll is remapped to horizontal travel. The tall outer element supplies the
 * scroll distance; the sticky child is what the reader sees.
 *
 * Pinning is disabled on small screens and under reduced motion, where the
 * reel degrades to an ordinary swipeable row — hijacking scroll on a phone is
 * hostile, and there is no vertical room to pin into. "Small" is both
 * dimensions: the height gate is what the second half of that sentence always
 * meant, and it went unenforced until a short window started clipping cards.
 */
export default function PinnedReel({
  children,
  header,
  minWidth = 860,
  minHeight = 560,
  trackClassName,
}: PinnedReelProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      `(min-width: ${minWidth}px) and (min-height: ${minHeight}px)`,
    );

    const measure = () => {
      const track = trackRef.current;
      const travel = track
        ? Math.max(0, track.scrollWidth - window.innerWidth + 48)
        : 0;

      // Nothing to scrub means nothing to pin — otherwise a wide screen that
      // already fits every card would still eat a viewport of scroll.
      if (!query.matches || reduce || travel < 24) {
        setPinned(false);
        setDistance(0);
        return;
      }

      setPinned(true);
      setDistance(travel);
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    query.addEventListener("change", measure);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      query.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
    // `pinned` re-runs the effect so the observer follows the track element
    // across the swap between the two branches below.
  }, [minWidth, minHeight, reduce, pinned]);

  const shared = { header, trackClassName, trackRef };

  return pinned ? (
    <PinnedTrack {...shared} distance={distance}>
      {children}
    </PinnedTrack>
  ) : (
    <FlowTrack {...shared}>{children}</FlowTrack>
  );
}
