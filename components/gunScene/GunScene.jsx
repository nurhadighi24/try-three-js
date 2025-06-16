"use client";

import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import GunModel from "../gunModel/GunModel";
import {
  ContactShadows,
  Environment,
  GizmoHelper,
  GizmoViewcube,
  OrbitControls,
  Stats,
} from "@react-three/drei";
import { CameraController } from "../cameraController";
import { Leva } from "leva";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function GunScene() {
  const controlsRef = useRef();
  const [triggerFocus, setTriggerFocus] = useState(false);
  const [nozzleFocus, setNozzleFocus] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const focusParam = searchParams.get("focus");
  const [cameraReady, setCameraReady] = useState(false);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);

  useEffect(() => {
    setCameraReady(true);
  }, [triggerFocus, nozzleFocus]);

  const [showInfo, setShowInfo] = useState(false);
  const [initialCameraPos] = useState([20, 10, 25]);

  const handleFocusTrigger = () => {
    const next = !triggerFocus;
    setTriggerFocus(next);
    setNozzleFocus(false);
    setShowInfo(next);
  };

  const handleFocusNozzle = () => {
    const next = !nozzleFocus;
    setNozzleFocus(next);
    setTriggerFocus(false);
    setShowInfo(next);
  };

  useEffect(() => {
    if (focusParam === "trigger") {
      setTriggerFocus(true);
      setNozzleFocus(false);
      setShowInfo(true);
    } else if (focusParam === "nozzle") {
      setNozzleFocus(true);
      setTriggerFocus(false);
      setShowInfo(true);
    } else {
      setTriggerFocus(false);
      setNozzleFocus(false);
      setShowInfo(false);
    }
  }, [focusParam]);

  useEffect(() => {
    if (triggerFocus) {
      router.replace("?focus=trigger");
    } else if (nozzleFocus) {
      router.replace("?focus=nozzle");
    } else {
      router.replace("/");
    }
  }, [triggerFocus, nozzleFocus]);

  useEffect(() => {
    if (triggerFocus || nozzleFocus) {
      setAutoRotateEnabled(false);
    } else {
      setAutoRotateEnabled(true);
    }
  }, [triggerFocus, nozzleFocus]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "visible",
        zIndex: 999,
      }}
    >
      <Leva collapsed={false} />
      {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}></GizmoHelper> */}
      <Canvas
        shadows
        camera={{ position: initialCameraPos, fov: 30 }}
        style={{ height: "100vh", width: "100%" }}
      >
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enableDamping
          autoRotate={autoRotateEnabled}
          autoRotateSpeed={0.7}
          target={[0, 0, 1]}
        />
        {cameraReady && (
          <CameraController
            key={`${triggerFocus}-${nozzleFocus}`}
            triggerFocus={triggerFocus}
            nozzleFocus={nozzleFocus}
            initialCameraPos={initialCameraPos}
          />
        )}

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

          <GunModel
            onTriggerClick={handleFocusTrigger}
            onNozzleClick={handleFocusNozzle}
          />
          {/* <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={5}
        /> */}
          {/* <axesHelper args={[30]} /> */}
          {/* <gridHelper args={[30, 30]} /> */}
        </Suspense>
        <Stats />
      </Canvas>
      <button
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

          zIndex: 10,
        }}
      >
        i
      </button>
      {showInfo && (triggerFocus || nozzleFocus) && (
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
          <h3>{triggerFocus ? "Trigger Information" : "Nozzle Information"}</h3>
          <p>
            {triggerFocus
              ? "This is the trigger of the gun."
              : "This is the nozzle. It's used to direct the projectile or gas output."}
          </p>
        </div>
      )}
    </div>
  );
}
