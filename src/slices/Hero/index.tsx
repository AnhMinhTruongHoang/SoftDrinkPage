"use client";

/*

  - Đây là component Hero dùng cho một slice (phần) giao diện trong Next.js, sử dụng Prismic CMS để lấy dữ liệu.
  - Component này sử dụng nhiều thư viện như gsap (animation), drei (three.js), và các hook tùy chỉnh.
  - Khi trang tải, nếu đã sẵn sàng và là desktop, các hiệu ứng hoạt hình sẽ chạy:
    + introTl: hiệu ứng lần lượt cho header, subheading, body, và nút bấm (xuất hiện, phóng to/thu nhỏ, chuyển động).
    + scrollTl: hiệu ứng khi cuộn trang, đổi màu nền và animate các chữ cái, body bên cạnh hình ảnh.
  - Layout chia thành hai phần:
    + Phần trên là hiệu ứng 3D và các bong bóng (chỉ hiện trên desktop).
    + Phần dưới là nội dung tiêu đề, mô tả, nút, hình ảnh và heading phụ.
  - Sử dụng các component như Bounded để bọc nội dung, Button để tạo nút bấm, PrismicRichText để render dữ liệu từ Prismic.
  - TextSplitter dùng để tách từng chữ của heading phụ để hiệu ứng animate từng chữ cái.
*/

import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { TextSplitter } from "@/components/TextSpliter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props cho component `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.FizziSlice>;

/**
 * Component cho Slice "Hero".
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const scrollToLastSlice = () => {
    // Lấy tất cả các phần tử slice
    const slices = document.querySelectorAll("[data-slice-type]");
    if (slices.length > 0) {
      const lastSlice = slices[slices.length - 1] as HTMLElement;
      lastSlice.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      // Hiệu ứng xuất hiện khi tải
      const introTl = gsap.timeline();

      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 1,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.6,
        });

      // Hiệu ứng khi cuộn trang
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo(
          "body",
          {
            backgroundColor: "#FDE047",
          },
          {
            backgroundColor: "#D9F99D",
            overwrite: "auto",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero hidden; opacity-0"
    >
      {isDesktop && (
        <View className="hero-scene hidden; pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={300} speed={2} repeat={true} />
        </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header hidden; mt-20 whitespace-pre-line text-5xl font-black uppercase leading-[0.8] text-orange-500 sm:text-6xl md:text-[8rem] lg:text-[13rem]">
              {/* Tách từng dòng của tiêu đề chính ra thành các span */}
              {"Soft\nDr/nks/X".split("\n").map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button mt-12"
              onClick={(e) => {
                e.preventDefault();
                scrollToLastSlice();
              }}
            />
          </div>
        </div>

        <div className="text-side hidden; relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
          />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              {/* Dùng TextSplitter để tách chữ cho hiệu ứng */}
              <TextSplitter text={asText(slice.primary.second_heading)} />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
