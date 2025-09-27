"use client";
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MainHeader from '../../../components/MainHeader';
import MainFooter from '../../../components/MainFooter';
import Image from 'next/image';
import Link from 'next/link';
import { events, cities } from '../../../data/cities';

// Central mapping for dedicated event image sets (override city images when present)
// Each array should contain up to 4 images (will truncate / repeat as needed)
const EVENT_IMAGE_SETS: Record<string,string[]> = {
  // Example: All events currently share the same placeholder set; adjust per event id if distinct assets are added
  'ev-1': ['/images/event-tab-img.webp','/images/event-img-2.png','/images/event-img-3.png','/images/event-img-4.png'],
  'ev-2': ['/images/event-tab-img.webp','/images/event-img-2.png','/images/event-img-3.png','/images/event-img-4.png'],
  'ev-3': ['/images/event-tab-img.webp','/images/event-img-2.png','/images/event-img-3.png','/images/event-img-4.png'],
  'ev-4': ['/images/event-tab-img.webp','/images/event-img-2.png','/images/event-img-3.png','/images/event-img-4.png']
};

// Build a richer event meta on the fly (since base data is minimal)
function useEventDetail(id: string){
  const ev = events.find(e => e.id === id);
  if(!ev) return null;
  const city = cities.find(c => c.slug === ev.city);

  // Prefer dedicated event image set when provided
  let baseImages = EVENT_IMAGE_SETS[id];
  if(!baseImages){
    baseImages = [city?.hero, ...(city?.gallery||[])].filter(Boolean) as string[];
  }
  // Ensure at least 4 thumbs for the vertical strip (repeat last if needed)
  while(baseImages.length < 4 && baseImages.length>0){ baseImages.push(baseImages[baseImages.length-1]); }

  return {
    ...ev,
    cityName: city?.name || ev.city,
    cityCountry: city?.country || 'Italy',
    images: baseImages.slice(0,4),
    hero: baseImages[0],
    longDescription: `Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id feugiat libero. Donec eget interdum magna. Phasellus ornare, magna vitae posuere dapibus, dolor metus placerat nisl, a fermentum est lectus sed arcu. Cras eget lorem nec lacus dignissim aliquet. Vivamus vehicula elementum odio ac varius.\n\nMauris vehicula magna id tristique pharetra. Nullam pretium, ipsum quis finibus tincidunt, quam ex ornare enim, a dignissim nisi sapien eget nunc. Quisque vel odio accumsan, congue libero in, lacinia orci. Quisque quis leo ac neque tristique sollicitudin aliquet sit amet lacus. Proin tincidunt porttitor ultrices. Quisque eleifend arcu at egestas consequat. Donec elementum risus nec purus viverra, vitae ultricies tellus ultricies.`
  };
}

export default function EventDetailPage(){
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || '';
  const event = useEventDetail(id);
  const [active, setActive] = useState(event?.hero);

  if(!event) return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 flex items-center justify-center p-20 text-sm text-gray-500">Event not found.</main>
      <MainFooter />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F4]">
      <MainHeader />
      <main className="flex-1 max-w-7xl mx-auto w-full pt-10 pb-24">
        {/* Top layout: thumbs + main image + text */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Thumbnails + main image */}
          <div className="md:col-span-6 flex gap-4">
            <div className="flex md:flex-col gap-3 order-2 md:order-1">
              {event.images.map((img,i)=>(
                <button key={img+i} onClick={()=>setActive(img)} className={`relative w-16 h-16 rounded-md overflow-hidden border ${active===img? 'ring-2 ring-[#3E5F55] border-transparent':'border-gray-200 hover:border-[#3E5F55]'}`}> 
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 h-[300px] md:h-[340px] rounded-xl overflow-hidden shadow-sm order-1 md:order-2">
              {active && <Image src={active} alt={event.title} fill className="object-cover" />}
            </div>
          </div>
          {/* Text content */}
            <div className="md:col-span-6">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{event.title}</h1>
              <div className="prose prose-sm max-w-none text-[13px] leading-relaxed text-gray-700 whitespace-pre-line">
                {event.longDescription}
              </div>
            </div>
        </div>

        {/* Info + map row */}
        <div className="grid md:grid-cols-12 gap-6 mt-12">
          <div className="md:col-span-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-md font-semibold mb-5">Important things to remember</h2>
              <dl className="space-y-4 text-[12px]">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#060608]">Event Entry</dt>
                  <dd className="font-semibold text-md text-gray-800">{event.price}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#060608]">Date</dt>
                  <dd className="font-semibold text-md text-gray-800">{new Date(event.date).toLocaleDateString(undefined,{ month:'long', day:'numeric', year:'numeric'})}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[#060608]">Time Duration</dt>
                  <dd className="font-semibold text-md text-gray-800">3 PM – 11 PM</dd>
                </div>
              </dl>
              {/* Buttons removed per updated design */}
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="bg-white rounded-xl p-2 h-[240px] md:h-[260px] shadow-sm border border-gray-100 relative overflow-hidden">
              <Image src="/images/map-google.png" alt="Map" fill className="object-cover opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#8B3F09] text-white flex items-center justify-center text-[12px] font-semibold shadow-lg">★</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
