import MainHeader from '../../../../components/MainHeader';
import Footer from '../../../../components/Footer';
import { products } from '../../../../data/products';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderSummary(){
  const items = products.slice(0,3);
  const total = items.reduce((s,p)=> s+p.price,0);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
  <main className="flex-1 app-container w-full px-5 sm:px-8 lg:px-10 pt-8 sm:pt-10 pb-28 sm:pb-24">
    <h1 className="text-[26px] sm:text-[28px] md:text-[28px] font-semibold mb-8 sm:mb-10 text-black">Order Summary</h1>
        <div className="grid md:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="md:col-span-8 space-y-8"> 
            {/* Address card */}
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 sm:p-6 text-[13px] ">
              <div className="flex items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold mb-1 text-black text-lg">Delivery Address</p>
                  <p className="text-desc leading-snug">John Doe, (919) 471-0296, 7723 Guess Rd, Hillsborough, North Carolina, 27278</p>
                </div>
                <button className="text-[12px] underline text-[#41444B] whitespace-nowrap">Edit</button>
              </div>
            </div>
            {/* Items */}
            {items.map(p=> (
              <div key={p.id} className="flex items-start sm:items-center gap-4 sm:gap-6 border-b border-[#E5E5E5] pb-6">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] sm:text-[15px] font-semibold text-black mb-1">{p.title}</h3>
                  <p className="text-[14px] font-semibold text-[color:var(--color-accent-primary)]">${p.price}</p>
                </div>
                <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
                  <button className="w-11 h-11 text-base">−</button>
                  <span className="w-10 text-center text-[13px]">1</span>
                  <button className="w-11 h-11 text-base">+</button>
                </div>
              </div>
            ))}
            <div className="pt-2 hidden md:block">
              <Link href="/ecommerce/order/success" className="inline-flex justify-center items-center h-12 px-10 md:px-12 rounded-full bg-[color:var(--color-accent-primary)] text-white text-[14px]">Proceed to Payment</Link>
            </div>
          </div>
          {/* Price details */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-[13px] space-y-3">
              <h3 className="font-semibold mb-4 text-black text-lg">Price details</h3>
              <div className="flex justify-between"><span className="text-desc text-[14px]">Price ({items.length} items)</span><span className="text-black font-semibold text-md">${total}</span></div>
              <div className="flex justify-between"><span className="text-desc text-[14px]">Services fee</span><span className="text-black font-semibold text-md">$10</span></div>
              <div className="flex justify-between"><span className="text-desc text-[14px]">Delivery fee</span><span className="text-black font-semibold text-md">$10</span></div>
              <div className="flex justify-between"><span className="text-desc text-[14px]">Taxes</span><span className="text-black font-semibold text-md">$10</span></div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-semibold"><span className="text-black text-[14px]">Grand Total</span><span className="text-[color:var(--color-accent-primary)] text-md">${total+30}</span></div>
            </div>
          </div>
        </div>
      </main>
      {/* Sticky mobile action bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="app-container px-5 py-3 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[12px] text-desc leading-tight">Grand Total</p>
            <p className="text-[16px] font-semibold text-[color:var(--color-accent-primary)]">${total+30}</p>
          </div>
          <Link href="/ecommerce/order/success" className="flex-1 h-11 rounded-full bg-[color:var(--color-accent-primary)] text-white text-center inline-flex items-center justify-center text-[13px]">Proceed to Payment</Link>
        </div>
      </div>
  <Footer />
    </div>
  );
}
