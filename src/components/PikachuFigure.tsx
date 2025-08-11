"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/Figures/PikachuFigure.glb");
  return <primitive object={scene} />;
}

export default function PikachuFigure() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

// Giúp Next.js preload model (optional)
useGLTF.preload("/models/scene.glb");
