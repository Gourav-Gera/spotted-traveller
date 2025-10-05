"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
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

  <main className="app-container w-full md:px-0 pt-8 pb-24">
        {/* Header row: title left, search right */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5 px-5 md:px-8">
          <h1 className="text-[34px] md:text-[40px] font-semibold tracking-tight text-[#171A1C] leading-tight">Explore Cities</h1>
          <div className="flex items-center gap-3 w-full md:w-[560px] lg:w-[640px] bg-white rounded-full pl-6 pr-4 py-3.5 border border-[#DADDE0] shadow-[0_4px_14px_-4px_rgba(10,20,20,0.08)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by city name..." className="flex-1 outline-none text-[15px] bg-transparent placeholder:text-gray-400" />
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
                  <div className="mt-4 md:mt-0 bg-white border border-[#E1E4E8] rounded-[22px] shadow-[0_16px_50px_-12px_rgba(15,23,42,0.18)] p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-block w-12 h-12 md:w-14 md:h-14 rounded-[14px] bg-[#4A5D52]" aria-hidden="true" />
                      <h2 className="text-[20px] md:text-[24px] font-semibold text-[#0F141A] tracking-tight">{c.name}</h2>
                    </div>
                    <p className="text-[14px] md:text-[15px] leading-relaxed text-[#5D6B74] mb-6 line-clamp-3">{c.description}</p>
                    <div>
                      <Link
                        href={`/cities/${c.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#C5CBD1] px-6 py-3 text-[13px] md:text-[14px] font-medium text-[#0F141A] hover:bg-gray-50 hover:border-[#B5BBC1] transition-colors"
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

  <Footer />
    </div>
  );
}
