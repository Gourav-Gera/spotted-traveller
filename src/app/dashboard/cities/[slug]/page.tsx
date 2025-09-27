"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';

interface Props {
  params: { slug: string };
}

export default function CityDetailPage({ params }: Props) {
  const slug = params?.slug || 'City';
  const title = decodeURIComponent(slug);

  const images = useMemo(()=>['/images/rome-city-img.png','/images/rome-city-image-2.png','/images/rome-city-img-3.png','/images/rome-city-image-1.png'],[]);
  const perSlide = 3;
  const slides = useMemo(()=>{
    const groups:string[][]=[];
    for(let i=0;i<images.length;i+=perSlide){
      const chunk = images.slice(i,i+perSlide);
      if(chunk.length<perSlide){
        chunk.push(...images.slice(0, perSlide - chunk.length));
      }
      groups.push(chunk);
    }
    return groups;
  },[images]);
  const [slide,setSlide] = useState(0);
  function go(i:number){ const len=slides.length; setSlide(((i%len)+len)%len); }
  const next = ()=> go(slide+1);
  const prev = ()=> go(slide-1);

  return (
    <div className="min-h-screen p-0">
      <div className="">
        <div className="card-surface rounded-xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-4 text-primary">
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link href={`/dashboard/cities/new?slug=${encodeURIComponent(title)}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#445B50] text-white text-sm">
                <BiEdit className="w-4 h-4" />
                Edit City
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 text-primary border-[#4A5D52] text-sm">
                <FiTrash2 className="w-4 h-4" />
                Delete City
              </button>
            </div>
          </div>
          <div className="text-md mb-4 mt-2">
            <Link href="/dashboard/cities" className="text-primary text-lg font-semibold">Back</Link>
          </div>
          {/* Hero: images + description + tags (overview removed) */}
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <div className="grid grid-cols-1 gap-2">
              <div className="mb-6">
                <div className="group relative overflow-hidden rounded-2xl">
                  <div className="flex transition-transform duration-500 ease-out" style={{width:`${slides.length*100}%`, transform:`translateX(-${(slide*100)/slides.length}%)`}}>
                    {slides.map((group,s)=>(
                      <div key={s} className="flex-none flex gap-4" style={{width:`${100/slides.length}%`}}>
                        {group.map((src,i)=>(
                          <div key={i} className="overflow-hidden rounded-2xl h-64 md:h-90 flex-1">
                            <Image src={src} alt={`img-${s}-${i}`} width={600} height={380} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <button onClick={prev} aria-label="Previous images" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 border border-[#E5E7EB] px-3 py-2 rounded-full text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">‹</button>
                  <button onClick={next} aria-label="Next images" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 border border-[#E5E7EB] px-3 py-2 rounded-full text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">›</button>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                  {slides.map((_,i)=>(
                    <button key={i} onClick={()=>go(i)} className={`w-2 h-2 rounded-full transition-colors ${i===slide? 'bg-[#445B50]' : 'bg-[#C9D2CE]'}`} aria-label={`Go to slide ${i+1}`}></button>
                  ))}
                </div>
              </div>

              <p className="text-sm text-[var(--gray)] mb-2">Suspenseful text placeholder. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Integer id feugiat libero. Donec eget interdum magna. Proin sit amet aliquam dolor. Duis non volutpat purus. Proin eleifend convallis leo, nec gravida erat lacinia quis.</p>

               <p className="text-sm text-[var(--gray)] mb-2">Suspenseful text placeholder. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Integer id feugiat libero. Donec eget interdum magna. Proin sit amet aliquam dolor. Duis non volutpat purus. Proin eleifend convallis leo, nec gravida erat lacinia quis.</p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-full bg-[#B3541E] text-sm">
                  <Image src="/images/public-transport-icon.svg" alt="pt" width={16} height={16} className="w-4 h-4" />
                  Public Transportations
                </span>

                <span className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-full bg-[#B3541E] text-sm">
                  <Image src="/images/nature-advanture-icon.svg" alt="nature" width={16} height={16} className="w-4 h-4" />
                  Nature & Adventure
                </span>

                <span className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-full bg-[#B3541E] text-sm">
                  <Image src="/images/accomodation-icon.svg" alt="acc" width={16} height={16} className="w-4 h-4" />
                  Private Transportations
                </span>

                <span className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-full bg-[#B3541E] text-sm">
                  <Image src="/images/business-tour-icon.svg" alt="biz" width={16} height={16} className="w-4 h-4" />
                  Business Tours
                </span>

                <span className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-full bg-[#B3541E] text-sm">
                  <Image src="/images/local-visit-icon.svg" alt="local" width={16} height={16} className="w-4 h-4" />
                  Local Visit
                </span>
              </div>
            </div>
          </div>

          {/* Accommodation section - table with search + add button */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl text-primary font-semibold">Accommodation</h3>
              <div className="flex items-center gap-3">
                <Link href="/dashboard/accommodations/new" className="
                text-gray-400 text-md underline">See all</Link>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1">
                <div className="hidden sm:flex items-center gap-3 bg-white rounded-full px-4 py-3 border border-[#EFEFEF] shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" className="text-primary text-xl ">
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  <input placeholder="Search by accommodation name..." className="w-72 placeholder:text-gray-400 text-sm  outline-none" />
                </div>
              </div>
               <Link href="/dashboard/accommodations/new" className="inline-flex  items-center gap-2 px-4 py-3 rounded-full bg-white border-2 text-primary border-[#4A5D52] text-sm">+ Add New Accommodation</Link>
            </div>
            <div className="overflow-x-auto booking-table-wrap">
              <table className="min-w-full text-sm booking-table table-fixed">
                <thead>
                  <tr className="text-left bg-[#F6F6F6] text-[var(--gray)]">
                    <th className="w-12 py-4 pl-6 first:rounded-tl-2xl">#</th>
                    <th className="w-64 py-4">Hotel Name</th>
                    <th className="w-40 py-4">Location</th>
                    <th className="w-28 py-4">Total Earning</th>
                    <th className="w-24 py-4 last:rounded-tr-2xl">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="align-middle border-t border-[#E9E9E9]">
                      <td className="py-6 text-sm text-[#6a6f6d]">{String(i + 1).padStart(2, '0')}</td>
                      <td className="py-6">Hotel Name</td>
                      <td className="py-6">Rome, Italy</td>
                      <td className="py-6 font-medium">$100</td>
                      <td className="py-6 text-right">
                        <div className="inline-flex items-center justify-end gap-3">
                          <Link href={`/dashboard/accommodations/${i}`} className="text-[var(--primary)]">
                            <Image src="/images/eye-icon.svg" alt="view" width={20} height={20} className="w-5 h-5" />
                          </Link>

                          <Link href={`/dashboard/accommodations/${i}/edit`} className="text-sm">
                            <Image src="/images/edit-icon.svg" alt="edit" width={18} height={18} className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Attractions section */}
          <div className="bg-white rounded-lg p-6 shadow-md mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl text-primary font-semibold">Attractions</h3>
              <div className="flex items-center gap-3">
                <Link href="/dashboard/attractions/new" className="text-gray-400 text-md underline">See all</Link>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1">
                <div className="hidden sm:flex items-center gap-3 bg-white rounded-full px-4 py-3 border border-[#EFEFEF] shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" className="text-primary"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                  <input placeholder="Search by attraction name..." className="w-72 text-sm  outline-none" />
                </div>
              </div>
              <Link href="/dashboard/attractions/new" className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white border-2 text-primary border-[#4A5D52] text-sm">+ Add New Attraction</Link>
            </div>
            <div className="overflow-x-auto booking-table-wrap">
              <table className="min-w-full text-sm booking-table table-fixed">
                <thead>
                  <tr className="text-left bg-[#F6F6F6] text-[var(--gray)]">
                    <th className="w-12 py-4 pl-6 first:rounded-tl-2xl">#</th>
                    <th className="w-64 py-4">Attraction Name</th>
                    <th className="w-40 py-4">Location</th>
                    <th className="w-28 py-4">Total Earning</th>
                    <th className="w-24 py-4 last:rounded-tr-2xl">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({length:5}).map((_,i)=>(
                    <tr key={i} className="align-middle border-t border-[#E9E9E9]">
                      <td className="py-6 text-sm text-[#6a6f6d]">{String(i+1).padStart(2,'0')}</td>
                      <td className="py-6">Attraction Name</td>
                      <td className="py-6">Rome, Italy</td>
                      <td className="py-6 font-medium">$100</td>
                      <td className="py-6 text-right">
                        <div className="inline-flex items-center justify-end gap-3">
                          <Link href={`/dashboard/attractions/${i}`} className="text-[var(--primary)]"><Image src="/images/eye-icon.svg" alt="view" width={20} height={20} className="w-5 h-5" /></Link>
                          <Link href={`/dashboard/attractions/${i}/edit`} className="text-sm"><Image src="/images/edit-icon.svg" alt="edit" width={18} height={18} className="w-4 h-4" /></Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Events section */}
          <div className="bg-white rounded-lg p-6 shadow-md mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl text-primary font-semibold">Events</h3>
              <div className="flex items-center gap-3">
                <Link href="/dashboard/events/new" className="text-gray-400 text-md underline">See all</Link>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1">
                <div className="hidden sm:flex items-center gap-3 bg-white rounded-full px-4 py-3 border border-[#EFEFEF] shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" className="text-primary"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                  <input placeholder="Search by event name..." className="w-72 text-sm  outline-none" />
                </div>
              </div>
              <Link href="/dashboard/events/new" className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white border-2 text-primary border-[#4A5D52] text-sm">+ Add New Event</Link>
            </div>
            <div className="overflow-x-auto booking-table-wrap">
              <table className="min-w-full text-sm booking-table table-fixed">
                <thead>
                  <tr className="text-left bg-[#F6F6F6] text-[var(--gray)]">
                    <th className="w-12 py-4 pl-6 first:rounded-tl-2xl">#</th>
                    <th className="w-64 py-4">Event Name</th>
                    <th className="w-40 py-4">Location</th>
                    <th className="w-28 py-4">Total Earning</th>
                    <th className="w-24 py-4 last:rounded-tr-2xl">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({length:5}).map((_,i)=>(
                    <tr key={i} className="align-middle border-t border-[#E9E9E9]">
                      <td className="py-6 text-sm text-[#6a6f6d]">{String(i+1).padStart(2,'0')}</td>
                      <td className="py-6">Event Name</td>
                      <td className="py-6">Rome, Italy</td>
                      <td className="py-6 font-medium">$100</td>
                      <td className="py-6 text-right">
                        <div className="inline-flex items-center justify-end gap-3">
                          <Link href={`/dashboard/events/${i}`} className="text-[var(--primary)]"><Image src="/images/eye-icon.svg" alt="view" width={20} height={20} className="w-5 h-5" /></Link>
                          <Link href={`/dashboard/events/${i}/edit`} className="text-sm"><Image src="/images/edit-icon.svg" alt="edit" width={18} height={18} className="w-4 h-4" /></Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
