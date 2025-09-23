"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar?: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "William",
    location: "Italy",
    avatar: "/images/user-thumb-table.svg",
    text: "Etiam egestas magna purus, quis vehicula enim euismod in. Duis vestibulum purus ac arcu elementum, id vestibulum nisi pulvinar. Nullam venenatis iaculis sapien, volutpat dapibus est tristique eget.",
  },
  {
    id: 2,
    name: "Maria",
    location: "Italy",
    avatar: "/images/user-thumb-table.svg",
    text: "Etiam egestas magna purus, quis vehicula enim euismod in. Duis vestibulum purus ac arcu elementum, id vestibulum nisi pulvinar.",
  },
  {
    id: 3,
    name: "Luca",
    location: "Italy",
    avatar: "/images/user-thumb-table.svg",
    text: "Nullam venenatis iaculis sapien, volutpat dapibus est tristique eget. Duis vestibulum purus ac arcu elementum.",
  },
  {
    id: 4,
    name: "Giulia",
    location: "Italy",
    avatar: "/images/user-thumb-table.svg",
    text: "Vestibulum purus ac arcu elementum, id vestibulum nisi pulvinar. Etiam egestas magna purus, quis vehicula enim.",
  },
  {
    id: 5,
    name: "Marco",
    location: "Italy",
    avatar: "/images/user-thumb-table.svg",
    text: "Duis vestibulum purus ac arcu elementum, id vestibulum nisi pulvinar. Nullam venenatis iaculis sapien.",
  }
];

// Number of cards visible per breakpoint
function getVisible(width: number) {
  if (width >= 1200) return 3;
  if (width >= 900) return 3;
  if (width >= 640) return 2;
  return 1;
}

const TestimonialsSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const visible = getVisible(width);
  const maxIndex = Math.max(0, testimonials.length - visible);

  const next = useCallback(() => setIndex(i => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex(i => (i <= 0 ? maxIndex : i - 1)), [maxIndex]);

  return (
    <section className="w-full px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-[22px] font-semibold text-[#222] mb-12">What Our Customer's Says About Us</h2>
  <div className="relative pb-16">
          {/* Slider viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${(index * 100) / visible}%)`, width: `${(testimonials.length * 100) / visible}%` }}
            >
              {testimonials.map(t => (
                <div
                  key={t.id}
                  className="px-3 flex-shrink-0"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div className="bg-white rounded-xl p-8 h-full shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div>
                      <div className="text-amber-400 text-sm mb-4" aria-label="5 stars">★★★★★</div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6">{t.text}</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        <Image src={t.avatar || '/images/user-thumb-table.svg'} alt={t.name} width={36} height={36} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{t.name}</p>
                        <p className="text-[11px] text-gray-400">{t.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Prev/Next buttons at bottom center */}
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-0 bottom-2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#222] text-white flex items-center justify-center shadow hover:bg-black transition"
          >
            <span className="text-base md:text-lg leading-none">←</span>
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-0 bottom-2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#222] text-white flex items-center justify-center shadow hover:bg-black transition"
          >
            <span className="text-base md:text-lg leading-none">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
