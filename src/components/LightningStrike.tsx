import { Canvas, extend, ReactThreeFiber, useFrame } from "@react-three/fiber";
import { LightningStrike, RayParameters } from "three-stdlib";
import { useRef } from "react";
import { Center, Environment } from "@react-three/drei";
import FloatingPikachu from "@/components/FloatingPikachu";
import * as THREE from "three";

// Đăng ký LightningStrikeGeometry
declare module "@react-three/fiber" {
  interface ThreeElements {
    lightningStrikeGeometry: ReactThreeFiber.Node<
      LightningStrike,
      typeof LightningStrike
    >;
  }
}
extend({ LightningStrikeGeometry: LightningStrike });

const LightningRay = ({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) => {
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
      <meshBasicMaterial color="#70e0ff" toneMapped={false} />
    </mesh>
  );
};

export default function PikachuWithLightning() {
  return (
    <section
      className="relative h-screen w-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Pikachubg.jpg')" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="absolute left-0 top-0 h-full w-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Center position={[0, -0.2, 0]}>
          <FloatingPikachu floatIntensity={5} rotationIntensity={5} />
        </Center>
        {/* 3 tia sét */}
        <LightningRay start={[0, 3, 0]} end={[0, 0, 0]} /> {/* Tia giữa */}
        <LightningRay start={[-1.5, 3, 0.5]} end={[-0.5, 0, 0]} />{" "}
        {/* Tia trái */}
        <LightningRay start={[1.5, 3, -0.5]} end={[0.5, 0, 0]} />{" "}
        {/* Tia phải */}
        <Environment files="/hdr/lobby.hdr" />
      </Canvas>
    </section>
  );
}
