const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Pinned to this directory. Without it Next walks up looking for a workspace
   * root, finds a stray lockfile in the user profile above the project, and
   * traces the build from there — which is both a warning on every build and
   * the wrong root for the file trace the deploy is built from.
   */
  outputFileTracingRoot: path.join(__dirname),
  images: {
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
