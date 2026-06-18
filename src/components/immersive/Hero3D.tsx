"use client";

import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, Sparkles, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";

// neon shards floating around the engine
const SHARDS: Array<{ p: [number, number, number]; s: number; c: string }> = [
  { p: [3.4, 1.5, -1], s: 0.2, c: "#00e5ff" },
  { p: [-3.6, -0.9, 0.6], s: 0.17, c: "#ff3df0" },
  { p: [2.8, -2.0, 1.2], s: 0.14, c: "#7c5cff" },
  { p: [-3.0, 2.0, -0.6], s: 0.18, c: "#00e5ff" },
  { p: [0.7, 2.7, -2], s: 0.13, c: "#ff3df0" },
  { p: [-1.7, -2.6, 0.9], s: 0.15, c: "#5cf0ff" },
];

const BLADES = 22;

/** Industrial turbine / jet engine — chrome housing rings, fast-spinning fan,
 *  glowing core. Tilts toward the cursor. */
function Turbine({ reduce }: { reduce: boolean | null }) {
  const root = useRef<THREE.Group>(null);
  const fan = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    if (fan.current && !reduce) fan.current.rotation.z += dt * 2.4;
    if (root.current) {
      const ty = state.pointer.x * 0.5;
      const tx = -state.pointer.y * 0.35 + 0.28;
      root.current.rotation.y += (ty - root.current.rotation.y) * 0.05;
      root.current.rotation.x += (tx - root.current.rotation.x) * 0.05;
    }
  });

  const chrome = { metalness: 1, roughness: 0.16, envMapIntensity: 1.6 };

  return (
    <group ref={root} rotation={[0.28, 0, 0]} scale={1.15}>
      {/* outer housing rings */}
      <mesh>
        <torusGeometry args={[1.95, 0.12, 24, 96]} />
        <meshStandardMaterial color="#c8d2f0" {...chrome} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.7, 0.05, 16, 96]} />
        <meshStandardMaterial color="#8fa0d8" {...chrome} />
      </mesh>
      {/* emissive accent ring */}
      <mesh>
        <torusGeometry args={[2.12, 0.018, 12, 120]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={3} toneMapped={false} />
      </mesh>

      {/* stator spokes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i / 8) * Math.PI * 2]}>
          <mesh position={[0, 1.35, 0]}>
            <boxGeometry args={[0.05, 0.5, 0.05]} />
            <meshStandardMaterial color="#9aa8d8" {...chrome} />
          </mesh>
        </mesh>
      ))}

      {/* spinning fan */}
      <group ref={fan}>
        {Array.from({ length: BLADES }).map((_, i) => (
          <group key={i} rotation={[0, 0, (i / BLADES) * Math.PI * 2]}>
            <mesh position={[0, 0.95, 0.04]} rotation={[0.55, 0, 0]}>
              <boxGeometry args={[0.16, 1.05, 0.025]} />
              <meshStandardMaterial color="#dfe7ff" metalness={0.9} roughness={0.12} envMapIntensity={1.7} />
            </mesh>
          </group>
        ))}
        {/* central hub */}
        <mesh>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial color="#b9c6ff" metalness={1} roughness={0.1} envMapIntensity={1.8} />
        </mesh>
      </group>

      {/* glowing core eye */}
      <mesh position={[0, 0, 0.06]}>
        <circleGeometry args={[0.16, 32]} />
        <meshStandardMaterial color="#5cf0ff" emissive="#5cf0ff" emissiveIntensity={4} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function Hero3D() {
  const reduce = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.9]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <fog attach="fog" args={["#080619", 8, 22]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[6, 3, 4]} intensity={40} color="#00e5ff" distance={30} />
      <pointLight position={[-6, -2, 3]} intensity={40} color="#ff3df0" distance={30} />

      {/* neon reflection environment */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={6} position={[4, 3, 3]} scale={[7, 3, 1]} color="#00e5ff" />
        <Lightformer form="rect" intensity={5} position={[-5, 1, -1]} scale={[7, 4, 1]} color="#ff3df0" />
        <Lightformer form="rect" intensity={4} position={[0, 4, -4]} scale={[9, 3, 1]} color="#3b6bff" />
        <Lightformer form="circle" intensity={3} position={[0, -4, 3]} scale={5} color="#9b6bff" />
        <Lightformer form="rect" intensity={2.5} position={[3, -3, -2]} scale={[5, 5, 1]} color="#5cf0ff" />
      </Environment>

      {/* finer, denser sparkle layers */}
      <Sparkles count={460} scale={[22, 12, 12]} size={1.1} speed={reduce ? 0 : 0.3} color="#7fe9ff" opacity={0.7} />
      <Sparkles count={240} scale={[16, 10, 9]} size={1.6} speed={reduce ? 0 : 0.18} color="#ff9bf2" opacity={0.5} />
      <Sparkles count={140} scale={[11, 8, 6]} size={2.2} speed={reduce ? 0 : 0.1} color="#ffffff" opacity={0.55} />

      {/* faint structural shell */}
      <mesh scale={3.9}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial wireframe color="#3b6bff" transparent opacity={0.07} />
      </mesh>

      {/* neon shards */}
      {SHARDS.map((sh, i) => (
        <Float key={i} speed={reduce ? 0 : 1 + i * 0.2} rotationIntensity={reduce ? 0 : 1.3} floatIntensity={reduce ? 0 : 1.6}>
          <mesh position={sh.p}>
            <octahedronGeometry args={[sh.s]} />
            <meshStandardMaterial color={sh.c} emissive={sh.c} emissiveIntensity={2.4} toneMapped={false} />
          </mesh>
        </Float>
      ))}

      {/* industrial turbine centerpiece */}
      <Float speed={reduce ? 0 : 1} rotationIntensity={0} floatIntensity={reduce ? 0 : 0.8}>
        <Turbine reduce={reduce} />
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} enableRotate={false} />

      <EffectComposer>
        <Bloom intensity={1.4} luminanceThreshold={0.12} luminanceSmoothing={0.4} mipmapBlur />
        <Vignette eskil={false} offset={0.22} darkness={0.9} />
        <Noise opacity={0.03} />
      </EffectComposer>
    </Canvas>
  );
}
