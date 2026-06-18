"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type Props = { lang: Locale; dict: Dictionary };

const SPOTLIGHT_R = 260;
// Base = the charging-robot scene shown dimmed; the cursor spotlight reveals the
// same scene in full clarity/colour ("shine a light to reveal the real machine").
const BASE_IMG = "/products/charge-station.jpg";
const REVEAL_IMG = "/products/charge-station.jpg";

function RevealLayer({
  image,
  cursorX,
  cursorY,
}: {
  image: string;
  cursorX: number;
  cursorY: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mask, setMask] = useState<string>("");

  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    const g = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,1)");
    g.addColorStop(0.6, "rgba(255,255,255,0.75)");
    g.addColorStop(0.75, "rgba(255,255,255,0.4)");
    g.addColorStop(0.88, "rgba(255,255,255,0.12)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();
    setMask(c.toDataURL());
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: "none" }} />
      <div
        className="absolute inset-0 z-30 bg-center bg-cover bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          maskImage: mask ? `url(${mask})` : undefined,
          WebkitMaskImage: mask ? `url(${mask})` : undefined,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />
    </>
  );
}

export function ImmersiveHero({ lang, dict }: Props) {
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100dvh" }}
    >
      {/* Base image (dimmed) */}
      <div
        className="hero-zoom absolute inset-0 z-10 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${BASE_IMG})` }}
      />
      {/* Dimming + legibility scrim over the base */}
      <div
        aria-hidden
        className="absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,6,16,0.6) 0%, rgba(3,6,16,0.45) 40%, rgba(3,6,16,0.8) 100%)",
        }}
      />

      {/* Cursor spotlight reveal */}
      <RevealLayer image={REVEAL_IMG} cursorX={cursorPos.x} cursorY={cursorPos.y} />

      {/* Heading */}
      <div className="absolute top-[14%] left-0 right-0 z-50 flex flex-col items-center px-5 text-center pointer-events-none">
        <p
          className="hero-anim hero-fade font-playfair text-base italic text-white/70 sm:text-lg"
          style={{ animationDelay: "0.1s" }}
        >
          {dict.brand.nameEn}
        </p>
        <h1 className="mt-3 leading-[0.98] text-white">
          <span
            className="hero-anim hero-reveal block text-5xl font-semibold sm:text-7xl md:text-8xl"
            style={{ letterSpacing: "-0.04em", animationDelay: "0.25s" }}
          >
            {dict.brand.tagline}
          </span>
          <span
            className="hero-anim hero-reveal -mt-1 block bg-gradient-to-r from-white to-[#9db8ff] bg-clip-text text-5xl font-semibold text-transparent sm:text-7xl md:text-8xl"
            style={{ letterSpacing: "-0.04em", animationDelay: "0.42s" }}
          >
            {dict.brand.tagline2}
          </span>
        </h1>
      </div>

      {/* Bottom-left paragraph */}
      <div
        className="hero-anim hero-fade absolute bottom-14 left-10 z-50 hidden max-w-[280px] sm:block md:left-14"
        style={{ animationDelay: "0.7s" }}
      >
        <p className="text-sm leading-relaxed text-white/80">{dict.brand.vision}</p>
      </div>

      {/* Bottom-right block */}
      <div
        className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[300px] sm:gap-5 md:right-14"
        style={{ animationDelay: "0.85s" }}
      >
        <p className="text-xs leading-relaxed text-white/80 sm:text-sm">{dict.brand.lead}</p>
        <Link
          href={`/${lang}/solutions`}
          className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-brand-strong hover:shadow-lg hover:shadow-brand/30 active:scale-95"
        >
          {dict.hero.cta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
            <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-50 flex justify-center">
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
        </span>
      </div>
    </section>
  );
}
