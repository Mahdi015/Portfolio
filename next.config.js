const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Static HTML export. Every route in this site is renderable at build time —
   * the project pages come from generateStaticParams, the contact form posts
   * client-side to Web3Forms, and nothing reads cookies or headers at runtime.
   * Exporting puts the whole site on Cloudflare Pages' static tier, where
   * asset requests are unmetered.
   */
  output: "export",
  /**
   * Pinned to this directory. Without it Next walks up looking for a workspace
   * root, finds a stray lockfile in the user profile above the project, and
   * traces the build from there — which is both a warning on every build and
   * the wrong root for the file trace the deploy is built from.
   */
  outputFileTracingRoot: path.join(__dirname),
  images: {
    /**
     * next/image's optimizer needs a server, which an exported site has no
     * room for. No loss here: every image is already served from Cloudinary,
     * which handles resizing and format negotiation upstream.
     */
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/ds5eqdcxk/**",
      },
    ],
  },
};

module.exports = nextConfig;
