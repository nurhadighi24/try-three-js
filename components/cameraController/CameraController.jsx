"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Vector3 } from "three";

export default function CameraController({ triggerFocus, initialCameraPos }) {
  const { camera, scene } = useThree();

  useEffect(() => {
    const triggerNode = scene.getObjectByName("Trigger1_low_Body_0");

    if (triggerFocus && triggerNode) {
      const pos = triggerNode.getWorldPosition(new Vector3());
      const camPos = pos.clone().add(new Vector3(8, 1, 10));

      gsap.to(camera.position, {
        ...camPos,
        duration: 1.5,
        onUpdate: () => camera.lookAt(pos),
      });
    }

    if (!triggerFocus) {
      const [x, y, z] = initialCameraPos;
      gsap.to(camera.position, {
        x,
        y,
        z,
        duration: 1.5,
        onUpdate: () => camera.lookAt(0, 0, 1),
      });
    }
  }, [triggerFocus, camera, scene, initialCameraPos]);

  return null;
}
