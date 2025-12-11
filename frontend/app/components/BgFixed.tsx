"use client";

import { useEffect } from "react";

export default function BgFixed() {
  useEffect(() => {
    const setBgHeight = () => {
      const bg = document.getElementById("bg-fixed");
      if (bg) bg.style.height = `${window.innerHeight}px`;
    };
    setBgHeight();
    window.addEventListener("resize", setBgHeight);
    return () => window.removeEventListener("resize", setBgHeight);
  }, []);

  return <div id="bg-fixed"></div>;
}