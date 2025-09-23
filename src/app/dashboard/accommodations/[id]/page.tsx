"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';

export default function AccommodationDetailPage({ params }: { params: { id: string } }) {
  const id = params?.id || '1';
  const title = 'Hotel Park Palace';

  const images = ['/images/why-1.webp','/images/why-2.webp','/images/why-3.webp','/images/why-1.webp'];
  const perSlide = 2;
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

  // Reviews slider data (match e-commerce slider pattern)
  const reviews = useMemo(()=>
    Array.from({length:6}).map((_,i)=>({
      id:i+1,
      name:'William',
      role:'Traveler',
      rating:5,
      text:'Etiam egestas magna purus, quis vehicula enim volutpat. Duis vestibulum purus ac arcu elementum, id vestibulum nisl pulvinar.'
    })),[]);
  const itemsPerPage = 3; // show three review cards per slide on desktop
  const pageCount = useMemo(()=> Math.ceil(reviews.length / itemsPerPage),[reviews.length]);
  const [page, setPage] = useState(0);
  function goPage(p:number){ if(p<0||p>=pageCount) return; setPage(p); }

  return (
    <div className="min-h-screen p-0">
      <div className="card-surface rounded-xl p-6">
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-4 text-primary">{title}</h1>
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/accommodations/${id}/edit`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#445B50] text-white text-sm"><BiEdit className="w-4 h-4" />Edit Accommodation</Link>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 text-primary border-[#4A5D52] text-sm"><FiTrash2 className="w-4 h-4" />Delete Accommodation</button>
          </div>
        </div>

        <div className="mb-6">
          <div className="group relative overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500 ease-out" style={{width:`${slides.length*100}%`, transform:`translateX(-${(slide*100)/slides.length}%)`}}>
              {slides.map((group,s)=>(
                <div key={s} className="flex-none flex gap-4" style={{width:`${100/slides.length}%`}}>
                  {group.map((src,i)=>(
                    <div key={i} className="overflow-hidden rounded-2xl h-64 md:h-72 flex-1">
                      <Image src={src} alt={`img-${s}-${i}`} width={600} height={320} className="w-full h-full object-cover" />
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
          <div className="lg:col-span-8">
            <p className="text-sm text-[var(--gray)] mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum venenatis libero purus, sed interdum est venenatis et. Nunc facilisis ipsum ac congue tincidunt. Duis sed bibendum odio. Sed facilisis mollis enim, ut egestas felis auctor a.</p>
            <p className="text-sm text-[var(--gray)] mb-4">Donec auctor sem ut pretium, eu vestibulum ipsum mattis. Sed eget lacus velit. Mauris sodales porta porta. Duis iaculis tortor quis augue pretium pellentesque pretium. Fusce sed porta orci. Vestibulum posuere luctus magna, quis varius magna gravida ut.</p>
            <div className="mt-4 overflow-hidden rounded-lg">
              <Image src="/images/home-banner-img.webp" alt="map" width={900} height={320} className="w-full h-64 md:h-72 object-cover rounded-lg" />
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-semibold mb-1">$100<span className="text-base font-normal">/night</span></div>
                <div className="text-sm text-[var(--gray)] mb-4">Best value stay in the heart of the city.</div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Check-in date</label>
                    <input type="date" className="w-full border border-[#E5E7EB] rounded-full px-4 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Check-out date</label>
                    <input type="date" className="w-full border border-[#E5E7EB] rounded-full px-4 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">No of guests</label>
                    <div className="flex items-center gap-3 border border-[#E5E7EB] rounded-full px-4 py-2 text-sm justify-between">
                      <button className="px-2">-</button>
                      <span>01</span>
                      <button className="px-2">+</button>
                    </div>
                  </div>
                  <button className="w-full bg-[var(--primary)] text-white rounded-full py-3 text-sm font-medium">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Rating & Reviews</h3>
          <div className="overflow-hidden relative">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${page * 100}%)`, width: `${pageCount * 100}%` }}>
              {Array.from({length: pageCount}).map((_, pg) => (
        <div key={pg} className="w-full grid grid-cols-[repeat(3,minmax(0,1fr))] gap-6 px-0 shrink-0 grow-0 min-w-0">
                  {reviews.slice(pg*itemsPerPage, pg*itemsPerPage + itemsPerPage).map(r => (
          <div key={r.id} className="bg-white border border-[#E9E9E9] rounded-2xl p-6 flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.04)] min-w-0">
                      <div className="space-y-3">
                        <div className="flex gap-1 text-[#F5B70A]">
                          {Array.from({length:r.rating}).map((_,i)=>(<svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>))}
                        </div>
                        <p className="text-sm text-[var(--gray)]">{r.text}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <Image src="/images/user-thumb-table.svg" alt="user" width={40} height={40} />
                        <div>
                          <div className="text-sm font-medium">{r.name}</div>
                          <div className="text-xs text-[var(--gray)]">{r.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button aria-label="Previous reviews" onClick={()=>goPage(page-1)} disabled={page===0} className="absolute left-0 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-primary disabled:opacity-30 hidden md:block">‹</button>
            <button aria-label="Next reviews" onClick={()=>goPage(page+1)} disabled={page===pageCount-1} className="absolute right-0 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-primary disabled:opacity-30 hidden md:block">›</button>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            {Array.from({length: pageCount}).map((_,i)=>(
              <button key={i} onClick={()=>goPage(i)} className={`w-2 h-2 rounded-full ${i===page? 'bg-[#445B50]' : 'bg-[#C9D2CE]'} transition-colors`} aria-label={`Go to reviews page ${i+1}`}></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
