"use client";

import Link from "next/link";
import type { ImmersiveHeroDict } from "@/app/[lang]/dictSlices";
import dynamic from "next/dynamic";
import { Component, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

// If the curtain has lifted but the 3D scene still is not ready after this long
// (chunk never arrived), show the copy on its own rather than never.
const ENTER_FALLBACK_MS = 3000;
import { useTheme } from "@/components/useTheme";
import { getCurtainState, getHeroState, getServerCurtainState, getServerHeroState, setHeroState, subscribeHeroState } from "@/components/heroReady";
import type { Locale } from "@/app/[lang]/dictionaries";

// fontClass: next/font variable class that defines --font-playfair (see [lang]/page.tsx).
type Props = { lang: Locale; dict: ImmersiveHeroDict; fontClass?: string };

const LITE_QUERY = "(hover: none) and (pointer: coarse)";
const getLite = () => window.matchMedia(LITE_QUERY).matches || window.innerWidth < 768;
const subscribeLite = (cb: () => void) => {
  const mq = window.matchMedia(LITE_QUERY);
  mq.addEventListener("change", cb);
  window.addEventListener("resize", cb);
  return () => {
    mq.removeEventListener("change", cb);
    window.removeEventListener("resize", cb);
  };
};

// WebGL scene — client-only (no SSR).
const Hero3D = dynamic(() => import("./Hero3D").then((m) => m.Hero3D), { ssr: false });
// Kick the chunk download off at module evaluation (during hydration) instead of
// after mount — on a slow overseas link that is a few hundred ms earlier.
if (typeof window !== "undefined") void import("./Hero3D");

const markHeroReady = () => setHeroState("ready");

// The 3D scene is decoration: if its chunk fails to load (flaky overseas link)
// or it throws, drop the scene instead of letting the error reach the route
// boundary (which replaced the whole page with the error screen), and report
// "ready" so the copy still enters.
class SceneBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    markHeroReady();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function ImmersiveHero({ lang, dict, fontClass }: Props) {
  const h = dict.heroImmersive;
  const sectionRef = useRef<HTMLElement>(null);
  const glowWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  // Touch / small screens get the lighter render tier (see Hero3D `lite`).
  const lite = useSyncExternalStore(subscribeLite, getLite, () => false);
  const theme = useTheme();
  // Entrance: headline and turbine must arrive together, so both key off the same
  // moment — the curtain has started lifting AND the 3D scene is compiled. That is
  // one React commit: `.hero-enter` goes on the section (CSS entrance, globals.css)
  // and `reveal` goes to Hero3D (canvas fade + settle) at the same time.
  const lifted = useSyncExternalStore(subscribeHeroState, getCurtainState, getServerCurtainState) === "lifting";
  const heroReady = useSyncExternalStore(subscribeHeroState, getHeroState, getServerHeroState) === "ready";
  const [forced, setForced] = useState(false);
  useEffect(() => {
    if (!lifted || heroReady) return;
    const t = setTimeout(() => setForced(true), ENTER_FALLBACK_MS);
    return () => clearTimeout(t);
  }, [lifted, heroReady]);
  const enterNow = lifted && (heroReady || forced);

  // Tell the intro curtain there is a hero to wait for. Layout effect so it runs
  // before <Loader/>'s passive effect decides how long to stay up.
  useLayoutEffect(() => {
    setHeroState("pending");
    return () => setHeroState("none");
  }, []);

  // Only pause the 3D render loop once the hero is fully off-screen (not visible →
  // no point spending GPU). While any part of the hero is on screen it keeps animating.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cursor glow: one pre-painted 840px radial layer (.hero-glow) moved with
  // transform — compositor-only — instead of re-rasterising a full-section
  // gradient on every mousemove. The wrapper only fades in/out.
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const wrap = glowWrapRef.current;
    const glow = glowRef.current;
    if (!wrap || !glow) return;
    const r = e.currentTarget.getBoundingClientRect();
    glow.style.transform = `translate3d(${e.clientX - r.left - 420}px, ${e.clientY - r.top - 420}px, 0)`;
    if (wrap.style.opacity !== "1") wrap.style.opacity = "1";
  };
  const onLeave = () => {
    if (glowWrapRef.current) glowWrapRef.current.style.opacity = "0";
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative isolate flex min-h-[100svh] items-center overflow-hidden text-foreground ${fontClass ?? ""}${enterNow ? " hero-enter" : ""}`}
    >
      {/* dark base */}
      <div aria-hidden className="hero-base absolute inset-0 z-0" />
      {/* 3D scene */}
      <div className="absolute inset-0 z-0">
        <SceneBoundary>
          <Hero3D active={active} lite={lite} light={theme === "light"} onReady={markHeroReady} reveal={enterNow} />
        </SceneBoundary>
      </div>
      {/* cursor glow */}
      <div ref={glowWrapRef} aria-hidden className="pointer-events-none absolute inset-0 z-[4] opacity-0 mix-blend-screen transition-opacity duration-300">
        <div ref={glowRef} className="hero-glow" />
      </div>
      {/* legibility scrim — left/bottom heavy so the headline reads over the scene */}
      <div aria-hidden className="hero-scrim absolute inset-0 z-[5]" />

      {/* copy — entrance is CSS (globals.css .hero-in*), started by `.hero-enter` on the
          section in the same commit that reveals the turbine. --d/--dur/--y per element. */}
      <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 lg:px-10">
        <div className="relative max-w-2xl">
          {/* borderless soft dark halo for legibility (no panel/edge) */}
          <div aria-hidden className="hero-halo absolute -inset-x-10 -inset-y-12 -z-10" />

          <p
            style={{ "--d": "0.45s", "--dur": "0.7s", "--y": "16px" } as React.CSSProperties}
            className="hero-in font-playfair text-base italic text-foreground/70 sm:text-lg"
          >
            {dict.brand.nameEn}
          </p>

          <h1 className="mt-4 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-[0.08em]">
              <span
                style={{ "--d": "0.55s", "--dur": "1s" } as React.CSSProperties}
                className="hero-in hero-in--rise hero-title-1 inline-block"
              >
                {h.title1}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span
                style={{ "--d": "0.69s", "--dur": "1s" } as React.CSSProperties}
                className="hero-in hero-in--rise hero-title-2 inline-block"
              >
                {h.title2}
              </span>
            </span>
          </h1>

          <p
            style={{ "--d": "0.87s", "--dur": "0.9s", "--y": "18px" } as React.CSSProperties}
            className="hero-in hero-in--blur mt-7 max-w-xl text-base leading-[1.85] text-foreground/75 sm:text-lg"
          >
            {h.subtitle}
          </p>

          {/* capability tags — plain text with subtle dividers (no boxes) */}
          <div
            style={{ "--d": "0.99s", "--dur": "0.7s", "--y": "14px" } as React.CSSProperties}
            className="hero-in mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/75"
          >
            {h.tags.map((t, i) => (
              <span key={t} className="inline-flex items-center gap-4">
                {i > 0 && <span aria-hidden className="h-3.5 w-px bg-foreground/20" />}
                {t}
              </span>
            ))}
          </div>

          <div
            style={{ "--d": "1.11s", "--dur": "0.8s", "--y": "18px" } as React.CSSProperties}
            className="hero-in mt-9 flex flex-wrap gap-3"
          >
            <Link
              href={`/${lang}/solutions`}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-btn px-7 font-medium text-btn-fg transition-all hover:bg-btn/90 hover:shadow-[0_0_44px_-6px_rgba(150,180,255,0.8)] light:hover:shadow-[0_12px_36px_-12px_rgba(11,18,38,0.45)]"
            >
              {h.ctaPrimary}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href={`/${lang}/products`}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/30 px-7 font-medium text-foreground/90 backdrop-blur-sm transition-colors hover:border-foreground/70 hover:bg-foreground/5"
            >
              {h.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* melt into the page below (dark or light theme) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-28"
        style={{ background: "linear-gradient(180deg, transparent 0%, var(--page) 100%)" }}
      />

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex justify-center">
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-foreground/40 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-foreground/70" />
        </span>
      </div>
    </section>
  );
}
