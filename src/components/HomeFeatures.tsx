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
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {dict.hero.features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: easeOut, delay: idx * 0.06 }}
              className="group p-5 md:p-6 rounded-2xl bg-white border border-border hover:border-brand/25 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-0.5 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                <span className="w-5 h-5 block">{featureIcons[idx]}</span>
              </div>
              <p className="mt-4 text-[15px] font-semibold tracking-tight">
                {f.title}
              </p>
              <p className="mt-1.5 text-[13px] text-muted leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
