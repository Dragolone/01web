"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

// Badge layout — 4 positions around the central product image.
// `kind: "lg"` = glass card with status dot; `kind: "sm"` = simple pill.
const badgeLayout: Array<{
  pos: string;
  kind: "lg" | "sm";
  align: "left" | "right";
  float: { from: number; to: number; dur: number; delay: number };
}> = [
  { pos: "top-5 left-5",    kind: "lg", align: "left",  float: { from: 0, to: -6, dur: 5.0, delay: 0   } },
  { pos: "bottom-5 right-5", kind: "lg", align: "right", float: { from: 0, to:  6, dur: 6.0, delay: 0.4 } },
  { pos: "bottom-5 left-5",  kind: "sm", align: "left",  float: { from: 0, to: -4, dur: 7.0, delay: 0.2 } },
  { pos: "top-5 right-5",    kind: "sm", align: "right", float: { from: 0, to:  5, dur: 5.5, delay: 0.6 } },
];

export function HomeHero({ lang, dict }: Props) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-20">
      {/* Outer background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(24,73,220,0.10) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #f8f9fb 0%, #ffffff 100%)",
        }}
      />

      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left — copy */}
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

          {/* Right — product stage with floating status cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-border/60 shadow-[0_30px_60px_-30px_rgba(24,73,220,0.25)]">
              {/* Stage background — soft brand-tinted gradient */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 50% at 50% 0%, rgba(24,73,220,0.16) 0%, transparent 65%), linear-gradient(180deg, #eef3ff 0%, #ffffff 55%, #f5f7fc 100%)",
                }}
              />
              {/* Faint dot grid inside the stage for depth */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(24,73,220,0.10) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Central product image — slow float */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src="/products/robot-hero.jpg"
                  alt="Mobile Charging Robot"
                  width={900}
                  height={560}
                  priority
                  className="w-[78%] h-auto rounded-2xl shadow-2xl shadow-black/15"
                />
              </motion.div>

              {/* Floating status badges */}
              {dict.hero.statusBadges.map((label, i) => {
                const layout = badgeLayout[i];
                if (!layout) return null;
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{
                      opacity: 1,
                      y: [layout.float.from, layout.float.to, layout.float.from],
                    }}
                    transition={{
                      opacity: { duration: 0.6, ease: easeOut, delay: 0.4 + i * 0.12 },
                      y: {
                        duration: layout.float.dur,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: layout.float.delay,
                      },
                    }}
                    className={`absolute ${layout.pos}`}
                  >
                    {layout.kind === "lg" ? (
                      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/75 backdrop-blur-md border border-white/80 shadow-lg shadow-brand/10">
                        <span className="relative flex w-2 h-2">
                          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" />
                          <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                        </span>
                        <span className="text-xs font-medium text-foreground/85 whitespace-nowrap">
                          {label}
                        </span>
                      </div>
                    ) : (
                      <div className="px-3 py-1.5 rounded-full bg-brand-soft border border-brand/15 backdrop-blur-sm">
                        <span className="text-[11px] font-medium text-brand whitespace-nowrap tracking-wide">
                          {label}
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
