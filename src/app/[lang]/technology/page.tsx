import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { PageHero } from "@/components/PageHero";
import { TechCapabilities } from "@/components/TechCapabilities";

export default async function TechnologyPage({ params }: PageProps<"/[lang]/technology">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PageHero title={dict.pages.technology.title} lead={dict.pages.technology.lead} />
      <TechCapabilities dict={dict} />
    </>
  );
}
