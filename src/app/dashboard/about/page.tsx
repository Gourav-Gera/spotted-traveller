"use client";
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage(){
  const images = ['/images/rome-city-image-1.png','/images/rome-city-image-2.png','/images/rome-city-image-3.png','/images/rome-city-image-1.png','/images/rome-city-image-2.png'];
  const perSlide = 2; // show 2 per row like design screenshot
  const slideCount = useMemo(()=> Math.ceil(images.length / perSlide),[images.length]);
  const slides = useMemo(()=> {
    const groups: string[][] = [];
    for(let i=0;i<images.length;i+=perSlide){
      const chunk = images.slice(i, i+perSlide);
      if(chunk.length < perSlide){
        // wrap to beginning so the last slide is filled
        chunk.push(...images.slice(0, perSlide - chunk.length));
      }
      groups.push(chunk);
    }
    return groups;
  },[images]);
  const [slide,setSlide] = useState(0);
  function go(i:number){
    const len = slides.length;
    const wrapped = ((i % len) + len) % len; // safe modulo
    setSlide(wrapped);
  }
  const next = () => go(slide+1);
  const prev = () => go(slide-1);

  return (
    <div className="min-h-screen p-0">
      <div className="">
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary">About Hallstatt Municipality</h1>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/about/edit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#445B50] text-white text-sm">Edit About</Link>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 text-primary border-[#4A5D52] text-sm">Delete About</button>
          </div>
        </div>

  <div className="card-surface rounded-xl p-6">
          {/* Image slider */}
          <div className="mb-6">
    <div className="group relative overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500 ease-out" style={{width:`${slides.length*100}%`, transform:`translateX(-${(slide*100)/slides.length}%)`}}>
                {slides.map((group,s)=>(
          <div key={s} className="flex-none flex gap-4" style={{width:`${100/slides.length}%`}}>
                    {group.map((src,i)=>(
                    <div key={i} className="overflow-hidden rounded-2xl h-64 md:h-72 flex-1">
                        <Image src={src} alt={`about-img-${s}-${i}`} width={800} height={400} className="w-full h-full object-cover" />
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

          <div className="space-y-4 text-sm text-[var(--gray)] leading-relaxed">
            <p>Tucked away in the Salzkammergut region of Upper Austria, Hallstatt is a captivating lakeside municipality known for its breathtaking natural landscape and deep historical roots. Surrounded by the crystal-clear waters of Lake Hallstatt and the towering Dachstein mountains, this charming village offers an unforgettable experience that blends nature, culture, and tradition.</p>
            <p>Hallstatt’s story begins over 7,000 years ago, with archaeological evidence revealing it as one of the world’s oldest known salt production centers. This ancient connection to salt—once known as "white gold"—gave rise to a flourishing community that played a vital role in trade and cultural exchange across Europe. The region even lent its name to the "Hallstatt Culture," a key phase in early European history. Walking through the village feels like stepping into a postcard—narrow alleyways lined with pastel-colored alpine houses, vibrant floral balconies, and traditional Austrian architecture at every turn. The municipality takes immense pride in preserving its heritage, with well-maintained structures, local museums, and ongoing cultural festivals that celebrate its roots.</p>
            <p>Beyond its aesthetic appeal, Hallstatt is a hub for exploration and learning. Visitors can discover underground salt mines, enjoy panoramic views from the Skywalk platform, take boat rides across the lake, or hike through lush forest trails. Educational exhibits and guided tours help people of all ages understand the social and environmental evolution of this unique settlement.</p>
            <p>Despite its global recognition and influx of tourism, Hallstatt remains a close-knit community. The municipality focuses on sustainability, environmental care, and maintaining a peaceful rhythm of life that respects both locals and visitors. Every element, from municipal planning to community events, reflects a harmonious balance between tradition and progress.</p>
            <p>Whether you're a history enthusiast, a nature lover, or a curious traveler, Hallstatt’s municipality offers a one-of-a-kind narrative—one that continues to evolve while remaining deeply rooted in Europe’s cultural foundation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
