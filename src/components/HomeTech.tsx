"use client";

import { motion } from "framer-motion";
import { CardFx } from "@/components/CardFx";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HomeTech({ dict }: Props) {
  const t = dict.homeTech;
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
          <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#5cf0ff] mb-3">
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#5cf0ff]" />
            {t.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">{t.title}</h2>
          <p className="mt-4 text-lg text-white/60">{t.subtitle}</p>
        </motion.div>

        <div className="relative mt-16">
          {/* faint network backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage: "radial-gradient(rgba(140,170,255,0.12) 1px, transparent 1.5px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(80% 120% at 50% 50%, black, transparent 80%)",
              WebkitMaskImage: "radial-gradient(80% 120% at 50% 50%, black, transparent 80%)",
            }}
          />
          <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.items.map((it, idx) => (
              <motion.div
                key={it.t}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: easeOut, delay: (idx % 4) * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-1 hover:border-[#5cf0ff]/40 hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-[#5cf0ff] opacity-50 transition-opacity group-hover:animate-ping" />
                    <span className="relative h-2 w-2 rounded-full bg-[#5cf0ff]" />
                  </span>
                  <span className="font-mono text-[11px] tracking-widest text-white/30">{`0${idx + 1}`}</span>
                </div>
                <p className="mt-4 text-base font-semibold text-white">{it.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{it.d}</p>
                <CardFx size={260} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
