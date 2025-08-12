"use client";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Models/Cards/ZekRomGX.glb");

const CardTextures = {
  Front: "/labels/cardTextures/Zekrom.png",
};

export type CardProps = {
  cardFace?: keyof typeof CardTextures;
  scale?: number;
};

export function Cards({ cardFace = "Front", scale = 1, ...props }: CardProps) {
  const { nodes } = useGLTF("/Models/Cards/ZekRomGX.glb") as any;
  const textures = useTexture(CardTextures);

  // FIX LẬT NGƯỢC TEXTURE
  Object.values(textures).forEach((tex) => {
    tex.flipY = false;
    tex.colorSpace = THREE.SRGBColorSpace;
  });

  const frontTexture = textures[cardFace];

  return (
    <group {...props} dispose={null} scale={scale}>
      <mesh castShadow receiveShadow geometry={nodes.font.geometry}>
        <meshStandardMaterial map={frontTexture} side={THREE.FrontSide} />
      </mesh>
    </group>
  );
}
