"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/MainFooter';
import { cities as CITY_LIST } from '../../data/cities';

// derive thumb from hero image or first gallery item
const withThumb = CITY_LIST.map(c=> ({
  ...c,
  thumb: c.hero || c.gallery?.[0] || '/images/rome-city-image-1.png'
}));

export default function CitiesLandingPage(){
  const [query,setQuery] = useState('');

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    if(!q) return withThumb;
    return withThumb.filter(c=> c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
  },[query]);

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col">
      <MainHeader />

      <main className="max-w-7xl w-full mx-auto md:px-0 pt-8 pb-24">
        {/* Header row: title left, search right */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-[28px] md:text-[32px] font-semibold tracking-tight text-[#222]">Explore Cities</h1>
          <div className="flex items-center gap-2 w-full md:w-[540px] lg:w-[620px] bg-white rounded-full px-5 py-3 border border-[#E5E5E5] shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by city name..." className="flex-1 outline-none text-sm bg-transparent placeholder:text-gray-400" />
          </div>
        </div>

        {/* Alternating rows with floating card beside the large image */}
        <div className="space-y-12 md:space-y-16">
          {filtered.map((c, i) => {
            const reversed = i % 2 === 1;
            return (
              <section key={c.slug} className="relative">
                {/* Image block */}
                <div className={`relative h-[200px] sm:h-[240px] md:h-[300px] bg-gray-200 rounded-[14px] overflow-hidden shadow-sm md:w-[56%] ${reversed ? 'md:ml-auto' : ''}`}>
                  <Image src={c.thumb} alt={c.name} fill priority={i<2} className="object-cover" />
                </div>

                {/* Floating card */}
                <div
                  className={`md:absolute md:top-1/2 md:-translate-y-1/2 ${reversed ? 'md:left-8' : 'md:right-8'} md:w-[50%]`}
                >
                  <div className="mt-4 md:mt-0 bg-white border border-[#E7EAEE] rounded-[18px] shadow-[0_14px_40px_-10px_rgba(2,6,23,0.15)] p-5 md:p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block w-10 h-10 md:w-11 md:h-11 rounded-[10px] bg-[#3E5F55]" aria-hidden="true" />
                      <h2 className="text-[18px] md:text-[20px] font-semibold text-[#101828]">{c.name}</h2>
                    </div>
                    <p className="text-[13px] md:text-[14px] leading-relaxed text-[#667085] mb-4 md:mb-5 line-clamp-3">{c.description}</p>
                    <div>
                      <Link
                        href={`/cities/${c.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#D0D5DD] px-4 md:px-5 py-2.5 text-sm font-medium text-[#101828] hover:bg-gray-50 transition-colors"
                      >
                        Explore {c.name}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-20">No cities match that search.</div>
          )}
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
