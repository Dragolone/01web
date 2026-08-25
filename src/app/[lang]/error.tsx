"use client";

// Route-level error boundary for every page under [lang]. Renders inside the
// root layout (nav/footer stay), so unlike the 404 it needs no <html> shell.
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const copy = {
  zh: { title: "页面出了点问题", desc: "这个页面加载时发生了错误，我们已记录。你可以重试或返回首页。", retry: "重试", home: "返回首页" },
  tw: { title: "頁面出了點問題", desc: "這個頁面載入時發生了錯誤，我們已記錄。你可以重試或返回首頁。", retry: "重試", home: "返回首頁" },
  en: { title: "Something went wrong", desc: "This page hit an error while loading. You can retry or head back home.", retry: "Retry", home: "Back to home" },
} as const;

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname();
  const locale = (pathname.match(/^\/(zh|tw|en)/)?.[1] ?? "zh") as keyof typeof copy;
  const t = copy[locale];

  useEffect(() => {
    console.error("[route error]", error.digest ?? "", error);
  }, [error]);

  return (
    <section className="flex min-h-[70svh] items-center px-6 pt-32 pb-20">
      <div className="mx-auto max-w-md text-center">
        <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#5cf0ff]">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#5cf0ff]" />
          Error
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.title}</h1>
        <p className="mt-4 text-muted">{t.desc}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-medium text-[#0a1024]"
          >
            {t.retry}
          </button>
          <Link
            href={`/${locale}`}
            className="inline-flex h-11 items-center rounded-full border border-white/30 px-6 text-sm font-medium text-foreground hover:border-white/70"
          >
            {t.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
