"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary };

const easeOut = [0.16, 1, 0.3, 1] as const;

const visuals: Record<string, { img: string; alt: string }> = {
  robot: { img: "/products/robot-hero.jpg", alt: "Mobile Robot" },
  station: { img: "/products/delivery-robot-office.jpg", alt: "Charging Station" },
  vtol: { img: "/products/drone-hero.jpg", alt: "VTOL" },
};

export function ProductMatrix({ dict }: Props) {
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
            Product Matrix
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {dict.products.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{dict.products.subtitle}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dict.products.items.map((item, idx) => {
            const v = visuals[item.key] ?? visuals.robot;
            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: easeOut, delay: idx * 0.08 }}
                className="group relative rounded-3xl bg-surface overflow-hidden border border-transparent hover:border-border transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={v.img}
                    alt={v.alt}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-brand-soft text-brand font-medium">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-brand font-medium">{item.summary}</p>
                  <p className="mt-4 text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
