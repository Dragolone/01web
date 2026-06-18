"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

export function TechCapabilities({ dict }: Props) {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-10">
      <div className="relative rounded-[2rem] bg-[#0a0d14] text-white py-24 md:py-32 overflow-hidden shadow-[0_30px_80px_-40px_rgba(10,13,30,0.5)]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 20%, rgba(24,73,220,0.35) 0%, transparent 60%), radial-gradient(50% 50% at 10% 80%, rgba(24,73,220,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[96rem] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-brand mb-3">
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-brand" />
            Technology
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {dict.tech.title}
          </h2>
          <p className="mt-4 text-lg text-white/60">{dict.tech.subtitle}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {dict.tech.items.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: idx * 0.06 }}
              className="group p-8 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
            >
              <p className="text-xs tracking-widest uppercase text-brand">{`0${idx + 1}`}</p>
              <p className="mt-3 text-xl font-medium">{item.label}</p>
              <p className="mt-3 text-white/65 leading-relaxed">{item.value}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
