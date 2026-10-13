"use client";

import { useEffect, useRef } from "react";

// Drop-in card effect overlay: a cursor-following glow + a hover-activated
// animated gradient border. Place as the LAST child inside a card that is
// `relative overflow-hidden rounded-*`. It is pointer-events-none, so it never
// blocks an overlaid <Link>. Styling lives in globals.css (.card-fx*).
// The border only animates while hovered (class toggled), keeping idle CPU at zero.
// Both effects only ever write transform/opacity, so moving the pointer costs
// zero paint work (the gradients are rasterised once, then composited).
type Props = { color?: string; size?: number };

export function CardFx({ color, size }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const parent = root?.parentElement;
    if (!root || !parent) return;
    const glow = root.querySelector<HTMLElement>(".card-fx__glow");
    const border = root.querySelector<HTMLElement>(".card-fx__border");

    // Compositor-only: the glow layer is translated to the pointer (no gradient
    // repaint), and the border's rotating layer is sized to the card diagonal.
    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      if (glow) glow.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top}px, 0)`;
    };
    const enter = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      root.style.setProperty("--fx-diag", `${Math.ceil(Math.hypot(r.width, r.height))}px`);
      move(e);
      root.classList.add("on");
      glow?.style.setProperty("opacity", "1");
      border?.classList.add("on");
    };
    const leave = () => {
      root.classList.remove("on");
      glow?.style.setProperty("opacity", "0");
      border?.classList.remove("on");
    };

    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerenter", enter);
    parent.addEventListener("pointerleave", leave);
    return () => {
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerenter", enter);
      parent.removeEventListener("pointerleave", leave);
    };
  }, []);

  const style: React.CSSProperties = {};
  if (color) (style as Record<string, string>)["--fx-color"] = color;
  if (size) (style as Record<string, string>)["--fx-size"] = `${size}px`;

  return (
    <div ref={ref} aria-hidden className="card-fx" style={style}>
      <div className="card-fx__glow" />
      <div className="card-fx__border" />
    </div>
  );
}
