"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { TerrainField } from "./TerrainField";

type Props = { lang: Locale; dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

// Cinematic film grain (static SVG noise, blended softly).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function ImmersiveHero({ lang, dict }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  // Depth: background layers drift at different rates as you scroll.
  const bokehY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const products = dict.products.items.slice(0, 2);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden text-white"
    >
      {/* Base gradient */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% -10%, #14266f 0%, #0a1230 42%, #05080f 100%)",
        }}
      />
      {/* Aerial survey scene: terrain ridgelines + drone flight paths */}
      <TerrainField className="absolute inset-0 z-0 h-full w-full" />

      {/* Soft drifting bokeh for depth-of-field */}
      <motion.div aria-hidden style={{ y: bokehY }} className="absolute inset-0 z-0">
        {[
          { c: "h-72 w-72 left-[8%] top-[18%]", d: 0 },
          { c: "h-96 w-96 right-[6%] top-[8%]", d: 1.2 },
          { c: "h-64 w-64 left-[24%] bottom-[10%]", d: 0.6 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl ${b.c}`}
            style={{ background: "radial-gradient(circle, rgba(40,92,224,0.35), transparent 70%)" }}
            animate={{ y: [0, -24, 0], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 9 + i * 2, repeat: Infinity, ease: "easeInOut", delay: b.d }}
          />
        ))}
      </motion.div>

      {/* Cinematic light sweep across the top */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 z-0 h-[42vh]"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(150,180,255,0.10) 48%, transparent 62%)",
          backgroundSize: "220% 100%",
        }}
        animate={{ backgroundPositionX: ["180%", "-60%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
      />

      {/* Legibility scrim */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,15,0.35) 0%, rgba(5,8,15,0.10) 38%, rgba(5,8,15,0.55) 100%)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:px-10"
      >
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/65"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            {dict.brand.nameEn}
          </motion.p>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-8xl">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.22 }}
                className="block"
              >
                {dict.brand.tagline}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.36 }}
                className="block bg-gradient-to-r from-white via-white to-[#9db8ff] bg-clip-text text-transparent"
              >
                {dict.brand.tagline2}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.55 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/75"
          >
            {dict.brand.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.7 }}
            className="mt-11 flex flex-wrap gap-3"
          >
            <Link
              href={`/${lang}/solutions`}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 font-medium text-[#0a1024] transition-all hover:bg-white/90 hover:shadow-[0_0_44px_-6px_rgba(150,180,255,0.7)]"
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
        </div>

        {/* Floating product HUD cards — "pop out" the two product lines */}
        <motion.div style={{ y: cardsY }} className="relative hidden lg:col-span-5 lg:block">
          <div className="relative h-[26rem]">
            {products.map((p, i) => (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.7 + i * 0.18 }}
                className={i === 0 ? "absolute right-2 top-2 w-72" : "absolute bottom-2 left-0 w-72"}
              >
                <motion.div
                  animate={{ y: [0, i === 0 ? -12 : 10, 0] }}
                  transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Link
                    href={`/${lang}/products/${p.key}`}
                    className="group block rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/[0.12]"
                  >
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#9db8ff]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inset-0 animate-ping rounded-full bg-[#9db8ff] opacity-60" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-[#9db8ff]" />
                      </span>
                      {p.tag}
                    </div>
                    <p className="mt-3 text-lg font-semibold text-white">{p.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">{p.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-white/80">
                      {dict.hero.secondaryCta}
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                        <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Vignette + film grain for cinematic texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(3,5,12,0.6) 100%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] opacity-[0.06] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN }}
      />

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
