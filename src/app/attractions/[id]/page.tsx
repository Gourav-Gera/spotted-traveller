"use client";
import React, { useState } from 'react';
import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import { attractions, cities } from '../../../data/cities';
import { useParams } from 'next/navigation';
import { ReviewSlider } from '../../../components/ecommerce/ReviewSlider';

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
  if(!data) return <div className="min-h-screen flex flex-col bg-white"><MainHeader /><main className="flex-1 flex items-center justify-center text-sm text-gray-500">Not found</main><Footer /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F4]">
      <MainHeader />
      <main className="flex-1 app-container mx-auto w-full px-6 pb-10 pt-10">
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
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-black">{data.name}</h1>
            <div className="text-[13px] leading-relaxed text-desc space-y-4">
              <p>Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id feugiat libero. Donec eget interdum magna. Proin sit amet aliquam dolor. Duis non volutpat purus. Proin eleifend convallis leo, nec gravida erat lacinia quis. Nullam nulla ligula, commodo eget nisi non, vehicula aliquet mauris.</p>
              <p>Mauris vehicula magna id tristique pharetra. Nullam pretium, ipsum quis finibus tincidunt, quam ex ornare enim, a dignissim nisi sapien eget urna. Quisque vel odio accumsan, congue libero in, lacinia ante. Quisque quis leo ac neque tristique sollicitudin aliquet sit amet lacus.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6 mt-12">
          <div className="md:col-span-4">
            <div className="bg-white rounded-xl p-6 box-shadow-sm border border-gray-100">
              <h2 className="text-md font-semibold mb-5 text-black">Important things to remember</h2>
              <dl className="space-y-4 text-[12px]">
                <div className="flex items-start justify-between gap-4"><dt className="text-black">Best time to visit</dt><dd className="font-semibold text-black">Winter</dd></div>
                <div className="flex items-start justify-between gap-4"><dt className="text-black">Opening days</dt><dd className="font-semibold text-black">All days</dd></div>
                <div className="flex items-start justify-between gap-4"><dt className="text-black">Time</dt><dd className="font-semibold text-black">10:00AM – 06:00PM</dd></div>
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

        {/* Rating & Reviews slider (shared 2-slide component) */}
        <ReviewSlider />
      </main>
  <Footer />
    </div>
  );
}

// Removed local ReviewsSlider in favor of shared components/ecommerce/ReviewSlider
