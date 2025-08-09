import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import CrownModel from "./CrownModel";

const CrownScene = () => {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 0] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <CrownModel url="/model/crown.obj" />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0}
            luminanceSmoothing={3}
            radius={0.6}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default CrownScene;
