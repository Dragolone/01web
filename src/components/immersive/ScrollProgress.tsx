"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin neon scroll-progress line at the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-[#00e5ff] via-[#7c5cff] to-[#ff3df0]"
    />
  );
}
