"use client";

import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import GunModel from "../gunModel/GunModel";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Stats,
} from "@react-three/drei";
import { CameraController } from "../cameraController";

export default function GunScene() {
  const controlsRef = useRef();
  const [triggerFocus, setTriggerFocus] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [initialCameraPos] = useState([20, 10, 25]);

  const handleFocusTrigger = () => {
    setTriggerFocus((prev) => {
      const next = !prev;
      setShowInfo(next);
      if (controlsRef.current) {
        controlsRef.current.autoRotate = !next;
      }

      return next;
    });
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: initialCameraPos, fov: 30 }}
        style={{ height: "100vh", width: "100%" }}
      >
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enableDamping
          autoRotate
          target={[0, 0, 1]}
        />
        <CameraController
          triggerFocus={triggerFocus}
          initialCameraPos={initialCameraPos}
        />
        <spotLight position={[10, 10, 10]} intensity={1} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <ambientLight intensity={0.3} />
        <color attach="forest" args={["#101010"]} />
        {/* 🌟 Lighting */}
        <Suspense fallback={null}>
          <Environment preset="warehouse" background backgroundBlurriness={0} />

          <GunModel onTriggerClick={handleFocusTrigger} />
          {/* <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={5}
        /> */}
          {/* <axesHelper args={[30]} />
        <gridHelper args={[30, 30]} /> */}
        </Suspense>
        <Stats />
      </Canvas>
      <button
        onClick={handleFocusTrigger}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: "bold",
          fontSize: "1rem",
          border: "none",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        1
      </button>
      {showInfo && (
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 20,
            padding: "10px",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "#fff",
            borderRadius: "8px",
            maxWidth: "200px",
            zIndex: 10,
          }}
        >
          <h3>Trigger Information</h3>
          <p>This is the trigger of the gun.</p>
        </div>
      )}
    </div>
  );
}
