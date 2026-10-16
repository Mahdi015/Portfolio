"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** Lift toward the viewer, in px. */
  lift?: number;
}

/**
 * M06 — 3D tilt.
 *
 * Also publishes the pointer position as `--mx` / `--my` on the element so a
 * card can draw its own highlight where the cursor is. Perspective lives on
 * the parent, so a row of these shares one vanishing point.
 */
export default function Tilt({
  children,
  className,
  max = 9,
  lift = 9,
}: TiltProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 260, damping: 24, mass: 0.4 };

  // -0.5 .. 0.5 across each axis
  const px = useSpring(0, spring);
  const py = useSpring(0, spring);
  const z = useSpring(0, spring);

  const rotateX = useTransform(py, (v) => v * -2 * max);
  const rotateY = useTransform(px, (v) => v * 2 * max);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;

    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);

    px.set(mx / rect.width - 0.5);
    py.set(my / rect.height - 0.5);
    z.set(lift);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
    z.set(0);
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, z, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
