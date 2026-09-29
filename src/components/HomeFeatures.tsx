"use client";

import { motion } from "framer-motion";
import type { HomeFeaturesDict } from "@/app/[lang]/dictSlices";

type Props = { dict: HomeFeaturesDict };

const easeOut = [0.16, 1, 0.3, 1] as const;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
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
    // Open, card-less row: icon + title + copy sit straight on the page
    // background so the band reads as part of the backdrop, not a widget grid.
    <section className="relative overflow-hidden pt-24 pb-20 text-foreground md:pt-28 md:pb-28">
      {/* ambient brand glow — kept clear of the section edges so it never
          shows a hard seam against the neighbouring bands */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 35% at 80% 50%, rgba(40,92,224,0.12) 0%, transparent 70%), radial-gradient(40% 35% at 15% 50%, rgba(40,92,224,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[96rem] px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-10">
          {dict.hero.features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span aria-hidden className="block h-8 w-8 text-foreground/75 md:h-9 md:w-9">
                {featureIcons[idx]}
              </span>
              <p className="mt-5 text-base font-semibold tracking-tight md:text-[17px]">{f.title}</p>
              <p className="mt-2 max-w-[18rem] text-balance text-[13px] md:break-keep leading-relaxed text-foreground/60 md:text-[15px]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
