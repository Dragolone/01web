"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary; lang: Locale };

const easeOut = [0.16, 1, 0.3, 1] as const;

// `robot` here is the mobile-charging-robot — same hardware as the
// white-wheeled unit in robot-hero.jpg ("ENERGIZE ANYWHERE").
const visuals: Record<string, { img: string; alt: string }> = {
  robot: { img: "/products/robot-hero.jpg", alt: "Mobile Charging Robot" },
  vtol: { img: "/products/drone-hero.jpg", alt: "VTOL" },
};

export function ProductMatrix({ dict, lang }: Props) {
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

        <div
          className={`mt-14 grid gap-6 md:grid-cols-2 ${
            dict.products.items.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
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
                <Link
                  href={`/${lang}/products/${item.key}`}
                  aria-label={item.name}
                  className="absolute inset-0 z-10"
                />
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
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-brand-soft text-brand font-medium whitespace-nowrap">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-brand font-medium">{item.summary}</p>
                  <p className="mt-4 text-sm text-muted leading-relaxed">{item.desc}</p>
                  <div className="mt-5 pt-5 border-t border-border/70 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-foreground/[.04] text-foreground/65 group-hover:bg-brand-soft group-hover:text-brand transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
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
