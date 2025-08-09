import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Model() {
  const group = useRef();
  const { scene, animations } = useGLTF('/model/model.glb');
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    // Material lighting settings
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.depthWrite = true;
        child.material.depthTest = true;
        child.material.transparent = false;
        child.material.emissiveIntensity = 0;
        child.material.lightMapIntensity = 1;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    const action = actions['Armature|mixamo.com|Layer0'];

    if (action) {
      // Play animation once with fade-in
      action
        .reset()
        .setLoop(THREE.LoopOnce, 1)
        .clampWhenFinished = true;
      action.fadeIn(0.3).play();

      // On finish, fade out smoothly
      const onFinished = () => {
        action.fadeOut(0.3); // Smooth fade-out
        // Stop after fade
        setTimeout(() => {
          action.stop();
        }, 300); // Wait for fadeOut to finish (300ms)
        mixer.removeEventListener('finished', onFinished);
      };

      mixer.addEventListener('finished', onFinished);
    }
  }, [actions, mixer]);

  return <primitive ref={group} object={scene} scale={70} position={[0, -0.7, 3]} />;
}


export default function ModelViewer() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50, near: 0.01, far: 1000 }}>
    
    
      <directionalLight position={[2, 1, 5]} intensity={10} />
      <Model />
    </Canvas>
    );
}