"use client";

import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Props = {
  title: string;
  lead: string;
  eyebrow?: string;
  meta?: string[];
};

export function PageHero({ title, lead, eyebrow, meta }: Props) {
  return (
    // Dark cyber opening shared by every inner page, then dissolving into the
    // light, readable content below.
    <section className="relative isolate overflow-hidden pt-32 pb-28 text-white md:pt-40 md:pb-32">
      {/* dark base */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 100% at 50% -10%, #142a73 0%, #0a1230 45%, #070a18 100%)" }}
      />
      {/* blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,150,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,255,0.07) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage: "radial-gradient(110% 90% at 50% 0%, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(110% 90% at 50% 0%, black 25%, transparent 75%)",
        }}
      />
      {/* neon glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 55% at 88% 0%, rgba(0,160,220,0.22) 0%, transparent 55%), radial-gradient(40% 50% at 6% 20%, rgba(155,107,255,0.16) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[96rem] px-6 lg:px-10">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#9db8ff] mb-5"
          >
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#5cf0ff]" />
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.04 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.12 }}
          className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed"
        >
          {lead}
        </motion.p>
        {meta && meta.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
            className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70"
          >
            {meta.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="w-1 h-1 rounded-full bg-white/30" />}
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* dissolve into the light content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 -z-10"
        style={{ background: "linear-gradient(180deg, transparent 0%, #070a18 96%)" }}
      />
    </section>
  );
}
