"use client";

import type { ReactNode } from "react";
import { useTheme } from "@/lib/theme";

interface SectionTitleProps {
  highlight: string;
  children: ReactNode;
}

export default function SectionTitle({
  highlight,
  children,
}: SectionTitleProps) {
  const { theme } = useTheme();

  return (
    <div className="section-header">
      <h2
        style={{
          color: theme === "light" ? "#7A77B9" : "#fff",
        }}
      >
        {children}
        <span>{highlight}</span>
      </h2>
      <div className="sm_border" />
    </div>
  );
}
