"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HomeCTA({ lang, dict }: Props) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="rounded-[2rem] px-8 py-16 md:px-16 md:py-20 bg-gradient-to-br from-brand to-brand-strong text-white text-center relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(60% 60% at 100% 0%, rgba(255,255,255,0.6) 0%, transparent 50%)",
            }}
          />
          <h2 className="relative text-3xl md:text-5xl font-semibold tracking-tight">
            {dict.cta.title}
          </h2>
          <p className="relative mt-4 text-white/85 text-lg max-w-2xl mx-auto">
            {dict.cta.subtitle}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="relative mt-10 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-brand font-medium hover:bg-white/95 transition-colors"
          >
            {dict.cta.button}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
