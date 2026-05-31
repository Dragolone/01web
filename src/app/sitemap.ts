import type { MetadataRoute } from "next";
import { SITE_URL, SITE_PATHS } from "./site";
import { locales } from "./[lang]/dictionaries";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((loc) =>
    SITE_PATHS.map((path) => ({
      url: `${SITE_URL}/${loc}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l === "zh" ? "zh-Hans" : l === "tw" ? "zh-Hant" : "en",
            `${SITE_URL}/${l}${path}`,
          ])
        ),
      },
    }))
  );
}
