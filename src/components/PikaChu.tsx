"use client";
import { useGLTF } from "@react-three/drei";

type PikachuModelProps = JSX.IntrinsicElements["group"] & {
  scale?: number;
};

export default function PikachuModel({
  scale = 1,
  ...props
}: PikachuModelProps) {
  const { scene } = useGLTF("/Models/Figures/PikachuFigure.glb");

  return <primitive object={scene} scale={scale} {...props} />;
}

useGLTF.preload("/Models/Figures/PikachuFigure.glb");
