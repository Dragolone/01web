"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

// compactTop: trim the top padding when this sits directly under a PageHero.
// theme="dark": cyber-dark variant used on the immersive home page.
type Props = { dict: Dictionary; lang: Locale; compactTop?: boolean; theme?: "dark" };

const easeOut = [0.16, 1, 0.3, 1] as const;

// Visual mapping — image file names are legacy and don't reflect contents:
//   robot-hero.jpg  → LingYI-Charge mobile EV charging robot
//   drone-hero.jpg  → LingYI-1 VTOL fixed-wing UAV
const visuals: Record<string, { img: string; alt: string }> = {
  charge: { img: "/products/robot-hero.jpg", alt: "LingYI-Charge Mobile EV Charging Robot" },
  vtol: { img: "/products/drone-hero.jpg", alt: "LingYI-1 VTOL Fixed-Wing UAV" },
};

export function ProductMatrix({ dict, lang, compactTop, theme }: Props) {
  const dark = theme === "dark";
  return (
    <section className={compactTop ? "pt-4 md:pt-6 pb-20 md:pb-28" : "py-20 md:py-28"}>
      <div className="mx-auto max-w-[96rem] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-2xl"
        >
          <p className={`inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase mb-3 ${dark ? "text-[#5cf0ff]" : "text-brand"}`}>
            <span aria-hidden className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-[#5cf0ff]" : "bg-brand"}`} />
            Product Matrix
          </p>
          <h2 className={`text-4xl md:text-5xl font-semibold tracking-tight ${dark ? "text-white" : ""}`}>
            {dict.products.title}
          </h2>
          <p className={`mt-4 text-lg ${dark ? "text-white/60" : "text-muted"}`}>{dict.products.subtitle}</p>
        </motion.div>

        <div
          className={`mt-16 grid gap-8 md:grid-cols-2 ${
            dict.products.items.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          {dict.products.items.map((item, idx) => {
            const v = visuals[item.key] ?? visuals.charge;
            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: easeOut, delay: idx * 0.08 }}
                className={`group relative rounded-3xl overflow-hidden border transition-all hover:-translate-y-1 ${
                  dark
                    ? "bg-white/[0.04] border-white/10 hover:border-[#5cf0ff]/40 hover:shadow-xl hover:shadow-[#00e5ff]/10"
                    : "bg-surface border-transparent hover:border-border hover:shadow-xl hover:shadow-black/5"
                }`}
              >
                <Link
                  href={`/${lang}/products/${item.key}`}
                  aria-label={item.name}
                  className="absolute inset-0 z-10"
                />
                <motion.div
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: easeOut, delay: idx * 0.08 + 0.1 }}
                  className="aspect-[16/10] overflow-hidden"
                >
                  <Image
                    src={v.img}
                    alt={v.alt}
                    width={800}
                    height={500}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                <div className="p-8">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className={`text-2xl font-semibold ${dark ? "text-white" : ""}`}>{item.name}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${dark ? "bg-[#5cf0ff]/15 text-[#5cf0ff]" : "bg-brand-soft text-brand"}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className={`mt-1 text-sm font-medium ${dark ? "text-[#9db8ff]" : "text-brand"}`}>{item.summary}</p>
                  <p className={`mt-4 text-sm leading-relaxed ${dark ? "text-white/55" : "text-muted"}`}>{item.desc}</p>
                  <div className={`mt-5 pt-5 border-t flex flex-wrap gap-1.5 ${dark ? "border-white/10" : "border-border/70"}`}>
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-[11px] px-2 py-0.5 rounded-md transition-colors ${
                          dark
                            ? "bg-white/[0.06] text-white/65 group-hover:bg-[#5cf0ff]/15 group-hover:text-[#5cf0ff]"
                            : "bg-foreground/[.04] text-foreground/65 group-hover:bg-brand-soft group-hover:text-brand"
                        }`}
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
