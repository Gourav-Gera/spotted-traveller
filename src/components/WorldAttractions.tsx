"use client";
import Image from "next/image";

export default function WorldAttractions() {
  return (
    <div className="relative rounded-3xl overflow-hidden">
      <div className="text-center">
        <h2 className="text-4xl tracking-wide text-black-heading font-semibold mb-4">Top Attractions</h2>
        <p className="max-w-xl mx-auto mb-8 text-desc">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit</p>
      </div>
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
