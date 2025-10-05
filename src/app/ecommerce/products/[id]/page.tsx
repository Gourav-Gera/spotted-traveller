"use client";
import MainHeader from '../../../../components/MainHeader';
import Footer from '../../../../components/Footer';
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
  // UI state for options
  const colorOptions = ['#222','#DAA520','#FF9900','#3BD36B'];
  const sizeOptions = ['S','M','L','XL','XXL'];
  const [selectedColor, setSelectedColor] = useState<string>(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  // Zoom/hover effect removed as requested; keeping component minimal
  if(!product) return <div>Not found</div>;
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F4]">
      <MainHeader />
  <main className="flex-1 app-container w-full px-5 sm:px-8 lg:px-10 pt-8 sm:pt-10 pb-20 sm:pb-10">
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
            <h1 className="text-[24px] md:text-[26px] font-semibold mb-4 text-black">{product.title}</h1>
            <p className="text-[14px] text-desc leading-relaxed mb-4 max-w-xl">{product.description.repeat(2)}</p>
            <p className="text-[20px] font-semibold mb-5 text-[#4A5D52]">${product.price}</p>
            <div className="mb-5 space-y-5">
              <div>
                <p className="text-[14px] font-semibold mb-2 text-[#41444B]">Color:-</p>
                <div className="flex gap-3">
                  {colorOptions.map(c=> (
                    <button
                      key={c}
                      aria-label={`Select color ${c}`}
                      onClick={()=>setSelectedColor(c)}
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 ${selectedColor===c? 'border-[#4A5D52]':'border-gray-200'}`}
                    >
                      <span className="w-7 h-7 rounded-full" style={{background:c}}/>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[14px] font-semibold mb-2 text-[#41444B]">Size:-</p>
                <div className="flex gap-3 flex-wrap text-[12px]">
                  {sizeOptions.map(s=> (
                    <button
                      key={s}
                      onClick={()=>setSelectedSize(s)}
                      className={`w-10 h-10 rounded-full transition-colors ${selectedSize===s? 'bg-[#4A5D52] text-white shadow-sm':'border border-[#E5E5E5] bg-white text-desc hover:bg-gray-50'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[14px] font-medium mb-2">Quantity:</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
                    <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-11 h-11 text-base text-black">−</button>
                    <span className="w-10 text-center text-[13px] text-black">{qty}</span>
                    <button onClick={()=>setQty(q=>q+1)} className="w-11 h-11 text-base text-black">+</button>
                  </div>
                  {/* Action buttons row */}
                  <div className="w-full flex gap-4 mt-4">
                    <button onClick={()=>router.push('/ecommerce/cart')} className="flex-1 h-12 rounded-full bg-[#4A5D52] text-white text-[14px]">Buy Now</button>
                    <button className="flex-1 h-12 rounded-full border border-primary text-[14px]">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReviewSlider />
      </main>
  <Footer />
    </div>
  );
}
