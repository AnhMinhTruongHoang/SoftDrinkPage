import { useRef } from "react";
import { useFrame, extend, ReactThreeFiber } from "@react-three/fiber";
import { LightningStrike, RayParameters } from "three-stdlib";
import * as THREE from "three";

// Khai báo type cho LightningStrikeGeometry
declare module "@react-three/fiber" {
  interface ThreeElements {
    lightningStrikeGeometry: ReactThreeFiber.Node<
      LightningStrike,
      typeof LightningStrike
    >;
  }
}

extend({ LightningStrikeGeometry: LightningStrike });

export default function LightningRay({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const ref = useRef<LightningStrike>(null!);

  const rayParams: RayParameters = {
    sourceOffset: new THREE.Vector3(...start),
    destOffset: new THREE.Vector3(...end),
    radius0: 0.2,
    radius1: 0.05,
    minRadius: 0.02,
    maxIterations: 7,
    timeScale: 0.7,
    propagationTimeFactor: 0.15,
    vanishingTimeFactor: 0.85,
    subrayPeriod: 4,
    subrayDutyCycle: 0.6,
    maxSubrayRecursion: 3,
    ramification: 3,
    recursionProbability: 0.6,
    isEternal: true,
  };

  useFrame(({ clock }) => {
    ref.current.update(clock.getElapsedTime());
  });

  return (
    <mesh>
      <lightningStrikeGeometry args={[rayParams]} ref={ref} />
      <meshBasicMaterial color="#ffeb3b" toneMapped={false} />
    </mesh>
  );
}
