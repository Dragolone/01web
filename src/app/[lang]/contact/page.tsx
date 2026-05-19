import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { PageHero } from "@/components/PageHero";

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PageHero title={dict.pages.contact.title} lead={dict.pages.contact.lead} />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="rounded-3xl border border-border p-8 md:p-12">
            <p className="text-xs uppercase tracking-widest text-muted">
              {dict.pages.contact.emailLabel}
            </p>
            <a
              href="mailto:810170966qq@gmail.com"
              className="mt-2 inline-block text-2xl md:text-3xl font-medium text-brand hover:text-brand-strong transition-colors"
            >
              810170966qq@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
