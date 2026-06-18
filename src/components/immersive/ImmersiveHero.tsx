"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

// WebGL hero object — client-only (no SSR) to avoid running three.js on the server.
const Hero3D = dynamic(() => import("./Hero3D").then((m) => m.Hero3D), { ssr: false });

type Props = { lang: Locale; dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function ImmersiveHero({ lang, dict }: Props) {
  const reduce = useReducedMotion();
  const vtol = dict.products.items.find((i) => i.key === "vtol") ?? dict.products.items[0];
  const charge = dict.products.items.find((i) => i.key === "charge");
  const specs = vtol.tags ?? [];

  // cursor parallax for the hologram
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.4 });
  const dx = useTransform(sx, [-0.5, 0.5], [reduce ? 0 : -20, reduce ? 0 : 20]);
  const dy = useTransform(sy, [-0.5, 0.5], [reduce ? 0 : -14, reduce ? 0 : 14]);
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 text-white md:pt-20"
    >
      {/* dark base */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ background: "radial-gradient(130% 100% at 50% -10%, #14266f 0%, #0a1230 42%, #05080f 100%)" }}
      />
      {/* blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,150,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,255,0.07) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage: "radial-gradient(120% 90% at 60% 45%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 60% 45%, black 30%, transparent 80%)",
        }}
      />
      {/* brand glow */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(42% 40% at 70% 46%, rgba(40,92,224,0.32) 0%, transparent 65%), radial-gradient(38% 38% at 12% 18%, rgba(40,92,224,0.14) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:px-10">
        {/* Copy */}
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
            className="font-playfair text-base italic text-white/70 sm:text-lg"
          >
            {dict.brand.nameEn}
          </motion.p>

          <h1 className="mt-3 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
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
                className="block bg-gradient-to-r from-white to-[#9db8ff] bg-clip-text text-transparent"
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
        </div>

        {/* Holographic drone centerpiece */}
        <motion.div style={{ x: dx, y: dy }} className="relative lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.5 }}
            className="relative mx-auto aspect-square w-full max-w-[40rem]"
          >
            <Hero3D />
          </motion.div>

          {/* real-spec annotation chips */}
          {specs.map((s, i) => {
            const pos = ["left-0 top-[14%]", "right-0 top-[40%]", "left-[8%] bottom-[14%]"][i];
            return (
              <motion.div
                key={s}
                initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: easeOut, delay: 1 + i * 0.18 }}
                className={`absolute z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs text-white/85 backdrop-blur-md sm:inline-flex ${pos}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#9db8ff]" />
                {s}
              </motion.div>
            );
          })}

          {/* caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.9 }}
            className="absolute inset-x-0 bottom-0 z-20 text-center"
          >
            <p className="text-sm font-medium text-white">{vtol.name}</p>
            {charge && (
              <Link
                href={`/${lang}/products/charge`}
                className="group mt-1 inline-flex items-center gap-1.5 text-xs text-white/55 transition-colors hover:text-white"
              >
                {charge.name}
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
          </motion.div>
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
      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex justify-center">
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
        </span>
      </div>
    </section>
  );
}
