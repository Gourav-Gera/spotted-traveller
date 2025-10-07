"use client";
import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { publicBookings, PublicBookingStatus } from '../../data/publicBookings';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

const tabs: {key:PublicBookingStatus,label:string}[] = [
  {key:'upcoming',label:'Upcoming'},
  {key:'ongoing',label:'Ongoing'},
  {key:'completed',label:'Completed'},
  {key:'cancelled',label:'Cancelled'}
];

export default function PublicBookingsPage(){
  const [tab,setTab] = useState<PublicBookingStatus>('upcoming');
  const filtered = useMemo(()=> publicBookings.filter(b=> b.status===tab),[tab]);
  const formatDate = (iso:string)=> new Date(iso).toLocaleDateString(undefined,{ day:'2-digit', month:'short', year:'numeric'});
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
  <main className="flex-1 app-container w-full px-5 sm:px-8 lg:px-10 pt-12 sm:pt-14 pb-24 sm:pb-28 text-[13px]">
    <h1 className="sm:text-[26px] text-[24px] font-semibold mb-6 text-black">Your Bookings</h1>
        <div className="w-full rounded-full border border-[#E5E5E5] flex mb-8 overflow-hidden text-[12px]">
          {tabs.map(t=> (
            <button key={t.key} onClick={()=>setTab(t.key)} className={`flex-1 h-11 rounded-full transition text-center ${t.key===tab? 'bg-[var(--color-accent-primary)] text-white font-medium':'text-gray-600'}`}>{t.label}</button>
          ))}
        </div>
        <div>
          {filtered.map((b,i)=> (
            <div key={b.id} className="flex items-start gap-6 py-7 border-b last:border-b-0">
              <Image src="/images/hotel-img-table.png" alt={b.hotel} width={72} height={72} className="w-18 h-18 rounded-md object-cover" />
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-[14px] font-semibold mb-2 text-black">{b.hotel}</h3>
                <div className="space-y-1 text-[12px] text-desc">
                  <p className="flex items-center gap-2"><FiCalendar className="text-gray-500 text-[13px]"/> Date:- {formatDate(b.startDate)}</p>
                  <p className="flex items-center gap-2"><FiMapPin className="text-gray-500 text-[13px]"/> Location:- <span className="font-medium text-black">{b.city}, {b.country}</span></p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4 shrink-0">
                <p className="text-[13px] font-semibold text-primary">${b.pricePerNight}</p>
                <Link href={`/bookings/${b.id}`} className="inline-flex items-center justify-center h-9 px-6 rounded-full border border-gray-400 text-[11px] hover:bg-gray-50">View Details →</Link>
              </div>
            </div>
          ))}
          {filtered.length===0 && <div className="text-[12px] text-gray-500 py-10">No bookings found.</div>}
        </div>
      </main>
  <Footer />
    </div>
  );
}
