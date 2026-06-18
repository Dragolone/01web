"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HomeSolutions({ dict }: Props) {
  const s = dict.homeSolutions;
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
            {s.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">{s.title}</h2>
          <p className="mt-4 text-lg text-white/60">{s.subtitle}</p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {s.items.map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition-all hover:-translate-y-1 hover:border-[#5cf0ff]/40 hover:shadow-xl hover:shadow-[#00e5ff]/10 md:p-10"
            >
              {/* hover light sweep */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              {/* faint grid */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(140,170,255,0.13) 1px, transparent 1.5px)",
                  backgroundSize: "30px 30px",
                  maskImage: "radial-gradient(120% 80% at 100% 0%, black, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(120% 80% at 100% 0%, black, transparent 70%)",
                }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                <span className="font-mono text-sm tracking-widest text-white/25">{`0${idx + 1}`}</span>
              </div>
              <p className="relative mt-4 max-w-md text-sm leading-relaxed text-white/60">{item.desc}</p>
              <div className="relative mt-6 flex flex-wrap gap-2">
                {item.keywords.map((k) => (
                  <span
                    key={k}
                    className="rounded-md bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/65 transition-colors group-hover:bg-[#5cf0ff]/15 group-hover:text-[#5cf0ff]"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
