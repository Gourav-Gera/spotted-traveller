import React from 'react';
import MainHeader from '../../../components/MainHeader';
import MainFooter from '../../../components/MainFooter';
import Image from 'next/image';
import { getCampaignById } from '../../../data/crowdfunding';

interface PageProps { params: { id: string }; }

export default function PublicCampaignDetail({ params }: PageProps){
  const campaign = getCampaignById(params.id);
  if(!campaign){
    return (
      <div className="min-h-screen flex flex-col">
        <MainHeader />
        <main className="flex-1 flex items-center justify-center p-10">
          <p className="text-sm text-gray-600">Campaign not found.</p>
        </main>
        <MainFooter />
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
        <article className="max-w-[1400px] mx-auto pt-14 pb-16 px-10">
          <header className="flex items-start justify-between mb-10">
            <h1 className="text-[38px] font-semibold tracking-tight leading-tight text-[#222] max-w-3xl">{campaign.title}</h1>
            <div className="hidden md:block text-[11px] text-[#333] leading-tight pr-4 pt-2">
              <p className="font-medium mb-1">Created On:</p>
              <p>03 Aug 2025</p>
            </div>
          </header>
          {/* Top row: gallery only */}
          <div className="flex flex-col lg:flex-row gap-16 mb-14">
            <div className="flex-1">
              <div className="flex gap-10">
                {/* Large primary image */}
                <div className="relative rounded-[26px] overflow-hidden w-[620px] h-[440px] bg-gray-100 flex-shrink-0">
                  <Image src="/images/crowd-gallery-img-1.png" alt={campaign.title} fill className="object-cover" />
                </div>
                {/* Right side mosaic */}
                <div className="flex-1 min-w-[460px] pt-0">
                  <div className="grid gap-6" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
                    {['/images/crowd-gallery-img-2.png','/images/crowd-gallery-img-3.png','/images/crowd-gallery-img-4.png'].map((g,i)=>(
                      <div key={i} className="relative h-[210px] rounded-[24px] overflow-hidden bg-gray-100">
                        <Image src={g} alt={campaign.title+' top '+i} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-6 mt-6" style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
                    {['/images/crowd-gallery-img-5.png','/images/crowd-gallery-img-2.png'].map((g,i)=>(
                      <div key={i} className="relative h-[210px] rounded-[24px] overflow-hidden bg-gray-100">
                        <Image src={g} alt={campaign.title+' bottom '+i} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Description + funding card row */}
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            <section className="space-y-8 text-[13px] leading-relaxed text-[#222] flex-1 max-w-[900px]">
              <div>
                <h3 className="font-semibold mb-1">Detailed Description:</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum venenatis libero purus, quis interdum est venenatis et. Nunc facilisis ipsum ac congue tincidunt. Duis sed bibendum odio. Sed facilisis mollis enim, ut egestas felis auctor a. Praesent dolor purus, pretium in lacus id, tincidunt maximus ipsum.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Purpose of the Campaign:</h3>
                <p>Raise Funds to build new dam</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Raising funds for:</h3>
                <p>For the People of Rome village & near connected cities</p>
              </div>
            </section>
            <aside className="w-full lg:w-[380px]">
              <div className="rounded-[24px] shadow-sm border border-[#E5E5E5] bg-white p-8 space-y-7 w-full">
                <div className="flex items-center justify-between text-[12px] text-[#333]">
                  <p className="font-semibold">Funding Progress</p>
                  <p className="font-medium">{progress}%</p>
                </div>
                <p className="text-[15px] font-medium text-[#222]">€{campaign.raised.toLocaleString()} / €{campaign.goal.toLocaleString()}</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4A5D52]" style={{width: progress + '%'}} />
                </div>
                <div className="grid grid-cols-2 gap-8 pt-2 text-[12px]">
                  <div>
                    <p className="text-gray-600 mb-1">Donors Count</p>
                    <p className="font-semibold text-[#222]">{campaign.donors}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Duration</p>
                    <p className="font-semibold text-[#222]">{campaign.daysPassed} / {campaign.duration} Days</p>
                  </div>
                </div>
                <button className="w-full h-11 rounded-full bg-[#4A5D52] text-white text-[13px] font-medium">Donate</button>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <MainFooter />
    </div>
  );
}
