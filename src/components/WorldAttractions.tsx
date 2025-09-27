"use client";
import Image from "next/image";

export default function WorldAttractions() {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-[#F7F5EF]">
      <div className="relative w-full h-[420px] md:h-[420px]">
        <Image
          src="/images/map-image-new.png"
          alt="World attractions map"
          fill
        className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
