import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSpliter";

export type HeroProps = SliceComponentProps<Content.FizziSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero"
    >
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="gird auto-rows-min place-items-center text-center">
            <h1 className="hero-header mt-20 whitespace-pre-line text-5xl font-black uppercase leading-[0.8] text-orange-500 sm:text-6xl md:text-[8rem] lg:text-[13rem]">
              {"Soft\nDr/nks/X".split("\n").map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div className="hero subheading mt-12 text-5xl font-semibold text-sky-600 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>

            <div className="hero-subheading mt-12 text-5xl font-semibold text-green-600 lg:text-6xl">
              <PrismicRichText field={slice.primary.body} />
            </div>
          </div>
          <Button
            buttonLink={slice.primary.button_link}
            buttonText={slice.primary.button_text}
            className="hero-button mb-12"
          />
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
          />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <TextSplitter text={asText(slice.primary.second_heading)} />
            </h2>

            <div className="text-side-body max--w-xl text-x1 mt-4 text-balance font-normal text-sky-700">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
