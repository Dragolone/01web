"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Animates a single clean numeric value from 0 → target when scrolled into view,
// preserving any prefix/suffix (e.g. "−95%", "450 亿元", "18% CAGR", "1.8 万亿元").
// Strings without a number, or ranges (a digit in the suffix, e.g. "8–16 月",
// "5,000元→200元"), render verbatim — never broken mid-animation.
// Respects prefers-reduced-motion (jumps straight to the final value).
type Props = { value: string; className?: string };

export function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Memoized so the match array keeps a stable identity across renders — otherwise
  // it would be a new object each render and retrigger the effect, restarting the
  // animation forever (the number would never settle).
  const m = useMemo(() => value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/), [value]);
  const animatable = !!m && !/\d/.test(m[3]);
  // SSR / first paint renders the real value (good for SEO & no-JS); the client
  // arms it to 0 on mount and counts up once scrolled into view.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!animatable || !m) return;
    const [, prefix, numStr, suffix] = m;
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const fmt = (n: number) =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(n);

    // Reduced motion: leave the real value (already the initial state) untouched.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    // Not yet scrolled in: arm to 0 (deferred to rAF so it's an async update).
    if (!inView) {
      raf = requestAnimationFrame(() => setDisplay(prefix + fmt(0) + suffix));
      return () => cancelAnimationFrame(raf);
    }

    const duration = 1100;
    const start = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(prefix + fmt(target * ease(p)) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animatable, inView, m]);

  return (
    <span ref={ref} className={className}>
      {animatable ? display : value}
    </span>
  );
}
