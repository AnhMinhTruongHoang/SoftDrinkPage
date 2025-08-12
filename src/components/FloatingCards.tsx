"use client"; // Chỉ thị cho Next.js: Component này sẽ chạy trên client-side

import { Float } from "@react-three/drei"; // Component giúp vật thể bay lơ lửng (hiệu ứng nổi, lắc lư)
import { Cards, CardProps } from "@/components/Cards"; // Component render mô hình thẻ 3D
import { forwardRef, ReactNode } from "react";
import { Group } from "three"; // Group là nhóm đối tượng 3D trong Three.js

// Kiểu props cho FloatingCards
type FloatingCardsProps = {
  cardFace?: CardProps["cardFace"]; // Mặt trước thẻ (texture key)
  scale?: number; // Tỉ lệ thu/phóng thẻ
  floatSpeed?: number; // Tốc độ bay lơ lửng
  rotationIntensity?: number; // Mức độ xoay khi lơ lửng
  floatIntensity?: number; // Mức độ lên/xuống khi lơ lửng
  floatingRange?: [number, number]; // Khoảng dao động lên/xuống
  children?: ReactNode; // Cho phép chèn thêm nội dung con
};

// forwardRef cho phép truyền ref ra ngoài để điều khiển group từ component cha
const FloatingCards = forwardRef<Group, FloatingCardsProps>(
  (
    {
      cardFace = "Front", // Mặc định dùng texture Zekrom
      scale = 0.75, // Kích thước mặc định
      floatSpeed = 4, // Tốc độ lơ lửng mặc định
      rotationIntensity = 1, // Cường độ xoay mặc định
      floatIntensity = 1, // Cường độ lắc/lơ lửng mặc định
      floatingRange = [-0.1, 0.1], // Giới hạn dao động trục Y mặc định
      children,
      ...props
    },
    ref,
  ) => {
    // Lưu ý:
    // - <group> là đối tượng nhóm trong Three.js, cho phép gom nhiều object 3D lại để move/rotate cùng nhau.
    // - <Float> là một helper của @react-three/drei để tạo hiệu ứng lơ lửng, lắc lư theo tham số truyền vào.
    // - <Cards> là component render thẻ 3D (có thể là card game, thẻ bài, ...)
    // - Nếu có truyền children thì sẽ render ra cùng với Cards.
    // - Các props floatSpeed, rotationIntensity, floatIntensity điều chỉnh mức độ chuyển động của hiệu ứng lơ lửng.

    return (
      // Nhóm đối tượng chứa thẻ và hiệu ứng bay
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
          {/* Bao thẻ trong một group để xoay */}
          <group rotation={[Math.PI / 2, 0, 0]}>
            <Cards cardFace={cardFace} scale={scale} />
          </group>
        </Float>
      </group>
    );
  },
);

// Đặt tên hiển thị cho component (giúp debug dễ hơn, ví dụ khi inspect React tree)
FloatingCards.displayName = "FloatingCards";

export default FloatingCards;
