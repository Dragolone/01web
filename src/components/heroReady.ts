// Tiny cross-component signal (no React context needed across the layout/page
// boundary): the intro curtain (<Loader/>) waits for the home hero's WebGL scene
// to finish compiling instead of waiting for window.load, which was gated on
// every image and the 1.2MB three.js chunk (curtain: 2s on 4G, 7s on 3G).
//   "none"    — no hero on this page (inner pages): curtain lifts at its minimum.
//   "pending" — <ImmersiveHero/> mounted, shaders compiling.
//   "ready"   — <Hero3D/> compiled and about to fade in.
export type HeroState = "none" | "pending" | "ready";

let state: HeroState = "none";
const listeners = new Set<() => void>();

export function setHeroState(next: HeroState) {
  if (state === next) return;
  state = next;
  listeners.forEach((l) => l());
}
export const getHeroState = () => state;
export const getServerHeroState = (): HeroState => "none";
export function subscribeHeroState(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
