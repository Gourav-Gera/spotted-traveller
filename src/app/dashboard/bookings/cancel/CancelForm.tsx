"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CancelForm(){
  const router = useRouter();
  const [reason, setReason] = useState('Change of plans');
  const [note, setNote] = useState('');

  function onSubmit(e: React.FormEvent){
    e.preventDefault();
    // Mock submit: navigate back to bookings list after submit
    router.push('/dashboard/bookings');
  }

  return (
  <form onSubmit={onSubmit} className=" rounded-2xl shadow-[0_4px_16px_-2px_rgba(0,0,0,0.08)] sm:p-8">
      <div className="mb-4">
        {/* <label className="block text-sm mb-2">Select reason</label> */}
  <select value={reason} onChange={(e)=>setReason(e.target.value)} className="w-full border border-[#E5E7EB] rounded-full p-3 focus:outline-none text-sm">
          <option>Change of plans</option>
          <option>Double booking</option>
          <option>Other</option>
        </select>
      </div>
      <div className="mb-6">
        {/* <label className="block text-sm mb-2">Explain in here...</label> */}
  <textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder='Explain in here...' className="w-full border border-[#E5E7EB] rounded-xl p-3 h-36 resize-none focus:outline-none text-sm" />
      </div>
      <div>
        <button type="submit" className="w-full btn-primary-pill">Submit</button>
      </div>
    </form>
  )
}
