"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" makes every framer-motion component honor the OS
// "reduce motion" setting automatically (disables transform/layout animation,
// keeps opacity fades). Wraps the whole app from the root layout.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
