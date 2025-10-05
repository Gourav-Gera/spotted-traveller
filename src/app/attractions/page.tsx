"use client";
import React, { useState, useMemo } from 'react';
import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
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
  <main className="flex-1 app-container w-full pt-8 md:pt-10 pb-20 md:pb-24">
        <header className="mb-6">
          <div className="flex flex-col items-start justify-between gap-6">
            <h1 className="text-[26px] md:text-[32px] font-semibold tracking-tight text-black leading-tight">Attraction Points in Italy</h1>
            <div className="hidden md:flex items-center gap-3 w-full">
              <div className="flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-full px-5 h-12 w-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by city name..." className="flex-1 bg-transparent outline-none text-lg placeholder:text-desc" />
              </div>
              <button className="h-12 px-12 rounded-full border border-primary text-primary gap-2 flex items-center text-lg font-medium hover:bg-gray-50">
                <Image src="/images/filter-img-icon.svg" width={14} height={14} alt="filter image" className="object-cover" />
                Filter
              </button>
            </div>
          </div>
          {/* removed helper description for clean client handoff */}
          <div className="md:hidden flex items-center gap-3 mt-4">
            <div className="flex items-center gap-2 flex-1 bg-[#F8F8F8] border border-[#E4E4E4] rounded-full px-4 h-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by city name..." className="flex-1 bg-transparent outline-none text-xs" />
            </div>
            <button className="h-10 px-5 rounded-full border border-[#E4E4E4] text-xs font-medium">Filter</button>
          </div>
        </header>

        {/* Card grid + map (stack on mobile) */}
  <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-full lg:max-w-[820px]">
            {filtered.slice(0,12).map((a,i) => (
              <Link
                href={`/attractions/${a.id}`}
                key={a.id}
                className="group rounded-[18px] overflow-hidden bg-white relative shadow-sm border border-[#E6E6E6] focus:outline-none focus-visible:ring-2 ring-offset-2 ring-[#4A5D52]/40 transition"
              >
                <div className="relative w-full h-52 sm:h-56 md:h-64 lg:h-72">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                    loading={i<2? 'eager':'lazy'}
                  />
                </div>
                <div className="absolute left-0 right-0 bottom-0 px-4 py-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white">
                  <p className="text-[16px] font-medium leading-tight line-clamp-2 pr-6">{a.name}</p>
                  <p className="text-[12px] opacity-85 mt-1">{a.cityName}, {a.cityCountry}</p>
                </div>
              </Link>
            ))}
            {filtered.length===0 && (
              <div className="col-span-full text-center py-20 text-sm text-gray-500">No attractions found.</div>
            )}
          </div>
          {/* Map (shows from lg upward) */}
          <div className="w-full lg:w-[420px] xl:w-[520px] hidden lg:block lg:sticky lg:top-24">
            <div className="rounded-[22px] border border-[#E6E6E6] bg-white p-1 h-[560px] xl:h-[820px] relative overflow-hidden">
              <Image src="/images/attraction-google-img.svg" alt="Map" fill className="object-cover" />
            </div>
          </div>
        </div>
      </main>
  <Footer />
    </div>
  );
}
