"use client";

import { Canvas } from "@react-three/fiber";
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
export default function ScrollableScene() {
  return (
    <div id="canvas-container">
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
        <Stars count={200} speed={10} />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>

        <ScrollControls pages={3} damping={0.25}>
          {/* Scrollable 3D elements */}
          <Scroll>
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
              <group position={[5, -17, 0]}>
                <Sphere3D />
                <axesHelper args={[5]} />
                <gridHelper args={[10, 10]} />
              </group>
            </Float>
          </Scroll>

          {/* HTML overlay if needed */}
          <Scroll html>
            <div
              style={{
                position: "absolute",
                top: `100vh`,
                width: "100%",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <h1 style={{ letterSpacing: "2px", fontWeight: 600, margin: 0 }}>
                Cube Section
              </h1>
            </div>
            <div
              style={{
                position: "absolute",
                top: `200vh`,
                width: "100%",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <h1 style={{ letterSpacing: "2px", fontWeight: 600, margin: 0 }}>
                Sphere Section
              </h1>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
