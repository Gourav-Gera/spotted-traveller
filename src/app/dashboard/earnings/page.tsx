"use client";
import React, { useState } from "react";
import EarningChart from '../../../components/EarningChart';
import Image from 'next/image';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { FiEye, FiEdit } from 'react-icons/fi';

export default function EarningsPage(){
  const [mode,setMode] = useState<'monthly'|'weekly'|'today'>('monthly');
  const [category,setCategory] = useState<'all'|'accommodation'|'ecommerce'>('all');
  const [showPriceMenu,setShowPriceMenu] = useState(false);
  const [showDateMenu,setShowDateMenu] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(null);

  const rows = Array.from({length:10}).map((_,i)=>({
    id: `#${23467+i}`,
    product: i%2? 'Product Name':'Hotel Name',
    user: 'User Name',
    earning: '$100',
    date: '3 July 2025'
  }));

  // helpers to filter rows based on selected filters
  const parseEarningValue = (s: string) => {
    const n = Number(s.replace(/[^0-9.-]+/g, ''));
    return Number.isFinite(n) ? n : 0;
  };

  const parseRowDate = (s: string) => {
    // attempt a permissive parse; fallback to epoch 0
    const d = new Date(s);
    return isNaN(d.getTime()) ? new Date(0) : d;
  };

  const filteredRows = rows.filter((r) => {
    // price filter
    if (selectedPriceRange) {
      const v = parseEarningValue(r.earning);
      if (selectedPriceRange === '$0 - $50' && !(v >= 0 && v <= 50)) return false;
      if (selectedPriceRange === '$50 - $200' && !(v > 50 && v <= 200)) return false;
      if (selectedPriceRange === '$200+' && !(v > 200)) return false;
    }

    // date filter
    if (selectedDateRange) {
      const d = parseRowDate(r.date);
      const now = new Date();
      if (selectedDateRange === 'Last 7 days') {
        const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
        if (!(diff <= 7)) return false;
      }
      if (selectedDateRange === 'Last 30 days') {
        const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
        if (!(diff <= 30)) return false;
      }
      if (selectedDateRange === 'This year') {
        if (d.getFullYear() !== now.getFullYear()) return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen p-0">
      <div className="">
        <h1 className="font-bold text-xl mb-4 text-primary">Earnings</h1>
        {/* Top cards */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className=" bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-sm">Earning</div>
              <div className="flex items-center gap-2 border border-[#E5E5E5] rounded-full p-1">
                {(['monthly','weekly','today'] as const).map(m=> (
                  <button key={m} onClick={()=>setMode(m)} className={`px-3 py-1 rounded-full text-xs md:text-sm ${mode===m? 'bg-[var(--primary)] text-white':'bg-transparent text-gray-600'}`}>{m.charAt(0).toUpperCase()+m.slice(1)}</button>
                ))}
              </div>
            </div>
            <EarningChart mode={mode} />
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col">
            <div className="font-semibold text-sm mb-3">Earning</div>
            <div className="rounded-lg bg-[var(--primary)] text-white text-center py-6 text-lg font-semibold mb-4">$200<div className="text-sm font-normal mt-1">Total Earning</div></div>
            <div className="grid grid-cols-2 gap-3 text-center flex-1">
              <div className="rounded-md border border-[#E5E5E5] flex flex-col items-center justify-center py-3">
                <div className="font-bold text-lg mb-1">$120</div>
                <div className="text-sm text-gray-400 mb-1">Accommodation</div>
              </div>
              <div className="rounded-md border border-[#E5E5E5] flex flex-col items-center justify-center py-3">
                <div className="font-bold text-lg mb-1">$80</div>
                <div className="text-sm text-gray-400 mb-1">E-commerce</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex mb-4 rounded-full border border-[#E5E5E5] overflow-hidden w-full bg-[#F6F7F9]">
          {(['all','accommodation','ecommerce'] as const).map(c=> {
            const active = category===c;
            return (
              <button
                key={c}
                onClick={()=>setCategory(c)}
                className={`pill-tab flex-1 whitespace-nowrap text-xs md:text-sm font-medium ${active? 'bg-[var(--primary)] text-white':'text-[var(--gray)]'}`}
              >
                {c==='all'? 'All': c==='accommodation'? 'Accommodation':'E-commerce'}
              </button>
            );
          })}
        </div>

        {/* Search */}
  <div className="hidden sm:flex items-center gap-2 bg-white rounded-full px-3 py-3 border border-[#E5E5E5] mb-4 w-full max-w-none">
          <BiSearch className="text-gray-400 text-xl" />
          <input placeholder="Search here..." className="w-full placeholder:text-gray-400 text-sm bg-transparent outline-none" />
        </div>

        {/* Filter pills */}
            <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative">
            <button onClick={()=>{ setShowPriceMenu(v=>!v); setShowDateMenu(false); }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)] text-white text-xs md:text-sm">
              <Image src="/images/doller-price-icon.svg" alt="price range" width={16} height={16} className="w-4 h-4" />
              <span>{selectedPriceRange ?? 'Price Range'}</span>
              <span className="text-xs">▾</span>
            </button>
            {showPriceMenu && (
              <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-20 text-sm">
                {['$0 - $50','$50 - $200','$200+'].map(opt=> <div key={opt} className="px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={()=> { setSelectedPriceRange(opt); setShowPriceMenu(false); }}>{opt}</div>)}
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={()=>{ setShowDateMenu(v=>!v); setShowPriceMenu(false); }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)] text-white text-xs md:text-sm">
              <Image src="/images/date-icon.svg" alt="date filter" width={16} height={16} className="w-4 h-4" />
              <span>{selectedDateRange ?? 'By Date'}</span>
              <span className="text-xs">▾</span>
            </button>
            {showDateMenu && (
              <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-20 text-sm">
                {['Last 7 days','Last 30 days','This year'].map(opt=> <div key={opt} className="px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={()=> { setSelectedDateRange(opt); setShowDateMenu(false); }}>{opt}</div>)}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Table - aligned with Bookings / Orders styling */}
        <div className="relative hidden md:block">
          <div className="overflow-x-auto booking-table-wrap">
            <table className="min-w-full text-sm booking-table table-fixed">
              <thead>
                <tr className="text-left text-[var(--gray)]">
                  <th className="w-12">#</th>
                  <th className="w-32">Transaction Id</th>
                  <th className="w-60">Product / Accommodation</th>
                  <th className="w-40">User Name</th>
                  <th className="w-28">Earning</th>
                  <th className="w-36">Date</th>
                  <th className="w-24 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((r,i)=>(
                  <tr key={r.id} className="align-middle">
                    <td className="py-4">{String(i+1).padStart(2,'0')}</td>
                    <td className="py-4">{r.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-md" />
                        <span className="font-semibold">{r.product}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Image src="/images/user-thumb-table.svg" alt={r.user} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                        <span className="font-semibold">{r.user}</span>
                      </div>
                    </td>
                    <td className="font-semibold py-4">{r.earning}</td>
                    <td className="py-4">{r.date}</td>
                    <td className="py-4 text-right">
                      <div className="inline-flex items-center justify-end gap-4">
                        <Link href={`/dashboard/earnings/${encodeURIComponent(String(r.id))}`} className="text-[var(--primary)]">
                          <Image src="/images/eye-icon.svg" alt="view" width={16} height={16} className="w-4 h-4" />
                        </Link>
                        <Link href={`/dashboard/earnings/${encodeURIComponent(String(r.id))}/edit`} className="text-sm">
                          <Image src="/images/edit-icon.svg" alt="edit" width={16} height={16} className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile stacked cards (mirroring Cities style) */}
        <div className="md:hidden space-y-4">
          {rows.map((r,i)=>(
            <div key={r.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 bg-gray-100 rounded-md" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[var(--gray)]">{r.product}</div>
                      <div className="font-semibold">{r.product}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold">{r.earning}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="font-medium">Txn: {r.id}</span>
                      <span className="text-[var(--gray)]">{r.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link href="#" className="text-[var(--primary)]">
                        <Image src="/images/eye-icon.svg" alt="eye icon" width={20} height={20} className="w-5 h-5" />
                      </Link>
                      <Link href="#" className="text-sm">
                        <Image src="/images/edit-icon.svg" alt="edit" width={20} height={20} className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                <div className="mt-4 flex items-center justify-between text-xs text-[var(--gray)]">
                  <span>User: <span className="font-medium text-black">{r.user}</span></span>
                  <span className="font-semibold text-black">{r.earning}</span>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
