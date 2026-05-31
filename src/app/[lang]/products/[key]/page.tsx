import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales, type Locale } from "../../dictionaries";

const PRODUCT_KEYS = ["charge", "vtol"] as const;
type ProductKey = (typeof PRODUCT_KEYS)[number];

const productImages: Record<ProductKey, { img: string; alt: string }> = {
  charge: { img: "/products/robot-hero.jpg", alt: "LingYI-Charge Mobile EV Charging Robot" },
  vtol: { img: "/products/drone-hero.jpg", alt: "LingYI-1 VTOL Fixed-Wing UAV" },
};

function isProductKey(k: string): k is ProductKey {
  return (PRODUCT_KEYS as readonly string[]).includes(k);
}

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    PRODUCT_KEYS.map((key) => ({ lang, key }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products/[key]">): Promise<Metadata> {
  const { lang, key } = await params;
  if (!hasLocale(lang) || !isProductKey(key)) return {};
  const dict = await getDictionary(lang as Locale);
  const item = dict.products.items.find((i) => i.key === key);
  if (!item) return {};
  return {
    title: item.name,
    description: item.desc,
    openGraph: { title: item.name, description: item.desc },
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/[lang]/products/[key]">) {
  const { lang, key } = await params;
  if (!hasLocale(lang) || !isProductKey(key)) notFound();
  const dict = await getDictionary(lang as Locale);
  const item = dict.products.items.find((i) => i.key === key);
  if (!item) notFound();
  const visual = productImages[key];
  const detail = dict.productDetail.items[key];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-surface/40">
        <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
          <Link
            href={`/${lang}/products`}
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1m0 0l5 5M1 7l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {dict.productDetail.backToProducts}
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs tracking-[0.18em] uppercase text-brand mb-3">
                Product
              </p>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                {item.name}
              </h1>
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs px-2.5 py-1 rounded-full bg-brand-soft text-brand font-medium">
                  {item.tag}
                </span>
                <p className="text-base text-brand font-medium">{item.summary}</p>
              </div>
              <p className="mt-6 text-lg text-foreground/75 leading-relaxed max-w-xl">
                {item.desc}
              </p>
              <div className="mt-8">
                <Link
                  href={`/${lang}/contact`}
                  className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-brand text-white font-medium hover:bg-brand-strong transition-all hover:shadow-lg hover:shadow-brand/30"
                >
                  {dict.productDetail.ctaText}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-surface">
                <Image
                  src={visual.img}
                  alt={visual.alt}
                  width={1200}
                  height={900}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {dict.productDetail.featuresTitle}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {detail.features.map((f, idx) => (
              <div
                key={f.title}
                className="p-7 rounded-3xl border border-border bg-white"
              >
                <p className="text-xs tracking-widest uppercase text-brand">{`0${idx + 1}`}</p>
                <p className="mt-3 text-lg font-medium">{f.title}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs (placeholder) */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
          <div className="rounded-3xl border border-dashed border-border p-10 md:p-14 text-center">
            <p className="text-xs tracking-widest uppercase text-muted">
              {dict.productDetail.specsTitle}
            </p>
            <p className="mt-4 text-lg text-foreground/70 max-w-xl mx-auto">
              {dict.productDetail.specsTBD}
            </p>
            <a
              href="mailto:810170966qq@gmail.com"
              className="mt-6 inline-flex items-center gap-2 text-brand hover:text-brand-strong font-medium"
            >
              810170966qq@gmail.com
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
