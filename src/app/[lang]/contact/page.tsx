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
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 grid gap-5 md:grid-cols-2">
          {[
            {
              subject: "Business%20inquiry",
              label: dict.pages.contact.businessLabel,
              desc: dict.pages.contact.businessDesc,
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                  <path d="M3 12h18" />
                </svg>
              ),
            },
            {
              subject: "Technical%20support",
              label: dict.pages.contact.techLabel,
              desc: dict.pages.contact.techDesc,
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M4 13v-1a8 8 0 0116 0v1" />
                  <rect x="2.5" y="13" width="4" height="6.5" rx="1.5" />
                  <rect x="17.5" y="13" width="4" height="6.5" rx="1.5" />
                  <path d="M20 19.5a4 4 0 01-4 4h-2" />
                </svg>
              ),
            },
          ].map((card) => (
            <a
              key={card.subject}
              href={`mailto:810170966qq@gmail.com?subject=${card.subject}`}
              className="group flex flex-col rounded-3xl border border-border p-8 hover:border-brand/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/5 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                {card.icon}
              </div>
              <p className="mt-5 text-lg font-semibold tracking-tight">{card.label}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{card.desc}</p>
              <div className="mt-6 pt-5 border-t border-border/70 flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-brand transition-colors">
                <span className="break-all">810170966qq@gmail.com</span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                  className="shrink-0 -translate-x-1 -translate-y-0.5 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <path d="M3 9 9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
