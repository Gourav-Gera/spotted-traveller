"use client";
import Image from "next/image";
import { useState } from "react";

interface CityInfo {
  name: string;
  region: string;
  description: string;
  image: string; // main image
  tags: string[];
}

const cities: CityInfo[] = [
  {
    name: "Rome",
    region: "Lazio, Italy",
    description:
      "Historic capital featuring ancient ruins, vibrant piazzas and timeless culture.",
    image: "/images/rome-city-image-1.png",
    tags: ["Historic", "Culture", "Food", "Local Visit"],
  },
  {
    name: "Florence",
    region: "Tuscany, Italy",
    description:
      "Renaissance art and architecture hub with iconic cathedrals and galleries.",
    image: "/images/rome-city-image-2.png",
    tags: ["Art", "Museums", "Scenic", "Food"],
  },
  {
    name: "Genoa",
    region: "Liguria, Italy",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    image: "/images/rome-city-image-3.png",
    tags: [
      "Public Transportations",
      "Nature & Adventure",
      "Private Transportations",
      "Business Tours",
      "Local Visit",
    ],
  },
  {
    name: "Venice",
    region: "Veneto, Italy",
    description:
      "City of canals with romantic gondolas, bridges and rich maritime history.",
    image: "/images/rome-city-img-3.png",
    tags: ["Canals", "Romantic", "Culture", "Local Visit"],
  },
  {
    name: "Bologna",
    region: "Emilia-Romagna, Italy",
    description:
      "Medieval towers, porticoes and world‑famous cuisine in a lively university town.",
    image: "/images/rome-city-img.png",
    tags: ["Cuisine", "Historic", "Universities"],
  },
  {
    name: "Milan",
    region: "Lombardy, Italy",
    description:
      "Global fashion & design capital blending modern skyline with gothic heritage.",
    image: "/images/rome-city-image-1.png",
    tags: ["Fashion", "Business", "Design"],
  },
  {
    name: "Naples",
    region: "Campania, Italy",
    description: "Coastal energy, pizza heritage and gateway to Amalfi & Pompeii.",
    image: "/images/rome-city-image-2.png",
    tags: ["Food", "Coast", "History"],
  },
  {
    name: "Turin",
    region: "Piedmont, Italy",
    description:
      "Elegant squares, baroque cafes and automotive innovation nestled by the Alps.",
    image: "/images/rome-city-image-3.png",
    tags: ["Architecture", "Cafes", "Innovation"],
  },
];

export default function CityExplorer() {
  const [active, setActive] = useState("Genoa");
  const city = cities.find((c) => c.name === active) || cities[0];

  return (
    <section className="w-full px-4 mt-16">
      <div className="max-w-7xl mx-auto bg-[#F7F5EF] rounded-2xl px-8 md:px-10 pt-12 pb-16 relative">
        <h2 className="text-center text-[22px] md:text-[24px] font-semibold text-[#222] mb-3">
          Explore Popular Cities
        </h2>
        <p className="text-center text-[13px] text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit
        </p>
        <div
          role="tablist"
          aria-label="Popular cities"
          className="flex flex-wrap justify-center gap-3 mb-10 text-[13px] font-medium"
        >
          {cities.map((c) => {
            const selected = c.name === active;
            return (
              <button
                key={c.name}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${c.name}`}
                id={`tab-${c.name}`}
                onClick={() => setActive(c.name)}
                className={`h-10 px-10 rounded-full border transition focus:outline-none focus-visible:ring-2 ring-offset-2 ring-[#3F4C43]/50 border-gray-300 text-gray-700 hover:bg-white hover:shadow-sm ${
                  selected
                    ? "bg-[#3F4C43] text-white border-[#3F4C43] shadow"
                    : "bg-white"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex flex-col md:flex-row md:items-start gap-10" id={`panel-${city.name}`} role="tabpanel" aria-labelledby={`tab-${city.name}`}>          
          {/* Main City Image */}
          <div className="md:w-[60%] relative">
            <div
              className="relative rounded-[14px] overflow-hidden border border-gray-200"
              style={{ boxShadow: "0 4px 10px -2px rgba(0,0,0,0.06)" }}
            >
              <div className="relative w-full h-[300px] md:h-[360px]">
                <Image
                  key={city.image}
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
          {/* Overlapping Info Card */}
          <div className="md:w-[40%] relative">
            <div className="md:absolute md:-left-24 lg:-left-32 top-10 bg-white rounded-2xl p-8 w-full md:w-[420px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-gray-100">
              <h3 className="font-semibold text-lg mb-1 tracking-tight">{city.name}</h3>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-4">{city.region}</p>
              <p className="text-[13px] text-gray-600 leading-relaxed mb-6 pr-2">{city.description}</p>
              <div className="flex flex-wrap gap-3">
                {city.tags.map((t, i) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 text-[11px] font-medium bg-[#8B3F09] text-white px-4 py-2 rounded-full shadow-sm"
                  >
                    {i === 0 && <span className="w-3 h-3 bg-white/80 rounded-sm" />} {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
