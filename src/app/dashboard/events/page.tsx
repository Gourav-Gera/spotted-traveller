import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function EventsPage() {
  const rows = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: 'Florence Jazz Festival',
    date: 'Aug 15, 2025',
    time: '3PM - 11PM',
    fee: 'Free',
  }));

  return (
    <div className="min-h-screen p-0">
      <div className="">
        <div className="mb-6 grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12">
            <h2 className="font-semibold text-3xl text-primary">Events</h2>
          </div>

          <div className="col-span-12 flex flex-col items-end">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
                <div className="flex-1 min-w-0">
                <div className="hidden sm:flex items-center gap-3 bg-white rounded-full px-4 py-3 border border-[#EFEFEF] shadow-sm w-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" className="text-[#9aa09e]">
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  <input placeholder="Search by city name..." className="w-full text-sm bg-transparent placeholder:text-[#9aa09e] outline-none" />
                </div>
              </div>
              <Link href="/dashboard/events/new" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#445B50] text-white font-medium shadow-sm sm:ml-4 w-full sm:w-auto">+ Add New Event</Link>
            </div>

            <div className="mt-6 flex gap-3 justify-start w-full flex-wrap">
              <button className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm">Event Date</button>
              <button className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm">Entry Fee</button>
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
                  <th className="w-64 py-4">Event name</th>
                  <th className="w-40 py-4">Date</th>
                  <th className="w-40 py-4">Event Time</th>
                  <th className="w-28 py-4">Entry Fee</th>
                  <th className="w-24 py-4 last:rounded-tr-2xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="align-middle border-t border-[#E9E9E9]">
                    <td className="py-6 text-sm text-[#6a6f6d]">{String(r.id).padStart(2, '0')}</td>
                    <td className="py-6">{r.name}</td>
                    <td className="py-6">{r.date}</td>
                    <td className="py-6">{r.time}</td>
                    <td className="py-6">{r.fee}</td>
                    <td className="py-6 text-right">
                      <div className="inline-flex items-center justify-end gap-3">
                        <Link href={`/dashboard/events/${r.id}`} className="text-[var(--primary)]">
                          <Image src="/images/eye-icon.svg" alt="view" width={16} height={16} className="w-4 h-4" />
                        </Link>
                        <Link href={`/dashboard/events/${r.id}/edit`} className="text-sm">
                          <Image src="/images/edit-icon.svg" alt="edit" width={16} height={16} className="w-4 h-4" />
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
            {rows.map(r => (
              <div key={r.id} className="bg-white rounded-xl border border-[#EFEFEF] p-4 flex flex-col gap-3 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm leading-tight mb-1">{r.name}</div>
                    <div className="flex text-xs text-gray-500 gap-3 flex-wrap">
                      <span>{r.date}</span>
                      <span>{r.time}</span>
                      <span>{r.fee}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/dashboard/events/${r.id}`} className="text-[var(--primary)]">
                      <Image src="/images/eye-icon.svg" alt="view" width={20} height={20} className="w-5 h-5" />
                    </Link>
                    <Link href={`/dashboard/events/${r.id}/edit`} className="text-sm">
                      <Image src="/images/edit-icon.svg" alt="edit" width={20} height={20} className="w-5 h-5" />
                    </Link>
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

