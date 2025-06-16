"use client";

import { useGLTF, Html } from "@react-three/drei";
import gsap from "gsap";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";

useGLTF.preload("./models/gun.glb");

export default function GunModel({ onTriggerClick, onNozzleClick }) {
  const triggerRef = useRef();
  const nozzleRef = useRef();
  const group = useRef();
  const { nodes, scene, materials } = useGLTF("./models/gun_diff.glb");
  const triggerSound =
    typeof Audio !== "undefined" ? new Audio("./audio/gun_sound.m4a") : null;

  const [meshList, setMeshList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

  const triggerNode = nodes["Trigger1_low_Body_0"];
  const nozzleNode = nodes["Nozzle1_low_Body_0"];

  const animateTrigger = () => {
    if (triggerRef.current) {
      gsap.to(triggerRef.current.position, {
        z: triggerRef.current.position.z - 0.05,
        duration: 0.2,
        onComplete: () => {
          gsap.to(triggerRef.current.position, {
            z: triggerRef.current.position.z + 0.05,
            duration: 0.2,
          });
        },
      });
    }
  };

  const shootAnimation = () => {
    if (group.current) {
      gsap.to(group.current.position, {
        z: group.current.position.z - 1,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(group.current.position, {
            z: group.current.position.z + 1,
            duration: 0.2,
            ease: "power2.inOut",
          });
        },
      });
    }
  };

  const { modelPosition, modelRotation, modelScale, triggerZ } = useControls(
    "Gun Controls",
    {
      modelPosition: {
        value: { x: 0, y: 0, z: 0 },
        step: 0.1,
      },
      modelRotation: {
        value: { x: 0, y: 0, z: 0 },
        step: 0.1,
      },
      modelScale: {
        value: { x: 30, y: 30, z: 30 },
        step: 1,
      },
    }
  );

  return (
    <group
      ref={group}
      scale={[modelScale.x, modelScale.y, modelScale.z]}
      position={[modelPosition.x, modelPosition.y, modelPosition.z]}
      rotation={[modelRotation.x, modelRotation.y, modelRotation.z]}
    >
      {Object.values(nodes).map((node, i) => {
        if (node.isMesh) {
          if (node.name === "Trigger1_low_Body_0") {
            return <primitive object={node} ref={triggerRef} key={i} />;
          }
          if (node.name === "Nozzle1_low_Body_0") {
            return <primitive object={node} ref={nozzleRef} key={i} />;
          }
          return <primitive object={node} key={i} />;
        }
        return null;
      })}

      {triggerNode && (
        <Html
          position={triggerNode.position}
          distanceFactor={10}
          style={{ pointerEvents: "auto" }}
        >
          <button
            onClick={() => {
              animateTrigger();
              shootAnimation();
              if (triggerSound) {
                triggerSound.currentTime = 0; // reset agar bisa di-spam
                triggerSound.play();
              }
              onTriggerClick?.();
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: "bold",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 5px rgba(0,0,0,0.3)",
            }}
          >
            1
          </button>
        </Html>
      )}
      {nozzleNode && (
        <Html
          position={nozzleNode.position}
          distanceFactor={10}
          style={{ pointerEvents: "auto" }}
        >
          <button
            onClick={() => onNozzleClick?.()}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: "bold",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 5px rgba(0,0,0,0.3)",
            }}
          >
            N
          </button>
        </Html>
      )}
    </group>
  );
}
