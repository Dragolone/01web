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
  // Full-stack in-house R&D — stacked layers (mech / firmware / AI / cloud)
  fullstack: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <rect x="5" y="5" width="22" height="5" rx="1" />
      <rect x="5" y="13.5" width="22" height="5" rx="1" />
      <rect x="5" y="22" width="22" height="5" rx="1" />
      <circle cx="9" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9" cy="16" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9" cy="24.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Rapid prototyping — 3D-print head + lightning
  rapid: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <path d="M6 8h20l-3 6H9z" />
      <path d="M11 14v3a5 5 0 0010 0v-3" />
      <path d="M17 22l-3 5h3l-1 3 4-5h-3l0-3z" />
    </svg>
  ),
  // Cost reduction — down arrow + RMB / dollar sign
  cost: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <circle cx="16" cy="16" r="11" />
      <path d="M11 12h10M11 16h10" />
      <path d="M13 8l3 14 3-14" />
    </svg>
  ),
  // Industry-academia link — graduation cap + connected nodes
  research: (
    <svg viewBox="0 0 32 32" {...stroke}>
      <path d="M3 12l13-6 13 6-13 6z" />
      <path d="M8 14v6c0 2 4 4 8 4s8-2 8-4v-6" />
      <path d="M26 12v6" />
      <circle cx="26" cy="20" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export function HomeCapabilities({ dict }: Props) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
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
