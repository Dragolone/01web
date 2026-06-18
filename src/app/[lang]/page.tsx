import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { ImmersiveHero } from "@/components/immersive/ImmersiveHero";
import { HomeFeatures } from "@/components/HomeFeatures";
import { ProductMatrix } from "@/components/ProductMatrix";
import { HomeSolutions } from "@/components/HomeSolutions";
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
      <div className="relative isolate bg-[#070a18] text-white">
        {/* unified ambient backdrop so sections never feel empty/disconnected */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(120,150,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 30% at 85% 8%, rgba(0,150,220,0.10) 0%, transparent 60%), radial-gradient(45% 30% at 10% 55%, rgba(124,92,255,0.08) 0%, transparent 60%), radial-gradient(50% 30% at 70% 95%, rgba(0,150,220,0.08) 0%, transparent 60%)",
          }}
        />
        <HomeFeatures dict={dict} />
        <ProductMatrix dict={dict} lang={lang as Locale} theme="dark" />
        <HomeSolutions dict={dict} />
        <HomeCapabilities dict={dict} theme="dark" />
        <TechCapabilities dict={dict} />
        <HomeCTA lang={lang as Locale} dict={dict} theme="dark" />
      </div>
    </>
  );
}
