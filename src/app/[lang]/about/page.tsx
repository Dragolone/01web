import { notFound } from "next/navigation";
import Image from "next/image";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { PageHero } from "@/components/PageHero";

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <PageHero title={dict.pages.about.title} lead={dict.pages.about.lead} />
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="text-base md:text-lg leading-loose text-foreground/85 whitespace-pre-line">
              {dict.pages.about.body}
            </p>
            <p className="mt-8 text-lg md:text-xl text-brand font-medium">
              {dict.brand.vision}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden bg-surface">
              <Image
                src="/products/delivery-robot-office.jpg"
                alt={dict.brand.name}
                width={1248}
                height={832}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
