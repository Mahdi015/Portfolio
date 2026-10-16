"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * M07 — count-up numbers.
 *
 * Renders the final figure on the server, so the real number is in the HTML
 * for crawlers, for no-JS readers and for the first painted frame. The count
 * only replaces it once the element is actually on screen.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1100,
  className,
}: CountUpProps) {
  const final = `${prefix}${value}${suffix}`;
  const [text, setText] = useState(final);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasRun.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || hasRun.current) continue;

          hasRun.current = true;
          observer.disconnect();

          const start = performance.now();
          const step = (now: number) => {
            const k = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - k, 3);
            setText(`${prefix}${Math.round(value * eased)}${suffix}`);
            if (k < 1) requestAnimationFrame(step);
            else setText(final);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, prefix, suffix, durationMs, final]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
