// Site-level config used by metadata, sitemap, robots, and OG images.
// Override at deploy time via the NEXT_PUBLIC_SITE_URL env var, e.g.
// NEXT_PUBLIC_SITE_URL=https://www.01weichuang.com
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.01weichuang.com"
).replace(/\/$/, "");

export const SITE_PATHS = [
  "",
  "/products",
  "/products/charge",
  "/products/vtol",
  "/solutions",
  "/about",
  "/contact",
  "/privacy",
] as const;

// Per-page metadata. Next.js shallow-merges page metadata over the layout's, so a
// page that sets `openGraph` replaces the layout's whole openGraph object (losing
// og:image / url / siteName), and without `alternates` every page inherits the
// layout's canonical = the locale home. Every page therefore builds its metadata
// through this helper. `path` is the locale-less route, e.g. "/about".
export function pageMeta(opts: {
  lang: string;
  path: string;
  title: string;
  description: string;
  siteName: string;
}) {
  const { lang, path, title, description, siteName } = opts;
  const url = `${SITE_URL}/${lang}${path}`;
  const ogLocale = lang === "zh" ? "zh_CN" : lang === "tw" ? "zh_TW" : "en_US";
  const ogImage = { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: siteName };
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "zh-Hans": `${SITE_URL}/zh${path}`,
        "zh-Hant": `${SITE_URL}/tw${path}`,
        en: `${SITE_URL}/en${path}`,
        "x-default": `${SITE_URL}/zh${path}`,
      },
    },
    openGraph: {
      type: "website" as const,
      url,
      siteName,
      title,
      description,
      locale: ogLocale,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image" as const, title, description, images: [ogImage.url] },
  };
}
