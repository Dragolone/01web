"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary; lang: Locale };

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Home "about" teaser — who the company is, in one paragraph, three facts and
 * a photo. Everything here is pulled from the About page dictionary so the two
 * never drift apart.
 */
export function HomeAbout({ dict, lang }: Props) {
  const about = dict.pages.about;
  const intro = about.body.split("\n\n")[0];

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[96rem] px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="lg:col-span-6"
          >
            <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#5cf0ff]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#5cf0ff]" />
              {about.eyebrow}
            </p>
            <h2 className="text-4xl font-semibold leading-[1.15] tracking-tight text-white md:text-5xl">
              {dict.brand.vision}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-white/65 md:text-lg">{intro}</p>

            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
              {about.meta.map((m, i) => (
                <li key={m} className="flex items-center gap-5">
                  {i > 0 && <span aria-hidden className="h-3.5 w-px bg-white/20" />}
                  {m}
                </li>
              ))}
            </ul>

            <Link
              href={`/${lang}/about`}
              className="group mt-10 inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-7 font-medium text-white/90 transition-colors hover:border-white/70 hover:bg-white/5"
            >
              {dict.hero.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1">
                <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/products/drone-cruise.jpg"
                alt={dict.products.items.find((p) => p.key === "vtol")?.name ?? "LingYI-1"}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#070a18]/70 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.18em] text-white/80">
                {dict.brand.nameEn}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
