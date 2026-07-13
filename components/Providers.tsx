"use client";

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/lib/theme";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Toaster position="top-center" />
      {children}
    </ThemeProvider>
  );
}
