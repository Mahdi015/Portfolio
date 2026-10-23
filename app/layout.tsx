import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import Providers from "@/components/Providers";
import { siteConfig } from "@/data/portfolio";
import "./globals.css";

/** Display and UI — an industrial grotesque that holds up at 8rem. */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

/** Running text — a serif body against a grotesque display, not the reverse. */
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

/** Labels, metadata and figures. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 1200,
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
