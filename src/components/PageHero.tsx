"use client";

import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function PageHero({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="pt-36 pb-12 md:pt-44 md:pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-5xl md:text-6xl font-semibold tracking-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
          className="mt-5 text-lg md:text-xl text-muted max-w-2xl"
        >
          {lead}
        </motion.p>
      </div>
    </section>
  );
}
