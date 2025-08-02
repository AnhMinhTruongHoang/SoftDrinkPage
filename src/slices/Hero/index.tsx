import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";

export type FizziProps = SliceComponentProps<Content.FizziSlice>;

const Fizzi: FC<FizziProps> = ({ slice }) => {
  const headingText = asText(slice.primary.heading);
  const [firstWord, ...rest] = headingText.split(" ");
  const restText = rest.join(" ");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid">
        {/* Hero Section */}
        <div className="grid place-items-center py-32">
          <div className="grid auto-rows-min place-items-center text-center">
            {/* Heading with background on first word */}
            <h1 className="hero-header my-24 text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
              <span className="rounded-md-100 px-4 py-1">{firstWord}</span>
              <span>{restText}</span>
            </h1>

            {/* Subheading */}
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>

            {/* Body */}
            <div className="hero-body mt-6 text-2xl font-normal text-sky-950">
              <PrismicRichText
                field={slice.primary.body}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mb-6 text-gray-600">{children}</p>
                  ),
                }}
              />
            </div>

            {/* Button */}
            {slice.primary.button_text && (
              <div className="hero-button mt-12">
                <PrismicNextLink
                  field={slice.primary.button_link}
                  className="inline-block rounded bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600"
                >
                  {slice.primary.button_text}
                </PrismicNextLink>
              </div>
            )}
          </div>
        </div>

        {/* Image + Secondary Content Section */}
        <div className="text-side relative z-[80] grid h-screen items-center gap-4 px-6 py-16 md:grid-cols-2">
          <PrismicNextImage field={slice.primary.cans_image} />
          <div>
            <PrismicRichText field={slice.primary.second_heading} />
            <PrismicRichText field={slice.primary.second_headin} />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Fizzi;
