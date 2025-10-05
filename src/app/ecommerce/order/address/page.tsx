"use client";
import MainHeader from '../../../../components/MainHeader';
import Footer from '../../../../components/Footer';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddressModalPage(){
  const router = useRouter();
  const [open,setOpen] = useState(true);
  function submit(e:React.FormEvent){e.preventDefault(); router.push('/ecommerce/order/summary');}
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <MainHeader />
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 pt-10 pb-24">
        <h1 className="text-[22px] font-semibold mb-6">My Cart</h1>
        <div className="text-[12px] text-gray-500">Address step</div>
      </main>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={submit} className="bg-white w-full max-w-xl rounded-2xl p-10 space-y-5">
            <h2 className="text-center font-semibold text-lg mb-2">Delivery Address</h2>
            {['Receiver\'s name','Receiver\'s contact no.','Company/Building name','Floor'].map(f=> (
              <input key={f} placeholder={f} className="w-full h-11 rounded-full border border-gray-300 px-5 text-[12px] outline-none"/>
            ))}
            <div className="flex gap-4">
              <input placeholder="City" className="flex-1 h-11 rounded-full border border-gray-300 px-5 text-[12px] outline-none" />
              <input placeholder="Zip Code" className="flex-1 h-11 rounded-full border border-gray-300 px-5 text-[12px] outline-none" />
            </div>
            <button className="w-full h-11 rounded-full bg-[#4A5D52] text-white text-[12px]">Proceed to Checkout</button>
          </form>
        </div>
      )}
  <Footer />
    </div>
  );
}
