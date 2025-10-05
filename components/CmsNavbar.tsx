import React from "react";
import Link from "next/link";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { BackArrow } from "./Icons";

const font = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const CmsNavbar = () => {
  return (
    <div className="flex justify-between items-center py-1 px-5">
      <Link href="/">
        <BackArrow className="w-8 h-8 text-[#8b1538] hover:text-[#E8B4B8] transition-colors duration-300" />
      </Link>
      <div className="text-3xl dark:text-[#FEFCFC]">
        Chris
        <span className="text-[#E8B4B8]">Norton</span>
      </div>
    </div>
  );
};

export default CmsNavbar;
