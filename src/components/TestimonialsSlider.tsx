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
    <section className="w-full px-4 py-12 mt-16 bg-[#FAFAFA]">
  <div className="app-container">
        <h2 className="text-center text-[24px] md:text-[30px] font-semibold text-black-heading mb-12">What Our Customer&apos;s Says About Us</h2>
        <div className="relative pb-16">
          {/* Slider viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 will-change-transform"
              /* Shift by exactly one card width (100 / totalItems)% per index */
              style={{ transform: `translateX(-${(index * 100) / testimonials.length}%)`, width: `${(testimonials.length * 100) / visible}%` }}
            >
              {testimonials.map(t => (
                <div
                  key={t.id}
                  className="px-4 flex-shrink-0"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div className="bg-white rounded-2xl p-8 px-4 h-full box-shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 justify-center text-[#FFE245] mb-2" aria-label="5 stars">
                        {Array.from({length:5}).map((_,i)=> (
                          <svg key={i} width="22" height="22" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                        ))}
                      </div>
                      <p className="text-[15px] text-desc text-center leading-7 mb-6">{t.text}</p>
                    </div>
                    <div className="flex items-center gap-3 pt-5 border-t border-[#D3D3D3]">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        <Image src={t.avatar || '/images/user-thumb-table.svg'} alt={t.name} width={40} height={40} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{t.name}</p>
                        {/* <p className="text-[11px] text-gray-400">{t.location}</p> */}
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
            className="absolute left-0 bottom-2 w-8 h-8 rounded-full bg-[#41444B] text-white flex items-center justify-center shadow hover:bg-black transition"
          >
            <span className="text-base md:text-lg leading-none ">
              <Image src="/images/arrow-left-icon.svg" alt="Previous" width={10} height={10} />
            </span>
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-0 bottom-2 w-8 h-8 rounded-full bg-[#41444B] text-white flex items-center justify-center shadow hover:bg-black transition"
          >
            <span className="text-base md:text-lg leading-none">
              <Image src="/images/arrow-right-icons.svg" alt="Next" width={10} height={10} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
