"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { GalleryItem } from "./galleryImages";

type Props = {
  items: GalleryItem[];
  captions: Dictionary["gallery"]["captions"];
  labels: Pick<Dictionary["gallery"], "close" | "prev" | "next" | "open">;
  /** First item spans 2×2 for an asymmetric, editorial layout. */
  featured?: boolean;
};

const easeOut = [0.16, 1, 0.3, 1] as const;

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const tile = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

/**
 * Real-photo grid with a lightbox. Tiles are buttons (keyboard reachable);
 * video items play inline, muted, and are not enlarged. Uses semantic tokens
 * so it sits correctly on both the dark home act and the dark page body.
 */
export function PhotoGallery({ items, captions, labels, featured = true }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stills = items.map((it, i) => (it.video ? -1 : i)).filter((i) => i >= 0);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((cur) => {
        if (cur === null) return cur;
        const pos = stills.indexOf(cur);
        return stills[(pos + dir + stills.length) % stills.length];
      });
    },
    [stills]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const current = open === null ? null : items[open];

  return (
    <>
      <motion.div
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 [grid-auto-flow:dense]"
      >
        {items.map((it, i) => {
          const caption = captions[it.id];
          const big = featured && i === 0;
          const frame = `group relative overflow-hidden rounded-2xl border border-border bg-surface ${
            big ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-[4/3]"
          }`;
          const overlay = (
            <>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#070a18]/80 via-[#070a18]/10 to-transparent" />
              <p className="absolute bottom-3 left-4 right-4 text-left text-[11px] leading-snug text-white/85 md:bottom-4 md:text-xs">
                {caption}
              </p>
            </>
          );
          if (it.video) {
            return (
              <motion.figure key={it.id} variants={tile} className={frame}>
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={it.video}
                  poster={it.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={caption}
                />
                {overlay}
              </motion.figure>
            );
          }
          return (
            <motion.button
              key={it.id}
              type="button"
              variants={tile}
              onClick={() => setOpen(i)}
              aria-label={`${labels.open}: ${caption}`}
              className={`${frame} cursor-zoom-in`}
            >
              <Image
                src={it.src}
                alt=""
                fill
                sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {overlay}
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={captions[current.id]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#070a18]/92 p-4 backdrop-blur-sm md:p-10"
            onClick={() => setOpen(null)}
          >
            <motion.figure
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="flex max-h-full max-w-[96rem] flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={current.id}
                src={current.src}
                alt={captions[current.id]}
                width={current.width}
                height={current.height}
                sizes="95vw"
                priority
                className="max-h-[78vh] w-auto rounded-xl border border-white/10 object-contain shadow-2xl shadow-black/50"
              />
              <figcaption className="mt-4 text-center text-sm text-white/75">{captions[current.id]}</figcaption>
            </motion.figure>

            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(null)}
              aria-label={labels.close}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15 md:right-6 md:top-6"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            {stills.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); step(-1); }}
                  aria-label={labels.prev}
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15 md:left-6"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); step(1); }}
                  aria-label={labels.next}
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/15 md:right-6"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
