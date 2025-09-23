"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdLocationOn, MdStar, MdAttachMoney, MdHotel } from 'react-icons/md';
import { FiPlus, FiEye, FiEdit } from 'react-icons/fi';

export default function AccommodationsPage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<string | null>(null);
  const filtersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!filtersRef.current) return;
      if (!filtersRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const rows = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Hotel ${i + 1}`,
    location: i % 2 === 0 ? 'Rome, Italy' : 'Milan, Italy',
    earning: `$${100 + (i % 3) * 50}`,
    rating: (i % 5) + 1,
    rooms: i % 4 === 0 ? 1 : i % 4 === 1 ? 2 : i % 4 === 2 ? 3 : 4
  }));

  const availableLocations = Array.from(new Set(rows.map(r => r.location)));

  const parseEarningValue = (s: string) => Number(s.replace(/[^0-9.-]+/g, '')) || 0;

  const filteredRows = useMemo(() => {
    return rows.filter(r => {
      if (selectedLocation && r.location !== selectedLocation) return false;
      if (selectedRating && r.rating !== selectedRating) return false;
      if (selectedPriceRange) {
        const v = parseEarningValue(r.earning);
        if (selectedPriceRange === '$0 - $100' && !(v >= 0 && v <= 100)) return false;
        if (selectedPriceRange === '$101 - $200' && !(v > 100 && v <= 200)) return false;
        if (selectedPriceRange === '$200+' && !(v > 200)) return false;
      }
      if (selectedRooms) {
        if (selectedRooms === '1' && r.rooms !== 1) return false;
        if (selectedRooms === '2-3' && !(r.rooms >= 2 && r.rooms <= 3)) return false;
        if (selectedRooms === '4+' && !(r.rooms >= 4)) return false;
      }
      return true;
    });
  }, [rows, selectedLocation, selectedRating, selectedPriceRange, selectedRooms]);

  return (
    <div className="min-h-screen p-0">
      <div className="">
        <div className="mb-6 grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12">
            <h2 className="font-semibold text-2xl text-primary">Accommodations</h2>
          </div>

            <div className="col-span-12 flex flex-col items-end">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <div className="hidden sm:flex items-center gap-3 bg-white rounded-full px-4 py-3 border border-[#EFEFEF] shadow-sm w-full">
                    <svg width="18" height="18" viewBox="0 0 24 24" className="text-[#9aa09e]">
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    <input placeholder="Search accommodations..." className="w-full text-sm bg-transparent placeholder:text-[#9aa09e] outline-none" />
                  </div>
                </div>
                <Link href="/dashboard/accommodations/new" className="inline-flex items-center px-6 py-3 rounded-full border border-[#4A5D52] text-primary font-medium whitespace-nowrap"><FiPlus className="w-4 h-4 mr-2" /> Add New Accommodation</Link>
              </div>

              <div ref={filtersRef} className="mt-6 flex gap-3 justify-start w-full flex-wrap">
                <div className="relative">
                  <button onClick={(e)=>{ e.stopPropagation(); setOpenDropdown(openDropdown==='location' ? null : 'location'); }} className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm">
                    <MdLocationOn />
                    <span>{selectedLocation ?? 'Location'}</span>
                  </button>
                  {openDropdown === 'location' && (
                    <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-20 text-sm">
                      <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedLocation(null); setOpenDropdown(null); }}>All Locations</div>
                      {availableLocations.map(loc => (
                        <div key={loc} className="px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedLocation(loc); setOpenDropdown(null); }}>{loc}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button onClick={(e)=>{ e.stopPropagation(); setOpenDropdown(openDropdown==='rating' ? null : 'rating'); }} className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm">
                    <MdStar />
                    <span>{selectedRating ? `${selectedRating}★` : 'Rating'}</span>
                  </button>
                  {openDropdown === 'rating' && (
                    <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg w-40 z-20 text-sm">
                      <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedRating(null); setOpenDropdown(null); }}>All Ratings</div>
                      {[5,4,3,2,1].map(r => (
                        <div key={r} className="px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedRating(r); setOpenDropdown(null); }}>{r}★</div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button onClick={(e)=>{ e.stopPropagation(); setOpenDropdown(openDropdown==='price' ? null : 'price'); }} className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm">
                    <MdAttachMoney />
                    <span>{selectedPriceRange ?? 'Price Range'}</span>
                  </button>
                  {openDropdown === 'price' && (
                    <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-20 text-sm">
                      {['$0 - $100','$101 - $200','$$200+'].map(opt => (
                        <div key={opt} className="px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedPriceRange(opt); setOpenDropdown(null); }}>{opt}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button onClick={(e)=>{ e.stopPropagation(); setOpenDropdown(openDropdown==='rooms' ? null : 'rooms'); }} className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm">
                    <MdHotel />
                    <span>{selectedRooms ?? 'Number of Rooms'}</span>
                  </button>
                  {openDropdown === 'rooms' && (
                    <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg w-40 z-20 text-sm">
                      {['1','2-3','4+'].map(opt => (
                        <div key={opt} className="px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedRooms(opt); setOpenDropdown(null); }}>{opt}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
        </div>

        <div className="card-surface p-0 mb-6 overflow-hidden rounded-2xl">
          {/* Desktop table */}
          <div className="overflow-x-auto booking-table-wrap hidden md:block">
            <table className="min-w-full text-sm booking-table table-fixed">
              <thead>
                <tr className="text-left bg-[#F6F6F6] text-[var(--gray)]">
                  <th className="w-12 py-4 pl-6 first:rounded-tl-2xl">#</th>
                  <th className="w-64 py-4">Hotel Name</th>
                  <th className="w-40 py-4">Location</th>
                  <th className="w-40 py-4">Total Earning</th>
                  <th className="w-24 py-4 last:rounded-tr-2xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((r) => (
                  <tr key={r.id} className="align-middle border-t border-[#E9E9E9]">
                    <td className="py-6 text-sm text-[#6a6f6d]">{String(r.id).padStart(2, '0')}</td>
                    <td className="py-6">
                      <div className="flex items-center gap-3">
                        <Image src="/images/hotel-img-table.png" alt="thumb" width={32} height={32} className="rounded-md object-cover" />
                        {r.name}
                      </div>
                    </td>
                    <td className="py-6">{r.location}</td>
                    <td className="py-6">{r.earning}</td>
                    <td className="py-6 text-right">
                      <div className="inline-flex items-center justify-end gap-3">
                        <Link href={`/dashboard/accommodations/${r.id}`} className="text-[var(--primary)]">
                         <Image src="/images/eye-icon.svg" alt="view" width={20} height={20} className="w-5 h-5" />
                        </Link>
                        <Link href={`/dashboard/accommodations/${r.id}`} className="text-sm">
                         <Image src="/images/edit-icon.svg" alt="edit" width={20} height={20} className="w-5 h-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="md:hidden p-4 space-y-4">
            {filteredRows.map(r => (
              <div key={r.id} className="bg-white rounded-xl border border-[#EFEFEF] p-4 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <Image src="/images/hotel-img-table.png" alt="hotel" width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.location}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/dashboard/accommodations/${r.id}`} className="text-[var(--primary)]">
                      <FiEye className="w-5 h-5" />
                    </Link>
                    <Link href={`/dashboard/accommodations/${r.id}/edit`} className="text-sm">
                      <FiEdit className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pt-1">
                  <span className="text-gray-500">Earning</span>
                  <span className="font-semibold">{r.earning}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
