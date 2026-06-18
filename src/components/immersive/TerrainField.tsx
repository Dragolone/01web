"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Immersive hero backdrop — an "aerial survey" scene tied to the company's
 * low-altitude / drone business: layered terrain ridgelines (a flight-over-
 * terrain view) under a dark sky, with a couple of aircraft tracing slow arc
 * flight paths and trailing light. Deliberately a designed, on-brand motif
 * rather than a generic particle web.
 *
 * Canvas 2D so it re-initialises cleanly across client navigation; self-throttles
 * off-screen / when hidden, and renders one static frame for reduced motion.
 */
export function TerrainField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const mouse = { x: 0.5 };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const RIDGES = 13;
    // aircraft tracing arc flight-paths
    const craft = [
      { t: 0.0, speed: 0.00022, y: 0.2, amp: 0.06, hue: "255,255,255" },
      { t: 0.45, speed: 0.00016, y: 0.3, amp: 0.09, hue: "157,184,255" },
    ];

    let raf = 0;
    let running = true;
    let time = 0;

    const ridgeY = (x: number, i: number, depth: number, phase: number) => {
      const base = h * (0.42 + depth * 0.66);
      const amp = h * (0.018 + depth * 0.075);
      const mx = (mouse.x - 0.5) * 40 * depth; // subtle cursor parallax
      const k = x + mx;
      return (
        base -
        amp *
          (Math.sin(k * 0.0042 + phase + i * 0.7) * 0.6 +
            Math.sin(k * 0.0099 + phase * 1.3 + i * 1.1) * 0.4)
      );
    };

    const frame = () => {
      time += 1;
      const phase = time * 0.004;
      ctx.clearRect(0, 0, w, h);

      // layered ridgelines, back to front (fills occlude farther ridges -> depth)
      for (let i = 0; i < RIDGES; i++) {
        const depth = i / (RIDGES - 1);
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 8) ctx.lineTo(x, ridgeY(x, i, depth, phase));
        ctx.lineTo(w, h);
        ctx.closePath();
        // fill to occlude ridges behind
        ctx.fillStyle = `rgba(7,11,26,${0.55 + depth * 0.35})`;
        ctx.fill();
        // crest stroke (brighter toward the front)
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = ridgeY(x, i, depth, phase);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = 1 + depth;
        ctx.strokeStyle = `rgba(${110 + depth * 60},${150 + depth * 50},255,${0.1 + depth * 0.5})`;
        ctx.stroke();
      }

      // aircraft + flight trails (drawn over the sky, behind ridges visually ok)
      for (const c of craft) {
        c.t += c.speed * (reduce ? 0 : 1);
        if (c.t > 1.2) c.t = -0.2;
        const drawAt = (tt: number) => {
          const x = tt * w;
          const y = h * c.y + Math.sin(tt * Math.PI * 1.6 + c.t * 2) * h * c.amp;
          return { x, y };
        };
        // trail
        for (let s = 0; s < 18; s++) {
          const tt = c.t - s * 0.012;
          if (tt < 0) break;
          const { x, y } = drawAt(tt);
          ctx.beginPath();
          ctx.fillStyle = `rgba(${c.hue},${(1 - s / 18) * 0.5})`;
          ctx.arc(x, y, Math.max(0.4, 1.8 - s * 0.09), 0, Math.PI * 2);
          ctx.fill();
        }
        // craft head with glow
        const head = drawAt(c.t);
        if (head.x >= -10 && head.x <= w + 10) {
          const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 16);
          g.addColorStop(0, `rgba(${c.hue},0.9)`);
          g.addColorStop(1, `rgba(${c.hue},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 16, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = running && !reduce ? requestAnimationFrame(frame) : 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running && !reduce && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running && !reduce && !raf) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    if (reduce) frame();
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
