"use client";

import { Environment, Sparkles } from "@react-three/drei";
import { useMemo } from "react";
import { CatmullRomCurve3, DoubleSide, Vector3 } from "three";
import FloatingCards from "@/components/FloatingCards";

function RainbowArc() {
  const colors = [
    "#ff5a5f",
    "#ffb703",
    "#fff176",
    "#69db7c",
    "#22b8cf",
    "#5c7cfa",
    "#9775fa",
  ];

  const arcs = useMemo(() => {
    return colors.map((color, index) => {
      const radius = 2.15 - index * 0.16;
      const points: Vector3[] = [];

      for (let i = 0; i <= 90; i++) {
        const angle = (i / 90) * Math.PI;

        points.push(
          new Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0),
        );
      }

      return {
        color,
        curve: new CatmullRomCurve3(points),
      };
    });
  }, []);

  return (
    <group position={[0, -1.05, -1.4]} scale={[1.25, 1.05, 1]}>
      {arcs.map((arc, index) => (
        <mesh key={index}>
          <tubeGeometry args={[arc.curve, 120, 0.035, 18, false]} />
          <meshBasicMaterial
            color={arc.color}
            transparent
            opacity={0.92}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function PokemonSlots() {
  return (
    <group>
      {/*
        Sau này add 3 model Pokémon ở đây.

        Ví dụ:
        <PokemonModel position={[-0.9, 0.45, 0]} scale={0.35} />
        <PokemonModel position={[0.9, 0.45, 0]} scale={0.35} />
        <PokemonModel position={[0, 0.1, 0.15]} scale={0.4} />
      */}
    </group>
  );
}

export default function CardRainbowScene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 5]} intensity={0.9} />
      <pointLight position={[0, 1.8, 2]} intensity={0.3} />

      <RainbowArc />

      <PokemonSlots />

      <Sparkles
        count={70}
        scale={[3.8, 2.5, 1]}
        position={[0, 0.2, -0.5]}
        size={3}
        speed={0.25}
      />

      <group position={[0, -0.3, 0.6]} rotation={[0, 0, -0.1]}>
        <FloatingCards
          scale={0.85}
          floatSpeed={2}
          rotationIntensity={0.15}
          floatIntensity={0.25}
          floatingRange={[-0.04, 0.04]}
        />
      </group>

      <Environment files="/hdr/lobby.hdr" environmentIntensity={0.45} />
    </>
  );
}
