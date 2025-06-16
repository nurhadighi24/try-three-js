"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Vector3 } from "three";

export default function CameraController({
  triggerFocus,
  nozzleFocus,
  initialCameraPos,
}) {
  const { camera, scene } = useThree();
  const animationStarted = useRef(false);

  useEffect(() => {
    animationStarted.current = false;

    const checkAndAnimate = () => {
      const triggerNode = scene.getObjectByName("Trigger1_low_Body_0");
      const nozzleNode = scene.getObjectByName("Nozzle1_low_Body_0");

      if (animationStarted.current) return;

      if (triggerFocus && triggerNode) {
        animationStarted.current = true;
        const pos = triggerNode.getWorldPosition(new Vector3());
        const camPos = pos.clone().add(new Vector3(8, 1, 10));
        gsap.to(camera.position, {
          ...camPos,
          duration: 1.5,
          onUpdate: () => camera.lookAt(pos),
        });
        return;
      }

      if (nozzleFocus && nozzleNode) {
        animationStarted.current = true;
        const pos = nozzleNode.getWorldPosition(new Vector3());
        const camPos = pos.clone().add(new Vector3(8, 2, 10));
        gsap.to(camera.position, {
          ...camPos,
          duration: 1.5,
          onUpdate: () => camera.lookAt(pos),
        });
        return;
      }

      if (!triggerFocus && !nozzleFocus) {
        animationStarted.current = true;
        const [x, y, z] = initialCameraPos;
        gsap.to(camera.position, {
          x,
          y,
          z,
          duration: 1.5,
          onUpdate: () => camera.lookAt(0, 0, 1),
        });
        return;
      }

      // 🔁 Retry next frame if node belum ready
      requestAnimationFrame(checkAndAnimate);
    };

    requestAnimationFrame(checkAndAnimate);

    // Bersih-bersih
    return () => {
      animationStarted.current = false;
    };
  }, [triggerFocus, nozzleFocus, camera, scene, initialCameraPos]);

  return null;
}
