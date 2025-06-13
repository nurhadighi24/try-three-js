"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  Stars,
  Float,
  OrbitControls,
  GizmoHelper,
  GizmoViewcube,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Atom } from "../atom";
import { Cube } from "../cube";
import { Sphere3D } from "../sphere3d";
import { RotatingLights } from "../rotatingLights";
import { useEffect, useRef, useState } from "react";
export default function ScrollableScene() {
  const [isClient, setIsClient] = useState(false);
  const starsRef = useRef();

  useEffect(() => {
    setIsClient(true);
  }, []);

  function RotatingStars() {
    const starsRef = useRef();
    useFrame(() => {
      if (starsRef.current) {
        starsRef.current.rotation.y += -0.005; // 🌌 Rotasi horizontal lambat
        // starsRef.current.rotation.x += 0.0005; // Optional: vertikal
      }
    });
    return (
      <group ref={starsRef}>
        <Stars count={500} speed={10} />
      </group>
    );
  }

  if (!isClient) return null;

  return (
    <div>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ height: "100vh", width: "100%" }}
      >
        {/* 🌟 Lighting */}

        <RotatingLights />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewcube />
        </GizmoHelper>

        <OrbitControls
          enablePan={true}
          enableZoom={false}
          enableRotate={true}
        />
        <color attach="background" args={["#141414"]} />

        <RotatingStars />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>

        {/* Scrollable 3D elements */}

        <Float speed={2} floatIntensity={2}>
          <group position={[0, 0, 0]}>
            <Atom />
          </group>
        </Float>

        <Float speed={2} floatIntensity={2}>
          <group position={[-5, -8, 0]}>
            <Cube />
            <axesHelper args={[5]} />
            <gridHelper args={[10, 10]} />
          </group>
        </Float>

        <Float speed={2} floatIntensity={2}>
          <group position={[0, -7, 0]}>
            <Sphere3D />
            <axesHelper args={[5]} />
            <gridHelper args={[10, 10]} />
          </group>
        </Float>

        {/* HTML overlay if needed */}
      </Canvas>
    </div>
  );
}
