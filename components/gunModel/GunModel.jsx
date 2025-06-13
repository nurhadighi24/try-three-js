"use client";

import { useGLTF, Html } from "@react-three/drei";
import React, { useRef, useState } from "react";

useGLTF.preload("./models/gun.glb");

export default function GunModel({ onTriggerClick }) {
  const group = useRef();
  const { nodes, scene } = useGLTF("./models/gun.glb");
  const triggerNode = nodes["Trigger1_low_body_0"];

  const [meshList, setMeshList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

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

  return (
    <group ref={group} scale={[30, 30, 30]}>
      <primitive object={scene} />
      {triggerNode && (
        <Html
          position={triggerNode.position}
          distanceFactor={10}
          style={{ pointerEvents: "auto" }}
        >
          <button
            onClick={onTriggerClick}
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
