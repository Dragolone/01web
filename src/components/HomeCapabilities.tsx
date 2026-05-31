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

const capabilityIcons: Record<string, React.ReactNode> = {
  // Remote device monitoring — display with live waveform
  monitor: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <rect x="4" y="6" width="24" height="16" rx="2" />
      <path d="M11 26h10M16 22v4" />
      <path d="M8 14l3-3 3 5 4-7 3 4 3-2" />
    </svg>
  ),
  // Smart charging — battery + bolt
  charge: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <rect x="5" y="9" width="20" height="14" rx="2" />
      <path d="M25 13v6" />
      <path d="M16 12l-3 5h3l-1 4 4-5h-3l0-4z" />
    </svg>
  ),
  // Dashboard — chart bars + arc
  dashboard: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <path d="M5 24a11 11 0 0122 0" />
      <path d="M16 24l5-6" />
      <circle cx="16" cy="24" r="1.4" fill="currentColor" stroke="none" />
      <path d="M10 24v-3M22 24v-3" opacity="0.4" />
    </svg>
  ),
  // Ground + low-altitude coordination — node link
  coordinate: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <circle cx="7" cy="22" r="3" />
      <circle cx="25" cy="10" r="3" />
      <circle cx="16" cy="16" r="2" />
      <path d="M9.5 20.2l5-3M18 14l4.6-2.6" />
    </svg>
  ),
};

export function HomeCapabilities({ dict }: Props) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-2xl"
        >
          <p className="text-xs tracking-[0.18em] uppercase text-brand mb-3">
            Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {dict.homeCapabilities.title}
          </h2>
          <p className="mt-4 text-lg text-muted">
            {dict.homeCapabilities.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dict.homeCapabilities.items.map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: idx * 0.06 }}
              className="group relative p-7 rounded-3xl bg-white border border-border hover:border-brand/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/8 transition-all overflow-hidden"
            >
              {/* Top brand line that fades in on hover */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                <span className="w-6 h-6 block">
                  {capabilityIcons[item.key]}
                </span>
              </div>
              <p className="mt-5 text-lg font-semibold tracking-tight">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
