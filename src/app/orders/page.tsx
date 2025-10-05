"use client";
import MainHeader from '../../components/MainHeader';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { publicOrders, PublicOrderStatus, formatOrderDate } from '../../data/publicOrders';

const tabs:{key:PublicOrderStatus,label:string, verb:string}[] = [
  {key:'confirmed', label:'Confirmed', verb:'placed'},
  {key:'on_the_way', label:'On the Way', verb:'dispatched'},
  {key:'delivered', label:'Delivered', verb:'delivered'},
  {key:'cancelled', label:'Cancelled', verb:'cancelled'}
];

export default function PublicOrdersPage(){
  const [tab,setTab] = useState<PublicOrderStatus>('confirmed');
  const filtered = useMemo(()=> publicOrders.filter(o=> o.status===tab),[tab]);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
  <main className="flex-1 app-container w-full px-5 sm:px-8 lg:px-10 pt-12 sm:pt-14 pb-24 sm:pb-28 text-[13px]">
        <h1 className="text-[24px] font-semibold mb-6 text-black">Your Orders</h1>
        <div className="w-full rounded-full border border-[#E5E5E5] flex mb-8 overflow-hidden text-[12px]">
          {tabs.map(t=> (
            <button key={t.key} onClick={()=>setTab(t.key)} className={`flex-1 h-11 text-[15px] rounded-full transition text-center ${t.key===tab? 'bg-[var(--color-accent-primary)] text-white font-medium':'text-gray-600'}`}>{t.label}</button>
          ))}
        </div>
        <div>
          {filtered.map(o=>{
            const tabMeta = tabs.find(t=>t.key===tab)!; // for verb
            return (
              <div key={o.id} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 py-7 border-b border-b-[#E5E5E5]">
                <Image src="/images/hotel-img-table.png" alt={o.product} width={50} height={50} className="w-[50px] h-[50px] rounded-md object-cover" />
                <div className="flex-1 min-w-0 pt-0.5 order-2 sm:order-none">
                  <h3 className="text-[15px] font-semibold mb-1 text-black">{o.product}</h3>
                  <p className="text-[13px] text-gray-500">Order {tabMeta.verb} on - <span className="font-medium text-black">{formatOrderDate(o.placed)}</span></p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-4 shrink-0 order-1 sm:order-none">
                  <p className="text-[15px] font-semibold text-primary">${o.price}</p>
                  <Link href={`/orders/${o.id}`} className="inline-flex text-primary items-center justify-center h-9 px-5 rounded-full border border-primary text-[13px] hover:bg-gray-50 w-auto">View Details →</Link>
                </div>
              </div>
            );
          })}
          {filtered.length===0 && <div className="text-[12px] text-gray-500 py-10">No orders found.</div>}
        </div>
      </main>
  <Footer />
    </div>
  );
}
