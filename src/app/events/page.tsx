import React from 'react';
import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/MainFooter';
import { cities, events } from '../../data/cities';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Events | Spotted',
  description: 'Discover cultural, food, art and seasonal events across highlighted cities.'
};

export default function EventsPage(){
  // Join events with city meta (since events are stored separately)
  const allEvents = events.map(ev => {
    const cityMeta = cities.find(c => c.slug === ev.city);
    return {
      ...ev,
      cityName: cityMeta?.name || ev.city,
      citySlug: cityMeta?.slug || ev.city,
      hero: cityMeta?.hero || cityMeta?.gallery?.[0]
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F4]">
      <MainHeader />
      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-[#2F3C34] via-[#36463D] to-[#1F2622] text-white">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Events & Happenings</h1>
            <p className="text-sm md:text-base max-w-2xl text-gray-200 leading-relaxed">Find festivals, cultural celebrations, food fairs, exhibitions and seasonal experiences across our curated European cities. Plan your trip around something unforgettable.</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#F4F5F4] to-transparent" />
        </section>

        <section className="max-w-6xl mx-auto px-6 -mt-6 pb-16 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map(ev => (
              <article key={ev.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden group">
                <div className="relative h-40 bg-gray-200">
                  {ev.hero && (
                    <Image src={ev.hero} alt={ev.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  )}
                  <div className="absolute top-2 left-2 text-[10px] uppercase bg-black/60 backdrop-blur rounded-full px-2 py-1 tracking-wide text-white font-medium">Event</div>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-[#3F4C43]">
                    <span className="px-2 py-0.5 rounded-full bg-[#E7EEE9]">{ev.cityName}</span>
                    <span className="text-gray-400">•</span>
                    <span>{new Date(ev.date).toLocaleDateString(undefined,{ month:'short', day:'numeric', year:'numeric'})}</span>
                  </div>
                  <h2 className="text-sm font-semibold leading-snug line-clamp-2">{ev.title}</h2>
                  <p className="text-[12px] text-gray-600 leading-relaxed line-clamp-3 flex-1">Experience {ev.title} in {ev.cityName}. Limited spots, plan ahead.</p>
                </div>
                <div className="px-5 pb-5 mt-auto flex items-center justify-between text-[12px]">
                  <Link href={`/cities/${ev.citySlug}#events`} className="font-medium text-[#254E3E] hover:underline">View City</Link>
                  <span className="text-gray-500">{ev.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}
