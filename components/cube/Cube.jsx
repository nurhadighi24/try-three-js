"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Cube() {
  const ref = useRef();

  useFrame((state) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={new THREE.Color(0.3, 0.9, 1)}
        emissive={new THREE.Color(0.2, 0.2, 0.5)}
      />
    </mesh>
  );
}
