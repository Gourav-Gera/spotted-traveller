"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";

// sample rows to mirror the other table pages
const rows = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `City ${i + 1}`,
  code: `C${i + 1}`,
  accommodations: 5 + (i % 6),
  attractions: 1 + (i % 4),
  avatar: "/images/hotel-img-table.png",
}));

export default function CitiesPage() {
  const [q, setQ] = useState("");

  // table overflow / scrolling helpers (same pattern used in bookings)
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = tableRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollByDir = (dir: number) => {
    const el = tableRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.7, 600);
    const target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + dir * amount));
    el.scrollTo({ left: target, behavior: "smooth" });
    setTimeout(updateScrollButtons, 300);
  };

  useEffect(() => {
    updateScrollButtons();
    const onResize = () => updateScrollButtons();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // selected filter values
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedAccommodationRange, setSelectedAccommodationRange] = useState<string | null>(null);
  const [selectedAttractionRange, setSelectedAttractionRange] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let out = rows.slice();

    if (term) {
      out = out.filter((r) => [r.name, r.code].some((v) => v.toLowerCase().includes(term)));
    }

    if (selectedLocation) {
      out = out.filter((r) => r.name === selectedLocation);
    }

    if (selectedAccommodationRange) {
      if (selectedAccommodationRange === '0 - 5') out = out.filter((r) => r.accommodations >= 0 && r.accommodations <= 5);
      else if (selectedAccommodationRange === '6 - 10') out = out.filter((r) => r.accommodations >= 6 && r.accommodations <= 10);
    }

    if (selectedAttractionRange) {
      if (selectedAttractionRange === '0 - 2') out = out.filter((r) => r.attractions >= 0 && r.attractions <= 2);
      else if (selectedAttractionRange === '3+') out = out.filter((r) => r.attractions >= 3);
    }

    return out;
  }, [q, selectedLocation, selectedAccommodationRange, selectedAttractionRange]);

  // avatar error state (not used in this page)
  // dropdown state for filter buttons
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const filtersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!filtersRef.current) return;
      if (!filtersRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className="min-h-screen p-0">
      <div className="">
        {/* Header: title left, search+add right, filters row below right */}
        <div className="mb-6 grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12">
            <h2 className="font-semibold text-2xl text-primary">Cities</h2>
           
          </div>

          <div className="col-span-12 flex flex-col items-end">
            <div className="flex items-center gap-4 w-full flex-wrap">
                <div className="flex-1">
                <div className="hidden sm:flex items-center gap-3 bg-white rounded-full px-4 py-3 border border-[#E5E5E5] ">
                  <svg width="18" height="18" viewBox="0 0 24 24" className="text-desc">
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by city name..." className="w-full text-sm bg-transparent placeholder-desc outline-none" />
                </div>
              </div>

              <Link href="/dashboard/cities/new" className="inline-flex items-center px-6 py-3 rounded-full border border-[#4A5D52] text-primary font-medium whitespace-nowrap">  <FiPlus className="w-4 h-4 mr-2" /> Add New City</Link>
            </div>

            <div ref={filtersRef} className="mt-6 flex gap-3 justify-start w-full flex-wrap">
              	<div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'location' ? null : 'location'); }}
              className="flex items-center gap-3 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm"
            >
              <Image src="/images/location-icon.svg" alt="location icon" width={14} height={14} className="w-3.5 h-3.5" />
              <span>{selectedLocation ?? 'Location'}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" className="ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" stroke="currentColor" />
              </svg>
            </button>

            {openDropdown === 'location' && (
              <div className="absolute left-0 mt-2 w-44 bg-white rounded-md shadow-sm z-50">
              <button onClick={() => { setSelectedLocation(null); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">All Locations</button>
              <button onClick={() => { setSelectedLocation('City 1'); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">City 1</button>
              <button onClick={() => { setSelectedLocation('City 2'); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">City 2</button>
              </div>
            )}
              	</div>

              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'accommodation' ? null : 'accommodation'); }}
                  className="flex items-center gap-3 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm"
                >
                  <Image src="/images/accomodation-icon.svg" alt="accommodation icon" width={14} height={14} className="w-3.5 h-3.5" />
                  <span>{selectedAccommodationRange ?? 'Number of Accommodation'}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" className="ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" />
                  </svg>
                </button>

                {openDropdown === 'accommodation' && (
                  <div className="absolute left-0 mt-2 w-52 bg-white rounded-md shadow-sm z-50">
                    <button onClick={() => { setSelectedAccommodationRange(null); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">All</button>
                    <button onClick={() => { setSelectedAccommodationRange('0 - 5'); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">0 - 5</button>
                    <button onClick={() => { setSelectedAccommodationRange('6 - 10'); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">6 - 10</button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'attraction' ? null : 'attraction'); }}
                  className="flex items-center gap-3 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm"
                >
                  <Image src="/images/attraction-icon.svg" alt="attraction icon" width={14} height={14} className="w-3.5 h-3.5" />
                  <span>{selectedAttractionRange ?? 'Number of Attraction'}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" className="ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" />
                  </svg>
                </button>

                {openDropdown === 'attraction' && (
                  <div className="absolute left-0 mt-2 w-52 bg-white rounded-md shadow-sm z-50">
                    <button onClick={() => { setSelectedAttractionRange(null); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">All</button>
                    <button onClick={() => { setSelectedAttractionRange('0 - 2'); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">0 - 2</button>
                    <button onClick={() => { setSelectedAttractionRange('3+'); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">3+</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card-surface p-0 mb-6 overflow-hidden rounded-2xl">
          {/* Desktop table */}
          <div className="relative hidden md:block">
            <div ref={tableRef} className="overflow-x-auto booking-table-wrap" onScroll={() => updateScrollButtons()}>
              <table className="min-w-full text-sm booking-table table-fixed">
                <thead>
                  <tr className="text-left text-[var(--gray)]">
                    <th className="w-12">#</th>
                    <th className="w-64">City Name</th>
                    <th className="w-48 text-center">Listed Accommodation</th>
                    <th className="w-48 text-center">Listed Attraction</th>
                    <th className="w-24 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="align-middle">
                      <td className="py-4">{String(r.id).padStart(2, '0')}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Image src={r.avatar} alt={r.name} width={40} height={40} className="w-10 h-10 rounded-md object-cover block" />
                          <div>
                            <div className="font-semibold leading-tight">{r.name}</div>
                            <div className="text-xs text-gray-500">{r.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center font-semibold">{r.accommodations}</td>
                      <td className="py-4 text-center font-semibold">{r.attractions}</td>
                      <td className="py-4 text-right">
                        <div className="inline-flex items-center justify-end gap-4">
                          <Link href={`/dashboard/cities/${encodeURIComponent(r.name)}`} className="text-[var(--primary)]">
                            <Image src="/images/eye-icon.svg" alt="view" width={16} height={16} className="w-4 h-4" />
                          </Link>
                          <Link href={`/dashboard/cities/new?slug=${encodeURIComponent(r.name)}`} className="text-sm">
                            <Image src="/images/edit-icon.svg" alt="edit" width={16} height={16} className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* slide controls for wide text / overflow on large screens */}
            {(canScrollLeft || canScrollRight) && (
              <>
                <button
                  onClick={() => scrollByDir(-1)}
                  aria-label="Scroll left"
                  className="hidden md:inline-flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={() => scrollByDir(1)}
                  aria-label="Scroll right"
                  className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                </button>
              </>
            )}
          </div>

          {/* Mobile: stacked cards */}
          <div className="md:hidden space-y-4 p-4">
            {filtered.map((r) => (
              <div key={r.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <Image src={r.avatar} alt={r.name} width={56} height={56} className="w-14 h-14 rounded-md object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[var(--gray)]">{r.name}</div>
                        <div className="font-semibold">{r.name}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold">{r.accommodations}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md bg-[#F1F3F4] flex items-center justify-center text-sm font-semibold text-[var(--primary)]">{r.code}</div>
                        <div className="font-semibold">{r.name}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link href={`/dashboard/cities/${r.id}`} className="text-[var(--primary)]">
                          <Image src="/images/eye-icon.svg" alt="eye icon" width={20} height={20} className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
