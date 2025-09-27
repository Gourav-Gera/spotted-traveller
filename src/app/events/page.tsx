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
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1">
        <section className="max-w-7xl mx-auto pt-10 pb-4">
          <h1 className="text-[24px] md:text-[28px] font-semibold tracking-tight text-[#222] mb-3">Events in Rome</h1>
          <p className="text-[13px] md:text-[14px] text-[#4F4F4F] leading-relaxed max-w-2xl mb-9">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {allEvents.map(ev => (
              <article key={ev.id} className="rounded-xl border border-[#E3E3E3] bg-white overflow-hidden flex flex-col shadow-[0_2px_4px_-1px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                <div className="relative h-28 bg-gray-200">{/* thumbnail */}
                  {ev.hero && <Image src={ev.hero} alt={ev.title} fill className="object-cover" />}
                </div>
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between text-[12px] text-[#222]">
                    <span className="inline-flex items-center gap-1"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>{new Date(ev.date).toLocaleDateString(undefined,{ day:'2-digit', month:'short', year:'numeric'})}</span>
                    <span className="inline-flex items-center gap-1"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>03:00 PM</span>
                  </div>
                  <h2 className="text-[13px] font-semibold leading-snug">{ev.title}</h2>
                  <p className="text-[12px] text-gray-600 leading-relaxed line-clamp-3">Experience {ev.title} in {ev.cityName}, with family & friends.</p>
                  <div className="mt-auto flex items-center justify-between pt-1">
                    <span className="inline-flex items-center gap-1 text-[12px] text-gray-600"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>{ev.cityName}, Italy</span>
                    <Link href={`/events/${ev.id}`} className="text-[12px] px-4 py-1.5 rounded-full border border-[#B4601B] text-[#B4601B] hover:bg-orange-50">Know More</Link>
                  </div>
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
