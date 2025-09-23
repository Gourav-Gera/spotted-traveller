"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productImages = [
    '/images/rome-city-image-1.png',
    '/images/rome-city-image-2.png',
    '/images/rome-city-image-3.png',
    '/images/rome-city-image-1.png',
    '/images/rome-city-image-2.png',
    '/images/rome-city-image-3.png'
  ];
  const colors = ['#1c1f20','#2c3e2f','#ffb240','#15a24a','#fefefe'];
  const sizes = ['S','M','L','XL','XXL'];
  const reviews = Array.from({length:6}).map((_,i)=>({id:i+1,name:'William',rating:5,text:'Etiam egestas magna purus, quis vehicula enim euismod in. Duis vestibulum purus ac arcu elementum, id vestibulum nisl pulvinar. Nullam venenatis iaculis sapien, volutpat dapibus est tristique eget.'}));
  const itemsPerPage = 3; // desktop reviews per slide
  const pageCount = useMemo(()=> Math.ceil(reviews.length / itemsPerPage),[reviews.length]);
  const [page, setPage] = useState(0);
  function go(p:number){ if(p<0||p>=pageCount) return; setPage(p); }
  // image gallery slider (2 per view to match design patterns)
  const imgsPerSlide = 2;
  const imgSlides = useMemo(()=>{
    const groups:string[][]=[];
    for(let i=0;i<productImages.length;i+=imgsPerSlide){
      const chunk = productImages.slice(i,i+imgsPerSlide);
      if(chunk.length<imgsPerSlide){
        chunk.push(...productImages.slice(0, imgsPerSlide - chunk.length));
      }
      groups.push(chunk);
    }
    return groups;
  },[productImages]);
  const [imgSlide, setImgSlide] = useState(0);
  function goImgSlide(i:number){ const len=imgSlides.length; setImgSlide(((i%len)+len)%len); }

  return (
    <div className="min-h-screen p-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-primary">Male Trending T-shirt</h1>
        <div className="flex gap-3">
          <Link href={`/dashboard/ecommerce/${params.id}/edit`} className="px-6 py-2 rounded-full bg-[#445B50] text-white text-sm">Edit</Link>
          <button className="px-6 py-2 rounded-full border border-[#445B50] text-[#445B50] text-sm">Delete</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-8 shadow-sm space-y-10">
        {/* Image Gallery Slider (3 visible per slide) */}
        <div className="group relative overflow-hidden rounded-2xl">
          <div className="flex transition-transform duration-500 ease-out" style={{width:`${imgSlides.length*100}%`, transform:`translateX(-${(imgSlide*100)/imgSlides.length}%)`}}>
            {imgSlides.map((group,slide) => (
              <div key={slide} className="flex-none flex gap-4 px-0" style={{width:`${100/imgSlides.length}%`}}>
                {group.map((src,i)=>(
                  <div key={i} className="h-72 rounded-xl overflow-hidden flex-1">
                    <Image src={src} alt={`image-${slide}-${i}`} width={600} height={500} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button onClick={()=>goImgSlide(imgSlide-1)} aria-label="Previous images" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 border border-[#E5E7EB] px-3 py-2 rounded-full text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">‹</button>
          <button onClick={()=>goImgSlide(imgSlide+1)} aria-label="Next images" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 border border-[#E5E7EB] px-3 py-2 rounded-full text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">›</button>
        </div>
        <div className="flex items-center justify-center gap-2 pt-4">
          {imgSlides.map((_,i)=>(
            <button key={i} onClick={()=>goImgSlide(i)} className={`w-2 h-2 rounded-full transition-colors ${i===imgSlide? 'bg-[#445B50]' : 'bg-[#C9D2CE]'}`} aria-label={`Go to image slide ${i+1}`}></button>
          ))}
        </div>
        {/* Description + selection panel */}
        <div className="grid md:grid-cols-12 gap-10 pt-10">
          <div className="md:col-span-8 space-y-5">
            <p className="text-sm text-[var(--gray)] leading-relaxed">Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id feugiat libero. Donec eget interdum magna. Proin sit amet aliquam dolor. Duis non volutpat purus. Proin eleifend convallis leo, nec gravida erat lacinia quis. Nullam nulla ligula, commodo eget risus non, vehicula aliquet mauris.</p>
            <p className="text-sm text-[var(--gray)] leading-relaxed">Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id feugiat libero. Donec eget interdum magna. Proin sit amet aliquam dolor. Duis non volutpat purus. Proin eleifend convallis leo, nec gravida erat lacinia quis. Nullam nulla ligula, commodo eget risus non, vehicula aliquet mauris.</p>
          </div>
          <div className="md:col-span-4">
            <div className="w-full bg-white rounded-xl shadow-sm border border-[#E9E9E9] p-6 space-y-5">
              <div>
                <div className="text-xs font-semibold text-primary mb-2">Color:-</div>
                <div className="flex gap-3 flex-wrap">
                  {colors.map(c=> <button key={c} className="w-8 h-8 rounded-full ring-1 ring-[#E5E7EB] border border-white" style={{background:c}} />)}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-primary mb-2">Size:-</div>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map(s=> <button key={s} className="px-4 py-1 rounded-full border border-[#E5E7EB] text-[11px] text-primary">{s}</button>)}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#F0F0F0] mt-2">
                <span className="text-[11px] text-[var(--gray)]">Stock: 150+</span>
                <span className="text-base font-semibold text-primary">$259</span>
              </div>
            </div>
          </div>
        </div>
        {/* Reviews Slider */}
        <div className="space-y-6">
          <h2 className="font-semibold text-xl text-primary">Rating & Reviews</h2>
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${page * 100}%)`, width: `${pageCount * 100}%` }}
            >
              {Array.from({length: pageCount}).map((_, pg) => (
                <div key={pg} className="w-full grid grid-cols-[repeat(3,minmax(0,1fr))] gap-6 px-0 shrink-0 grow-0 min-w-0">
                  {reviews.slice(pg*itemsPerPage, pg*itemsPerPage + itemsPerPage).map(r => (
                    <div key={r.id} className="bg-white border border-[#E9E9E9] rounded-2xl p-6 flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.04)] min-w-0">
                      <div className="space-y-3">
                        <div className="flex gap-1 text-[#F5B70A]">
                          {Array.from({length:r.rating}).map((_,i)=>(<svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>))}
                        </div>
                        <p className="text-xs text-[var(--gray)] leading-relaxed">{r.text}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <Image src="/images/user-thumb-table.svg" alt="user" width={36} height={36} />
                        <span className="text-sm text-primary font-medium">{r.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Nav buttons (hidden visually but accessible) */}
            <button aria-label="Previous reviews" onClick={()=>go(page-1)} disabled={page===0} className="absolute left-0 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-primary disabled:opacity-30 hidden md:block">‹</button>
            <button aria-label="Next reviews" onClick={()=>go(page+1)} disabled={page===pageCount-1} className="absolute right-0 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-primary disabled:opacity-30 hidden md:block">›</button>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            {Array.from({length: pageCount}).map((_,i)=>(
              <button key={i} onClick={()=>go(i)} className={`w-2 h-2 rounded-full ${i===page? 'bg-[#445B50]' : 'bg-[#C9D2CE]'} transition-colors`} aria-label={`Go to reviews page ${i+1}`}></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
