import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { HomeHero } from "@/components/HomeHero";
import { HomeFeatures } from "@/components/HomeFeatures";
import { ProductMatrix } from "@/components/ProductMatrix";
import { HomeCapabilities } from "@/components/HomeCapabilities";
import { TechCapabilities } from "@/components/TechCapabilities";
import { HomeCTA } from "@/components/HomeCTA";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <HomeHero lang={lang as Locale} dict={dict} />
      <HomeFeatures dict={dict} />
      <ProductMatrix dict={dict} lang={lang as Locale} />
      <HomeCapabilities dict={dict} />
      <TechCapabilities dict={dict} />
      <HomeCTA lang={lang as Locale} dict={dict} />
    </>
  );
}
