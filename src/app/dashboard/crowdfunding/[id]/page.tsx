"use client";

import Link from 'next/link';
import Image from 'next/image';
import { BiEdit } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';

export default function CampaignDetailPage({ params }: { params: { id: string } }){
  const id = params?.id || '1';
  const title = 'Restore City Library';
  const progress = 62; // percent (sample)
  const raised = 6200; const goal = 10000; const donors = 233; const duration = 30;

  return (
    <div className="min-h-screen p-0">
      <div className="card-surface rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary">{title}</h1>
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/crowdfunding/${id}/edit`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#445B50] text-white text-sm"><BiEdit className="w-4 h-4"/>Edit Campaign</Link>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 text-primary border-[#4A5D52] text-sm"><FiTrash2 className="w-4 h-4"/>Delete Campaign</button>
          </div>
        </div>
        <div className="mb-4">
          <span className={`inline-block px-5 py-2 rounded-full text-xs font-semibold ${progress>=100? 'bg-emerald-100 text-emerald-700':'bg-yellow-100 text-yellow-700'}`}>{progress>=100? 'Completed':'Ongoing'}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="overflow-hidden rounded-lg md:col-span-2">
            <Image src="/images/why-1.webp" alt="main" width={900} height={400} className="w-full h-56 md:h-72 object-cover" />
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image src="/images/rome-city-image-1.png" alt="secondary" width={600} height={400} className="w-full h-56 md:h-72 object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-5 text-sm text-[var(--gray)] leading-relaxed">
            <div>
              <h4 className="text-sm font-semibold mb-1 text-primary">Purpose of the Campaign:</h4>
              <p>Raise funds to build new dam</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1 text-primary">Raising funds for</h4>
              <p>For the People of Rome village & near connected cities</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1 text-primary">Detailed Description:</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum venenatis libero purus, quis interdum est venenatis et. Nunc facilisis ipsum ac congue tincidunt. Duis sed bibendum odio. Sed facilisis mollis enim, ut egestas felis auctor a. Praesent dolor purus, pretium in lacus, tincidunt maximus ipsum.</p>
            </div>
            <button className={`w-full md:w-auto px-8 py-3 rounded-full text-sm font-medium ${progress>=100? 'bg-[#445B50] text-white':'bg-[#445B50] text-white'}`}>{progress>=100? 'Mark as Completed':'Mark as Completed'}</button>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-sm font-semibold mb-2">Funding Progress</h3>
                <div className="flex items-center justify-between text-xs mb-1"><span>{progress}%</span></div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#445B50]" style={{width: `${progress}%`}} />
                </div>
                <div className="text-sm font-medium">€{raised.toLocaleString()}/€{goal.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[var(--gray)] mb-1">Donors Count</div>
                  <div className="font-semibold">{donors}</div>
                </div>
                <div>
                  <div className="text-[var(--gray)] mb-1">Duration</div>
                  <div className="font-semibold">12 / {duration} Days</div>
                </div>
              </div>
              <button className="w-full border border-[#4A5D52] text-primary rounded-full py-2 text-xs">⬇ Download Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
