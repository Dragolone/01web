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
      <section className="pb-20">
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
            <div className="rounded-3xl overflow-hidden bg-surface">
              <Image
                src="/products/delivery-robot-office.jpg"
                alt={dict.brand.name}
                width={1248}
                height={832}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech / patents section */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="rounded-3xl border border-border p-8 md:p-12">
            <p className="text-xs tracking-[0.18em] uppercase text-brand mb-3">
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
    </>
  );
}
