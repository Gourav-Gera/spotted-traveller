"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

export default function CityMediaGallery({ images, alt }: Props) {
  const safeImages = images?.length ? images : ["/images/rome-city-image-1.png"];
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails (vertical on md+, horizontal on small) */}
      <div className="hidden md:flex md:flex-col gap-3">
        {safeImages.map((src, i) => {
          const selected = i === active;
          return (
            <button
              key={src + i}
              aria-label={`Show image ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative w-[72px] h-[72px] rounded-[10px] overflow-hidden border transition-shadow ${
                selected ? "ring-2 ring-[#3E5F55]" : "border-gray-200 hover:shadow"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          );
        })}
      </div>

      {/* Main image */}
      <div className="relative flex-1 md:h-[360px] h-[240px] rounded-[14px] overflow-hidden border border-gray-200">
        <Image src={safeImages[active]} alt={alt} fill className="object-cover" />
      </div>
    </div>
  );
}
