import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { PageHero } from "@/components/PageHero";
import { SolutionScenarios } from "@/components/SolutionScenarios";
import { TechCapabilities } from "@/components/TechCapabilities";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/technology">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.pages.technology.title,
    description: dict.pages.technology.lead,
    openGraph: { title: dict.pages.technology.title, description: dict.pages.technology.lead },
  };
}

export default async function TechnologyPage({ params }: PageProps<"/[lang]/technology">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PageHero
        title={dict.pages.technology.title}
        lead={dict.pages.technology.lead}
        eyebrow={dict.pages.technology.eyebrow}
        meta={dict.pages.technology.meta}
      />
      <SolutionScenarios dict={dict} />
      <TechCapabilities dict={dict} />
    </>
  );
}
