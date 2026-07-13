import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import Providers from "@/components/Providers";
import { siteConfig } from "@/data/portfolio";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-roboto",
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
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "256x256" }],
    apple: [{ url: "/icon.png", type: "image/png", sizes: "256x256" }],
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

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${poppins.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={poppins.className} suppressHydrationWarning>
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
