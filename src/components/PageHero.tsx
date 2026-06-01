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
    <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
      {/* Decorative gradient — top-right brand glow + subtle left wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 95% 0%, rgba(24,73,220,0.12) 0%, transparent 55%), radial-gradient(45% 35% at 0% 25%, rgba(24,73,220,0.06) 0%, transparent 60%)",
        }}
      />
      {/* Decorative flowing lines — top-right */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -top-8 right-0 -z-10 text-brand/15"
        width="420"
        height="280"
        viewBox="0 0 420 280"
        fill="none"
      >
        <path d="M0 200 Q 110 100, 220 130 T 420 60" stroke="currentColor" strokeWidth="1" />
        <path d="M0 230 Q 130 130, 260 160 T 420 90" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <path d="M0 260 Q 150 160, 280 190 T 420 120" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>

      <div className="relative mx-auto max-w-[88rem] px-6 lg:px-10">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-brand mb-5"
          >
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-brand" />
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
          className="mt-5 text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
        >
          {lead}
        </motion.p>
        {meta && meta.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
            className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/70"
          >
            {meta.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="w-1 h-1 rounded-full bg-foreground/25" />}
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
