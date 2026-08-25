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

// Indexed icons match dict.hero.features order:
// 0 full-stack in-house, 1 rapid prototyping, 2 BOM cost, 3 SZTU partnership
const featureIcons = [
  <svg key="stack" viewBox="0 0 32 32" {...stroke}>
    <rect x="5" y="5" width="22" height="5" rx="1" />
    <rect x="5" y="13.5" width="22" height="5" rx="1" />
    <rect x="5" y="22" width="22" height="5" rx="1" />
    <circle cx="9" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="9" cy="16" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="9" cy="24.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>,
  <svg key="proto" viewBox="0 0 32 32" {...stroke}>
    <path d="M6 8h20l-3 6H9z" />
    <path d="M11 14v3a5 5 0 0010 0v-3" />
    <path d="M17 22l-3 5h3l-1 3 4-5h-3l0-3z" />
  </svg>,
  <svg key="cost" viewBox="0 0 32 32" {...stroke}>
    <circle cx="16" cy="16" r="11" />
    <path d="M11 12h10M11 16h10" />
    <path d="M13 8l3 14 3-14" />
  </svg>,
  <svg key="research" viewBox="0 0 32 32" {...stroke}>
    <path d="M3 12l13-6 13 6-13 6z" />
    <path d="M8 14v6c0 2 4 4 8 4s8-2 8-4v-6" />
    <path d="M26 12v6" />
    <circle cx="26" cy="20" r="1.2" fill="currentColor" stroke="none" />
  </svg>,
];

export function HomeFeatures({ dict }: Props) {
  return (
    // Dark "act one" band — continues seamlessly from the immersive hero.
    <section className="relative overflow-hidden pt-24 pb-20 text-white md:pt-28 md:pb-28">
      {/* ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 80% 0%, rgba(40,92,224,0.18) 0%, transparent 60%), radial-gradient(50% 40% at 10% 30%, rgba(40,92,224,0.10) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[96rem] px-6 lg:px-10">
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
    </section>
  );
}
