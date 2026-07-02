"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";

export default function HomePokemonScene() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#FFE45C]">
      <Canvas
        className="absolute inset-0 h-full w-full"
        camera={{
          position: [0, 0, 5],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </main>
  );
}
