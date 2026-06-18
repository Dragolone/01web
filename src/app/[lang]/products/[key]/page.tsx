import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getDictionary, hasLocale, locales, type Locale } from "../../dictionaries";

const PRODUCT_KEYS = ["charge", "vtol"] as const;
type ProductKey = (typeof PRODUCT_KEYS)[number];

const productImages: Record<ProductKey, { img: string; alt: string }> = {
  charge: { img: "/products/charge-station.jpg", alt: "LingYI-Charge Mobile EV Charging Robot" },
  vtol: { img: "/products/drone-cruise.jpg", alt: "LingYI-1 VTOL Fixed-Wing UAV" },
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
  if (!hasLocale(lang)) notFound();
  // Unknown product key → send to the listing (cleaner than a 404 for a mistyped
  // key, and avoids the blank-page edge of notFound() under the dynamic root layout).
  if (!isProductKey(key)) redirect(`/${lang}/products`);
  const dict = await getDictionary(lang as Locale);
  const item = dict.products.items.find((i) => i.key === key);
  if (!item) redirect(`/${lang}/products`);
  const visual = productImages[key];
  const detail = dict.productDetail.items[key];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.desc,
    category: item.tag,
    brand: { "@type": "Brand", name: dict.brand.name },
    manufacturer: { "@type": "Organization", name: dict.brand.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {/* Hero — dark cyber opening, dissolving into light content */}
      <section
        className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-28 text-white"
        style={{ background: "radial-gradient(120% 100% at 50% -10%, #142a73 0%, #0a1230 45%, #070a18 100%)" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(120,150,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,255,0.07) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
            maskImage: "radial-gradient(110% 90% at 50% 0%, black 25%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(110% 90% at 50% 0%, black 25%, transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24"
          style={{ background: "linear-gradient(180deg, transparent 0%, #fafbfe 96%)" }}
        />
        <div className="relative mx-auto max-w-[88rem] px-6 lg:px-10">
          <Link
            href={`/${lang}/products`}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1m0 0l5 5M1 7l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {dict.productDetail.backToProducts}
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#9db8ff] mb-3">
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#5cf0ff]" />
                Product
              </p>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                {item.name}
              </h1>
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-[#9db8ff] font-medium">
                  {item.tag}
                </span>
                <p className="text-base text-[#9db8ff] font-medium">{item.summary}</p>
              </div>
              <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
                {item.desc}
              </p>
              <div className="mt-8">
                <a
                  href="#specs"
                  className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-brand text-white font-medium hover:bg-brand-strong transition-all hover:shadow-lg hover:shadow-brand/30"
                >
                  {dict.productDetail.ctaText}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-y-0.5">
                    <path d="M7 1v12m0 0l5-5m-5 5L2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
                <Image
                  src={visual.img}
                  alt={visual.alt}
                  width={1200}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
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

      {/* Business value — comparison vs the traditional approach (from the manual) */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {dict.productDetail.valueTitle}
          </h2>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-surface text-xs uppercase tracking-widest text-muted">
              <div className="col-span-4" />
              <div className="col-span-4">{dict.productDetail.valueColOld}</div>
              <div className="col-span-4 text-brand">{dict.productDetail.valueColNew}</div>
            </div>
            {detail.value.rows.map((r) => (
              <div
                key={r.k}
                className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 px-6 py-5 border-t border-border/70"
              >
                <div className="md:col-span-4 font-medium">{r.k}</div>
                <div className="md:col-span-4 text-sm text-muted">
                  <span className="md:hidden text-xs uppercase tracking-wider text-muted/70 mr-2">
                    {dict.productDetail.valueColOld}
                  </span>
                  {r.old}
                </div>
                <div className="md:col-span-4 text-sm font-medium text-brand">
                  <span className="md:hidden text-xs uppercase tracking-wider text-muted/70 mr-2">
                    {dict.productDetail.valueColNew}
                  </span>
                  {r.neo}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted leading-relaxed">
            {detail.value.note}
          </p>
        </div>
      </section>

      {/* Specs — real parameters from the product manual */}
      <section id="specs" className="scroll-mt-24 pb-20 md:pb-28">
        <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {dict.productDetail.specsTitle}
          </h2>
          <div className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {detail.specs.map((group) => (
              <div key={group.group}>
                <p className="text-xs tracking-widest uppercase text-brand mb-4">
                  {group.group}
                </p>
                <dl className="divide-y divide-border/70">
                  {group.rows.map((r) => (
                    <div
                      key={r.k}
                      className="flex items-baseline justify-between gap-6 py-3"
                    >
                      <dt className="text-sm text-muted shrink-0">{r.k}</dt>
                      <dd className="text-sm font-medium text-foreground text-right">
                        {r.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Full datasheet note */}
          <div className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <span>{dict.productDetail.specsTBD}</span>
            <a
              href="mailto:810170966qq@gmail.com"
              className="group inline-flex items-center gap-1 text-brand hover:text-brand-strong font-medium"
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
          </div>
        </div>
      </section>
    </>
  );
}
