"use client";

import { useGLTF, useTexture } from "@react-three/drei";

// Tải trước model thẻ
useGLTF.preload("/Models/Cards/CardGx.gltf");

const CardTextures = {
  ZekromFront: "/labels/CardTextures/Zekrom.png",
  backFace: "/labels/CardTextures/back.png",
};

export type CardProps = {
  cardFace?: keyof typeof CardTextures;
  backFace?: keyof typeof CardTextures;
  scale?: number;
};

export function Cards({
  cardFace = "ZekromFront",
  backFace = "backFace",
  scale = 1,
  ...props
}: CardProps) {
  // Load mô hình
  const { nodes } = useGLTF("/Models/Cards/CardGx.gltf") as any;

  // Load toàn bộ textures
  const textures = useTexture(CardTextures);

  //Fix lỗi lật ngược texture
  // Object.values(textures).forEach((tex) => {
  //   tex.flipY = false;
  // });

  const frontTexture = textures[cardFace];
  const backTexture = textures[backFace];
  console.log(nodes);
  return (
    <group {...props} dispose={null} scale={scale}>
      {/* Mặt trước thẻ */}
      <mesh castShadow receiveShadow geometry={nodes.font.geometry}>
        <meshStandardMaterial map={frontTexture} />
      </mesh>

      {/* Mặt sau thẻ */}
      <mesh castShadow receiveShadow geometry={nodes.back.geometry}>
        <meshStandardMaterial map={backTexture} />
      </mesh>
    </group>
  );
}
