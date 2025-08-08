"use client";

import { useRef, useState } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { SodaCanProps } from "@/components/SodaCan";
import { Center, Environment, View } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WavyCircles } from "./WayvyCircle";
import { Group } from "three";
import gsap from "gsap";

// Số vòng xoay khi đổi hương vị
const SPINS_ON_CHANGE = 8;

// Danh sách các hương vị
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  { flavor: "pikachu", color: "#FADB32", name: "Pikachu Lemonade" },
  { flavor: "charizar", color: "#2760CA", name: "Charizar Mega Soda" },

  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0); // Chỉ số hương vị hiện tại
  const sodaCanRef = useRef<Group>(null); // Tham chiếu đến object 3D của lon nước

  // Hàm thay đổi hương vị (kèm theo xoay 3D + đổi màu + cập nhật text)
  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length; // Đảm bảo luôn nằm trong giới hạn mảng

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}` // Xoay trái nếu next
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`, // Xoay phải nếu prev
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner", // Đổi màu nền và hiệu ứng sóng
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0) // Ẩn text cũ
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5) // Đổi chỉ số flavor sau 0.5s
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7); // Hiện text mới
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      {/* Background chính */}
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      {/* Sóng trang trí */}
      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#210523]" />

      {/* Tiêu đề */}
      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>

      {/* Khu vực chính */}
      <div className="grid grid-cols-[auto,auto,auto] items-center gap-8">
        {/* Nút chuyển trái */}
        <button
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          className="z-20 rounded-full bg-white/10 p-3 transition hover:bg-white/20"
          aria-label="Previous flavor"
        >
          <ArrowLeft className="h-8 w-8 text-yellow-400" />
        </button>

        {/* Vùng hiển thị lon nước 3D */}
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          {/* Directional Light – chỉnh riêng cho Pikachu */}
          {["pikachu", "charizar"].includes(
            FLAVORS[currentFlavorIndex].flavor!,
          ) ? (
            <directionalLight intensity={1} position={[0, 1.5, 1]} />
          ) : (
            <directionalLight intensity={6} position={[0, 1, 1]} />
          )}
        </View>

        {/* Nút chuyển phải */}
        <button
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          className="z-20 rounded-full bg-white/10 p-3 transition hover:bg-white/20"
          aria-label="Next flavor"
        >
          <ArrowRight className="h-8 w-8 text-yellow-400" />
        </button>
      </div>

      {/* Hiển thị tên hương vị và giá */}
      <div className="text-area relative mx-auto mt-6 text-center">
        {/* Tên flavor */}
        <div className="text-wrapper text-4xl font-semibold tracking-tight">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>

        {/* Giá sản phẩm */}
        <div className="mt-3 inline-block rounded-full bg-white/90 px-6 py-2 text-xl font-bold text-[#710523] shadow-md backdrop-blur-sm">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
