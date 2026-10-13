"use client";

import * as THREE from "three";
import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Lightformer, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";

const SHARDS: Array<{ p: [number, number, number]; s: number; c: string }> = [
  { p: [3.4, 1.5, -1], s: 0.2, c: "#00e5ff" },
  { p: [-3.6, -0.9, 0.6], s: 0.17, c: "#ff3df0" },
  { p: [2.8, -2.0, 1.2], s: 0.14, c: "#7c5cff" },
  { p: [-3.0, 2.0, -0.6], s: 0.18, c: "#00e5ff" },
  { p: [0.7, 2.7, -2], s: 0.13, c: "#ff3df0" },
  { p: [-1.7, -2.6, 0.9], s: 0.15, c: "#5cf0ff" },
];

const BLADES = 24;
const BOLTS = 28;

/** Refined industrial turbine: clearcoat-chrome housing, bolt ring, stator
 *  vanes, spinning fan + nose spinner, pulsing neon core. Tilts to the cursor. */
// Light theme: mid-tone steel — bright chrome would vanish into the pale
// background, graphite reads too heavy; the neon accents stay but glow less.
const METAL = {
  dark: { housing: "#cdd6f2", lip: "#93a2d8", bolt: "#aab6e4", vane: "#9aa8d8", blade: "#e3eaff", hub: "#c2cdff" },
  light: { housing: "#7f8bb4", lip: "#6c78a4", bolt: "#8a96c0", vane: "#7581ad", blade: "#8f9bcc", hub: "#6f7bab" },
};

function Turbine({ reduce, light }: { reduce: boolean | null; light: boolean }) {
  const m = METAL[light ? "light" : "dark"];
  const glow = light ? 0.55 : 1;
  const root = useRef<THREE.Group>(null);
  const fan = useRef<THREE.Group>(null);
  const bolts = useRef<THREE.Group>(null);
  const core = useRef<THREE.MeshStandardMaterial>(null);
  const accent = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (!reduce) {
      if (fan.current) fan.current.rotation.z += dt * 2.6;
      if (bolts.current) bolts.current.rotation.z -= dt * 0.25;
      if (core.current) core.current.emissiveIntensity = (3 + Math.sin(t * 2.2) * 1.4) * glow;
      if (accent.current) accent.current.emissiveIntensity = (2.4 + Math.sin(t * 1.6 + 1) * 1) * glow;
    }
    if (root.current) {
      const ty = state.pointer.x * 0.5;
      const tx = -state.pointer.y * 0.35 + 0.26;
      root.current.rotation.y += (ty - root.current.rotation.y) * 0.05;
      root.current.rotation.x += (tx - root.current.rotation.x) * 0.05;
    }
  });

  const chrome = { metalness: 1, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 1.8 };

  return (
    <group ref={root} rotation={[0.26, 0, 0]} scale={1.18}>
      {/* main housing */}
      <mesh>
        <torusGeometry args={[1.95, 0.13, 32, 120]} />
        <meshPhysicalMaterial color={m.housing} {...chrome} />
      </mesh>
      {/* inner lip */}
      <mesh>
        <torusGeometry args={[1.68, 0.05, 20, 120]} />
        <meshPhysicalMaterial color={m.lip} {...chrome} />
      </mesh>
      {/* outer emissive accent ring */}
      <mesh>
        <torusGeometry args={[2.14, 0.016, 12, 140]} />
        <meshStandardMaterial ref={accent} color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2.6} toneMapped={false} />
      </mesh>

      {/* bolt ring (slow counter-rotation) */}
      <group ref={bolts}>
        {Array.from({ length: BOLTS }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i / BOLTS) * Math.PI * 2]}>
            <mesh position={[0, 1.95, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.08, 12]} />
              <meshPhysicalMaterial color={m.bolt} {...chrome} />
            </mesh>
          </mesh>
        ))}
      </group>

      {/* stator vanes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]}>
          <mesh position={[0, 1.35, -0.04]} rotation={[0, 0.5, 0]}>
            <boxGeometry args={[0.045, 0.52, 0.05]} />
            <meshPhysicalMaterial color={m.vane} {...chrome} />
          </mesh>
        </mesh>
      ))}

      {/* spinning fan + nose spinner */}
      <group ref={fan}>
        {Array.from({ length: BLADES }).map((_, i) => (
          <group key={i} rotation={[0, 0, (i / BLADES) * Math.PI * 2]}>
            <mesh position={[0, 0.92, 0.05]} rotation={[0.6, 0, 0.12]}>
              <boxGeometry args={[0.15, 1.02, 0.022]} />
              {/* Light: rougher + dimmer reflections, else blades facing the white key light
                  blow out to the page colour and look missing. */}
              <meshPhysicalMaterial
                color={m.blade}
                metalness={light ? 0.8 : 0.95}
                roughness={light ? 0.34 : 0.1}
                clearcoat={1}
                envMapIntensity={light ? 1.1 : 1.9}
              />
            </mesh>
          </group>
        ))}
        <mesh>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshPhysicalMaterial color={m.hub} {...chrome} />
        </mesh>
        {/* nose cone spinner */}
        <mesh position={[0, 0, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.3, 0.5, 32]} />
          <meshPhysicalMaterial color={m.housing} {...chrome} />
        </mesh>
      </group>

      {/* pulsing core eye */}
      <mesh position={[0, 0, 0.62]}>
        <circleGeometry args={[0.12, 32]} />
        <meshStandardMaterial ref={core} color="#7df2ff" emissive="#7df2ff" emissiveIntensity={3} toneMapped={false} />
      </mesh>
    </group>
  );
}

