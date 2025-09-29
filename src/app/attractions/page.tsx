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
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-10 pt-10 pb-24">
        <header className="mb-6">
          <div className="flex flex-col items-start justify-between gap-6">
            <h1 className="text-[26px] md:text-[32px] font-semibold tracking-tight text-[#222] leading-tight">Attraction Points in Italy</h1>
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

        {/* Card grid + map (stack on mobile) */}
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12">
          {/* Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-full lg:max-w-[820px]">
            {filtered.slice(0,12).map((a,i) => (
              <Link
                href={`/attractions/${a.id}`}
                key={a.id}
                className={`group rounded-[18px] overflow-hidden bg-white relative shadow-sm border border-[#E6E6E6] focus:outline-none focus-visible:ring-2 ring-offset-2 ring-[#4A5D52]/40 transition ${i===0? 'sm:col-span-2':'"'}`}
              >
                <div className={`relative w-full ${i===0? 'h-72 md:h-[420px]':'h-56 sm:h-60 md:h-72'}`}>
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                    loading={i<4? 'eager':'lazy'}
                  />
                </div>
                <div className="absolute left-0 right-0 bottom-0 px-4 py-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white">
                  <p className="text-[13px] font-medium leading-tight line-clamp-2 pr-6">{a.name}</p>
                  <p className="text-[11px] opacity-85 mt-1">{a.cityName}, {a.cityCountry}</p>
                </div>
              </Link>
            ))}
            {filtered.length===0 && (
              <div className="col-span-full text-center py-20 text-sm text-gray-500">No attractions found.</div>
            )}
          </div>
          {/* Map (shows from lg upward) */}
          <div className="w-full lg:w-[420px] xl:w-[520px] hidden lg:block lg:sticky lg:top-24">
            <div className="rounded-[22px] border border-[#E6E6E6] bg-white p-1 h-[600px] xl:h-[880px] relative overflow-hidden">
              <Image src="/images/attraction-google-img.svg" alt="Map" fill className="object-cover" />
              {filtered.slice(0,10).map((a,i)=>(
                <div key={a.id} style={{top: `${10 + i*8}%`, left: `${60 + (i%2)*14}%`}} className="absolute -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white rounded-md shadow px-2 py-1 flex items-center gap-2 border border-gray-200">
                    <div className="relative w-7 h-7 rounded-sm overflow-hidden">
                      <Image src={a.image} alt={a.name} fill className="object-cover" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap max-w-[120px] truncate">{a.name}</span>
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
