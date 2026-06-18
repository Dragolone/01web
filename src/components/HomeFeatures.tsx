"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Indexed icons match the order of dict.hero.features:
// 0 - IoT platform, 1 - millisecond telemetry, 2 - remote ops, 3 - product matrix
const featureIcons = [
  // Cloud + nodes
  <svg key="iot" viewBox="0 0 28 28" {...stroke}>
    <path d="M7 18a4 4 0 010-8 6 6 0 0111.3-1.5A5 5 0 0121 18H7z" />
    <circle cx="9" cy="22" r="1.2" />
    <circle cx="14" cy="24" r="1.2" />
    <circle cx="19" cy="22" r="1.2" />
    <path d="M9 21l5 2 5-2" opacity="0.55" />
  </svg>,
  // Bolt with pulse
  <svg key="bolt" viewBox="0 0 28 28" {...stroke}>
    <path d="M15 3l-7 12h5l-1 10 8-13h-5l0-9z" />
  </svg>,
  // Cursor / cross-platform control
  <svg key="ops" viewBox="0 0 28 28" {...stroke}>
    <rect x="4" y="5" width="20" height="13" rx="2" />
    <path d="M4 10h20" />
    <path d="M10 22h8M14 18v4" />
    <circle cx="8" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="10.5" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>,
  // Grid / product matrix
  <svg key="grid" viewBox="0 0 28 28" {...stroke}>
    <rect x="4" y="4" width="8" height="8" rx="1.5" />
    <rect x="16" y="4" width="8" height="8" rx="1.5" />
    <rect x="4" y="16" width="8" height="8" rx="1.5" />
    <rect x="16" y="16" width="8" height="8" rx="1.5" />
  </svg>,
];

export function HomeFeatures({ dict }: Props) {
  return (
    // Dark "act one" band — continues seamlessly from the immersive hero, then
    // dissolves into the light content below.
    <section className="relative overflow-hidden bg-[#05080f] pt-24 pb-40 text-white md:pt-28 md:pb-48">
      {/* ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 80% 0%, rgba(40,92,224,0.18) 0%, transparent 60%), radial-gradient(50% 40% at 10% 30%, rgba(40,92,224,0.10) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {dict.hero.features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: idx * 0.1 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08] md:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9db8ff]/15 text-[#9db8ff] transition-colors group-hover:bg-[#9db8ff] group-hover:text-[#05080f]">
                <span className="block h-5 w-5">{featureIcons[idx]}</span>
              </div>
              <p className="mt-4 text-[15px] font-semibold tracking-tight">{f.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* dissolve into the light second act */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(180deg, transparent 0%, #fafbfe 92%)" }}
      />
    </section>
  );
}
