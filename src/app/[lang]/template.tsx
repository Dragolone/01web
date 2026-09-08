"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Set on the client after the first mount. Kept out of the server module state
// on purpose (a server-side flag would leak across requests).
let navigated = false;

// A template re-mounts on every navigation, so this gives each route a gentle
// fade-in transition. Opacity-only keeps any fixed/absolute descendants safe.
// The very first load renders fully visible (initial=false): otherwise the SSR
// HTML ships with opacity:0 and nothing paints until hydration, which pushed
// mobile LCP to 5s+.
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === "undefined") return false;
    const first = !navigated;
    navigated = true;
    return !first;
  });

  return (
    <motion.div
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
