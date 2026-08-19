"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CubeData {
  position: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  scale: number;
  speed: number;
}

function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollYRef = useRef(0);

  // Monitor client-side scroll position
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const count = 18;

  // Generate wireframe cubes positions
  const cubes = useMemo(() => {
    const arr: CubeData[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8 - 4; // Render deep in background space
      const rx = Math.random() * 0.01;
      const ry = Math.random() * 0.01;
      const rz = Math.random() * 0.01;
      const scale = Math.random() * 0.5 + 0.15;
      const speed = Math.random() * 0.002 + 0.0015;

      arr.push({
        position: new THREE.Vector3(x, y, z),
        rotationSpeed: new THREE.Vector3(rx, ry, rz),
        scale,
        speed,
      });
    }
    return arr;
  }, [count]);

  const cubeRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const time = performance.now() * 0.001;
    const mouseX = state.mouse.x * 0.4;
    const mouseY = state.mouse.y * 0.4;

    // Shift group container based on mouse pointer (parallax)
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.05);
      
      // Dynamic camera/group depth shift based on scroll progress
      const scrollOffset = scrollYRef.current * 0.0018;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, scrollOffset, 0.08);
    }

    // Animate each cube mesh individually
    cubes.forEach((cube, idx) => {
      const mesh = cubeRefs.current[idx];
      if (mesh) {
        // Slow float up
        cube.position.y += cube.speed;
        // Recycling border checks (wrap around)
        if (cube.position.y > 6.2) {
          cube.position.y = -6.2;
          cube.position.x = (Math.random() - 0.5) * 12;
        }

        mesh.position.copy(cube.position);
        mesh.rotation.x = time * cube.rotationSpeed.x * 12;
        mesh.rotation.y = time * cube.rotationSpeed.y * 12;
        mesh.rotation.z = time * cube.rotationSpeed.z * 12;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            if (el) cubeRefs.current[idx] = el;
          }}
          position={cube.position}
        >
          <boxGeometry args={[cube.scale, cube.scale, cube.scale]} />
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.16}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function GlobalBackgroundScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-[#05070f]" />;
  }

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen pointer-events-none overflow-hidden bg-[#05070f]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        dpr={1}
      >
        <ambientLight intensity={0.9} />
        <FloatingCubes />
      </Canvas>
      {/* Background radial gradient overlay to soften visual presentation */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#05070f_90%] pointer-events-none" />
    </div>
  );
}
