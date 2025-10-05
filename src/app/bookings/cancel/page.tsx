"use client";
import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CancelPublicBooking(){
  const router = useRouter();
  const id = useSearchParams().get('id');
  const [reason,setReason] = useState('');
  const [notes,setNotes] = useState('');
  function submit(e:React.FormEvent){e.preventDefault(); router.push(`/bookings/${id}`);} // simulate
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
  <main className="flex-1 max-w-[900px] mx-auto w-full px-5 sm:px-8 lg:px-10 pt-12 sm:pt-14 pb-24 sm:pb-28 text-[13px]">
        <h1 className="text-[24px] font-semibold mb-10">Cancel Booking</h1>
        <form onSubmit={submit} className="max-w-xl space-y-6">
          <select value={reason} onChange={e=>setReason(e.target.value)} className="w-full h-11 rounded-full border border-gray-300 px-5 text-[12px] outline-none">
            <option value="">Select reason</option>
            <option>Change of plans</option>
            <option>Price too high</option>
            <option>Found better option</option>
          </select>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Explain us here..." className="w-full h-40 rounded-2xl border border-gray-300 p-5 text-[12px] outline-none resize-none" />
          <button className="w-full h-11 rounded-full bg-[var(--color-accent-primary)] text-white text-[13px]">Submit</button>
        </form>
      </main>
  <Footer />
    </div>
  );
}
