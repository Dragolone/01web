"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary; theme?: "dark" };

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HomeCTA({ lang, dict, theme }: Props) {
  const dark = theme === "dark";
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className={`relative overflow-hidden rounded-[2rem] px-8 py-20 text-center md:px-16 md:py-24 ${
            dark
              ? "border border-white/10 bg-[#0a0f20] text-white"
              : "bg-gradient-to-br from-brand to-brand-strong text-white"
          }`}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: dark
                ? "radial-gradient(60% 80% at 50% 0%, rgba(0,150,220,0.20) 0%, transparent 60%), radial-gradient(50% 70% at 90% 100%, rgba(124,92,255,0.18) 0%, transparent 60%)"
                : "radial-gradient(60% 60% at 100% 0%, rgba(255,255,255,0.6) 0%, transparent 50%)",
              opacity: dark ? 1 : 0.2,
            }}
          />
          {dark && (
            <>
              {/* light beams */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 38%, rgba(0,229,255,0.10) 48%, transparent 56%), linear-gradient(115deg, transparent 60%, rgba(255,61,240,0.08) 68%, transparent 74%)",
                }}
              />
              {/* data dot grid */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  backgroundImage: "radial-gradient(rgba(140,170,255,0.12) 1px, transparent 1.5px)",
                  backgroundSize: "28px 28px",
                  maskImage: "radial-gradient(90% 90% at 50% 50%, black, transparent 80%)",
                  WebkitMaskImage: "radial-gradient(90% 90% at 50% 50%, black, transparent 80%)",
                }}
              />
            </>
          )}
          <h2 className="relative text-3xl md:text-5xl font-semibold tracking-tight">
            {dict.cta.title}
          </h2>
          <p className={`relative mt-4 text-lg max-w-2xl mx-auto ${dark ? "text-white/70" : "text-white/85"}`}>
            {dict.cta.subtitle}
          </p>
          <Link
            href={`/${lang}/contact`}
            className={`relative mt-10 inline-flex items-center gap-2 h-12 px-7 rounded-full font-medium transition-all ${
              dark
                ? "bg-white text-[#0a1024] hover:shadow-[0_0_40px_-6px_rgba(150,180,255,0.7)]"
                : "bg-white text-brand hover:bg-white/95"
            }`}
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
