"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Atom } from "@/components/atom";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function Home() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10] }}
      style={{ height: "100vh", width: "100%" }}
    >
      <color attach="background" args={["black"]} />
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <Atom />
      </Float>
      <Stars saturation={0} count={400} speed={10} />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
