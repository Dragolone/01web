import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { PageHero } from "@/components/PageHero";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.pages.contact.title,
    description: dict.pages.contact.lead,
    openGraph: { title: dict.pages.contact.title, description: dict.pages.contact.lead },
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PageHero
        title={dict.pages.contact.title}
        lead={dict.pages.contact.lead}
        eyebrow={dict.pages.contact.eyebrow}
        meta={dict.pages.contact.meta}
      />
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 grid gap-5 md:grid-cols-2">
          <a
            href="mailto:810170966qq@gmail.com?subject=Business%20inquiry"
            className="group block rounded-3xl border border-border p-8 hover:border-foreground/20 hover:-translate-y-0.5 transition-all"
          >
            <p className="text-xs uppercase tracking-widest text-brand">
              {dict.pages.contact.businessLabel}
            </p>
            <p className="mt-2 text-sm text-muted">
              {dict.pages.contact.businessDesc}
            </p>
            <p className="mt-6 text-base md:text-lg font-medium text-foreground group-hover:text-brand transition-colors break-all">
              810170966qq@gmail.com
            </p>
          </a>
          <a
            href="mailto:810170966qq@gmail.com?subject=Technical%20support"
            className="group block rounded-3xl border border-border p-8 hover:border-foreground/20 hover:-translate-y-0.5 transition-all"
          >
            <p className="text-xs uppercase tracking-widest text-brand">
              {dict.pages.contact.techLabel}
            </p>
            <p className="mt-2 text-sm text-muted">
              {dict.pages.contact.techDesc}
            </p>
            <p className="mt-6 text-base md:text-lg font-medium text-foreground group-hover:text-brand transition-colors break-all">
              810170966qq@gmail.com
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
