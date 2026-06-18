import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { PageHero } from "@/components/PageHero";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.pages.about.title,
    description: dict.pages.about.lead,
    openGraph: { title: dict.pages.about.title, description: dict.pages.about.lead },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PageHero
        title={dict.pages.about.title}
        lead={dict.pages.about.lead}
        eyebrow={dict.pages.about.eyebrow}
        meta={dict.pages.about.meta}
      />
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="text-base md:text-lg leading-loose text-foreground/85 whitespace-pre-line">
              {dict.pages.about.body}
            </p>
            <p className="mt-8 text-lg md:text-xl text-brand font-medium">
              {dict.brand.vision}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid gap-5">
              {[
                { img: "/products/robot-hero.jpg", key: "charge" as const },
                { img: "/products/drone-hero.jpg", key: "vtol" as const },
              ].map(({ img, key }) => (
                <div key={key} className="rounded-3xl overflow-hidden bg-surface">
                  <Image
                    src={img}
                    alt={dict.products.items.find((i) => i.key === key)?.name ?? dict.brand.name}
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="w-full h-full aspect-[4/3] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech / patents section */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="rounded-3xl border border-border p-8 md:p-12">
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-brand mb-3">
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-brand" />
              R&amp;D
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {dict.pages.about.techTitle}
            </h2>
            <p className="mt-4 text-foreground/70 leading-relaxed max-w-2xl">
              {dict.pages.about.techDesc}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-brand bg-brand-soft rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              {dict.pages.about.patents}
            </div>
          </div>
        </div>
      </section>

      {/* Market & outlook — real sizing from the product manual */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {dict.pages.about.market.title}
          </h2>
          <p className="mt-3 max-w-2xl text-muted leading-relaxed">
            {dict.pages.about.market.subtitle}
          </p>
          <div className="mt-10 overflow-hidden rounded-3xl border border-border">
            <div className="overflow-x-auto">
              <div className="min-w-[34rem]">
                <div className="grid grid-cols-4 gap-3 px-4 md:px-6 py-3.5 bg-surface text-[10px] md:text-xs uppercase tracking-widest text-muted">
                  <div>{dict.pages.about.market.cols.segment}</div>
                  <div>{dict.pages.about.market.cols.domestic}</div>
                  <div>{dict.pages.about.market.cols.global}</div>
                  <div className="text-right">{dict.pages.about.market.cols.growth}</div>
                </div>
                {dict.pages.about.market.rows.map((r) => (
                  <div
                    key={r.segment}
                    className="grid grid-cols-4 gap-3 px-4 md:px-6 py-4 border-t border-border/70 text-xs md:text-sm items-center"
                  >
                    <div className="font-medium">{r.segment}</div>
                    <div className="text-muted tabular-nums">{r.domestic}</div>
                    <div className="text-muted tabular-nums">{r.global}</div>
                    <div className="text-right font-medium text-brand tabular-nums">{r.growth}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
