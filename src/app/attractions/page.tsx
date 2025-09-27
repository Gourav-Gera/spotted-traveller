"use client";
import React, { useState, useMemo } from 'react';
import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/MainFooter';
import Image from 'next/image';
import Link from 'next/link';
import { attractions, cities } from '../../data/cities';

interface AttractionCard {
  id: string; name: string; image: string; city: string; cityName: string; cityCountry: string;
}

const enriched: AttractionCard[] = attractions.map(a => {
  const c = cities.find(ci=>ci.slug===a.city);
  return { ...a, cityName: c?.name || a.city, cityCountry: c?.country || 'Italy' };
});

export default function AttractionsListing(){
  const [query,setQuery] = useState('');
  const filtered = useMemo(()=>{
    const q=query.trim().toLowerCase();
    if(!q) return enriched;
    return enriched.filter(a=> a.name.toLowerCase().includes(q) || a.cityName.toLowerCase().includes(q));
  },[query]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 pt-10 pb-24">
        <header className="mb-6">
          <div className="flex flex-col items-start justify-between gap-6">
            <h1 className="text-[22px] md:text-[24px] font-semibold tracking-tight text-[#222]">Attraction Points in Italy</h1>
            <div className="hidden md:flex items-center gap-3 w-full">
              <div className="flex items-center gap-2 bg-[#F8F8F8] border border-[#E4E4E4] rounded-full px-5 h-12 w-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by city name..." className="flex-1 bg-transparent outline-none text-md" />
              </div>
              <button className="h-12 px-12 rounded-full border border-[#E4E4E4] text-md font-medium hover:bg-gray-50">Filter</button>
            </div>
          </div>
          {/* <p className="mt-3 text-[12px] md:text-[13px] text-[#4F4F4F] leading-relaxed max-w-[520px]">Search iconic landmarks and cultural highlights across Italian cities. Discover history, architecture and vibrant stories.</p> */}
          <div className="md:hidden flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2 flex-1 bg-[#F8F8F8] border border-[#E4E4E4] rounded-full px-4 h-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by city name..." className="flex-1 bg-transparent outline-none text-xs" />
            </div>
            <button className="h-10 px-5 rounded-full border border-[#E4E4E4] text-xs font-medium">Filter</button>
          </div>
        </header>

        {/* Two column cards + map column */}
        <div className="flex items-start gap-8">
          {/* Left images */}
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-8 pr-2 max-w-[760px]">
            {filtered.slice(0,8).map(a => (
              <Link href={`/attractions/${a.id}`} key={a.id} className="group rounded-[14px] overflow-hidden bg-white relative shadow-sm border border-[#E6E6E6]" style={{height:300}}>
                <Image src={a.image} alt={a.name} fill className="object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                <div className="absolute left-0 right-0 bottom-0 px-3 py-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white">
                  <p className="text-[12px] font-medium leading-tight">{a.name}</p>
                  <p className="text-[10px] opacity-80 mt-0.5">{a.cityName}, {a.cityCountry}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Right Map */}
          <div className="w-[560px] hidden xl:block sticky top-20">
            <div className="rounded-[18px] border border-[#E6E6E6] bg-white p-1 h-[1250px] relative overflow-hidden">
              <Image src="/images/attraction-google-img.svg" alt="Map" fill className="object-cover" />
              {filtered.slice(0,8).map((a,i)=>(
                <div key={a.id} style={{top: `${12 + i*11}%`, left: `${65 + (i%2)*12}%`}} className="absolute -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white rounded-md shadow px-2 py-1 flex items-center gap-2 border border-gray-200">
                    <div className="relative w-7 h-7 rounded-sm overflow-hidden">
                      <Image src={a.image} alt={a.name} fill className="object-cover" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">{a.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
