import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";

export type HeroProps = SliceComponentProps<Content.FizziSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="gird auto-rows-min place-items-center text-center">
            <h1 className="hero-header whitespace-pre-line text-5xl font-black uppercase leading-[0.8] text-orange-500 sm:text-6xl md:text-[8rem] lg:text-[13rem]">
              {"Soft\nDr/nks/X"}
            </h1>

            <PrismicRichText field={slice.primary.subheading} />
            <PrismicRichText field={slice.primary.body} />
            <PrismicNextLink field={slice.primary.button_link}>
              {slice.primary.button_text}
            </PrismicNextLink>
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage field={slice.primary.cans_image} />
          <PrismicRichText field={slice.primary.second_heading} />
          <PrismicRichText field={slice.primary.second_body} />
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
