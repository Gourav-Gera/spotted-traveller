import React from 'react';
import { notFound } from 'next/navigation';
import MainHeader from '../../../components/MainHeader';
import MainFooter from '../../../components/MainFooter';
import Image from 'next/image';
import Link from 'next/link';
import CityMediaGallery from '../../../components/CityMediaGallery';
import { getCity, getCityAccommodations, getCityAttractions, getCityEvents } from '../../../data/cities';

interface CityPageProps { params: { slug: string } }

export function generateMetadata({ params }: CityPageProps){
  const city = getCity(params.slug);
  if(!city) return { title: 'City | Spotted'};
  return { title: `${city.name} Travel Guide | Spotted`, description: city.description };
}

export default function CityPage({ params }: CityPageProps){
  const city = getCity(params.slug);
  if(!city) return notFound();

  const attractions = getCityAttractions(city.slug).slice(0,6);
  const accommodations = getCityAccommodations(city.slug).slice(0,6);
  const events = getCityEvents(city.slug).slice(0,6);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F5]">
      <MainHeader />
      <main className="flex-1">
        {/* Top: gallery + details (as per Figma) */}
  <section className="max-w-7xl mx-auto pt-12 pb-10 px-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <CityMediaGallery images={[city.hero, ...city.gallery]} alt={city.name} />
            <div>
              <h1 className="text-[34px] md:text-[42px] font-semibold tracking-tight mb-5 leading-tight text-[#101418]">{city.name}</h1>
              <p className="text-[15px] md:text-[16px] text-[#5B6369] leading-relaxed mb-7 max-w-2xl">{city.description}</p>
              <div className="flex flex-wrap gap-3 mb-10">
                {city.tags.map((t, idx) => (
                  <span key={t} className="inline-flex items-center gap-2 text-[12px] tracking-wide px-5 py-2.5 rounded-full bg-[#8B3F09] text-white shadow-sm">
                    {idx === 0 && <span className="w-3 h-3 bg-white/80 rounded-sm" />} {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Accommodations (first section as in design) */}
        <section id="accommodations" className="max-w-6xl mx-auto px-6 md:px-10 py-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-[28px] md:text-[30px] font-semibold tracking-tight">Accommodation in {city.name}</h2>
              <p className="text-[14px] md:text-[15px] text-gray-500 mt-2">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
            </div>
            <Link href="#" className="inline-flex items-center gap-2 text-[12px] text-[#254E3E] font-medium border rounded-full px-4 py-2 hover:bg-gray-50">See All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accommodations.map(stay => (
              <div key={stay.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="relative h-40 bg-gray-100">
                  <Image src={stay.images[0]} alt={stay.name} fill className="object-cover" />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-[11px] px-2 py-1 rounded-full">{stay.rating.toFixed(1)}</div>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="text-[15px] font-semibold leading-snug">{stay.name}</h3>
                  <p className="text-[13px] text-gray-600 line-clamp-2">{stay.short}</p>
                  <div className="mt-auto flex items-center justify-between text-[13px] pt-1">
                    <span className="font-semibold text-[#254E3E]">${stay.price}/night</span>
                    <Link href="#" className="text-[#254E3E] hover:underline font-medium">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Municipality CTA Banner */}
        <section id="municipality" className="max-w-6xl mx-auto px-6 md:px-10 py-10">
          <div className="bg-[#8B3F09] text-white rounded-2xl px-8 md:px-10 py-8 md:py-9 flex items-center justify-between shadow">
            <div className="pr-4">
              <h2 className="text-[22px] md:text-[24px] font-semibold">Meet the Municipality</h2>
              <p className="text-[13px] md:text-[14px] opacity-95 mt-2 max-w-2xl">{city.municipality.body[0] || 'Learn about local support, services, and programs.'}</p>
            </div>
            <Link href="#" className="inline-flex items-center gap-2 bg-white text-[#8B3F09] rounded-full px-6 py-3 text-[13px] font-medium hover:bg-white/90">Explore <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          </div>
        </section>

        {/* Attractions */}
        <section id="attractions" className="max-w-6xl mx-auto px-6 md:px-10 py-14">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-[26px] md:text-[28px] font-semibold tracking-tight">Attraction Points in {city.name}</h2>
              <p className="text-[13px] md:text-[14px] text-gray-500 mt-2 max-w-xl">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>
            <Link href="#" className="inline-flex items-center gap-2 text-[12px] border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50">See All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map(a => (
              <div key={a.id} className="relative overflow-hidden rounded-xl">
                <div className="relative h-40 md:h-48">
                  <Image src={a.image} alt={a.name} fill className="object-cover" />
                </div>
                <span className="absolute left-2 bottom-2 text-[11px] text-white bg-black/60 rounded px-2 py-0.5">{a.name}</span>
              </div>
            ))}
          </div>
        </section>

        

        {/* Events */}
        <section id="events" className="max-w-6xl mx-auto px-6 md:px-10 py-14">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-[26px] md:text-[28px] font-semibold tracking-tight">Upcoming Events in {city.name}</h2>
              <p className="text-[13px] md:text-[14px] text-gray-500 mt-2 max-w-xl">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>
            <Link href="/events" className="inline-flex items-center gap-2 text-[12px] border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50">See All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map(ev => (
              <div key={ev.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                {/* image header */}
                <div className="relative h-44 md:h-[260px] bg-gray-100">
                  <Image src={city.hero} alt={ev.title} fill className="object-cover" />
                </div>
                {/* content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-[12px] text-gray-600">
                    <span className="inline-flex items-center gap-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>{new Date(ev.date).toLocaleDateString(undefined,{ day:'2-digit', month:'short', year:'numeric'})}</span>
                    <span className="inline-flex items-center gap-1"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>03:00 PM</span>
                  </div>
                  <h3 className="text-[16px] font-semibold mt-3">{ev.title}</h3>
                  <p className="text-[13px] text-gray-600 mt-1">Experience live jazz under the Tuscan stars, with family & friends</p>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[12px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>{city.name}, {city.country}</span>
                    <Link href="/events" className="text-[12px] rounded-full border border-[#8B3F09] text-[#8B3F09] px-5 py-1.5 hover:bg-orange-50">Know More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}
