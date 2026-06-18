"use client";

import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  Sparkles,
  MeshDistortMaterial,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";

// neon shards floating around the core
const SHARDS: Array<{ p: [number, number, number]; s: number; c: string }> = [
  { p: [3.2, 1.4, -1], s: 0.22, c: "#00e5ff" },
  { p: [-3.4, -0.8, 0.6], s: 0.18, c: "#ff3df0" },
  { p: [2.6, -1.9, 1.2], s: 0.15, c: "#7c5cff" },
  { p: [-2.9, 1.9, -0.6], s: 0.2, c: "#00e5ff" },
  { p: [0.6, 2.5, -2], s: 0.14, c: "#ff3df0" },
  { p: [-1.6, -2.4, 0.9], s: 0.16, c: "#5cf0ff" },
  { p: [3.6, -0.4, 0.2], s: 0.12, c: "#9b6bff" },
];

/**
 * Cyberpunk-tinted, full-screen Active-Theory-style 3D scene:
 *  - chrome core reflecting cyan/magenta/blue neon light cards (oil-slick look)
 *  - glowing emissive shards + three coloured parallax sparkle layers
 *  - scene fog, bloom, vignette for depth and neon glow
 * Draggable + auto-rotating. Client-only, reduced-motion aware.
 */
export function Hero3D() {
  const reduce = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <fog attach="fog" args={["#080619", 7.5, 20]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[6, 3, 4]} intensity={40} color="#00e5ff" distance={30} />
      <pointLight position={[-6, -2, 3]} intensity={40} color="#ff3df0" distance={30} />

      {/* neon reflection environment (cyberpunk colour cast) */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={6} position={[4, 3, 3]} scale={[7, 3, 1]} color="#00e5ff" />
        <Lightformer form="rect" intensity={5} position={[-5, 1, -1]} scale={[7, 4, 1]} color="#ff3df0" />
        <Lightformer form="rect" intensity={4} position={[0, 4, -4]} scale={[9, 3, 1]} color="#3b6bff" />
        <Lightformer form="circle" intensity={3} position={[0, -4, 3]} scale={5} color="#9b6bff" />
        <Lightformer form="rect" intensity={2.5} position={[3, -3, -2]} scale={[5, 5, 1]} color="#5cf0ff" />
      </Environment>

      {/* depth — three coloured sparkle layers */}
      <Sparkles count={150} scale={[20, 11, 10]} size={2.5} speed={reduce ? 0 : 0.3} color="#5cf0ff" opacity={0.55} />
      <Sparkles count={90} scale={[14, 9, 7]} size={5} speed={reduce ? 0 : 0.18} color="#ff7df3" opacity={0.4} />
      <Sparkles count={70} scale={[10, 7, 5]} size={8} speed={reduce ? 0 : 0.1} color="#ffffff" opacity={0.3} />

      {/* faint structural shell */}
      <mesh scale={3.7}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial wireframe color="#3b6bff" transparent opacity={0.08} />
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

      {/* morphing chrome core */}
      <Float speed={reduce ? 0 : 1.3} rotationIntensity={reduce ? 0 : 0.5} floatIntensity={reduce ? 0 : 1}>
        <mesh>
          <icosahedronGeometry args={[1.55, 18]} />
          <MeshDistortMaterial
            color="#0a1030"
            roughness={0.04}
            metalness={1}
            envMapIntensity={1.6}
            distort={reduce ? 0 : 0.42}
            speed={reduce ? 0 : 1.5}
          />
        </mesh>
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduce} autoRotateSpeed={0.6} rotateSpeed={0.5} />

      <EffectComposer>
        <Bloom intensity={1.4} luminanceThreshold={0.12} luminanceSmoothing={0.4} mipmapBlur />
        <Vignette eskil={false} offset={0.22} darkness={0.9} />
        <Noise opacity={0.035} />
      </EffectComposer>
    </Canvas>
  );
}
