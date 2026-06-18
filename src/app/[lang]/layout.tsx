import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { hasLocale, htmlLang, locales, getDictionary, type Locale } from "./dictionaries";
import { SITE_URL } from "../site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TechBackdrop } from "@/components/TechBackdrop";
import { MotionProvider } from "@/components/MotionProvider";

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
  const url = `${SITE_URL}/${lang}`;
  const ogLocale =
    lang === "zh" ? "zh_CN" : lang === "tw" ? "zh_TW" : "en_US";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.brand.lead,
    applicationName: dict.brand.name,
    keywords:
      lang === "en"
        ? ["mobile robot", "VTOL", "smart charging station", "IoT", "Zero-One Innovation"]
        : ["移动机器人", "智能充电站", "VTOL", "物联网", "零一唯创"],
    authors: [{ name: dict.brand.name }],
    alternates: {
      canonical: url,
      languages: {
        "zh-Hans": `${SITE_URL}/zh`,
        "zh-Hant": `${SITE_URL}/tw`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/zh`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: dict.brand.name,
      title,
      description: dict.brand.lead,
      locale: ogLocale,
      alternateLocale: ["zh_CN", "zh_TW", "en_US"].filter((l) => l !== ogLocale),
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "Zero-One Innovation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.brand.lead,
      images: [`${SITE_URL}/opengraph-image`],
    },
    robots: { index: true, follow: true },
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
    email: "810170966qq@gmail.com",
    foundingDate: "2026-03-03",
    taxID: "91440300MAK7XEPD58",
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
        <TechBackdrop />
        <MotionProvider>
          <Navbar lang={lang as Locale} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang as Locale} dict={dict} />
        </MotionProvider>
      </body>
    </html>
  );
}
