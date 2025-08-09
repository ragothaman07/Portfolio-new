import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

const CrownModel = ({ url = "/model/crown.obj" }) => {
  const obj = useLoader(OBJLoader, url);
  const ref = useRef();

  // Apply gold material if missing
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });
    }
  });

  // Rotate continuously
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return <primitive object={obj} ref={ref} scale={1} />;
};

export default CrownModel;
