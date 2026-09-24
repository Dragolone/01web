"use client";

import Link from "next/link";
import type { NavbarDict } from "@/app/[lang]/dictSlices";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { setTheme, useTheme } from "@/components/useTheme";
import clsx from "clsx";
import {
  locales,
  localeLabels,
  type Locale,
} from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: NavbarDict };

const navKeys = ["home", "products", "technology", "about"] as const;
const navHrefMap: Record<(typeof navKeys)[number], string> = {
  home: "",
  products: "/products",
  technology: "/solutions",
  about: "/about",
};

// Strip the leading locale segment from a path. Works for "zh" / "tw" / "en".
function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(?:zh|tw|en)(\/.*|$)/);
  return match ? match[1] || "" : pathname;
}

export function Navbar({ lang, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: close on Escape, lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const rest = stripLocale(pathname);

  return (
    <header
      // Own view-transition layer: stays pinned above the page cross-fade.
      style={{ viewTransitionName: "site-header" }}
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-foreground/10"
          : "bg-transparent light:bg-background/60 light:backdrop-blur-md"
      )}
    >
      <div className="mx-auto max-w-[96rem] px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2 group">
          <Image
            src="/brand/logo-512.png"
            alt={dict.brand.name}
            width={140}
            height={36}
            priority
            className="h-8 w-auto brightness-0 invert light:invert-0"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navKeys.map((k) => {
            const href = `/${lang}${navHrefMap[k]}`;
            const active =
              k === "home" ? pathname === `/${lang}` : pathname.startsWith(href);
            return (
              <Link
                key={k}
                href={href}
                className={clsx(
                  "px-4 py-2 text-[15px] rounded-full transition-colors",
                  active ? "text-foreground" : "text-foreground/70 hover:text-foreground hover:bg-foreground/10"
                )}
              >
                {dict.nav[k]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* 3-segment language pill: 简 / 繁 / EN */}
          <div
            className="inline-flex items-center rounded-full border border-foreground/20 bg-foreground/10 p-0.5 backdrop-blur-sm"
          >
            {locales.map((loc) => {
              const isActive = loc === lang;
              const href = `/${loc}${rest}`;
              return (
                <Link
                  key={loc}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "min-w-[2.25rem] h-7 px-2.5 inline-flex items-center justify-center text-xs font-medium rounded-full transition-colors",
                    isActive ? "bg-btn text-btn-fg" : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {localeLabels[loc]}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? dict.a11y.themeToDark : dict.a11y.themeToLight}
            title={theme === "light" ? dict.a11y.themeToDark : dict.a11y.themeToLight}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground"
          >
            {theme === "light" ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5a5.8 5.8 0 1 0 7.1 7.1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <circle cx="8" cy="8" r="3" />
                <path d="M8 1.5v1.3M8 13.2v1.3M1.5 8h1.3M13.2 8h1.3M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9" />
              </svg>
            )}
          </button>

          <Link
            href={`/${lang}/contact`}
            className="hidden sm:inline-flex items-center justify-center h-10 px-6 rounded-full bg-btn text-btn-fg text-[15px] font-medium transition-all hover:bg-btn/90 hover:shadow-[0_0_28px_-6px_rgba(150,180,255,0.7)] shadow-sm shadow-black/10"
          >
            {dict.nav.cta}
          </Link>
          <button
            type="button"
            aria-label={dict.a11y.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-foreground/40 text-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d={open ? "M3 3 L13 13 M13 3 L3 13" : "M2 4 H14 M2 8 H14 M2 12 H14"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-foreground/10 bg-background/95 backdrop-blur-xl">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {navKeys.map((k) => (
              <Link
                key={k}
                href={`/${lang}${navHrefMap[k]}`}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-foreground/85 hover:text-foreground"
              >
                {dict.nav[k]}
              </Link>
            ))}
            <Link
              href={`/${lang}/contact`}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center h-11 rounded-full bg-btn text-btn-fg font-medium transition-all hover:bg-btn/90"
            >
              {dict.nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
