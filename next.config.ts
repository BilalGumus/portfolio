import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pins the workspace root to this directory. Without it Turbopack walks up
  // and finds an unrelated package-lock.json in the home directory, which it
  // warns about and which could change how modules resolve.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
