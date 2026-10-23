import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import JsonLd from "@/components/JsonLd";
import Providers from "@/components/Providers";
import { siteConfig } from "@/data/portfolio";
import "./globals.css";

/**
 * The three families are served from ./fonts rather than next/font/google.
 *
 * next/font/google resolves each family over the network while the bundle is
 * being built, which made every deploy depend on Google answering nine
 * requests from a datacenter IP. Google rate-limits those, and when a response
 * came back as something other than font CSS the loader's regex returned null
 * and the build died on `Cannot read properties of null (reading '1')` — a
 * failure with no relation to the commit that triggered it. Vendoring the
 * files takes the network out of the build entirely.
 *
 * These are the variable cuts of the same faces, latin subset, so one file per
 * family covers every weight the site uses and the rendered result is
 * unchanged. Nothing is served from Google at runtime either way: next/font
 * always self-hosts what it resolves.
 */

/** Display and UI — an industrial grotesque that holds up at 8rem. */
const archivo = localFont({
  src: "./fonts/Archivo-Variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
  adjustFontFallback: "Arial",
});

/** Running text — a serif body against a grotesque display, not the reverse. */
const sourceSerif = localFont({
  src: "./fonts/SourceSerif4-Variable.woff2",
  weight: "200 900",
  style: "normal",
  variable: "--font-source-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

/** Labels, metadata and figures. */
const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-jetbrains",
  display: "swap",
  adjustFontFallback: "Arial",
});

/**
 * 1200x630 — the 1.91:1 ratio LinkedIn, X and Facebook lay their link cards
 * out for. The square og-image.jpg this used to point at was centre-cropped
 * by every one of them, which cut the monogram off top and bottom. That file
 * stays for the Person schema in lib/json-ld.ts, where square is the better
 * shape.
 */
const ogImage = {
  url: "/og-cover.jpg",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Full-Stack Software Engineer`,
  type: "image/jpeg",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  /**
   * The one URL this page wants to be known by. Without it the homepage is
   * reachable as several distinct URLs — with and without a trailing slash,
   * and under every Netlify deploy-preview and branch subdomain — and each is
   * a separate candidate competing with the others for the same content.
   */
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Mahdi Feriani",
    "Full-Stack Engineer",
    "Software Engineer",
    "React",
    "Vue.js",
    "NestJS",
    "React Native",
    "Next.js",
    "TypeScript",
    "Tunisia",
  ],
  authors: [{ name: siteConfig.name }],
  /**
   * Google only accepts a search-result favicon whose sides are a multiple of
   * 48px, so both files are sized to that rule: the ICO carries 16/32/48 and
   * the PNG is 192 (48x4). The sizes below are declared by hand rather than
   * read off the files, which is how they came to claim 256x256 after the
   * artwork had been resized — keep them in step with the real dimensions.
   *
   * The .ico is listed first and lives at the site root because that is the
   * path crawlers probe when they do not parse the markup.
   */
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/icon.png", type: "image/png", sizes: "192x192" }],
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "90mDw4kYc8NrdT0H4AZvEZdGqBgvQJdvG2DsFAYIxBY",
  },
};

/**
 * Paints the mobile browser chrome to match the page instead of leaving the
 * stock white bar above a dark site. Single value rather than a light/dark
 * pair because the site is pinned dark.
 *
 * This lives on `viewport`, not `metadata` — Next 15 moved it and warns at
 * build time if it is declared in the wrong export.
 */
export const viewport: Viewport = {
  themeColor: "#120f22",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${archivo.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {/* First tab stop on every route: the bar holds six links and the hero
            holds several more, so a keyboard reader had to walk the whole of
            the chrome before reaching any content. */}
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