/**
 * Compiles every material before the first visible frame. three's compileAsync
 * uses KHR_parallel_shader_compile, so the GPU links the shaders in the
 * background instead of freezing the main thread: on a first visit (empty shader
 * cache) the old synchronous first frame cost 3 long tasks / ~1.1s, landing
 * exactly while the intro curtain lifted. One hidden advance() afterwards warms
 * the post-processing passes too. A 4s cap guarantees the hero always appears.
 */
function Precompile({ onReady }: { onReady: () => void }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const advance = useThree((s) => s.advance);

  useEffect(() => {
    let finished = false;
    let raf = 0;
    const done = () => {
      if (finished) return;
      finished = true;
      try {
        advance(performance.now());
      } catch {}
      // Two frames later: the warm-up frame's GPU work (render targets, uploads)
      // has drained, so the curtain lift that follows starts on a quiet GPU.
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(onReady);
      });
    };
    gl.compileAsync(scene, camera).then(done, done);
    const cap = setTimeout(done, 4000);
    return () => {
      finished = true;
      clearTimeout(cap);
      cancelAnimationFrame(raf);
    };
  }, [gl, scene, camera, advance, onReady]);

  return null;
}

/**
 * `lite` = touch/small-screen tier only (set by ImmersiveHero): lower dpr, half
 * the sparkles, no chromatic aberration / film noise passes. Desktop keeps the
 * full effect — do not lower desktop quality for performance (user decision).
 */
