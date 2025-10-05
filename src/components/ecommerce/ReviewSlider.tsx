 "use client";
import React, { useState, useCallback } from 'react';
import Image from 'next/image';

// 6 sample reviews -> want 2 slides, 3 cards per slide
const sample = Array.from({length:6}).map((_,i)=>({
  id:i,
  name:'William',
  avatar:'/images/review-img-thumb.svg',
  text:'Etiam egestas magna purus, quis vehicula enim euismod in. Duis vestibulum purus ac arcu elementum, id vestibulum nisi pulvinar. Nullam venenatis iaculis sapien, volutpat dapibus est tristique eget.'
}));

export function ReviewSlider(){
  const per = 3; // cards per slide (desktop)
  const pages = Math.ceil(sample.length / per); // should be 2 with 6 items
  const [page,setPage] = useState(0);
  const goto = useCallback((p:number)=> setPage(Math.max(0, Math.min(p,pages-1))),[pages]);
  return (
    <section className="mt-14">
  <h2 className="text-lg md:text-xl font-semibold mb-6 text-black">Rating & Reviews</h2>
      <div className="relative overflow-hidden">
        {/* The inner track automatically becomes pages * 100% wide because each child has flex-basis:100% */}
        <div className="flex transition-transform duration-500 ease-out" style={{transform:`translateX(-${page*100}%)`}}>
          {Array.from({length:pages}).map((_,pi)=> {
            const slice = sample.slice(pi*per, pi*per + per);
            return (
              <div key={pi} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full shrink-0 basis-full px-px">
                {slice.map(r=> (
                  <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                    <div className="flex justify-center mb-3" aria-label="Rating 5 out of 5">
                      <div className="flex gap-1 text-[28px] ">
                        {Array.from({length:5}).map((_,i)=>(<span key={i} className="text-[#FFE245] leading-none">★</span>))}
                      </div>
                    </div>
                    <p className="text-[14px] md:text-[16px] text-gray-600 leading-relaxed flex-1 text-center">{r.text}</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-200 mt-6">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        <Image src={r.avatar} alt={r.name} width={36} height={36} />
                      </div>
                      <div>
                        <p className="text-[14px] md:text-[15px] font-medium text-gray-800">{r.name}</p>
                        {/* <p className="text-[12px] text-gray-400">Italy</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-5">
        {Array.from({length:pages}).map((_,i)=>(
          <button key={i} aria-label={`Go to slide ${i+1}`} onClick={()=>goto(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i===page?'bg-[#4A5D52]':'bg-gray-300 hover:bg-gray-400'}`}/>
        ))}
      </div>
    </section>
  );
}
