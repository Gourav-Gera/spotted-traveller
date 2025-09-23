"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CityExplorer from '../../components/CityExplorer';
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

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-24">
        <div className="mb-8">
          <h1 className="text-xl font-semibold mb-2">Explore Cities</h1>
          <div className="flex items-center gap-2 w-full max-w-md bg-white rounded-full px-4 py-3 border border-[#E5E5E5]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search cities..." className="flex-1 outline-none text-sm bg-transparent placeholder:text-gray-400" />
          </div>
        </div>

        <div className="space-y-8">
          {filtered.map((c,i)=>{
            const reversed = i % 2 === 1; // alternate image / card alignment similar to screenshot
            return (
              <div key={c.slug} className={`grid md:grid-cols-2 gap-4 md:gap-6 items-stretch ${reversed? 'md:[&>*:first-child]:order-2' : ''}`}>
                <div className="relative rounded-xl overflow-hidden shadow-sm bg-gray-200 h-52 md:h-56">
                  <Image src={c.thumb} alt={c.name} fill className="object-cover" />
                </div>
                <div className="bg-white rounded-xl p-5 md:p-6 flex flex-col justify-between shadow-sm relative">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-[#3F4C43] rounded overflow-hidden flex items-center justify-center">
                        <Image src="/images/cities-icon.svg" alt="city icon" width={20} height={20} className="w-5 h-5 object-contain" />
                      </div>
                      <h2 className="text-sm font-semibold tracking-tight">{c.name}</h2>
                    </div>
                    <p className="text-[13px] leading-relaxed text-gray-600 mb-4 line-clamp-3">{c.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <Link href={`/cities/${c.slug}`} className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 font-medium">Discover</Link>
                    <Link href={`/cities/${c.slug}#attractions`} className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 font-medium">Attractions</Link>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-20">No cities match that search.</div>
          )}
        </div>

        {/* Optional secondary explorer block reuse */}
        <CityExplorer />
      </main>

      <MainFooter />
    </div>
  );
}
