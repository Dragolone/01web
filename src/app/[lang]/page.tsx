import { notFound } from "next/navigation";
import { forImmersiveHero, forHomeFeatures, forProductMatrix, forHomeSolutions, forHomeAbout, forHomeGalleryStrip, forTechCapabilities, forHomeCTA } from "./dictSlices";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { ImmersiveHero } from "@/components/immersive/ImmersiveHero";
import { HomeFeatures } from "@/components/HomeFeatures";
import { ProductMatrix } from "@/components/ProductMatrix";
import { HomeSolutions } from "@/components/HomeSolutions";
import { HomeAbout } from "@/components/HomeAbout";
import { HomeGalleryStrip } from "@/components/HomeGalleryStrip";
import { TechCapabilities } from "@/components/TechCapabilities";
import { HomeCTA } from "@/components/HomeCTA";

// Fade lengths for the home backdrop's top (under the hero) and bottom (above the footer).
const coverFade = {
  maskImage: "linear-gradient(180deg, #000 calc(100% - 320px), transparent)",
  WebkitMaskImage: "linear-gradient(180deg, #000 calc(100% - 320px), transparent)",
};
const edgeFade = {
  maskImage: "linear-gradient(180deg, transparent, #000 360px, #000 calc(100% - 320px), transparent)",
  WebkitMaskImage: "linear-gradient(180deg, transparent, #000 360px, #000 calc(100% - 320px), transparent)",
};

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <ImmersiveHero lang={lang as Locale} dict={forImmersiveHero(dict)} />
      {/* One continuous backdrop for every home section below the hero. Its edges
          are faded, not cut: dots + glows ease in under the hero's melt and ease
          out above the footer, where the page-colour cover also dissolves so the
          site-wide texture comes back gradually instead of at a hard line. */}
      <div className="relative isolate text-foreground">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-background" style={coverFade} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            ...edgeFade,
            backgroundImage:
              "radial-gradient(rgba(140,170,255,0.13) 1px, transparent 1.5px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            ...edgeFade,
            background:
              "radial-gradient(50% 30% at 85% 12%, rgba(0,150,220,0.10) 0%, transparent 60%), radial-gradient(45% 30% at 10% 55%, rgba(124,92,255,0.08) 0%, transparent 60%), radial-gradient(50% 30% at 70% 88%, rgba(0,150,220,0.08) 0%, transparent 60%)",
          }}
        />
        <HomeFeatures dict={forHomeFeatures(dict)} />
        <ProductMatrix dict={forProductMatrix(dict)} lang={lang as Locale} theme="dark" />
        <HomeSolutions dict={forHomeSolutions(dict)} lang={lang as Locale} />
        <HomeAbout dict={forHomeAbout(dict)} lang={lang as Locale} />
        <HomeGalleryStrip dict={forHomeGalleryStrip(dict)} lang={lang as Locale} />
        <TechCapabilities dict={forTechCapabilities(dict)} />
        <HomeCTA lang={lang as Locale} dict={forHomeCTA(dict)} theme="dark" />
      </div>
    </>
  );
}
