"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";

import { Sphere } from "@react-three/drei";
import { Electron } from "../electron";

export default function Atom(props) {
  const atomRef = useRef();
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(
        100
      ),
    []
  );
  return (
    <group ref={atomRef} {...props}>
      <Electron rotation={[0, 0, 0]} speed={6} parentRef={atomRef} />
      <Electron
        rotation={[0, 0, Math.PI / 3]}
        speed={6.5}
        parentRef={atomRef}
      />
      <Electron rotation={[0, 0, -Math.PI / 3]} speed={7} parentRef={atomRef} />
      <Sphere args={[0.35, 64, 64]}>
        <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
      </Sphere>
    </group>
  );
}
