"use client";

// Root not-found — handles every unmatched URL and any notFound() that bubbles
// up. The root layout lives in the dynamic [lang] segment, so Next can't compose
// a localized 404 from a layout; this file renders a full, self-contained HTML
// document instead. Locale is read from the path (client-side).
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

const copy = {
  zh: {
    htmlLang: "zh-Hans",
    title: "页面不存在",
    desc: "抱歉，你访问的页面可能已移动或不存在。",
    home: "返回首页",
  },
  tw: {
    htmlLang: "zh-Hant",
    title: "頁面不存在",
    desc: "抱歉，你造訪的頁面可能已移動或不存在。",
    home: "返回首頁",
  },
  en: {
    htmlLang: "en",
    title: "Page not found",
    desc: "Sorry, the page you’re looking for may have moved or no longer exists.",
    home: "Back to home",
  },
} as const;

export default function NotFound() {
  const pathname = usePathname();
  const locale = (pathname.match(/^\/(zh|tw|en)/)?.[1] ?? "zh") as keyof typeof copy;
  const t = copy[locale];

  return (
    <html lang={t.htmlLang} className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground flex items-center justify-center px-6 py-24">
        <div className="max-w-md text-center">
          <img
            src="/brand/logo-512.png"
            alt="零一唯创"
            width={140}
            height={36}
            className="h-7 w-auto mx-auto mb-10 opacity-80 brightness-0 invert"
          />
          <p className="text-7xl md:text-8xl font-semibold tracking-tight text-brand">
            404
          </p>
          <h1 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">
            {t.title}
          </h1>
          <p className="mt-3 text-muted leading-relaxed">{t.desc}</p>
          <Link
            href={`/${locale}`}
            className="group mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-brand text-white font-medium hover:bg-brand-strong transition-all hover:shadow-lg hover:shadow-brand/30"
          >
            {t.home}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </body>
    </html>
  );
}