export function Hero3D({ active = true, lite = false, light = false, onReady, reveal = true }: {
  active?: boolean;
  lite?: boolean;
  light?: boolean;
  /** Fired once the shaders are compiled (the intro curtain waits for this). */
  onReady?: () => void;
  /** False while the intro curtain is still up: the loop already runs (warming up
   *  behind the curtain) but the scene stays invisible, then fades + settles in
   *  on the same beat as the headline. */
  reveal?: boolean;
}) {
  const reduce = useReducedMotion();
  const sparkle = (n: number) => (lite ? Math.round(n / 2) : n);
  // Shaders compiled → start the loop and fade the scene in (see <Precompile/>).
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => {
    setReady(true);
    onReady?.();
  }, [onReady]);

  return (
    <Canvas
      // Loop stays off until every shader is compiled (<Precompile/>), and pauses
      // while the hero is scrolled out of view (perf).
      frameloop={active && ready ? "always" : "never"}
      dpr={lite ? [1, 1.25] : [1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{
        background: "transparent",
        opacity: ready && reveal ? 1 : 0,
        transform: ready && reveal ? "scale(1)" : "scale(1.04)",
        // Delayed so the fade plays once the curtain has cleared the scene, in step with the headline.
        transition: "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 450ms, transform 1300ms cubic-bezier(0.16, 1, 0.3, 1) 450ms",
      }}
    >
      <fog attach="fog" args={[light ? "#eef3fd" : "#080619", 8, 22]} />
      <ambientLight intensity={light ? 0.6 : 0.25} />
      <pointLight position={[6, 3, 4]} intensity={light ? 25 : 45} color="#00e5ff" distance={32} />
      <pointLight position={[-6, -2, 3]} intensity={light ? 18 : 45} color={light ? "#7c5cff" : "#ff3df0"} distance={32} />

      {light ? (
        // Studio-style cool whites with a cyan/violet kick for the edge highlights.
        <Environment resolution={lite ? 128 : 256}>
          {/* pale sky backdrop: the metal reflects it instead of black */}
          <color attach="background" args={["#c9d6f5"]} />
          <Lightformer form="rect" intensity={3} position={[4, 3, 3]} scale={[7, 3, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={3} position={[-5, 1, -1]} scale={[7, 4, 1]} color="#5cd6ff" />
          <Lightformer form="rect" intensity={3} position={[0, 4, -4]} scale={[9, 3, 1]} color="#dbe6ff" />
          <Lightformer form="circle" intensity={2} position={[0, -4, 3]} scale={5} color="#9b8bff" />
          <Lightformer form="rect" intensity={2} position={[3, -3, -2]} scale={[5, 5, 1]} color="#ffffff" />
        </Environment>
      ) : (
        <Environment resolution={lite ? 128 : 256}>
          <Lightformer form="rect" intensity={6} position={[4, 3, 3]} scale={[7, 3, 1]} color="#00e5ff" />
          <Lightformer form="rect" intensity={5} position={[-5, 1, -1]} scale={[7, 4, 1]} color="#ff3df0" />
          <Lightformer form="rect" intensity={4} position={[0, 4, -4]} scale={[9, 3, 1]} color="#3b6bff" />
          <Lightformer form="circle" intensity={3} position={[0, -4, 3]} scale={5} color="#9b6bff" />
          <Lightformer form="rect" intensity={2.5} position={[3, -3, -2]} scale={[5, 5, 1]} color="#5cf0ff" />
        </Environment>
      )}

      {/* fine, dense sparkle layers */}
      <Sparkles count={sparkle(520)} scale={[22, 12, 12]} size={1} speed={reduce ? 0 : 0.3} color={light ? "#2f6bff" : "#7fe9ff"} opacity={light ? 0.45 : 0.7} />
      <Sparkles count={sparkle(280)} scale={[16, 10, 9]} size={1.5} speed={reduce ? 0 : 0.18} color={light ? "#7c5cff" : "#ff9bf2"} opacity={light ? 0.35 : 0.5} />
      <Sparkles count={sparkle(160)} scale={[11, 8, 6]} size={2.1} speed={reduce ? 0 : 0.1} color={light ? "#00a8d6" : "#ffffff"} opacity={light ? 0.4 : 0.55} />

      <mesh scale={4}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial wireframe color="#3b6bff" transparent opacity={light ? 0.035 : 0.06} />
      </mesh>

      {SHARDS.map((sh, i) => (
        <Float key={i} speed={reduce ? 0 : 1 + i * 0.2} rotationIntensity={reduce ? 0 : 1.3} floatIntensity={reduce ? 0 : 1.6}>
          <mesh position={sh.p}>
            <octahedronGeometry args={[sh.s]} />
            <meshStandardMaterial color={sh.c} emissive={sh.c} emissiveIntensity={light ? 1.2 : 2.4} toneMapped={false} />
          </mesh>
        </Float>
      ))}

      {/* shifted right so it doesn't sit behind the headline */}
      <Float speed={reduce ? 0 : 1} rotationIntensity={0} floatIntensity={reduce ? 0 : 0.7}>
        <group position={[1.6, 0.15, 0]}>
          <Turbine reduce={reduce} light={light} />
        </group>
      </Float>

      <EffectComposer>
        {[
          // Light: only the emissive neon should bloom (high threshold), and no
          // aberration/vignette/noise — they read as fringing and grime on a pale background.
          <Bloom key="bloom" intensity={light ? 0.7 : 1.15} luminanceThreshold={light ? 0.85 : 0.16} luminanceSmoothing={0.4} mipmapBlur />,
          ...(lite || light ? [] : [<ChromaticAberration key="ca" offset={[0.0007, 0.0007]} radialModulation={false} modulationOffset={0} />]),
          ...(light ? [] : [<Vignette key="vig" eskil={false} offset={0.22} darkness={0.92} />]),
          ...(lite || light ? [] : [<Noise key="noise" opacity={0.028} />]),
        ]}
      </EffectComposer>
      <Precompile onReady={handleReady} />
    </Canvas>
  );
}
