import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import textureImg from '../assets/img/texture.png';
const Cyt = () => {
  const meshRef = useRef();
const texture = useTexture(textureImg);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Slow spin
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0.2]}>
      <cylinderGeometry args={[2, 2, 2, 64, 1, true]} />
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
};

export default Cyt;
