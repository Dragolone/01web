"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getHeroState, getServerHeroState, setCurtainLifting, subscribeHeroState } from "@/components/heroReady";

// Curtain timing, measured from navigation start (performance.now()):
//   MIN — stays up at least this long so the logo + line read as intentional.
//   CAP — never later than this, whatever the hero is still doing.
// Between the two it lifts as soon as the home hero's shaders are compiled
// (components/heroReady.ts). It used to wait for window.load — every image plus
// the 1.2MB three.js chunk — which kept it up 2s on 4G and 7s on 3G for nothing
// the first screen needed; inner pages (no hero) now lift at MIN.
const MIN = 500;
const CAP = 1200;

/**
 * Intro curtain — a brief branded overlay that lifts to reveal the page on the
 * first full load. It only mounts once (it lives in the root layout, which
 * persists across client-side navigations) and is skipped entirely when the
 * user prefers reduced motion.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [finished, setFinished] = useState(false);
  const hero = useSyncExternalStore(subscribeHeroState, getHeroState, getServerHeroState);
  const done = Boolean(reduce) || finished;

  useEffect(() => {
    if (reduce || finished) {
      // No curtain (reduced motion) or already lifting: let the hero enter now.
      setCurtainLifting();
      return;
    }
    const elapsed = performance.now();
    // "pending": hold for the hero, but never past CAP. "ready" / "none": lift at MIN.
    const at = hero === "pending" ? CAP : MIN;
    const timer = setTimeout(() => {
      setFinished(true);
      setCurtainLifting();
    }, Math.max(0, at - elapsed));
    return () => clearTimeout(timer);
  }, [reduce, finished, hero]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <Image
              src="/brand/logo-512.png"
              alt="零一唯创 Zero-One Innovation"
              width={180}
              height={46}
              priority
              className="h-9 w-auto brightness-0 invert light:invert-0"
            />
            <div className="h-px w-40 overflow-hidden bg-foreground/15">
              <motion.div
                className="h-full bg-foreground/70"
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
