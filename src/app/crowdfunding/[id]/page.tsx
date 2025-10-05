"use client";
import React from 'react';
import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import { getCampaignById } from '../../../data/crowdfunding';
import { useParams } from 'next/navigation';

export default function PublicCampaignDetail(){
  const { id } = useParams();
  const campaign = getCampaignById(String(id || ''));
  if(!campaign){
    return (
      <div className="min-h-screen flex flex-col">
        <MainHeader />
        <main className="flex-1 flex items-center justify-center p-10">
          <p className="text-sm text-gray-600">Campaign not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
  const remaining = Math.max(0, campaign.goal - campaign.raised);
  const daysLeft = Math.max(0, campaign.duration - campaign.daysPassed);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 w-full">
        <article className="app-container pt-10 lg:pt-14 pb-14 lg:pb-16 px-6 sm:px-8 lg:px-10">
          <header className="flex items-start justify-between mb-10">
            <h1 className="text-[40px] font-semibold tracking-tight leading-tight text-black max-w-3xl">{campaign.title}</h1>
            <div className="hidden md:block text-[11px] text-[#333] leading-tight pr-4 pt-2">
              <p className="font-medium mb-1 text-md text-desc">Created On:</p>
              <p className='font-semibold text-lg'>03 Aug 2025</p>
            </div>
          </header>
          {/* Top row: gallery (1 large left, 4 small right in 2x2) */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10 lg:mb-12">
            {/* Left stack for mobile, side-by-side on lg */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-8">
              {/* Large image */}
              <div className="relative w-full lg:w-[640px] h-[220px] sm:h-[260px] lg:h-[440px] rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image src="/images/crowd-gallery-img-1.png" alt={campaign.title} fill className="object-cover" />
              </div>
              {/* Thumbnails grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 lg:flex-1 lg:min-w-[440px] lg:mt-0 mt-4">
                {['/images/crowd-gallery-img-2.png','/images/crowd-gallery-img-3.png','/images/crowd-gallery-img-4.png','/images/crowd-gallery-img-5.png'].map((g,i)=>(
                  <div key={i} className="relative h-[120px] sm:h-[150px] lg:h-[210px] rounded-2xl overflow-hidden bg-gray-100">
                    <Image src={g} alt={campaign.title+' '+i} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Description + funding card row */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <section className="flex-1 max-w-[900px] space-y-6">
              <div className="bg-white rounded-2xl">
                <h3 className="font-semibold mb-2 text-[14px] text-black">Detailed Description:</h3>
                <p className='text-desc text-[13px] leading-relaxed'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum venenatis libero purus, quis interdum est venenatis et. Nunc facilisis ipsum ac congue tincidunt. Duis sed bibendum odio. Sed facilisis mollis enim, ut egestas felis auctor a. Praesent dolor purus, pretium in lacus id, tincidunt maximus ipsum.</p>
              </div>
              <div className="bg-white rounded-2xl">
                <h3 className="font-semibold mb-2 text-[14px] text-black">Purpose of the Campaign:</h3>
                <p className='text-desc text-[13px]'>Raise Funds to build new dam</p>
              </div>
              <div className="bg-white rounded-2xl">
                <h3 className="font-semibold mb-2 text-[14px] text-black">Raising funds for:</h3>
                <p className='text-desc text-[13px]'>For the People of Rome village & near connected cities</p>
              </div>
            </section>
            <aside className="w-full lg:w-[380px]">
              <div className="rounded-[24px] shadow-sm border border-[#E5E5E5] bg-white p-6 lg:p-7 space-y-6 w-full">
                <div className="flex items-center justify-between text-[13px]">
                  <p className="font-semibold text-black text-lg">Funding Progress</p>
                  <p className="font-semibold text-lg text-[color:var(--color-accent-primary)]">{String(progress).padStart(2,'0')}%</p>
                </div>
                <p className="text-[16px] font-medium text-primary mb-2"><span className="text-[color:var(--color-accent-primary)]">€{campaign.raised.toLocaleString()}</span> / €{campaign.goal.toLocaleString()}</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-[#4A5D52] rounded-full" style={{width: progress + '%'}} />
                </div>
                <div className="block grid-cols-2 gap-8 pt-2 text-[12px]">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-black text-[16px]">Donors Count</p>
                    <p className="font-bold text-[#222]">{campaign.donors}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-black text-[16px]">Duration:</p>
                    <p className="font-bold text-[#222]">{campaign.daysPassed} / {campaign.duration} Days</p>
                  </div>
                </div>
                <button className="w-full h-12 rounded-full bg-[#4A5D52] cursor-pointer text-white text-[16px] font-medium">Donate</button>
              </div>
            </aside>
          </div>
        </article>
      </main>
  <Footer />
    </div>
  );
}
