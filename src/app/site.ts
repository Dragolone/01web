// Site-level config used by metadata, sitemap, robots, and OG images.
// Override at deploy time via the NEXT_PUBLIC_SITE_URL env var, e.g.
// NEXT_PUBLIC_SITE_URL=https://www.01weichuang.com
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.01weichuang.com"
).replace(/\/$/, "");

export const SITE_PATHS = ["", "/products", "/solutions", "/about", "/contact"] as const;
