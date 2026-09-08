import type { Metadata } from "next";
import { pageMeta } from "@/app/site";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { PageHero } from "@/components/PageHero";
import { ProductMatrix } from "@/components/ProductMatrix";
import { HomeFeatures } from "@/components/HomeFeatures";
import { HomeCTA } from "@/components/HomeCTA";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return pageMeta({
    lang,
    path: "/products",
    title: dict.pages.products.title,
    description: dict.pages.products.lead,
    siteName: dict.brand.name,
  });
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PageHero
        title={dict.pages.products.title}
        lead={dict.pages.products.lead}
        eyebrow={dict.pages.products.eyebrow}
        meta={dict.pages.products.meta}
        compactBottom
      />
      <ProductMatrix dict={dict} lang={lang as Locale} compactTop hideHeader theme="dark" />
      <HomeFeatures dict={dict} />
      <HomeCTA lang={lang as Locale} dict={dict} theme="dark" />
    </>
  );
}
