import React from 'react';
import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { crowdfundingCampaigns } from '../../data/crowdfunding';
import { FiUser, FiClock } from 'react-icons/fi';

export const metadata = {
  title: 'Crowdfunding Campaigns | Spotted',
  description: 'Support community & city improvement crowdfunding campaigns.'
};

export default function PublicCrowdfundingListing(){
  // Repeat campaigns to fill grid similar to reference (8 cards)
  const display = [...crowdfundingCampaigns, ...crowdfundingCampaigns, ...crowdfundingCampaigns].slice(0,8);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 w-full">
        {/* Hero Banner */}
        <div className="app-container mx-auto px-8 mt-8 mb-10">
          <div className="relative h-52 md:h-56 rounded-[26px] overflow-hidden">
            <Image src="/images/crowdfunding-banner-img.png" alt="Help Now" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-[28px] md:text-[34px] font-medium tracking-tight">Help Now</h1>
            </div>
          </div>
        </div>
        <section className="app-container mx-auto pb-24 px-8">
          <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {display.map((c,i)=>{
              const timeLeft = Math.max(0, c.duration - c.daysPassed);
              return (
                <article key={c.id+ '_' + i} className="rounded-[16px] bg-white border border-[#E2E2E2] hover:shadow-md transition-shadow p-3 flex flex-col w-full shadow-[0_2px_4px_-1px_rgba(0,0,0,0.04)]">
                  <div className="relative h-36 rounded-[14px] overflow-hidden mb-3">
                    <Image src={['/images/crowd-gallery-img-2.png','/images/crowd-gallery-img-3.png','/images/crowd-gallery-img-4.png','/images/crowd-gallery-img-5.png'][i % 4]} alt={c.title} fill className="object-cover" />
                  </div>
                  <h2 className="text-[13px] font-semibold leading-snug text-black mb-1 line-clamp-2">{c.title}</h2>
                  <p className="text-[12px] text-desc leading-relaxed line-clamp-2 mb-2">{c.shortDescription}</p>
                  <p className="text-[12px] font-semibold text-[color:var(--color-accent-primary)] mb-1">€{c.raised.toLocaleString()} <span className="text-primary font-semibold">/ €{c.goal.toLocaleString()}</span></p>
                  <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-2">
                    <div className="h-full bg-[#4A5D52]" style={{width: Math.min(100, (c.raised / c.goal) * 100) + '%'}} />
                  </div>
                  <div className="flex items-center justify-between text-[12px] text-[#222] mb-4 mt-1">
                    <span className="inline-flex items-center gap-1.5">
                      <FiUser className='text-black' size={13} />
                      <span>Donors:-</span>
                      <span className="font-semibold text-black">{c.donors.toLocaleString()}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiClock size={13} />
                      <span>Time Left:-</span>
                      <span className="font-semibold text-black">{timeLeft} Days</span>
                    </span>
                  </div>
                  <Link href={`/crowdfunding/${c.id}`} className="mt-auto inline-flex h-[40px] w-full items-center justify-center rounded-full bg-[#4A5D52] text-white text-[12px] font-medium">Donate</Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>
  <Footer />
    </div>
  );
}
