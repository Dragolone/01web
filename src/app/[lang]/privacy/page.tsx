import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { PageHero } from "@/components/PageHero";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.pages.privacy.title,
    description: dict.pages.privacy.lead,
    openGraph: { title: dict.pages.privacy.title, description: dict.pages.privacy.lead },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const p = dict.pages.privacy;

  return (
    <>
      <PageHero title={p.title} lead={p.lead} eyebrow={p.eyebrow} meta={p.meta} />
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <ol className="divide-y divide-border">
            {p.sections.map((s, i) => (
              <li key={s.h} className="grid gap-3 py-8 md:grid-cols-[3rem_1fr] md:gap-6">
                <span className="font-mono text-sm text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{s.h}</h2>
                  <p className="mt-3 leading-relaxed text-foreground/80">{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
