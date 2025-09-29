"use client";
import MainHeader from '../../../../components/MainHeader';
import MainFooter from '../../../../components/MainFooter';
import { products } from '../../../../data/products';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ReviewSlider } from '../../../../components/ecommerce/ReviewSlider';
import { useState } from 'react';

export default function ProductDetail(){
  const { id } = useParams();
  const product = products.find((p)=>p.id===id);
  const router = useRouter();
  const [qty,setQty] = useState(1);
  const [active,setActive] = useState(product?.images[0]);
  // Zoom/hover effect removed as requested; keeping component minimal
  if(!product) return <div>Not found</div>;
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F4]">
      <MainHeader />
    <main className="flex-1 max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-10 pt-8 sm:pt-10 pb-20 sm:pb-24">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-10">
          <div className="md:col-span-6 flex flex-col md:flex-row gap-4">
            <div className="flex md:flex-col gap-3 order-2 md:order-1 flex-wrap md:flex-nowrap">
              {product.images.map((img:string)=> (
                <button key={img} onClick={()=>setActive(img)} className={`relative w-16 h-16 rounded-md overflow-hidden border ${active===img? 'ring-2 ring-[#4A5D52] border-transparent':'border-gray-200 hover:border-[#4A5D52]'}`}>
                  <Image src={img} alt={product.title} fill className="object-cover" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 h-[340px] sm:h-[400px] md:h-[430px] rounded-xl overflow-hidden shadow-sm order-1 md:order-2 bg-white">
              {active && <Image src={active} alt={product.title} fill className="object-cover select-none" />}
            </div>
          </div>
          <div className="md:col-span-6">
            <h1 className="text-[24px] md:text-[26px] font-semibold mb-4">{product.title}</h1>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-4 max-w-xl">{product.description.repeat(2)}</p>
            <p className="text-[20px] font-semibold mb-5 text-[#4A5D52]">${product.price}</p>
            <div className="mb-5 space-y-4">
              <div>
                <p className="text-[12px] font-medium mb-2">Color:</p>
                <div className="flex gap-3">
                  {['#222','#DAA520','#FF9900','#3BD36B'].map(c=> <button key={c} style={{background:c}} className="w-6 h-6 rounded-full border border-gray-300" />)}
                </div>
              </div>
              <div>
                <p className="text-[12px] font-medium mb-2">Sizes:</p>
                <div className="flex gap-2 flex-wrap text-[11px]">
                  {['S','M','L','XL','XXL'].map(s=> <button key={s} className="w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50">{s}</button>)}
                </div>
              </div>
              <div>
                <p className="text-[12px] font-medium mb-2">Quantity:</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
                    <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-11 h-11 text-base">−</button>
                    <span className="w-10 text-center text-[13px]">{qty}</span>
                    <button onClick={()=>setQty(q=>q+1)} className="w-11 h-11 text-base">+</button>
                  </div>
                  {/* Action buttons row */}
                  <div className="w-full flex gap-4 mt-4">
          <button onClick={()=>router.push('/ecommerce/cart')} className="flex-1 h-12 rounded-full bg-[#4A5D52] text-white text-[13px]">Buy Now</button>
          <button className="flex-1 h-12 rounded-full border border-gray-300 text-[13px]">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReviewSlider />
      </main>
      <MainFooter />
    </div>
  );
}
