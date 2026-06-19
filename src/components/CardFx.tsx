"use client";

import { useEffect, useRef } from "react";

// Drop-in card effect overlay: a cursor-following glow + a hover-activated
// animated gradient border. Place as the LAST child inside a card that is
// `relative overflow-hidden rounded-*`. It is pointer-events-none, so it never
// blocks an overlaid <Link>. Styling lives in globals.css (.card-fx*).
// The border only animates while hovered (class toggled), keeping idle CPU at zero.
type Props = { color?: string; size?: number };

export function CardFx({ color, size }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const parent = root?.parentElement;
    if (!root || !parent) return;
    const glow = root.querySelector<HTMLElement>(".card-fx__glow");
    const border = root.querySelector<HTMLElement>(".card-fx__border");

    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      root.style.setProperty("--fx-x", `${e.clientX - r.left}px`);
      root.style.setProperty("--fx-y", `${e.clientY - r.top}px`);
    };
    const enter = () => {
      glow?.style.setProperty("opacity", "1");
      border?.classList.add("on");
    };
    const leave = () => {
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
