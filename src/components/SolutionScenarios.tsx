"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

const scenarioIcons: Record<string, React.ReactNode> = {
  delivery: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="22" width="32" height="22" rx="3" />
      <path d="M40 28h10l6 8v8H40" />
      <circle cx="18" cy="48" r="4" />
      <circle cx="46" cy="48" r="4" />
    </svg>
  ),
  inspection: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="28" r="14" />
      <path d="M38 38l14 14" />
      <path d="M22 28h12M28 22v12" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 6l20 8v14c0 12-8 22-20 28-12-6-20-16-20-28V14l20-8z" />
      <path d="M24 32l6 6 12-12" />
    </svg>
  ),
  "low-altitude": (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 18v28" />
      <path d="M14 24l18 4 18-4" />
      <path d="M20 36l12 4 12-4" />
      <circle cx="32" cy="50" r="3" />
    </svg>
  ),
};

export function SolutionScenarios({ dict }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-2xl"
        >
          <p className="text-xs tracking-[0.18em] uppercase text-brand mb-3">
            Applications
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {dict.solutions.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{dict.solutions.subtitle}</p>
        </motion.div>

        <div className="mt-16 md:mt-20 flex flex-col gap-20 md:gap-28">
          {dict.solutions.scenarios.map((s, idx) => {
            const reverse = idx % 2 === 1;
            const isComingSoon = "comingSoon" in s && s.comingSoon === true;
            return (
              <motion.article
                key={s.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: easeOut }}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${reverse ? "lg:[&>:first-child]:order-2" : ""}`}
              >
                {/* Visual block — pinstripe pattern for visual harmony with white page */}
                <div className="lg:col-span-6">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-surface text-brand">
                    {/* Diagonal pinstripes */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(24,73,220,0.10) 0 1px, transparent 1px 14px)",
                      }}
                    />
                    {/* Soft brand glow */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(55% 55% at 80% 15%, rgba(24,73,220,0.10) 0%, transparent 60%)",
                      }}
                    />
                    <div className="absolute top-7 left-7 text-xs font-medium tracking-widest text-brand/70">
                      {`0${idx + 1}`}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 md:w-32 md:h-32 text-brand/85">
                        {scenarioIcons[s.key]}
                      </div>
                    </div>
                    <div className="absolute bottom-7 left-7 text-xs font-medium tracking-wide text-brand/70 uppercase">
                      {s.headline}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                      {s.name}
                    </h3>
                    {isComingSoon && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-brand-soft text-brand font-medium">
                        {dict.solutions.comingSoon}
                      </span>
                    )}
                  </div>
                  <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
                    {s.desc}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {s.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-foreground/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
