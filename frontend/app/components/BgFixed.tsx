"use client";

import Image from "next/image";

export default function BgFixed() {
  return (
    <div 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
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
        loading="eager"
      />
    </div>
  );
}