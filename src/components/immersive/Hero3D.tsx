"use client";

import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, Sparkles, OrbitControls } from "@react-three/drei";
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
function Turbine({ reduce }: { reduce: boolean | null }) {
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
      if (core.current) core.current.emissiveIntensity = 3 + Math.sin(t * 2.2) * 1.4;
      if (accent.current) accent.current.emissiveIntensity = 2.4 + Math.sin(t * 1.6 + 1) * 1;
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
        <meshPhysicalMaterial color="#cdd6f2" {...chrome} />
      </mesh>
      {/* inner lip */}
      <mesh>
        <torusGeometry args={[1.68, 0.05, 20, 120]} />
        <meshPhysicalMaterial color="#93a2d8" {...chrome} />
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
              <meshPhysicalMaterial color="#aab6e4" {...chrome} />
            </mesh>
          </mesh>
        ))}
      </group>

      {/* stator vanes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]}>
          <mesh position={[0, 1.35, -0.04]} rotation={[0, 0.5, 0]}>
            <boxGeometry args={[0.045, 0.52, 0.05]} />
            <meshPhysicalMaterial color="#9aa8d8" {...chrome} />
          </mesh>
        </mesh>
      ))}

      {/* spinning fan + nose spinner */}
      <group ref={fan}>
        {Array.from({ length: BLADES }).map((_, i) => (
          <group key={i} rotation={[0, 0, (i / BLADES) * Math.PI * 2]}>
            <mesh position={[0, 0.92, 0.05]} rotation={[0.6, 0, 0.12]}>
              <boxGeometry args={[0.15, 1.02, 0.022]} />
              <meshPhysicalMaterial color="#e3eaff" metalness={0.95} roughness={0.1} clearcoat={1} envMapIntensity={1.9} />
            </mesh>
          </group>
        ))}
        <mesh>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshPhysicalMaterial color="#c2cdff" {...chrome} />
        </mesh>
        {/* nose cone spinner */}
        <mesh position={[0, 0, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.3, 0.5, 32]} />
          <meshPhysicalMaterial color="#cdd6f2" {...chrome} />
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

export function Hero3D() {
  const reduce = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <fog attach="fog" args={["#080619", 8, 22]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[6, 3, 4]} intensity={45} color="#00e5ff" distance={32} />
      <pointLight position={[-6, -2, 3]} intensity={45} color="#ff3df0" distance={32} />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={6} position={[4, 3, 3]} scale={[7, 3, 1]} color="#00e5ff" />
        <Lightformer form="rect" intensity={5} position={[-5, 1, -1]} scale={[7, 4, 1]} color="#ff3df0" />
        <Lightformer form="rect" intensity={4} position={[0, 4, -4]} scale={[9, 3, 1]} color="#3b6bff" />
        <Lightformer form="circle" intensity={3} position={[0, -4, 3]} scale={5} color="#9b6bff" />
        <Lightformer form="rect" intensity={2.5} position={[3, -3, -2]} scale={[5, 5, 1]} color="#5cf0ff" />
      </Environment>

      {/* fine, dense sparkle layers */}
      <Sparkles count={500} scale={[22, 12, 12]} size={1} speed={reduce ? 0 : 0.3} color="#7fe9ff" opacity={0.7} />
      <Sparkles count={260} scale={[16, 10, 9]} size={1.5} speed={reduce ? 0 : 0.18} color="#ff9bf2" opacity={0.5} />
      <Sparkles count={150} scale={[11, 8, 6]} size={2.1} speed={reduce ? 0 : 0.1} color="#ffffff" opacity={0.55} />

      <mesh scale={4}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial wireframe color="#3b6bff" transparent opacity={0.06} />
      </mesh>

      {SHARDS.map((sh, i) => (
        <Float key={i} speed={reduce ? 0 : 1 + i * 0.2} rotationIntensity={reduce ? 0 : 1.3} floatIntensity={reduce ? 0 : 1.6}>
          <mesh position={sh.p}>
            <octahedronGeometry args={[sh.s]} />
            <meshStandardMaterial color={sh.c} emissive={sh.c} emissiveIntensity={2.4} toneMapped={false} />
          </mesh>
        </Float>
      ))}

      <Float speed={reduce ? 0 : 1} rotationIntensity={0} floatIntensity={reduce ? 0 : 0.7}>
        <Turbine reduce={reduce} />
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.4} mipmapBlur />
        <ChromaticAberration offset={[0.0007, 0.0007]} radialModulation={false} modulationOffset={0} />
        <Vignette eskil={false} offset={0.22} darkness={0.92} />
        <Noise opacity={0.028} />
      </EffectComposer>
    </Canvas>
  );
}
