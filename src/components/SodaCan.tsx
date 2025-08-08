"use client"; // Chỉ định component này chạy trên client-side

// Import hooks từ @react-three/drei để load mô hình và texture
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import thư viện Three.js để tạo vật liệu, xử lý 3D

// Tải trước mô hình lon nước để cải thiện hiệu năng
useGLTF.preload("/Soda-can.gltf");

// Định nghĩa đường dẫn tới texture (nhãn lon) tương ứng với từng hương vị
const flavorTextures = {
  lemonLime: "/labels/lemon-lime.png",
  grape: "/labels/grape.png",
  blackCherry: "/labels/cherry.png",
  strawberryLemonade: "/labels/strawberry.png",
  watermelon: "/labels/watermelon.png",
  pikachu: "/labels/Pikachu.lemonade.png",
  charizar: "/labels/Charizar.Soda.png",
};

// Tạo vật liệu kim loại dùng cho phần thân và nắp lon
const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3, // Độ nhám bề mặt
  metalness: 1, // Tính chất kim loại
  color: "#bbbbbb", // Màu xám bạc
});

// Kiểu dữ liệu props truyền vào component
export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures; // Hương vị (dùng để chọn texture)
  scale?: number; // Tỉ lệ phóng to/thu nhỏ lon
};

// Component chính render lon nước
export function SodaCan({
  flavor = "blackCherry", // Mặc định là vị cherry
  scale = 2, // Mặc định scale = 2
  ...props
}: SodaCanProps) {
  // Tải mô hình lon nước từ file GLTF
  const { nodes } = useGLTF("/Soda-can.gltf");

  // Tải toàn bộ texture nhãn lon
  const labels = useTexture(flavorTextures);

  // Sửa lỗi nhãn bị lật ngược (do flipY mặc định của texture)
  labels.strawberryLemonade.flipY = false;
  labels.blackCherry.flipY = false;
  labels.watermelon.flipY = false;
  labels.grape.flipY = false;
  labels.lemonLime.flipY = false;
  labels.pikachu.flipY = false;
  labels.charizar.flipY = false;

  // Lấy texture tương ứng với flavor được chọn
  const label = labels[flavor];

  // Trả về một group object chứa các phần của mô hình lon
  return (
    <group
      {...props}
      dispose={null}
      scale={scale}
      rotation={[0, -Math.PI, 0]} // Xoay lon 180 độ quanh trục Y
    >
      {/* Phần thân lon kim loại */}
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder as THREE.Mesh).geometry}
        material={metalMaterial}
      />
      {/* Phần dán nhãn lon, có texture theo hương vị */}
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial
          roughness={0.15}
          metalness={0.7}
          map={label} // Gán texture nhãn
        />
      </mesh>
      {/* Phần nắp lon (tab) */}
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry}
        material={metalMaterial}
      />
    </group>
  );
}
