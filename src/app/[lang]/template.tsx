"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

// Every navigation swaps this <ViewTransition>: the old page exits and the new
// one enters, and the browser's View Transitions API cross-fades the two
// snapshots (old drifts up + blurs out, new rises in). Keyed by pathname because
// the [lang] template alone doesn't remount between siblings under the same
// child segment (e.g. /products → /products/charge).
// Classes live in globals.css (::view-transition-*(.page-in/.page-out)).
// Initial loads are not transitions, so the first paint is untouched (LCP-safe).
// Browsers without the API simply swap instantly.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
