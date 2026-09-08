"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { homeStrip } from "./galleryImages";

type Props = { dict: Dictionary; lang: Locale };

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Full-bleed film strip of real photos (campus + partner factory) that drifts
 * slowly across the viewport. Pure CSS animation (globals.css .gallery-strip),
 * pauses on hover, collapses to a static row under prefers-reduced-motion.
 */
export function HomeGalleryStrip({ dict, lang }: Props) {
  const g = dict.homeGallery;
  const captions = dict.gallery.captions;
  const loop = [...homeStrip, ...homeStrip];

  return (
    <section id="site-gallery" className="scroll-mt-20 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="mx-auto flex max-w-[96rem] flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between lg:px-10"
      >
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#5cf0ff]">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#5cf0ff]" />
            {g.eyebrow}
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{g.title}</h2>
          <p className="mt-4 text-lg text-white/60">{g.subtitle}</p>
        </div>
        <Link
          href={`/${lang}/about`}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-[#5cf0ff]"
        >
          {g.more}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <path d="M3 9 9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>

      <div className="gallery-strip mt-12 md:mt-16">
        <ul className="gallery-strip__track">
          {loop.map((it, i) => (
            <li
              key={`${it.id}-${i}`}
              aria-hidden={i >= homeStrip.length || undefined}
              className="group relative aspect-[3/2] w-[18rem] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] md:w-[26rem]"
            >
              <Image
                src={it.src}
                alt=""
                fill
                sizes="(min-width: 768px) 26rem, 18rem"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#070a18]/80 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 text-xs text-white/85">{captions[it.id]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
