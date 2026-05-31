"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

const scenarioIcons: Record<string, React.ReactNode> = {
  // VTOL — pipeline / energy infrastructure inspection
  pipeline: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 24h12l6 8h16l6-8h12" />
      <path d="M6 40h12l6-8" />
      <path d="M58 40H46l-6-8" />
      <circle cx="18" cy="24" r="2" />
      <circle cx="46" cy="24" r="2" />
    </svg>
  ),
  // VTOL — emergency rescue
  rescue: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 6v52" />
      <path d="M6 32h52" />
      <circle cx="32" cy="32" r="14" />
    </svg>
  ),
  // VTOL — security / border patrol
  security: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 6l20 8v14c0 12-8 22-20 28-12-6-20-16-20-28V14l20-8z" />
      <path d="M24 32l6 6 12-12" />
    </svg>
  ),
  // VTOL — agro-forestry remote sensing (multispectral leaf + scan)
  "remote-sensing": (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8c-7 0-13 7-13 17s13 22 13 22 13-12 13-22-6-17-13-17z" />
      <path d="M32 8v38" />
      <path d="M25 20l7 5 7-5" opacity="0.6" />
      <path d="M50 18l-4 4M14 18l4 4" opacity="0.5" />
    </svg>
  ),
  // Charge — commercial complex / office tower (tall building, multi-floor)
  commercial: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="8" width="36" height="48" rx="1" />
      <path d="M22 16h6M22 24h6M22 32h6M22 40h6M36 16h6M36 24h6M36 32h6M36 40h6" />
      <path d="M28 56V48h8v8" />
    </svg>
  ),
  // Charge — residential community (multiple low houses)
  residential: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 38l10-9 10 9v18H4z" />
      <path d="M24 30l10-9 10 9v26H24z" />
      <path d="M44 36l8-7 8 7v20H44z" />
      <path d="M12 46h4M32 38h4M32 48h4M50 44h4" />
    </svg>
  ),
  // Charge — industrial park / campus (factory + offices side by side)
  campus: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="20" width="22" height="36" rx="2" />
      <rect x="36" y="12" width="22" height="44" rx="2" />
      <path d="M12 30h10M12 38h10M12 46h10" />
      <path d="M42 22h10M42 30h10M42 38h10M42 46h10" />
    </svg>
  ),
  // Charge — events / festivals (stage with sound)
  event: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 50V22l24-14 24 14v28" />
      <path d="M8 50h48" />
      <path d="M22 50V38h20v12" />
      <circle cx="32" cy="28" r="3" />
    </svg>
  ),
};

export function SolutionScenarios({ dict }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[88rem] px-6 lg:px-10">
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
