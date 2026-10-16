"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element travels, as a fraction of pointer distance. */
  strength?: number;
  /** Pointer distance in px at which the pull starts. */
  radius?: number;
}

/**
 * M04 — magnetic cursor.
 *
 * Listens on the window rather than the element so the pull begins before the
 * pointer arrives, which is what makes it feel like attraction rather than
 * hover. Returns a plain span under reduced motion.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.28,
  radius = 170,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const spring = { stiffness: 220, damping: 20, mass: 0.35 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (reduce) return;

    const onMove = (event: PointerEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const pull = distance < radius ? 1 - distance / radius : 0;

      x.set(dx * pull * strength);
      y.set(dy * pull * strength);
    };

    const reset = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, [reduce, radius, strength, x, y]);

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span ref={ref} className={className} style={{ x, y }}>
      {children}
    </motion.span>
  );
}
