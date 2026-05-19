"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HomeHero({ lang, dict }: Props) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
      {/* Background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(24,73,220,0.10) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #f8f9fb 0%, #ffffff 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-brand bg-brand-soft rounded-full px-3 py-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              {dict.brand.nameEn}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.08 }}
              className="mt-6 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
            >
              {dict.brand.tagline}
              <br />
              <span className="text-brand">{dict.brand.tagline2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.18 }}
              className="mt-7 max-w-xl text-lg text-foreground/70 leading-relaxed"
            >
              {dict.brand.lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.28 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                href={`/${lang}/products`}
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-brand text-white font-medium hover:bg-brand-strong transition-all hover:shadow-lg hover:shadow-brand/30"
              >
                {dict.hero.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href={`/${lang}/technology`}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-border text-foreground/80 hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                {dict.hero.secondaryCta}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-surface">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[6%] right-[2%] w-[68%]"
              >
                <Image
                  src="/products/drone-hero.jpg"
                  alt="VTOL"
                  width={900}
                  height={420}
                  priority
                  className="w-full h-auto rounded-2xl shadow-xl shadow-black/10"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[6%] left-[4%] w-[60%]"
              >
                <Image
                  src="/products/robot-hero.jpg"
                  alt="Mobile Robot"
                  width={800}
                  height={400}
                  priority
                  className="w-full h-auto rounded-2xl shadow-xl shadow-black/15"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature strip — minimal capabilities row to anchor the hero bottom */}
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.5 }}
          className="mt-14 md:mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground/65"
        >
          {dict.hero.features.map((f, i) => (
            <li key={f} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="hidden sm:inline-block w-1 h-1 rounded-full bg-foreground/25" />
              )}
              <span>{f}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
