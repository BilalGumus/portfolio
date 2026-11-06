import type { MetadataRoute } from "next";
import { meta, profile } from "@/app/lib/site";

/**
 * Web app manifest - what Android uses for "Add to Home screen", the task
 * switcher and the install prompt.
 *
 * Replaces the generator's site.webmanifest, which shipped with an empty
 * name and white colours. The icons and `standalone` are kept from it; the
 * name and description come from the same constants as the page metadata, and
 * the colours are the light page ground, matching `themeColor` in layout.tsx.
 *
 * The icon files live in /public because the manifest refers to them by URL.
 * The tab and Apple icons are declared in layout.tsx (metadata.icons), next
 * to these in /public; favicon.ico is the /app file convention.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.name,
    short_name: profile.name,
    description: meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f8",
    theme_color: "#f7f7f8",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
