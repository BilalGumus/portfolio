import type { MetadataRoute } from "next";
import { meta } from "@/app/lib/site";

/**
 * robots.txt
 *
 * Everything is public and there is one page, so there is nothing to disallow.
 * The value of this file is the sitemap pointer: it is how a crawler that
 * arrives at the root finds the sitemap without being told about it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${meta.url}/sitemap.xml`,
    host: meta.url,
  };
}
