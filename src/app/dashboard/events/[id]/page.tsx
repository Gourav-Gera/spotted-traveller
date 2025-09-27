"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
// Removed slider; using static image grid


// react-slick with no SSR
// const Slider = dynamic(() => import("react-slick"), { ssr: false });

// interface Props {
//   params: { id: string };
// }

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const id = params?.id || "1";
  const title = "Florence Jazz Festival";

  const images = useMemo(()=>["/images/why-1.webp","/images/why-2.webp","/images/why-3.webp","/images/why-1.webp"],[]); // duplicate for demo
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

  return (
    <div className="min-h-screen p-0">
      <div className="card-surface rounded-xl p-6">
        {/* Top section: Title + Actions */}
        <div className="flex items-start justify-between mb-6">
          <h1 className="font-bold text-xl mb-4 text-primary">
            {title}
          </h1>

          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/events/${id}/edit`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#445B50] text-white text-sm"
            >
              <BiEdit className="w-4 h-4" />
              Edit Event
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 text-primary border-[#4A5D52] text-sm">
              <FiTrash2 className="w-4 h-4" />
              Delete Event
            </button>
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


        {/* Bottom Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <p className="text-sm text-[var(--gray)] mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Vestibulum venenatis libero purus, ut interdum est venenatis et.
              Nunc facilisis ipsum ac congue tincidunt. Duis sed bibendum odio.
              Sed facilisis mollis enim, ut egestas felis auctor a.
            </p>

            <div className="mt-4 overflow-hidden rounded-lg">
              <Image
                src="/images/home-banner-img.webp"
                alt="map"
                width={900}
                height={320}
                className="w-full h-64 md:h-72 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">
                  Important things to remember
                </h3>
                <ul className="text-sm space-y-2">
                  <li>
                    <span className="font-medium">Event Entry</span>{" "}
                    <span className="float-right">Free</span>
                  </li>
                  <li>
                    <span className="font-medium">Date</span>{" "}
                    <span className="float-right">August 15, 2025</span>
                  </li>
                  <li>
                    <span className="font-medium">Time Duration</span>{" "}
                    <span className="float-right">3 PM - 11 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
