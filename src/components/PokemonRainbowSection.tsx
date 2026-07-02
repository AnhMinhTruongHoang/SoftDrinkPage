"use client";

import { View } from "@react-three/drei";
import CardRainbowScene from "@/components/CardRainbowScene";

export default function PokemonRainbowSection() {
  return (
    <section className="pokemon-rainbow relative h-[115vh] w-screen overflow-hidden bg-[#FFE45C]">
      <View className="pointer-events-none absolute inset-0 h-full w-full">
        <CardRainbowScene />
      </View>

      <div className="pointer-events-none absolute bottom-24 left-1/2 z-40 w-full max-w-5xl -translate-x-1/2 px-6 text-center text-sky-950">
        <h2 className="text-5xl font-black leading-tight md:text-7xl">
          Naturally Refreshing
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-xl font-bold leading-relaxed md:text-2xl">
          Made with only the best natural ingredients.
        </p>
      </div>
    </section>
  );
}
