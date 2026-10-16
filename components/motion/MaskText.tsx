import type { CSSProperties, ElementType, ReactNode } from "react";

interface MaskTextProps {
  /** Each entry becomes one masked line, revealed in order. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /**
   * Drive the reveal off the element's own scroll position instead of page
   * load. Leave false for above-the-fold text so it animates immediately.
   */
  scrollDriven?: boolean;
  /** Offset the stagger when several MaskText blocks share one sequence. */
  startIndex?: number;
}

/**
 * M01 — mask line reveal.
 *
 * Deliberately CSS-only: the lines are real text in the server-rendered HTML,
 * the keyframes run without hydration, and `animation-timeline: view()` takes
 * over where the browser supports it. Nothing is parked at opacity 0 waiting
 * on an observer.
 */
export default function MaskText({
  lines,
  as: Tag = "span",
  className,
  lineClassName,
  scrollDriven = false,
  startIndex = 0,
}: MaskTextProps) {
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          className={
            lineClassName ? `maskLine ${lineClassName}` : "maskLine"
          }
        >
          <span
            className="maskInner"
            data-scroll-driven={scrollDriven ? "" : undefined}
            style={{ "--i": index + startIndex } as CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
