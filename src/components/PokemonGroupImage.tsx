"use client";

import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type PokemonGroupImageProps = {
  position?: [number, number, number];
  scale?: [number, number, number];
};

export default function PokemonGroupImage({
  position = [0, 0.7, 0.2],
  scale = [1.6, 2.05, 1],
}: PokemonGroupImageProps) {
  const texture = useTexture("/images/cardTextures/3tag.png");

  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1.28]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.05}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
