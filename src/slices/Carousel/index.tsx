"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { SodaCanProps } from "@/components/SodaCan";
import { Bounded } from "@/components/Bounded";
import { Center, Environment, View } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";

// Danh sách các hương vị soda, dùng để xoay vòng hiển thị lon nước
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

// Props lấy từ Prismic cho slice "carousel"
export type CarauselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component dùng để hiển thị slice dạng carousel lon nước.
 */
const Carousel = ({ slice }: CarauselProps): JSX.Element => {
  // State để theo dõi hương vị hiện tại (index trong FLAVORS)
  const [currentFlavourIndex, setCurrentFlavourIndex] = useState(0);

  // Hàm thay đổi hương vị (xoay vòng)
  function changeFlavour(index: number) {
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;
    setCurrentFlavourIndex(nextIndex);
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      {/* Background màu nền lon nước (opacity thấp để làm mờ) */}
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      {/* Tiêu đề từ Prismic */}
      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>

      {/* Khu vực hiển thị lon nước và nút điều hướng */}
      <div className="gird grid-cols-[auto,auto,auto] items-center">
        {/* Nút chuyển hương vị sang bên trái (next) */}
        <button
          onClick={() => changeFlavour(currentFlavourIndex + 1)}
          className="z-20"
        >
          left
        </button>

        {/* View 3D cho lon nước */}
        <View className="aspect-square h-[70vmin] min-h-40">
          {/* Center giúp canh giữa lon nước trong không gian */}
          <Center position={[0, 0, 1.5]}>
            {/* Component hiển thị lon nước với animation trôi + xoay */}
            <FloatingCan
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavourIndex].flavor}
            />
          </Center>

          {/* HDRI dùng để tạo ánh sáng môi trường cho realistic 3D */}
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />

          {/* Đèn chiếu sáng trực tiếp trong cảnh */}
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
      </div>

      {/* Mô tả hoặc giá sản phẩm từ Prismic */}
      <PrismicRichText field={slice.primary.price_copy} />
    </Bounded>
  );
};

export default Carousel;
