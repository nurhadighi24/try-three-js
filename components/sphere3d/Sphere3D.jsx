"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Sphere3D() {
  const ref = useRef();

  useFrame((state) => {
    ref.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color={new THREE.Color(1, 0.6, 0.2)}
        emissive={new THREE.Color(0.4, 0.2, 0)}
      />
    </mesh>
  );
}
