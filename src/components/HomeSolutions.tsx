"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { scenarioImages } from "@/components/scenarioImages";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { dict: Dictionary; lang: Locale };

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Home "applications" — the 8 real scenarios from /solutions, grouped by
 * product line. Photo-led (one hero shot per product line) with a scenario
 * list beside it; each row deep-links to its full write-up on /solutions.
 */
export function HomeSolutions({ dict, lang }: Props) {
  const s = dict.homeSolutions;
  const byKey = Object.fromEntries(dict.solutions.scenarios.map((sc) => [sc.key, sc]));

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[96rem] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#5cf0ff]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#5cf0ff]" />
              {s.eyebrow}
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{s.title}</h2>
            <p className="mt-4 text-lg text-white/60">{s.subtitle}</p>
          </div>
          <Link
            href={`/${lang}/solutions`}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-[#5cf0ff]"
          >
            {s.more}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <path d="M3 9 9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        <div className="mt-14 flex flex-col gap-10 md:gap-14">
          {s.groups.map((g, gi) => {
            const scenarios = g.scenarios.map((k) => byKey[k]).filter(Boolean);
            const heroImg = scenarioImages[g.scenarios[0]];
            const mirror = gi % 2 === 1;
            return (
              <motion.div
                key={g.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: easeOut }}
                className={`grid gap-5 lg:grid-cols-12 lg:gap-6 ${mirror ? "lg:[&>:first-child]:order-2" : ""}`}
              >
                {/* product-line hero photo */}
                <Link
                  href={`/${lang}/products/${g.key}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/10 lg:col-span-5"
                >
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[26rem]">
                    <Image
                      src={heroImg}
                      alt={g.product}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#070a18]/90 via-[#070a18]/20 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#9db8ff]">{g.tagline}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">{g.product}</p>
                  </div>
                </Link>

                {/* scenario list */}
                <ul className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f20] lg:col-span-7">
                  {scenarios.map((sc) => (
                    <li key={sc.key}>
                      <Link
                        href={`/${lang}/solutions#${sc.key}`}
                        className="group flex items-center gap-5 px-5 py-4 transition-colors hover:bg-white/[0.04] md:px-7 md:py-5"
                      >
                        <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10">
                          <Image
                            src={scenarioImages[sc.key]}
                            alt=""
                            fill
                            sizes="96px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-semibold tracking-tight text-white md:text-lg">{sc.name}</span>
                          <span className="mt-1 block truncate text-sm text-white/55">{sc.highlights.join(" · ")}</span>
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden
                          className="shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-[#5cf0ff]"
                        >
                          <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
