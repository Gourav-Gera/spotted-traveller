"use client";
import React, { useState } from 'react';
import MainHeader from '../../../components/MainHeader';
import MainFooter from '../../../components/MainFooter';
import Image from 'next/image';
import { attractions, cities } from '../../../data/cities';
import { useParams } from 'next/navigation';

function getAttraction(id:string){
  const att = attractions.find(a=>a.id===id);
  if(!att) return null;
  const city = cities.find(c=>c.slug===att.city);
  const images = [att.image, ...(city?.gallery||[])].filter(Boolean).slice(0,4);
  return { ...att, city, images };
}

export default function AttractionDetail(){
  const params = useParams();
  const id = params?.id as string;
  const data = getAttraction(id);
  const [active,setActive] = useState(data?.images[0]);
  if(!data) return <div className="min-h-screen flex flex-col bg-white"><MainHeader /><main className="flex-1 flex items-center justify-center text-sm text-gray-500">Not found</main><MainFooter /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F4]">
      <MainHeader />
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 pt-10 pb-24">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 flex gap-4">
            <div className="flex md:flex-col gap-3 order-2 md:order-1">
              {data.images.map((img,i)=>(
                <button key={img+i} onClick={()=>setActive(img)} className={`relative w-16 h-16 rounded-md overflow-hidden border ${active===img? 'ring-2 ring-[#4A5D52] border-transparent':'border-gray-200 hover:border-[#4A5D52]'}`}> 
                  <Image src={img} alt={data.name} fill className="object-cover" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 h-[300px] md:h-[340px] rounded-xl overflow-hidden shadow-sm order-1 md:order-2">
              {active && <Image src={active} alt={data.name} fill className="object-cover" />}
            </div>
          </div>
          <div className="md:col-span-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{data.name}</h1>
            <div className="text-[13px] leading-relaxed text-gray-700 space-y-4">
              <p>Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id feugiat libero. Donec eget interdum magna. Proin sit amet aliquam dolor. Duis non volutpat purus. Proin eleifend convallis leo, nec gravida erat lacinia quis. Nullam nulla ligula, commodo eget nisi non, vehicula aliquet mauris.</p>
              <p>Mauris vehicula magna id tristique pharetra. Nullam pretium, ipsum quis finibus tincidunt, quam ex ornare enim, a dignissim nisi sapien eget urna. Quisque vel odio accumsan, congue libero in, lacinia ante. Quisque quis leo ac neque tristique sollicitudin aliquet sit amet lacus.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6 mt-12">
          <div className="md:col-span-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-md font-semibold mb-5">Important things to remember</h2>
              <dl className="space-y-4 text-[12px]">
                <div className="flex items-start justify-between gap-4"><dt className="text-gray-500">Best time to visit</dt><dd className="font-medium text-gray-800">Winter</dd></div>
                <div className="flex items-start justify-between gap-4"><dt className="text-gray-500">Opening days</dt><dd className="font-medium text-gray-800">All days</dd></div>
                <div className="flex items-start justify-between gap-4"><dt className="text-gray-500">Time</dt><dd className="font-medium text-gray-800">10:00AM – 06:00PM</dd></div>
              </dl>
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="bg-white rounded-xl p-2 h-[200px] md:h-[220px] shadow-sm border border-gray-100 relative overflow-hidden">
              <Image src="/images/map-google.png" alt="Map" fill className="object-cover opacity-95" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#8B3F09] text-white flex items-center justify-center text-[12px] font-semibold shadow-lg">★</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating & Reviews slider */}
        <ReviewsSlider />
      </main>
      <MainFooter />
    </div>
  );
}

// Simple slider component (no external dependency) to mimic reference dots & cards
function ReviewsSlider(){
  const reviews = Array.from({length:6}).map((_,i)=>({
    id:i,
    name:'William',
    country:'Italy',
    text:'Etiam egestas magna purus, quis vehicula enim euismod in. Duis vestibulum purus ac arcu elementum, id vestibulum nisi pulvinar. Nullam venenatis iaculis sapien, volutpat dapibus est tristique eget.',
  }));
  const [index,setIndex] = useState(0);
  const perView = 3;
  const pages = Math.ceil(reviews.length / perView);
  const start = index * perView;
  const visible = reviews.slice(start, start+perView);

  return (
    <section className="mt-14" aria-label="Rating & Reviews">
      <h2 className="text-base md:text-lg font-semibold mb-6">Rating & Reviews</h2>
      <div className="overflow-hidden relative">
        <div className="grid md:grid-cols-3 gap-6 transition-all">
          {visible.map(r=> (
            <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col gap-4 min-h-[210px]">
              <div className="text-amber-400 text-sm" aria-label="5 stars">★★★★★</div>
              <p className="text-[12px] text-gray-600 leading-relaxed">{r.text}</p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-200 mt-auto">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 relative">
                  <Image src="/images/colosseum.jpg" alt={r.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-gray-800">{r.name}</p>
                  <p className="text-[11px] text-gray-400">{r.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({length:pages}).map((_,i)=> (
            <button key={i} onClick={()=>setIndex(i)} className={`w-3 h-3 rounded-full ${i===index? 'bg-[#4A5D52]':'bg-gray-300 hover:bg-gray-400'} transition`}/>
          ))}
        </div>
      </div>
    </section>
  );
}
