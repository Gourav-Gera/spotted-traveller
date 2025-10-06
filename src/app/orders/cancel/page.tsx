"use client";
// NOTE: this page is nested one level deeper (orders/cancel), so we need an extra '../'
// Previous path '../../components/...' pointed to app/orders/components which doesn't exist.
import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
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
  <main className="flex-1 max-w-[900px] mx-auto w-full px-5 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-20 sm:pb-28 text-[13px]">
    <h1 className="text-[24px] sm:text-[26px] font-semibold mb-8 text-black text-center sm:text-left">Cancel Order</h1>
    <div className="max-w-[560px] space-y-7 mx-auto">
          <div className="space-y-2">
            <label className="block text-[12px] font-semibold">Reason for cancellation</label>
            <select
              value={reason}
              onChange={e=>setReason(e.target.value)}
              className="w-full h-11 rounded-full border px-4 text-[12px] bg-white focus:outline-none focus:ring-2"
              style={{borderColor:'var(--color-border)'}}
            >
              <option value="">Select</option>
              <option value="delay">Delay in delivery</option>
              <option value="changed_mind">Changed my mind</option>
              <option value="wrong_item">Ordered wrong item</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-[12px] font-semibold">Additional notes (optional)</label>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={5} className="w-full rounded-2xl border px-4 py-3 text-[12px] bg-white resize-none focus:outline-none focus-ring-accent" style={{borderColor:'var(--color-border)'}} placeholder="Write something here..."></textarea>
            <p className="text-[10px] text-gray-500">Help us improve by telling us more.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
            <button onClick={()=>router.back()} className="h-11 px-8 rounded-full border border-gray-400 text-[12px] hover:bg-gray-50 w-full sm:w-auto">Back</button>
            <button disabled={!reason} onClick={()=>router.push('/orders')} className="h-11 px-8 rounded-full text-white text-[12px] disabled:opacity-50 transition w-full sm:w-auto" style={{background:'var(--color-accent-primary)'}}>Submit</button>
          </div>
        </div>
      </main>
  <Footer />
    </div>
  );
}
