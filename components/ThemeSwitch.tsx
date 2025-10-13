"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./Icons";
import Image from "next/image";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <button
      className="text-black border border-[#8b1538] rounded-2xl p-1 hover:bg-[#FEFCFC] hover:opacity-50 dark:hover:bg-opacity-30 dark:hover:bg-[#E8B4B8]"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <SunIcon height={24} width={24} />
      ) : (
        //  <Image src="./sun.svg" alt="Sun Icon" width={24} height={24} />
        <MoonIcon height={24} width={24} />
        //   <Image src="./moon.svg" alt="Moon Icon" width={24} height={24} />
      )}
    </button>
  );
};

export default ThemeSwitch;
