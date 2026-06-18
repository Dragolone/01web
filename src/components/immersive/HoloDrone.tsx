"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated holographic wireframe drone — a quad-rotor rendered as glowing
 * blue line-art with spinning rotors, a projection light cone, scan sweep and
 * rising energy particles. Pure SVG/CSS animation (no photo, no 3D asset),
 * built to read as a sci-fi "hologram" of the company's aircraft.
 */

const MOTORS: Array<[number, number]> = [
  [288, 112],
  [112, 112],
  [112, 288],
  [288, 288],
];
const STROKE = "rgba(157,184,255,0.8)";
const FAINT = "rgba(120,160,255,0.35)";

function Rotor({ x, y, dur }: { x: number; y: number; dur: number }) {
  return (
    <>
      <circle cx={x} cy={y} r="46" fill="none" stroke={FAINT} strokeWidth="0.8" />
      <circle cx={x} cy={y} r="6" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <g
        className="origin-center"
        style={{ transformBox: "fill-box", animation: `spin ${dur}s linear infinite` }}
      >
        {[0, 60, 120].map((a) => (
          <ellipse
            key={a}
            cx={x}
            cy={y}
            rx="42"
            ry="5"
            fill="rgba(157,184,255,0.12)"
            stroke={STROKE}
            strokeWidth="0.8"
            transform={`rotate(${a} ${x} ${y})`}
          />
        ))}
      </g>
    </>
  );
}

export function HoloDrone() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[36rem]" style={{ perspective: 1000 }}>
      {/* projection light cone from below */}
      <div
        aria-hidden
        className="absolute bottom-[6%] left-1/2 h-[55%] w-[60%] -translate-x-1/2"
        style={{
          background: "linear-gradient(to top, rgba(80,120,240,0.22), transparent 80%)",
          clipPath: "polygon(42% 100%, 58% 100%, 88% 0, 12% 0)",
        }}
      />
      {/* base projection glow */}
      <div
        aria-hidden
        className="absolute bottom-[8%] left-1/2 h-10 w-[55%] -translate-x-1/2 rounded-[100%]"
        style={{ background: "radial-gradient(ellipse, rgba(80,120,240,0.5), transparent 70%)", filter: "blur(6px)" }}
      />

      {/* drone: float + gentle 3D sway */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { y: [0, -14, 0], rotateY: [-12, 12, -12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.svg
          viewBox="0 0 400 400"
          className="h-full w-full"
          style={{ filter: "drop-shadow(0 0 8px rgba(120,160,255,0.55))" }}
          animate={reduce ? undefined : { opacity: [0.92, 1, 0.92] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* arms */}
          {MOTORS.map(([x, y], i) => (
            <line key={i} x1="200" y1="200" x2={x} y2={y} stroke={STROKE} strokeWidth="2" />
          ))}

          {/* central body (hex) */}
          <polygon
            points="200,150 243,175 243,225 200,250 157,225 157,175"
            fill="rgba(80,120,240,0.10)"
            stroke={STROKE}
            strokeWidth="1.6"
          />
          <polygon
            points="200,165 230,182 230,218 200,235 170,218 170,182"
            fill="none"
            stroke={FAINT}
            strokeWidth="1"
          />
          {/* gimbal / camera */}
          <circle cx="200" cy="208" r="9" fill="none" stroke={STROKE} strokeWidth="1.4" />
          <circle cx="200" cy="208" r="3.5" fill="rgba(157,184,255,0.9)" />

          {/* rotors */}
          {MOTORS.map(([x, y], i) => (
            <Rotor key={i} x={x} y={y} dur={0.4 + (i % 2) * 0.12} />
          ))}

          {/* joint nodes */}
          {MOTORS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.4" fill="rgba(210,226,255,0.95)" />
          ))}
        </motion.svg>
      </motion.div>

      {/* scan sweep */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-x-[10%] z-10 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(157,184,255,0.9), transparent)",
            boxShadow: "0 0 18px 3px rgba(157,184,255,0.5)",
          }}
          animate={{ top: ["18%", "82%", "18%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* rising energy particles */}
      {!reduce &&
        [12, 34, 56, 72, 88].map((left, i) => (
          <motion.span
            key={left}
            aria-hidden
            className="absolute h-1 w-1 rounded-full bg-[#9db8ff]"
            style={{ left: `${left}%`, bottom: "10%" }}
            animate={{ y: [0, -160], opacity: [0, 0.9, 0] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeOut", delay: i * 0.7 }}
          />
        ))}

      {/* hologram scanlines overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-screen"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(157,184,255,0.18) 0px, rgba(157,184,255,0.18) 1px, transparent 1px, transparent 4px)",
        }}
      />
    </div>
  );
}
