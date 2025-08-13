import React from "react";
import { FizziLogo } from "./FizziLogo";
import CircleText from "./CircleText";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-[#FEE832] text-[#FE6334]">
      <div className="relative mx-auto flex w-full w-screen max-w-4xl justify-center px-0 py-0">
        <FizziLogo />
        <div className="absolute right-24 top-0 size-2 origin-center -translate-y-10 md:size-36 md:-translate-y-20">
          <CircleText />
        </div>
      </div>
    </footer>
  );
}
