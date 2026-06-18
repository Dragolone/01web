"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  locales,
  localeLabels,
  type Dictionary,
  type Locale,
} from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

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
  // The home page leads with a full-screen dark immersive hero, so at the very
  // top the navbar goes white-on-transparent; once scrolled it reverts to the
  // standard light glassmorphism. Other pages always use the light treatment.
  const isHome = rest === "";
  const overHero = isHome && !scrolled;

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2 group">
          <Image
            src="/brand/logo-512.png"
            alt={dict.brand.name}
            width={140}
            height={36}
            priority
            className={clsx(
              "h-7 w-auto transition-[filter] duration-300",
              // logo-512.png is transparent; invert it to solid white over the dark hero
              overHero && "brightness-0 invert"
            )}
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
                  "px-4 py-2 text-sm rounded-full transition-colors",
                  overHero
                    ? active
                      ? "text-white"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                    : active
                      ? "text-brand"
                      : "text-foreground/80 hover:text-foreground hover:bg-black/[.04]"
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
            className={clsx(
              "inline-flex items-center rounded-full border p-0.5 backdrop-blur-sm transition-colors",
              overHero ? "border-white/25 bg-white/10" : "border-border bg-white/60"
            )}
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
                    overHero
                      ? isActive
                        ? "bg-white text-[#0a1024]"
                        : "text-white/70 hover:text-white"
                      : isActive
                        ? "bg-foreground text-white"
                        : "text-foreground/65 hover:text-foreground"
                  )}
                >
                  {localeLabels[loc]}
                </Link>
              );
            })}
          </div>

          <Link
            href={`/${lang}/contact`}
            className="hidden sm:inline-flex items-center justify-center h-9 px-5 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand-strong transition-colors shadow-sm shadow-brand/20"
          >
            {dict.nav.cta}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={clsx(
              "md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors",
              overHero ? "border-white/40 text-white" : "border-border"
            )}
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
        <div id="mobile-menu" className="md:hidden border-t border-border bg-white">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {navKeys.map((k) => (
              <Link
                key={k}
                href={`/${lang}${navHrefMap[k]}`}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-foreground/85 hover:text-brand"
              >
                {dict.nav[k]}
              </Link>
            ))}
            <Link
              href={`/${lang}/contact`}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center h-11 rounded-full bg-brand text-white font-medium"
            >
              {dict.nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
