"use client";

import { Float } from "@react-three/drei";
import { Cards } from "@/components/Cards";
import { forwardRef, ReactNode } from "react";
import { Group } from "three";

type FloatingCardsProps = {
  scale?: number;
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingCards = forwardRef<Group, FloatingCardsProps>(
  (
    {
      scale = 0.75,
      floatSpeed = 2,
      rotationIntensity = 0.15,
      floatIntensity = 0.25,
      floatingRange = [-0.04, 0.04],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}

          {/* Xoay card đứng đúng hướng camera */}
          <group rotation={[0, 0, 0]}>
            <Cards scale={scale} />
          </group>
        </Float>
      </group>
    );
  },
);

FloatingCards.displayName = "FloatingCards";

export default FloatingCards;
