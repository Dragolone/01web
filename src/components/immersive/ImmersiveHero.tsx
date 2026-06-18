"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { ParticleField } from "./ParticleField";

type Props = { lang: Locale; dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

export function ImmersiveHero({ lang, dict }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Scroll-driven parallax: content drifts up and fades as you scroll past the hero.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] flex items-center overflow-hidden text-white"
    >
      {/* Fallback gradient (shows if WebGL is unavailable) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #12246b 0%, #0a1024 45%, #060b18 100%)",
        }}
      />
      {/* Animated node constellation */}
      <ParticleField className="absolute inset-0 z-0 h-full w-full" />
      {/* Legibility scrim */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,11,24,0.35) 0%, rgba(6,11,24,0.15) 40%, rgba(6,11,24,0.65) 100%)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-[88rem] px-6 lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-white/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          {dict.brand.nameEn}
        </motion.p>

        <h1 className="mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-8xl font-semibold leading-[1.02] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.18 }}
            className="block"
          >
            {dict.brand.tagline}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.3 }}
            className="block bg-gradient-to-r from-white via-white to-[#9db8ff] bg-clip-text text-transparent"
          >
            {dict.brand.tagline2}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.42 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/75"
        >
          {dict.brand.lead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.54 }}
          className="mt-11 flex flex-wrap gap-3"
        >
          <Link
            href={`/${lang}/solutions`}
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 font-medium text-[#0a1024] transition-all hover:bg-white/90 hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.6)]"
          >
            {dict.hero.cta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href={`/${lang}/products`}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-7 font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/5"
          >
            {dict.hero.secondaryCta}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-white/70" />
        </motion.span>
      </motion.div>
    </section>
  );
}
