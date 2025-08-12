"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Canvas } from "@react-three/fiber";
import { Center, Environment } from "@react-three/drei";
import FloatingPikachu from "@/components/FloatingPikachu";

export type PikachuProps = SliceComponentProps<Content.PikachuSlice>;

const Pikachu: FC<PikachuProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative h-screen w-screen overflow-hidden bg-green-900"
    >
      <div>
        {/* Tiêu đề */}
        <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2 text-5xl font-bold text-white">
          <PrismicRichText field={slice.primary.unleash_the_power} />
        </div>
      </div>
      {/* Pikachu 3D full màn hình */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="absolute left-0 top-0 h-full w-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />

        <Center position={[0, -0.2, 0]}>
          <FloatingPikachu floatIntensity={0.3} rotationIntensity={1} />
        </Center>

        <Environment
          files="/hdr/lobby.hdr"
          environmentIntensity={0.8}
          environmentRotation={[0, 3, 0]}
        />
      </Canvas>
    </section>
  );
};

export default Pikachu;
