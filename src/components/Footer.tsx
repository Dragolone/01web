import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

export function Footer({ lang, dict }: Props) {
  const linkKeys = ["products", "technology", "about", "contact"] as const;
  const hrefMap: Record<(typeof linkKeys)[number], string> = {
    products: `/${lang}/products`,
    technology: `/${lang}/technology`,
    about: `/${lang}/about`,
    contact: `/${lang}/contact`,
  };

  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 grid gap-10 md:grid-cols-3">
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
          <p className="text-xs uppercase tracking-widest text-muted mb-4">Sitemap</p>
          <ul className="space-y-2 text-sm">
            {linkKeys.map((k) => (
              <li key={k}>
                <Link
                  href={hrefMap[k]}
                  className="text-foreground/80 hover:text-brand transition-colors"
                >
                  {dict.footer.links[k]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted mb-4">Contact</p>
          <p className="text-sm text-foreground/80">810170966qq@gmail.com</p>
          <p className="mt-2 text-xs text-muted">{dict.footer.icp}</p>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-6 lg:px-10 py-5 text-xs text-muted">
          {dict.footer.copy}
        </p>
      </div>
    </footer>
  );
}
