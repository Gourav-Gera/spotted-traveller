"use client";
import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import { products } from '../../../data/products';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage(){
  const router = useRouter();
  const items = products.slice(0,3);
  const [qty,setQty] = useState(items.map(()=>1));
  const total = items.reduce((sum,p,i)=> sum + p.price*qty[i],0);
  const [addressOpen,setAddressOpen] = useState(false);
  function submitAddress(e:React.FormEvent){e.preventDefault(); setAddressOpen(false); router.push('/ecommerce/order/summary'); }
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
  <main className="flex-1 app-container w-full px-5 sm:px-8 lg:px-10 pt-8 sm:pt-10 pb-20 sm:pb-24">
  <h1 className="text-[26px] sm:text-[28px] md:text-[32px] font-semibold mb-8 sm:mb-10 text-black">My Cart</h1>
  <div className="grid md:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="md:col-span-8 space-y-8">
            {items.map((p,i)=>(
              <div key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-gray-200 pb-6">
                <div className="relative w-20 h-20 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100 self-start">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div className="flex-1 order-2 sm:order-none">
                  <h3 className="text-[15px] sm:text-[16px] font-semibold mb-1 text-black">{p.title}</h3>
                  <p className="text-[12px] sm:text-[13px] text-desc leading-relaxed line-clamp-2 max-w-2xl">Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id feugiat libero.</p>
                  <p className="text-[14px] sm:text-[15px] font-semibold mt-2 text-[color:var(--color-accent-primary)]">${p.price}</p>
                </div>
                <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden self-start order-1 sm:order-none">
                  <button onClick={()=>setQty(q=> q.map((v,idx)=> idx===i? Math.max(1,v-1):v))} className="w-11 h-11 text-base">−</button>
                  <span className="w-12 text-center text-[13px]">{qty[i]}</span>
                  <button onClick={()=>setQty(q=> q.map((v,idx)=> idx===i? v+1:v))} className="w-11 h-11 text-base">+</button>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <button onClick={()=>setAddressOpen(true)} className="inline-flex justify-center items-center h-12 px-12 rounded-full bg-[color:var(--color-accent-primary)] text-white text-[13px]">Proceed to Address</button>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 text-[13px] space-y-3">
              <h3 className="font-semibold mb-4 text-black">Price details</h3>
              <div className="flex justify-between"><span className="text-desc">Price ({items.length} items)</span><span className="text-black font-medium">${total}</span></div>
              <div className="flex justify-between"><span className="text-desc">Services fee</span><span className="text-black font-medium">$10</span></div>
              <div className="flex justify-between"><span className="text-desc">Delivery fee</span><span className="text-black font-medium">$10</span></div>
              <div className="flex justify-between"><span className="text-desc">Taxes</span><span className="text-black font-medium">$10</span></div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-semibold"><span className="text-black">Grand Total</span><span className="text-[color:var(--color-accent-primary)]">${total+30}</span></div>
            </div>
          </div>
        </div>
      </main>
  <Footer />
      {addressOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={submitAddress} className="bg-white w-full max-w-xl rounded-2xl p-10 space-y-5">
            <h2 className="text-center font-semibold text-lg mb-2">Delivery Address</h2>
            {['Receiver\'s name','Receiver\'s contact no.','Company/Building name','Floor'].map(f=> (
              <input key={f} placeholder={f} className="w-full h-11 rounded-full border border-gray-300 px-5 text-[12px] outline-none"/>
            ))}
            <div className="flex gap-4">
              <input placeholder="City" className="flex-1 h-11 rounded-full border border-gray-300 px-5 text-[12px] outline-none" />
              <input placeholder="Zip Code" className="flex-1 h-11 rounded-full border border-gray-300 px-5 text-[12px] outline-none" />
            </div>
            <div className="flex gap-4 pt-2">
              <button type="button" onClick={()=>setAddressOpen(false)} className="h-11 flex-1 rounded-full border border-gray-300 text-[12px]">Cancel</button>
              <button type="submit" className="h-11 flex-1 rounded-full bg-[#4A5D52] text-white text-[12px]">Proceed to Checkout</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
