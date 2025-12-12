"use client";

import Image from "next/image";

export default function BgFixed() {
  return (
    <div className="bg-fixed-wrapper fixed inset-0 -z-10 pointer-events-none">
      <Image
        src="/bg.png"
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center top",
          opacity: 0.5,
        }}
      />
    </div>
  );
}