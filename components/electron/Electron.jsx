import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";

export default function Electron({
  radiusX = 2.75,
  radiusY = 1.15,
  speed = 6,
  rotation = [0, 0, 0],
  ...props
}) {
  const ref = useRef();
  // Buat rotasi sebagai Matrix
  const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(
    new THREE.Euler(...rotation)
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const x = Math.cos(t) * radiusX;
    const y = Math.sin(t) * radiusY;

    // Buat posisi lokal lalu rotasi manual
    const position = new THREE.Vector3(x, y, 0).applyMatrix4(rotationMatrix);
    ref.current.position.copy(position);
  });
  return (
    <group {...props}>
      <Trail
        local
        width={5}
        length={10}
        color={new THREE.Color(2, 1, 10)}
        attenuation={(t) => t * t}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}
