import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

export function Footer({ lang, dict }: Props) {
  const linkKeys = ["products", "technology", "about", "contact"] as const;
  const hrefMap: Record<(typeof linkKeys)[number], string> = {
    products: `/${lang}/products`,
    technology: `/${lang}/solutions`,
    about: `/${lang}/about`,
    contact: `/${lang}/contact`,
  };

  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Image
            src="/brand/logo-512.png"
            alt={dict.brand.name}
            width={140}
            height={36}
            className="h-7 w-auto"
          />
          <p className="mt-4 text-sm text-muted max-w-xs leading-relaxed">
            {dict.brand.lead}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted mb-4">{dict.footer.sitemapLabel}</p>
          <ul className="space-y-2 text-sm">
            {linkKeys.map((k) => (
              <li key={k}>
                <Link
                  href={hrefMap[k]}
                  className="group inline-flex items-center gap-1 text-foreground/80 hover:text-brand transition-colors"
                >
                  {dict.footer.links[k]}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                    className="-translate-x-1 -translate-y-0.5 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <path d="M3 9 9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted mb-4">{dict.footer.contactLabel}</p>
          <a
            href="mailto:810170966qq@gmail.com"
            className="group inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-brand transition-colors"
          >
            810170966qq@gmail.com
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
              className="-translate-x-1 -translate-y-0.5 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            >
              <path d="M3 9 9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-xs text-muted hover:text-brand transition-colors"
          >
            {dict.footer.icp}
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-[88rem] px-6 lg:px-10 py-5 text-xs text-muted">
          {dict.footer.copy}
        </p>
      </div>
    </footer>
  );
}
