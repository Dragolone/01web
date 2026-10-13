"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { getHeroState, getServerHeroState, setCurtainLifting, subscribeHeroState } from "@/components/heroReady";

// Curtain timing, measured from navigation start (performance.now()):
//   MIN — stays up at least this long so the logo + line read as intentional.
//   GAP — breathing room after the hero reports ready, so its first real frames
//         (render-target allocation, texture uploads) have settled before the
//         curtain moves.
//   CAP — safety net: lift even if the hero never reports ready (chunk never
//         arrives). Generous on purpose: headline and turbine must enter
//         together, so the curtain waits for the 3D scene — on fast 3G that chunk
//         lands at ~6s. (A failed WebGL compile still reports ready within 4s.)
// It used to wait for window.load — every image plus the 1.2MB three.js chunk.
// Inner pages (no hero) lift at MIN.
const MIN = 500;
const GAP = 150;
const CAP = 8000;

type Phase = "up" | "lifting" | "gone";

/**
 * Intro curtain — a branded overlay that lifts to reveal the page on the first
 * full load. The lift is a CSS transition on transform (globals.css
 * .loader-curtain--lift), so it runs on the compositor and keeps gliding even
 * when the main thread is busy booting the WebGL hero. Mounts once (root
 * layout), skipped entirely under prefers-reduced-motion.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const hero = useSyncExternalStore(subscribeHeroState, getHeroState, getServerHeroState);
  const [phase, setPhase] = useState<Phase>("up");

  // Decide when to lift.
  useEffect(() => {
    if (reduce) {
      // No curtain at all: let the hero enter straight away.
      setCurtainLifting();
      return;
    }
    if (phase !== "up") return;
    const elapsed = performance.now();
    const at = hero === "pending" ? CAP : hero === "ready" ? Math.max(MIN, elapsed + GAP) : MIN;
    const timer = setTimeout(() => {
      setPhase("lifting");
      setCurtainLifting();
    }, Math.max(0, at - elapsed));
    return () => clearTimeout(timer);
  }, [reduce, phase, hero]);

  // Remove the node once the transition is over (fallback timer in case the tab
  // is hidden and transitionend never fires).
  useEffect(() => {
    if (phase !== "lifting") return;
    const timer = setTimeout(() => setPhase("gone"), 1200);
    return () => clearTimeout(timer);
  }, [phase]);

  if (reduce || phase === "gone") return null;

  return (
    <div
      aria-hidden
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && e.propertyName === "transform") setPhase("gone");
      }}
      className={`loader-curtain fixed inset-0 z-[100] flex items-center justify-center bg-background${phase === "lifting" ? " loader-curtain--lift" : ""}`}
    >
      <div className="loader-curtain__content flex flex-col items-center gap-6">
        <Image
          src="/brand/logo-512.png"
          alt="零一唯创 Zero-One Innovation"
          width={180}
          height={46}
          priority
          className="h-9 w-auto brightness-0 invert light:invert-0"
        />
        <div className="h-px w-40 overflow-hidden bg-foreground/15">
          <div className="loader-curtain__line h-full bg-foreground/70" />
        </div>
      </div>
    </div>
  );
}
