import MainHeader from '../../../../components/MainHeader';
import MainFooter from '../../../../components/MainFooter';
import { products } from '../../../../data/products';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderSummary(){
  const items = products.slice(0,3);
  const total = items.reduce((s,p)=> s+p.price,0);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 pt-10 pb-24">
        <h1 className="text-[22px] font-semibold mb-10">Order Summary</h1>
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-8 space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-[12px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1">Delivery Address</p>
                  <p className="text-gray-600 leading-snug">John Doe, (919) 471-0296, 7723 Guess Rd, Hillsborough, North Carolina, 27278</p>
                </div>
                <button className="text-[11px] underline">Edit</button>
              </div>
            </div>
            {items.map(p=> (
              <div key={p.id} className="flex items-center gap-6 border-b pb-6">
                <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[12px] font-semibold mb-1">{p.title}</h3>
                  <p className="text-[11px] text-gray-500 line-clamp-2 max-w-md">Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id feugiat libero.</p>
                  <p className="text-[12px] font-semibold mt-2">${p.price}</p>
                </div>
                <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
                  <button className="w-10 h-10 text-sm">−</button>
                  <span className="w-10 text-center text-xs">1</span>
                  <button className="w-10 h-10 text-sm">+</button>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <Link href="/ecommerce/order/success" className="inline-flex justify-center items-center h-11 px-10 rounded-full bg-[#3E5F55] text-white text-[12px]">Proceed to Payment</Link>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-[12px] space-y-3">
              <h3 className="font-semibold mb-4">Price details</h3>
              <div className="flex justify-between"><span>Price ({items.length} items)</span><span>${total}</span></div>
              <div className="flex justify-between"><span>Services fee</span><span>$10</span></div>
              <div className="flex justify-between"><span>Delivery fee</span><span>$10</span></div>
              <div className="flex justify-between"><span>Taxes</span><span>$10</span></div>
              <hr />
              <div className="flex justify-between font-semibold"><span>Grand Total</span><span>${total+30}</span></div>
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
