"use client";
import React, { useState } from 'react';

const sample = Array.from({length:6}).map((_,i)=>({
  id:i,
  name:'William',
  text:'Etiam egestas magna purus, quis vehicula enim euismod in. Duis vestibulum purus ac arcu elementum, id vestibulum nisi pulvinar. Nullam venenatis iaculis sapien, volutpat dapibus est tristique eget.'
}));

export function ReviewSlider(){
  const [page,setPage] = useState(0);
  const per=3; const pages=Math.ceil(sample.length/per);
  const slice= sample.slice(page*per, page*per+per);
  return (
    <section className="mt-14">
      <h2 className="text-base md:text-lg font-semibold mb-6">Rating & Reviews</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {slice.map(r=> (
          <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
            <div className="text-amber-400 text-sm">★★★★★</div>
            <p className="text-[12px] text-gray-600 leading-relaxed">{r.text}</p>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-200 mt-auto">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100" />
              <div>
                <p className="text-[13px] font-medium text-gray-800">{r.name}</p>
                <p className="text-[11px] text-gray-400">Italy</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({length:pages}).map((_,i)=>(<button key={i} onClick={()=>setPage(i)} className={`w-3 h-3 rounded-full ${i===page? 'bg-[#3E5F55]':'bg-gray-300'}`}/>))}
      </div>
    </section>
  );
}
