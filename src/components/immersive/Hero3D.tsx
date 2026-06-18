"use client";

import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  MeshDistortMaterial,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";

/**
 * Active-Theory-style 3D hero object: a morphing chrome-blue blob lit by
 * coloured light cards (no external HDRI), slowly auto-rotating and draggable,
 * with bloom + film grain post-processing. Rendered client-only.
 */
export function Hero3D() {
  const reduce = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />

      {/* local reflections via light cards (no network HDRI) */}
      <Environment resolution={256}>
        <group rotation={[0, 0, 1]}>
          <Lightformer form="rect" intensity={5} position={[3, 3, 3]} scale={6} color="#9db8ff" />
          <Lightformer form="rect" intensity={3} position={[-4, 2, -2]} scale={6} color="#1849dc" />
          <Lightformer form="circle" intensity={3} position={[0, -4, 2]} scale={5} color="#ffffff" />
          <Lightformer form="rect" intensity={2} position={[0, 3, -4]} scale={6} color="#2456e0" />
        </group>
      </Environment>

      <Float speed={reduce ? 0 : 1.4} rotationIntensity={reduce ? 0 : 0.6} floatIntensity={reduce ? 0 : 1.1}>
        <mesh>
          <icosahedronGeometry args={[1.5, 14]} />
          <MeshDistortMaterial
            color="#16235f"
            roughness={0.06}
            metalness={0.9}
            envMapIntensity={1.3}
            distort={reduce ? 0 : 0.4}
            speed={reduce ? 0 : 1.6}
          />
        </mesh>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduce}
        autoRotateSpeed={0.7}
        rotateSpeed={0.5}
      />

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.18} luminanceSmoothing={0.3} mipmapBlur />
        <Noise opacity={0.035} />
      </EffectComposer>
    </Canvas>
  );
}
