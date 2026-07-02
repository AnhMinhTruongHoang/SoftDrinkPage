import { Fragment } from "react";
import { type Metadata } from "next";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import PokemonRainbowSection from "@/components/PokemonRainbowSection";

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return (
    <>
      {home.data.slices.map((slice, index) => (
        <Fragment key={`${slice.slice_type}-${index}`}>
          <SliceZone slices={[slice]} components={components} />

          {slice.slice_type === "sky_dive" && <PokemonRainbowSection />}
        </Fragment>
      ))}
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}
