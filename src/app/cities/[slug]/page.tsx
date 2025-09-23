import React from 'react';
import { notFound } from 'next/navigation';
import MainHeader from '../../../components/MainHeader';
import MainFooter from '../../../components/MainFooter';
import Image from 'next/image';
import Link from 'next/link';
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
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image src={city.hero} alt={city.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-[#1A211E]/60" />
          </div>
          <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-[11px] mb-5">
              <span className="uppercase tracking-wide">{city.country}</span>
              <span className="text-white/40">•</span>
              <span>{city.region}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">Explore {city.name}</h1>
            <p className="max-w-2xl text-sm md:text-base text-gray-200 leading-relaxed mb-6">{city.description}</p>
            <div className="flex flex-wrap gap-3 text-[11px]">
              {city.tags.map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20 tracking-wide uppercase">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Municipality */}
        <section id="municipality" className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-10 md:gap-12 items-start">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{city.municipality.heading}</h2>
              {city.municipality.body.map((p,i)=>(
                <p key={i} className="text-sm leading-relaxed text-gray-600">{p}</p>
              ))}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="#accommodations" className="text-[12px] font-medium text-[#254E3E] hover:underline">Accommodations</Link>
                <Link href="#attractions" className="text-[12px] font-medium text-[#254E3E] hover:underline">Attractions</Link>
                <Link href="#events" className="text-[12px] font-medium text-[#254E3E] hover:underline">Events</Link>
              </div>
            </div>
            <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
              {city.municipality.images.map((img,i)=>(
                <div key={i} className="relative h-48 rounded-xl overflow-hidden bg-gray-200">
                  <Image src={img} alt="municipality" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Attractions */}
        <section id="attractions" className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">Top Attractions</h2>
            <Link href="#" className="text-[12px] text-[#254E3E] font-medium hover:underline">View all</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {attractions.map(a => (
              <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="relative h-40 bg-gray-100">
                  <Image src={a.image} alt={a.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-1">{a.name}</h3>
                  <p className="text-[12px] text-gray-600 line-clamp-2">{a.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accommodations */}
        <section id="accommodations" className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">Places to Stay</h2>
            <Link href="#" className="text-[12px] text-[#254E3E] font-medium hover:underline">Browse all</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {accommodations.map(stay => (
              <div key={stay.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="relative h-40 bg-gray-100">
                  <Image src={stay.images[0]} alt={stay.name} fill className="object-cover" />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-[11px] px-2 py-1 rounded-full">{stay.rating.toFixed(1)}</div>
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-semibold leading-snug">{stay.name}</h3>
                  <p className="text-[12px] text-gray-600 line-clamp-2">{stay.short}</p>
                  <div className="mt-auto flex items-center justify-between text-[12px] pt-1">
                    <span className="font-medium text-[#254E3E]">${stay.price}/night</span>
                    <Link href="#" className="text-[#254E3E] hover:underline font-medium">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events */}
        <section id="events" className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">Upcoming Events</h2>
            <Link href="/events" className="text-[12px] text-[#254E3E] font-medium hover:underline">All events</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map(ev => (
              <div key={ev.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="relative h-36 bg-gray-100">
                  <Image src={city.hero} alt={ev.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2 text-[10px] uppercase bg-black/60 text-white px-2 py-1 rounded-full">Event</div>
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-semibold leading-snug">{ev.title}</h3>
                  <p className="text-[12px] text-gray-600 line-clamp-2">Happening on {new Date(ev.date).toLocaleDateString(undefined,{ month:'short', day:'numeric'})}</p>
                  <div className="mt-auto flex items-center justify-between text-[12px] pt-1">
                    <span className="text-gray-500">{ev.price}</span>
                    <Link href="/events" className="text-[#254E3E] hover:underline font-medium">Details</Link>
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
