import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "./app/[lang]/dictionaries";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
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
  matcher: ["/((?!_next|api|opengraph-image|twitter-image|sitemap.xml|robots.txt|.*\\..*).*)"],
};
