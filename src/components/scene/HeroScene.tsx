"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Billboard, Float, OrbitControls, Sphere, useTexture } from "@react-three/drei";
import { getQualityMode } from "@/components/scene/AdaptiveQuality";
import { performanceBudgets } from "@/lib/perf/budgets";

function Orb({ highQuality }: Readonly<{ highQuality: boolean }>) {
  const portraitTexture = useTexture("/images/hamza-portrait.png");

  return (
    <Float speed={highQuality ? 1.3 : 0.8} rotationIntensity={highQuality ? 0.8 : 0.3}>
      <Sphere args={[1.65, highQuality ? 72 : 36, highQuality ? 72 : 36]}>
        <meshStandardMaterial
          color="#7dd3fc"
          transparent
          opacity={0.24}
          roughness={0.06}
          metalness={0.15}
          emissive="#0b2a3f"
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <mesh position={[0, 0, 0.72]}>
          <circleGeometry args={[0.95, highQuality ? 96 : 48]} />
          <meshStandardMaterial map={portraitTexture} roughness={0.25} metalness={0.05} />
        </mesh>
      </Billboard>
    </Float>
  );
}

export default function HeroScene() {
  const mode = useMemo(() => getQualityMode(), []);
  const highQuality = mode === "high";

  return (
    <div className="h-[360px] w-full rounded-2xl border border-cyan-300/20 bg-black/20">
      <Canvas
        dpr={highQuality ? [1, 1.5] : [1, 1]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: highQuality }}
      >
        <color attach="background" args={["#070a14"]} />
        <ambientLight intensity={0.95} />
        <directionalLight position={[2, 2, 3]} intensity={1.15} color="#9be7ff" />
        <pointLight position={[-2, -1.5, 1.5]} intensity={0.8} color="#22d3ee" />
        <Orb highQuality={highQuality} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={highQuality ? 0.8 : 0.3}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
      <p className="px-4 pb-3 text-xs text-cyan-100/60">
        Adaptive scene mode: <span className="uppercase">{mode}</span> | Target FPS:{" "}
        {performanceBudgets.targetFps}+
      </p>
    </div>
  );
}
