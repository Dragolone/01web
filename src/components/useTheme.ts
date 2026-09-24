"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

// Theme lives on <html data-theme> (set pre-paint by the inline script in
// [lang]/layout.tsx); components read it here and re-render when it flips.
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

/** Current theme. Server render / hydration assume light (the default), then sync. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "light");
}

/** Switch theme, persist it, and cross-fade the page where supported. */
export function setTheme(next: Theme) {
  const apply = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !reduce) document.startViewTransition(apply);
  else apply();
}
