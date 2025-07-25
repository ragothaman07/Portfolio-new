import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Cyt from "./Cyt";

const Scene = () => {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 5] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <Suspense fallback={null}>
        <Cyt />
        <EffectComposer>
          <Bloom
            intensity={1.5}        // glow intensity
            luminanceThreshold={0} // all bright parts glow
            luminanceSmoothing={0.9}
            radius={0.6}           // glow radius
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
