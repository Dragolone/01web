"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function ImmersiveHero({ lang, dict }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yStage = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const charge = dict.products.items.find((i) => i.key === "charge") ?? dict.products.items[0];
  const vtol = dict.products.items.find((i) => i.key === "vtol");
  const specs = charge.tags ?? [];

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 text-white md:pt-20"
    >
      {/* Base + industrial backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ background: "radial-gradient(130% 100% at 50% -10%, #14266f 0%, #0a1230 42%, #05080f 100%)" }}
      />
      {/* blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,150,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,255,0.07) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage: "radial-gradient(120% 90% at 50% 35%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 35%, black 30%, transparent 80%)",
        }}
      />
      {/* brand glow */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(45% 40% at 72% 42%, rgba(40,92,224,0.30) 0%, transparent 65%), radial-gradient(40% 40% at 12% 18%, rgba(40,92,224,0.14) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:px-10">
        {/* Copy */}
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/65"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            {dict.brand.nameEn}
          </motion.p>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
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
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/75"
          >
            {dict.brand.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-3"
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
        </motion.div>

        {/* Product stage — robot centerpiece with industrial HUD */}
        <motion.div style={{ y: yStage }} className="relative lg:col-span-7">
          <div className="relative mx-auto h-[24rem] w-full max-w-[40rem] sm:h-[28rem] lg:h-[34rem]">
            {/* rotating technical ring */}
            <motion.svg
              aria-hidden
              viewBox="0 0 400 400"
              className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 text-[#6e8cff]/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 8" />
              <circle cx="200" cy="200" r="186" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="40 14" opacity="0.6" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              {Array.from({ length: 36 }).map((_, i) => (
                <line
                  key={i}
                  x1="200"
                  y1="14"
                  x2="200"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  transform={`rotate(${i * 10} 200 200)`}
                />
              ))}
            </motion.svg>

            {/* glow pool under product */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(80,120,240,0.45) 0%, transparent 62%)" }}
            />

            {/* product image, edges feathered into the scene */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative h-full w-full">
                <Image
                  src="/products/robot-hero.jpg"
                  alt={charge.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-contain"
                  style={{
                    maskImage: "radial-gradient(ellipse 62% 70% at 50% 50%, black 60%, transparent 82%)",
                    WebkitMaskImage: "radial-gradient(ellipse 62% 70% at 50% 50%, black 60%, transparent 82%)",
                  }}
                />
              </div>
            </motion.div>

            {/* scanning line */}
            <motion.div
              aria-hidden
              className="absolute inset-x-[12%] z-10 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(157,184,255,0.9), transparent)", boxShadow: "0 0 16px 2px rgba(157,184,255,0.5)" }}
              animate={{ top: ["22%", "78%", "22%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* corner targeting brackets */}
            {[
              "left-2 top-2 border-l border-t",
              "right-2 top-2 border-r border-t",
              "left-2 bottom-2 border-l border-b",
              "right-2 bottom-2 border-r border-b",
            ].map((c) => (
              <span key={c} aria-hidden className={`absolute h-6 w-6 border-white/30 ${c}`} />
            ))}

            {/* real-spec annotation chips */}
            {specs.map((s, i) => {
              const pos = [
                "left-0 top-[16%]",
                "right-0 top-[42%]",
                "left-[6%] bottom-[12%]",
              ][i];
              return (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: easeOut, delay: 0.9 + i * 0.18 }}
                  className={`absolute z-10 hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs text-white/85 backdrop-blur-md sm:inline-flex ${pos}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9db8ff]" />
                  {s}
                </motion.div>
              );
            })}

            {/* product name caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.8 }}
              className="absolute inset-x-0 bottom-0 z-10 text-center"
            >
              <p className="text-sm font-medium text-white">{charge.name}</p>
              <p className="mt-0.5 text-xs text-white/55">{charge.summary}</p>
            </motion.div>
          </div>

          {/* secondary line: VTOL link chip */}
          {vtol && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 1.1 }}
              className="mt-2 flex justify-center"
            >
              <Link
                href={`/${lang}/products/vtol`}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs text-white/80 backdrop-blur-md transition-colors hover:border-white/35 hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#9db8ff]" />
                {vtol.name}
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* vignette + grain */}
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

      {/* scroll cue */}
      <motion.div style={{ opacity: cueOpacity }} className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
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
