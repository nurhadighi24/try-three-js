"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function RotatingLights() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // rotasi horizontal
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.2; // opsional: goyangan naik turun
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <pointLight position={[-5, -5, 5]} intensity={3} color="#9000ff" />
    </group>
  );
}
