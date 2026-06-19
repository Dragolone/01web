"use client";

import { motion } from "framer-motion";
import { CardFx } from "@/components/CardFx";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary; theme?: "dark" };

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

export function HomeCapabilities({ dict, theme }: Props) {
  const dark = theme === "dark";
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[96rem] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-2xl"
        >
          <p className={`inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase mb-3 ${dark ? "text-[#5cf0ff]" : "text-brand"}`}>
            <span aria-hidden className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-[#5cf0ff]" : "bg-brand"}`} />
            Capabilities
          </p>
          <h2 className={`text-4xl md:text-5xl font-semibold tracking-tight ${dark ? "text-white" : ""}`}>
            {dict.homeCapabilities.title}
          </h2>
          <p className={`mt-4 text-lg ${dark ? "text-white/60" : "text-muted"}`}>
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
              className={`group relative p-7 rounded-3xl border hover:-translate-y-1 transition-all overflow-hidden ${
                dark
                  ? "bg-white/[0.04] border-white/10 hover:border-[#5cf0ff]/40 hover:shadow-xl hover:shadow-[#00e5ff]/10"
                  : "bg-white border-border hover:border-brand/25 hover:shadow-xl hover:shadow-brand/8"
              }`}
            >
              {/* Top accent line that fades in on hover */}
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${dark ? "via-[#5cf0ff]" : "via-brand"}`}
              />
              {/* faint grid background (dark only) for a system-panel feel */}
              {dark && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(140,170,255,0.13) 1px, transparent 1.5px)",
                    backgroundSize: "26px 26px",
                    maskImage: "radial-gradient(120% 80% at 0% 0%, black, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(120% 80% at 0% 0%, black, transparent 70%)",
                  }}
                />
              )}
              <div className="relative flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  dark
                    ? "bg-[#5cf0ff]/15 text-[#5cf0ff] group-hover:bg-[#5cf0ff] group-hover:text-[#05080f]"
                    : "bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white"
                }`}>
                  <span className="w-6 h-6 block">
                    {capabilityIcons[item.key]}
                  </span>
                </div>
                <span className={`font-mono text-sm tracking-widest ${dark ? "text-white/25" : "text-foreground/20"}`}>
                  {`0${idx + 1}`}
                </span>
              </div>
              <p className={`relative mt-5 text-lg font-semibold tracking-tight ${dark ? "text-white" : ""}`}>
                {item.title}
              </p>
              <p className={`relative mt-2 text-sm leading-relaxed ${dark ? "text-white/55" : "text-muted"}`}>
                {item.desc}
              </p>
              <CardFx color={dark ? undefined : "rgba(47,107,255,0.12)"} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
