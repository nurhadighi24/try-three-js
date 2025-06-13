"use client";

import { useGLTF, Html } from "@react-three/drei";
import gsap from "gsap";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";

useGLTF.preload("./models/gun.glb");

export default function GunModel({ onTriggerClick }) {
  const triggerRef = useRef();
  const group = useRef();
  const { nodes, scene, materials } = useGLTF("./models/gun_diff.glb");

  const [meshList, setMeshList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

  const triggerNode = nodes["Trigger1_low_Body_0"];

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

  useEffect(() => {
    const meshes = [];
    const materials = new Set();

    scene.traverse((child) => {
      if (child.isMesh) {
        meshes.push(child.name);
        if (child.material) {
          materials.add(child.material.name || "Unnamed");
        }
      }
    });

    setMeshList(meshes);
    setMaterialList(Array.from(materials));
  }, [scene]);

  useControls("Meshes", () =>
    Object.fromEntries(
      meshList.map((name) => [
        name,
        {
          value: false,
          onChange: (v) => {
            const mesh = nodes[name];
            if (mesh && mesh.material) {
              mesh.material.wireframe = v;
            }
          },
        },
      ])
    )
  );

  useControls("Materials", () => {
    const entries = materialList.map((name, i) => [
      name,
      { value: false, editable: false },
    ]);
    return Object.fromEntries(entries);
  });

  return (
    <group ref={group} scale={[30, 30, 30]}>
      {Object.values(nodes).map((node, i) => {
        if (node.isMesh) {
          if (node.name === "Trigger1_low_Body_0") {
            return <primitive object={node} ref={triggerRef} key={i} />;
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
    </group>
  );
}
