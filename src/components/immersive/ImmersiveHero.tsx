"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

// WebGL scene — client-only (no SSR) to keep three.js off the server.
const Hero3D = dynamic(() => import("./Hero3D").then((m) => m.Hero3D), { ssr: false });

export function ImmersiveHero({ lang, dict }: Props) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden text-white">
      {/* dark base behind the canvas */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ background: "radial-gradient(130% 100% at 50% 0%, #142a73 0%, #0a1230 45%, #05080f 100%)" }}
      />
      {/* full-screen 3D scene */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>
      {/* legibility scrim — stronger on the left where the copy sits */}
      <div
        aria-hidden
        className="absolute inset-0 z-[5]"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,8,16,0.78) 0%, rgba(5,8,16,0.45) 38%, transparent 62%), linear-gradient(0deg, rgba(5,8,16,0.55) 0%, transparent 30%)",
        }}
      />

      {/* copy */}
      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-6 lg:px-10">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
            className="font-playfair text-base italic text-white/70 sm:text-lg"
          >
            {dict.brand.nameEn}
          </motion.p>

          <h1 className="mt-3 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
                className="block"
              >
                {dict.brand.tagline}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.44 }}
                className="block bg-gradient-to-r from-white to-[#9db8ff] bg-clip-text text-transparent"
              >
                {dict.brand.tagline2}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.62 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/75"
          >
            {dict.brand.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.78 }}
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
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex justify-center">
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
        </span>
      </div>
    </section>
  );
}
