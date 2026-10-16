import type { CSSProperties, ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  /** `rise` for prose and rows, `pop` for cards in a grid. */
  effect?: "rise" | "pop";
  /** Position in the stagger sequence. */
  index?: number;
  scrollDriven?: boolean;
  className?: string;
  id?: string;
}

/**
 * M12 — staggered entrance, and the general-purpose reveal.
 *
 * Same contract as MaskText: pure CSS, server-rendered, visible without JS.
 * For grids, put the class on the card itself via `revealClass` rather than
 * wrapping it, so the card stays the grid item.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  effect = "rise",
  index = 0,
  scrollDriven = true,
  className,
  id,
}: RevealProps) {
  const base = effect === "pop" ? "popIn" : "riseIn";

  return (
    <Tag
      id={id}
      className={className ? `${base} ${className}` : base}
      data-scroll-driven={scrollDriven ? "" : undefined}
      style={{ "--i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Props for staggering an element you are already rendering yourself — avoids
 * an extra wrapper div inside grids and flex rows.
 *
 * Takes the element's own class rather than leaving the caller to merge it:
 * spreading these props alongside a second `className` silently drops one.
 */
export function revealProps(
  index: number,
  effect: "rise" | "pop" = "pop",
  className?: string,
  scrollDriven = true,
) {
  const base = effect === "pop" ? "popIn" : "riseIn";

  return {
    className: className ? `${base} ${className}` : base,
    "data-scroll-driven": scrollDriven ? "" : undefined,
    style: { "--i": index } as CSSProperties,
  };
}
