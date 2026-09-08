import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { hasLocale, htmlLang, locales, getDictionary, type Locale } from "./dictionaries";
import { SITE_URL, pageMeta } from "../site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TechBackdrop } from "@/components/TechBackdrop";
import { MotionProvider } from "@/components/MotionProvider";
import { Loader } from "@/components/immersive/Loader";
import { ScrollProgress } from "@/components/immersive/ScrollProgress";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const title = `${dict.brand.name} | ${dict.brand.tagline}${dict.brand.tagline2}`;
  return {
    metadataBase: new URL(SITE_URL),
    ...pageMeta({ lang, path: "", title, description: dict.brand.lead, siteName: dict.brand.name }),
    title: {
      default: title,
      template: `%s | ${dict.brand.name}`,
    },
    applicationName: dict.brand.name,
    keywords:
      lang === "en"
        ? ["mobile EV charging robot", "VTOL fixed-wing UAV", "LingYI-Charge", "LingYI-1", "Zero-One Innovation"]
        : ["移动充电机器人", "垂起固定翼无人机", "LingYI-Charge", "LingYI-1", "低空经济", "零一唯创"],
    authors: [{ name: dict.brand.name }],
    robots: { index: true, follow: true },
    // 动态根布局不会自动注入根级 manifest 路由的 link（同 opengraph-image 的坑），显式声明：
    manifest: "/manifest.webmanifest",
    // icons are auto-injected from src/app/icon.png + src/app/apple-icon.png
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  // Organization structured data (real, registered company facts only).
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dict.brand.name,
    alternateName: "Shenzhen Zero-One Innovation Technology Co., Ltd.",
    url: `${SITE_URL}/${lang}`,
    logo: `${SITE_URL}/icon.png`,
    email: "dravenzhong27@gmail.com",
    foundingDate: "2026-03-03",
    taxID: "91440300MAK7XEPD38",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CN",
      addressRegion: lang === "en" ? "Guangdong" : "广东省",
      addressLocality: lang === "en" ? "Shenzhen" : "深圳市",
      streetAddress: dict.pages.contact.addr,
    },
    description: dict.brand.lead,
  };

  return (
    <html
      lang={htmlLang[lang as Locale]}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#0a1024]"
        >
          {dict.a11y.skipToContent}
        </a>
        {/* WeChat/QQ share thumbnail: they ignore og:image and grab the first ≥300px <img> in the HTML. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/share-300.png" alt="" width={300} height={300} aria-hidden loading="lazy" style={{ display: "none" }} />
        <Loader />
        <ScrollProgress />
        <TechBackdrop />
        <MotionProvider>
          <Navbar lang={lang as Locale} dict={dict} />
          <main id="main" className="flex-1">{children}</main>
          <Footer lang={lang as Locale} dict={dict} />
        </MotionProvider>
        <div className="film-grain" aria-hidden />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
