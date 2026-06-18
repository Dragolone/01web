"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Immersive hero backdrop — a living constellation of nodes that drift, link up
 * when close, and react to the cursor, over slow brand-blue light blooms.
 * It reads as a network of connected intelligent devices / airspace.
 *
 * Canvas 2D (not WebGL) on purpose: it re-initialises cleanly on every mount,
 * so the animation survives client-side navigation back to the home page —
 * unlike a WebGL context, which can be lost across route changes. Self-throttles
 * (pauses off-screen / when the tab is hidden) and renders a single static frame
 * for users who prefer reduced motion.
 */
export function ParticleField({ className }: { className?: string }) {
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
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; z: number };
    let pts: P[] = [];

    const build = () => {
      const count = Math.max(28, Math.min(Math.floor(w / 16), 110));
      pts = Array.from({ length: count }, () => {
        const z = Math.random(); // depth 0..1
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22 * (0.5 + z),
          vy: (Math.random() - 0.5) * 0.22 * (0.5 + z),
          z,
        };
      });
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const orbs = [
      { x: 0.22, y: 0.28, r: 0.55, a: 0.16 },
      { x: 0.82, y: 0.18, r: 0.5, a: 0.13 },
      { x: 0.6, y: 0.86, r: 0.6, a: 0.11 },
    ];

    let raf = 0;
    let running = true;
    let t = 0;
    const LINK = 132;

    const frame = () => {
      t += 0.0032;
      ctx.clearRect(0, 0, w, h);

      // soft drifting brand-blue blooms
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        const ox = (o.x + Math.sin(t + i) * 0.04) * w;
        const oy = (o.y + Math.cos(t * 0.8 + i) * 0.04) * h;
        const or = o.r * Math.min(w, h);
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, or);
        g.addColorStop(0, `rgba(40,92,224,${o.a})`);
        g.addColorStop(1, "rgba(40,92,224,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // move nodes (wrap + gentle cursor pull)
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += w;
        else if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        else if (p.y > h) p.y -= h;
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 20000) {
          const d = Math.sqrt(d2) + 0.001;
          const f = (1 - d2 / 20000) * 0.5;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
      }

      // links between nearby nodes
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const al = (1 - d / LINK) * 0.2 * (0.45 + a.z);
            ctx.strokeStyle = `rgba(150,180,255,${al})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // link nodes to cursor for an interactive feel
      if (mouse.x > -9000) {
        for (const p of pts) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < 160) {
            ctx.strokeStyle = `rgba(190,210,255,${(1 - d / 160) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // nodes (depth -> size + glow)
      for (const p of pts) {
        const r = 0.8 + p.z * 1.9;
        const al = 0.25 + p.z * 0.55;
        ctx.beginPath();
        ctx.fillStyle = `rgba(214,226,255,${al})`;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        if (p.z > 0.78) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(120,160,255,${(p.z - 0.78) * 0.5})`;
          ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = running && !reduce ? requestAnimationFrame(frame) : 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);

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
      window.removeEventListener("pointerout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
