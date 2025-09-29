"use client";
import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/MainFooter';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CancelOrderPage(){
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get('id');
  const [reason,setReason] = useState('');
  const [notes,setNotes] = useState('');
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
  <main className="flex-1 max-w-[900px] mx-auto w-full px-5 sm:px-8 lg:px-10 pt-12 sm:pt-14 pb-24 sm:pb-28 text-[13px]">
        <h1 className="text-[24px] font-semibold mb-10">Cancel Order</h1>
        <div className="max-w-[520px] space-y-9">
          <div className="space-y-2">
            <label className="block text-[12px] font-semibold">Reason for cancellation</label>
            <select value={reason} onChange={e=>setReason(e.target.value)} className="w-full h-11 rounded-md border border-[#D8D8D8] px-3 text-[12px] bg-white focus:outline-none focus:ring-2 focus:ring-[#44564A]/30">
              <option value="">Select</option>
              <option value="delay">Delay in delivery</option>
              <option value="changed_mind">Changed my mind</option>
              <option value="wrong_item">Ordered wrong item</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-[12px] font-semibold">Additional notes (optional)</label>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={6} className="w-full rounded-md border border-[#D8D8D8] px-3 py-2 text-[12px] bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#44564A]/30" placeholder="Write something here..."></textarea>
            <p className="text-[10px] text-gray-500">Help us improve by telling us more.</p>
          </div>
          <div className="flex gap-4 pt-1">
            <button onClick={()=>router.back()} className="h-10 px-8 rounded-full border border-gray-400 text-[11px] hover:bg-gray-50">Back</button>
            <button disabled={!reason} onClick={()=>router.push('/orders')} className="h-10 px-8 rounded-full bg-[#44564A] text-white text-[11px] disabled:opacity-50 hover:enabled:bg-[#38473D]">Submit</button>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
