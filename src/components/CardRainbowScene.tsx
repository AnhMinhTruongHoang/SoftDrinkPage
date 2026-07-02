"use client";

import { Environment, Sparkles, Stars } from "@react-three/drei";
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
        count={150}
        scale={[4.8, 2.8, 0.8]}
        position={[0, 0.35, -0.6]}
        size={6}
        speed={1.2}
        color="#ffffff"
        opacity={1}
      />

      <Stars radius={50} depth={50} count={3000} factor={4} fade />

      <group position={[0, -0.3, 0.6]} rotation={[0, 0, -0.1]}>
        <FloatingCards
          scale={0.85}
          floatSpeed={8}
          rotationIntensity={0.15}
          floatIntensity={0.25}
          floatingRange={[-0.04, 0.04]}
        />
      </group>

      <Environment files="/hdr/lobby.hdr" environmentIntensity={0.45} />
    </>
  );
}
