"use client";

import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  Sparkles,
  MeshDistortMaterial,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
// CC0 / public-domain HDRI, bundled locally (no network, no copyright issue).
import city from "@pmndrs/assets/hdri/city.exr";

/**
 * Full-screen Active-Theory-style 3D scene with real depth:
 *  - HDRI-lit chrome-blue morphing core (rich reflections)
 *  - faint large wireframe shell behind for structure
 *  - two parallax sparkle layers + scene fog for depth
 *  - bloom / vignette post FX
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
      <fog attach="fog" args={["#070b1a", 7.5, 19]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 6, 5]} intensity={1.3} />

      {/* HDRI reflections (not shown as background) */}
      <Environment files={city} />

      {/* depth layers */}
      <Sparkles count={90} scale={[18, 10, 9]} size={3} speed={reduce ? 0 : 0.25} color="#9db8ff" opacity={0.5} />
      <Sparkles count={50} scale={[11, 7, 5]} size={7} speed={reduce ? 0 : 0.14} color="#ffffff" opacity={0.32} />

      {/* faint structural shell behind the core */}
      <mesh scale={3.6}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial wireframe color="#2a4cff" transparent opacity={0.07} />
      </mesh>

      {/* morphing chrome-blue core */}
      <Float speed={reduce ? 0 : 1.3} rotationIntensity={reduce ? 0 : 0.5} floatIntensity={reduce ? 0 : 1}>
        <mesh>
          <icosahedronGeometry args={[1.55, 18]} />
          <MeshDistortMaterial
            color="#16235f"
            roughness={0.05}
            metalness={0.95}
            envMapIntensity={1.4}
            distort={reduce ? 0 : 0.42}
            speed={reduce ? 0 : 1.5}
          />
        </mesh>
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduce} autoRotateSpeed={0.6} rotateSpeed={0.5} />

      <EffectComposer>
        <Bloom intensity={1} luminanceThreshold={0.15} luminanceSmoothing={0.35} mipmapBlur />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
        <Noise opacity={0.035} />
      </EffectComposer>
    </Canvas>
  );
}
