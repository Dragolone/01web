"use client";

import { motion } from "framer-motion";

// A template re-mounts on every navigation, so this gives each route a gentle
// fade-in transition. Opacity-only keeps any fixed/absolute descendants safe.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
