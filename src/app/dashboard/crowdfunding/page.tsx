"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type CampaignStatus = 'Ongoing' | 'Completed' | 'Cancelled';

interface Row { id:number; name:string; status:CampaignStatus; raised:number; goal:number; createdOn:string; duration:number; }

export default function CrowdfundingPage() {
  const data: Row[] = useMemo(()=>Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: 'Restore City Library',
    status: (i % 3 === 0 ? 'Ongoing' : i % 3 === 1 ? 'Completed' : 'Cancelled') as CampaignStatus,
    raised: i % 3 === 1 ? 10000 : 6200,
    goal: 10000,
    createdOn: '03 Aug 2025',
    duration: 30
  })),[]);

  const tabs: { key: string; label: string; }[] = [
    { key: 'all', label: 'All' },
    { key: 'Ongoing', label: 'Ongoing' },
    { key: 'Completed', label: 'Completed' },
    { key: 'Cancelled', label: 'Cancelled' }
  ];

  const [active, setActive] = useState<string>('all');
  const [query, setQuery] = useState('');

  const rows = data.filter(r => (active === 'all' || r.status === active) && r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen p-0">
      <div>
        <div className="mb-6">
          <h2 className="font-semibold text-3xl text-primary mb-6">Crowdfundings</h2>
          {/* Tabs ( segmented full-width like Orders/Earnings ) */}
          <div className="flex items-center justify-between gap-4 rounded-full border border-[#E5E5E5] overflow-hidden w-full mb-4">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={()=>setActive(t.key)}
                className={`pill-tab w-[25%] ${active===t.key ? 'bg-[var(--primary)] text-white' : 'bg-[#F6F7F9] text-[var(--gray)]'}`}
              >{t.label}</button>
            ))}
          </div>
          {/* Search + Add */}
          <div className="mt-4 flex items-center gap-4 w-full">
            <div className="flex-1">
              <div className="hidden sm:flex items-center gap-3 bg-white rounded-full px-4 py-3 border border-[#EFEFEF] shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" className="text-[#9aa09e]">
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by campaign title..." className="w-full text-sm bg-transparent placeholder:text-[#9aa09e] outline-none" />
              </div>
            </div>
            <Link href="/dashboard/crowdfunding/new" className="inline-flex items-center px-6 py-3 rounded-full bg-[#445B50] text-white font-medium shadow-sm ml-4">+ Add New Campaign</Link>
          </div>
        </div>

        <div className="card-surface p-0 mb-6 overflow-hidden rounded-2xl">
          <div className="overflow-x-auto booking-table-wrap">
            <table className="min-w-full text-sm booking-table table-fixed">
              <thead>
                <tr className="text-left bg-[#F6F6F6] text-[var(--gray)]">
                  <th className="w-12 py-4 pl-6 first:rounded-tl-2xl">#</th>
                  <th className="w-72 py-4">Campaign Title</th>
                  <th className="w-40 py-4">Raised / Target</th>
                  <th className="w-28 py-4">Duration</th>
                  <th className="w-32 py-4">Status</th>
                  <th className="w-40 py-4">Created On</th>
                  <th className="w-24 py-4 last:rounded-tr-2xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className="align-middle border-t border-[#E9E9E9]">
                    <td className="py-6 text-sm text-[#6a6f6d]">{String(r.id).padStart(2,'0')}</td>
                    <td className="py-6 font-medium">{r.name}</td>
                    <td className="py-6">€{r.raised.toLocaleString()} / €{r.goal.toLocaleString()}</td>
                    <td className="py-6">{r.duration} Days</td>
                    <td className="py-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide inline-block 
                        ${r.status==='Completed' ? 'bg-emerald-100 text-emerald-700' : r.status==='Cancelled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
                    </td>
                    <td className="py-6">{r.createdOn}</td>
                    <td className="py-6 text-right">
                      <div className="inline-flex items-center justify-end gap-3">
                        <Link href={`/dashboard/crowdfunding/${r.id}`} className="text-[var(--primary)]">
                          <Image src="/images/eye-icon.svg" alt="view" width={16} height={16} className="w-4 h-4" />
                        </Link>
                        <Link href={`/dashboard/crowdfunding/${r.id}/edit`} className="text-sm">
                          <Image src="/images/edit-icon.svg" alt="edit" width={16} height={16} className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {rows.length===0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-sm text-[var(--gray)]">No campaigns found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
