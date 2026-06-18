"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

// WebGL scene — client-only (no SSR).
const Hero3D = dynamic(() => import("./Hero3D").then((m) => m.Hero3D), { ssr: false });

export function ImmersiveHero({ lang, dict }: Props) {
  const h = dict.heroImmersive;
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Pause the 3D render loop while the hero is off-screen (fixes scroll-back jank).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.04 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = glowRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.background = `radial-gradient(420px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(0,229,255,0.14), rgba(155,107,255,0.08) 42%, transparent 70%)`;
    el.style.opacity = "1";
  };
  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden text-white"
    >
      {/* dark base */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ background: "radial-gradient(120% 100% at 70% 0%, #142a73 0%, #0a1230 46%, #05060f 100%)" }}
      />
      {/* 3D scene */}
      <div className="absolute inset-0 z-0">
        <Hero3D active={active} />
      </div>
      {/* cursor glow */}
      <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0 z-[4] opacity-0 mix-blend-screen transition-opacity duration-300" />
      {/* legibility scrim — left/bottom heavy so the headline reads over the scene */}
      <div
        aria-hidden
        className="absolute inset-0 z-[5]"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,6,15,0.86) 0%, rgba(5,6,15,0.55) 34%, rgba(5,6,15,0.05) 60%, transparent 75%), linear-gradient(0deg, rgba(5,6,15,0.6) 0%, transparent 32%)",
        }}
      />

      {/* copy */}
      <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 lg:px-10">
        <div className="relative max-w-2xl">
          {/* borderless soft dark halo for legibility (no panel/edge) */}
          <div
            aria-hidden
            className="absolute -inset-x-10 -inset-y-12 -z-10"
            style={{ background: "radial-gradient(62% 60% at 28% 50%, rgba(5,6,15,0.6) 0%, transparent 75%)" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
            className="font-playfair text-base italic text-white/70 sm:text-lg"
          >
            {dict.brand.nameEn}
          </motion.p>

          <h1 className="mt-4 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
                className="block"
              >
                {h.title1}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.44 }}
                className="block bg-gradient-to-r from-white to-[#9db8ff] bg-clip-text text-transparent"
              >
                {h.title2}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.62 }}
            className="mt-7 max-w-xl text-base leading-[1.85] text-white/75 sm:text-lg"
          >
            {h.subtitle}
          </motion.p>

          {/* capability tags — plain text with subtle dividers (no boxes) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.74 }}
            className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/75"
          >
            {h.tags.map((t, i) => (
              <span key={t} className="inline-flex items-center gap-4">
                {i > 0 && <span aria-hidden className="h-3.5 w-px bg-white/20" />}
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.86 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href={`/${lang}/solutions`}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 font-medium text-[#0a1024] transition-all hover:bg-white/90 hover:shadow-[0_0_44px_-6px_rgba(150,180,255,0.8)]"
            >
              {h.ctaPrimary}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href={`/${lang}/products`}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-7 font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/5"
            >
              {h.ctaSecondary}
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
