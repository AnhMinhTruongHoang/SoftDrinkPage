"use client";

import { useGLTF } from "@react-three/drei";

useGLTF.preload("/Models/Cards/Tagteam.glb");

export type CardProps = {
  scale?: number;
};

export function Cards({ scale = 1, ...props }: CardProps) {
  const { scene } = useGLTF("/Models/Cards/Tagteam.glb") as any;

  return (
    <group {...props} dispose={null} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}
