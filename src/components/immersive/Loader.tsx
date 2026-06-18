"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Intro curtain — a brief branded overlay that lifts to reveal the page on the
 * first full load. It only mounts once (it lives in the root layout, which
 * persists across client-side navigations) and is skipped entirely when the
 * user prefers reduced motion.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const MIN = 850; // keep the curtain up long enough to feel intentional
    const t0 = performance.now();
    let timer: ReturnType<typeof setTimeout>;
    const finish = () => {
      const wait = Math.max(0, MIN - (performance.now() - t0));
      timer = setTimeout(() => setDone(true), wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060b18]"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <Image
              src="/brand/logo-white.png"
              alt=""
              width={180}
              height={46}
              priority
              className="h-9 w-auto"
            />
            <div className="h-px w-40 overflow-hidden bg-white/15">
              <motion.div
                className="h-full bg-white/70"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
