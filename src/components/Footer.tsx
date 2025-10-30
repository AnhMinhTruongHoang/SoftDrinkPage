import React from "react";
import { FizziLogo } from "./FizziLogo";
import CircleText from "./CircleText";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="relative flex h-[100px] items-center justify-center bg-[#FEE832] text-[#FE6334]">
      <div className="relative flex w-full max-w-4xl justify-center">
        <FizziLogo className="scale-90 md:scale-100" />
        <div className="absolute right-12 top-0 size-16 -translate-y-8 md:size-24 md:-translate-y-12">
          <CircleText />
        </div>
      </div>
    </footer>
  );
}
