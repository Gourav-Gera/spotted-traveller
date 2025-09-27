"use client";
import MainHeader from '../../../../components/MainHeader';
import MainFooter from '../../../../components/MainFooter';
import { products } from '../../../../data/products';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ReviewSlider } from '../../../../components/ecommerce/ReviewSlider';
import { useState, useRef } from 'react';

export default function ProductDetail(){
  const { id } = useParams();
  const product = products.find((p)=>p.id===id);
  const [qty,setQty] = useState(1);
  const [active,setActive] = useState(product?.images[0]);
  interface ZoomState { show:boolean; x:number; y:number; lensW:number; lensH:number; imgW:number; imgH:number; }
  const [zoom,setZoom] = useState<ZoomState>({show:false,x:0,y:0,lensW:0,lensH:0,imgW:0,imgH:0});
  const imgRef = useRef<HTMLDivElement|null>(null);
  if(!product) return <div>Not found</div>;
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F4]">
      <MainHeader />
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 pt-10 pb-24">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6 flex gap-4">
            <div className="flex md:flex-col gap-3 order-2 md:order-1">
              {product.images.map((img:string)=> (
                <button key={img} onClick={()=>setActive(img)} className={`relative w-16 h-16 rounded-md overflow-hidden border ${active===img? 'ring-2 ring-[#3E5F55] border-transparent':'border-gray-200 hover:border-[#3E5F55]'}`}>
                  <Image src={img} alt={product.title} fill className="object-cover" />
                </button>
              ))}
            </div>
            <div
              ref={imgRef}
              onMouseLeave={()=> setZoom(z=>({...z,show:false}))}
              onMouseMove={(e)=>{
                const rect = imgRef.current?.getBoundingClientRect();
                if(!rect) return;
                const zoomFactor = 2.5; // magnification factor
                const lensW = rect.width / zoomFactor;
                const lensH = rect.height / zoomFactor;
                let x = e.clientX - rect.left - lensW/2;
                let y = e.clientY - rect.top - lensH/2;
                // clamp inside image
                x = Math.max(0, Math.min(x, rect.width - lensW));
                y = Math.max(0, Math.min(y, rect.height - lensH));
                setZoom({show:true,x,y,lensW,lensH,imgW:rect.width,imgH:rect.height});
              }}
              className="relative flex-1 h-[430px] rounded-xl overflow-hidden shadow-sm order-1 md:order-2 bg-white cursor-crosshair"
            >
              {active && <Image src={active} alt={product.title} fill className="object-cover select-none pointer-events-none" />}
              {zoom.show && (
                <div
                  className="absolute border border-white/80 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] backdrop-blur-[1px] bg-white/10 pointer-events-none"
                  style={{left: zoom.x, top: zoom.y, width: zoom.lensW, height: zoom.lensH, borderRadius: '4px'}}
                />
              )}
            </div>
            {/* Large zoom preview */}
            {active && zoom.show && (
              <div
                className="hidden lg:block w-[560px] h-[430px] rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white relative"
                style={{
                  backgroundImage: `url(${active})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: `${zoom.imgW * 2.5}px ${zoom.imgH * 2.5}px`,
                  backgroundPosition: `-${zoom.x*2.5}px -${zoom.y*2.5}px`
                }}
              />
            )}
          </div>
          <div className="md:col-span-6">
            <h1 className="text-[22px] md:text-[24px] font-semibold mb-4">{product.title}</h1>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-4 max-w-xl">{product.description.repeat(2)}</p>
            <p className="text-[18px] font-semibold mb-5 text-[#3E5F55]">${product.price}</p>
            <div className="mb-5 space-y-4">
              <div>
                <p className="text-[11px] font-medium mb-2">Color:</p>
                <div className="flex gap-3">
                  {['#222','#DAA520','#FF9900','#3BD36B'].map(c=> <button key={c} style={{background:c}} className="w-6 h-6 rounded-full border border-gray-300" />)}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-medium mb-2">Sizes:</p>
                <div className="flex gap-2 flex-wrap text-[10px]">
                  {['S','M','L','XL','XXL'].map(s=> <button key={s} className="w-9 h-9 border border-gray-300 rounded-full hover:bg-gray-50">{s}</button>)}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-medium mb-2">Quantity:</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
                    <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-10 h-10 text-sm">−</button>
                    <span className="w-10 text-center text-xs">{qty}</span>
                    <button onClick={()=>setQty(q=>q+1)} className="w-10 h-10 text-sm">+</button>
                  </div>
                  <button className="flex-1 h-11 rounded-full bg-[#3E5F55] text-white text-[12px]">Buy Now</button>
                  <button className="flex-1 h-11 rounded-full border border-gray-300 text-[12px]">Add to Cart</button>
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
