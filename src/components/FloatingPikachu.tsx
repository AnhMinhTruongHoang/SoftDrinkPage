"use client";

import { Float } from "@react-three/drei";
import { forwardRef, ReactNode } from "react";
import { Group } from "three";
import PikachuModel from "./PikaChu";

type FloatingPikachuProps = {
  scale?: number;
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
} & JSX.IntrinsicElements["group"];

const FloatingPikachu = forwardRef<Group, FloatingPikachuProps>(
  (
    {
      scale = 2,
      floatSpeed = 1,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
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
          <group>
            <PikachuModel scale={scale} />
          </group>
        </Float>
      </group>
    );
  },
);

FloatingPikachu.displayName = "FloatingPikachu";
///
export default FloatingPikachu;
