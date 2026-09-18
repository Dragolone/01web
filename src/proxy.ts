import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "./app/[lang]/dictionaries";
import { SITE_URL } from "./app/site";

// Canonical host (www.01weichuang.com). Requests that reach us on the bare apex
// (01weichuang.com) are 301'd to it so search engines see one site, not two.
// nginx should do this too; this is the in-app safety net.
const canonicalHost = new URL(SITE_URL).host;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const host = (request.headers.get("host") ?? "").split(":")[0];
  if (canonicalHost.startsWith("www.") && host === canonicalHost.slice(4)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = canonicalHost;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Always default to Simplified Chinese on first entry; user can switch later.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, files with extensions, and root-level
  // metadata routes (sitemap, robots, og image) that must not be locale-prefixed.
  matcher: ["/((?!_next|api|opengraph-image|twitter-image|sitemap.xml|robots.txt|manifest.webmanifest|.*\\..*).*)"],
};
