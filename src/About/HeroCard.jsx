// src/About/HeroCard.jsx
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useThree } from '@react-three/fiber';

const HeroCard = () => {
  const model = useLoader(FBXLoader, '/assets/img/rago2.fbx'); // Path relative to /public
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      ref={ref}
      object={model}
      scale={0.015}
      position={[0, -1.5, 0]}
    />
  );
};

export default HeroCard;
