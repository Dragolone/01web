import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { ImmersiveHero } from "@/components/immersive/ImmersiveHero";
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
      <ImmersiveHero lang={lang as Locale} dict={dict} />
      {/* Dark immersive act — sits over the off-white body so the whole home
          flows as one cohesive cyber-dark experience. */}
      <div className="relative bg-[#070a18] text-white">
        <HomeFeatures dict={dict} />
        <ProductMatrix dict={dict} lang={lang as Locale} theme="dark" />
        <HomeCapabilities dict={dict} theme="dark" />
        <TechCapabilities dict={dict} />
        <HomeCTA lang={lang as Locale} dict={dict} theme="dark" />
      </div>
    </>
  );
}
