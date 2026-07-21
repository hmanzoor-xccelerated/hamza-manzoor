"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Float, OrbitControls, Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { getQualityMode } from "@/components/scene/AdaptiveQuality";
import { performanceBudgets } from "@/lib/perf/budgets";

function FloatingParticles({ count }: Readonly<{ count: number }>) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#22d3ee");
    const purple = new THREE.Color("#c084fc");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4.5;

      const mixCol = Math.random() > 0.5 ? cyan : purple;
      col[i * 3] = mixCol.r;
      col[i * 3 + 1] = mixCol.g;
      col[i * 3 + 2] = mixCol.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = time * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.6} />
    </points>
  );
}

function PortraitOrb({ highQuality }: Readonly<{ highQuality: boolean }>) {
  const portraitTexture = useTexture("/images/hamza-portrait.jpg");
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (orbRef.current) {
      // Gentle floating distortion rotation
      orbRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <group>
      {/* Outer Floating Glass Shield Orb */}
      <Float speed={highQuality ? 1.4 : 0.8} rotationIntensity={highQuality ? 0.9 : 0.4} floatIntensity={0.6}>
        <Sphere ref={orbRef} args={[1.5, highQuality ? 64 : 32, highQuality ? 64 : 32]}>
          <meshStandardMaterial
            color="#7dd3fc"
            transparent
            opacity={0.18}
            roughness={0.08}
            metalness={0.2}
            emissive="#0c324e"
            emissiveIntensity={0.35}
            wireframe={!highQuality} // Wireframe structure on low-quality for futuristic tech grid feel
          />
        </Sphere>

        {/* Inner Projected Portrait Billboard Card */}
        <Billboard follow lockX={false} lockY={false} lockZ={false}>
          <mesh position={[0, 0, 0.4]}>
            <circleGeometry args={[0.9, highQuality ? 80 : 40]} />
            <meshStandardMaterial
              map={portraitTexture}
              roughness={0.2}
              metalness={0.1}
              transparent
              opacity={0.92}
            />
          </mesh>
        </Billboard>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  const mode = useMemo(() => getQualityMode(), []);
  const highQuality = mode === "high";

  return (
    <div className="h-full w-full bg-transparent">
      <Canvas
        dpr={highQuality ? [1, 1.5] : [1, 1]}
        camera={{ position: [0, 0, 4.0], fov: 55 }}
        gl={{ antialias: highQuality, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 3, 4]} intensity={1.3} color="#a5f3fc" />
        <pointLight position={[-3, -2, 2]} intensity={0.9} color="#c084fc" />

        <PortraitOrb highQuality={highQuality} />
        <FloatingParticles count={highQuality ? 60 : 30} />

        <OrbitControls
          autoRotate
          autoRotateSpeed={highQuality ? 0.6 : 0.2}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
      <p className="absolute bottom-3 left-4 text-[10px] tracking-wider text-cyan-200/50 uppercase">
        3D Orb: {mode} mode | Target FPS: {performanceBudgets.targetFps}+
      </p>
    </div>
  );
}
