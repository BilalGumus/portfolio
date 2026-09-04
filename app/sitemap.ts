import type { MetadataRoute } from "next";
import { meta } from "@/app/lib/site";

/**
 * sitemap.xml
 *
 * One entry, because there is one page. Kept as code rather than a static file
 * so the host comes from the same constant as everything else and cannot drift
 * from `metadataBase`.
 *
 * `lastModified` is the build time. That is honest for a site whose content is
 * compiled in - it changes exactly when the deployed content changes - and it
 * avoids the usual sitemap failure of advertising a date that never moves.
 *
 * When the deferred routes come back, add them here: their slugs are already
 * enumerable from `projectSlugs` and `noteSlugs`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: meta.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
