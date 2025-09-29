"use client";
import MainHeader from '../../../components/MainHeader';
import MainFooter from '../../../components/MainFooter';
import { useParams } from 'next/navigation';
import { publicOrders } from '../../../data/publicOrders';
import Image from 'next/image';
import Link from 'next/link';

// Base steps for active (non-cancelled) orders
const activeSteps = ['Order Confirmed','On the Way','Delivered'];

function StatusBadge({status}:{status:string}){
  const map:Record<string,string>={confirmed:'#44564A',on_the_way:'#B46D2E',delivered:'#44564A',cancelled:'#B46D2E'};
  const labelMap:Record<string,string>={confirmed:'Confirmed',on_the_way:'On the Way',delivered:'Delivered',cancelled:'Cancelled'};
  return <span className="text-[10px] px-2 py-1 rounded-sm text-white" style={{background:map[status]||'#555'}}>{labelMap[status]||status}</span>;
}

export default function OrderDetailPage(){
  const { id } = useParams();
  const order = publicOrders.find(o=> o.id===Number(id));
  if(!order) return <div>Not found</div>;
  const isCancelled = order.status==='cancelled';
  const activeIndex = order.status==='confirmed'?0: order.status==='on_the_way'?1: order.status==='delivered'?2:0;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
  <main className="flex-1 max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-10 pt-12 sm:pt-14 pb-24 sm:pb-28 text-[13px]">
        <h1 className="text-[24px] font-semibold mb-8">Order Details</h1>
  <div className="grid md:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
          <div>
            <div className="flex items-start gap-4 mb-8">
              <Image src="/images/hotel-img-table.png" alt={order.product} width={60} height={60} className="w-[60px] h-[60px] rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-1">
                  <p className="text-[14px] font-semibold flex items-center gap-2">{order.product}<span className="text-[10px] font-normal text-gray-400"># {order.id}</span></p>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-[11px] text-gray-500">${order.price}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="border-b pb-4">
                <p className="font-semibold mb-1 text-[12px]">Delivery Address</p>
                <p className="text-[11px] text-gray-600 leading-relaxed">{order.address}</p>
              </div>
              <div className="border-b pb-6">
                <p className="font-semibold mb-5 text-[12px]">Order Updates</p>
                {isCancelled ? (
                  <div className="w-full">
                    <div className="flex items-center w-full mb-4">
                      <div className="w-4 h-4 rounded-full bg-[#B46D2E] flex items-center justify-center text-[10px] text-white">✓</div>
                      <div className="h-px flex-1 mx-2 bg-[#B46D2E]"></div>
                      <div className="w-4 h-4 rounded-full bg-[#B46D2E] flex items-center justify-center text-[10px] text-white">✕</div>
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-600">
                      <span className="font-medium text-gray-800">Order Confirmed</span>
                      <span className="font-medium text-[#B46D2E]">Cancelled</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-5 px-1">
                      {activeSteps.map((s,i)=>{
                        const done = i<=activeIndex;
                        return (
                          <div key={s} className="flex-1 flex items-center">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${done? 'bg-[#44564A] text-white':'bg-gray-300 text-transparent'}`}>✓</div>
                            {i<activeSteps.length-1 && <div className={`h-px flex-1 mx-2 ${i<activeIndex? 'bg-[#44564A]':'bg-gray-300'}`}></div>}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-600 px-0.5">
                      {activeSteps.map((s,i)=> <span key={s} className={`${i===activeIndex?'text-gray-800 font-medium':''}`}>{s}</span>)}
                    </div>
                  </>
                )}
              </div>
              <div>
                {order.status==='confirmed' && (
                  <Link href={`/orders/cancel?id=${order.id}`} className="inline-flex items-center justify-center h-11 px-10 rounded-full border border-[#44564A] text-[#44564A] text-[12px] min-w-[210px] hover:bg-[#44564A] hover:text-white transition">Cancel Order</Link>
                )}
                {(order.status==='delivered' || order.status==='cancelled' || order.status==='on_the_way') && (
                  <Link href="/orders" className="inline-flex items-center justify-center h-11 px-10 rounded-full border border-gray-400 text-[12px] min-w-[210px] hover:bg-gray-50">Order Again</Link>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6 text-[12px] space-y-3 w-full md:w-[340px] mt-10 md:mt-0">
            <h3 className="font-semibold mb-2">Price details</h3>
            <div className="flex justify-between"><span>Price</span><span>${order.price}</span></div>
            <div className="flex justify-between"><span>Services fee</span><span>$10</span></div>
            <div className="flex justify-between"><span>Delivery fee</span><span>$10</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>$10</span></div>
            <hr />
            <div className="flex justify-between font-semibold"><span>Grand Total</span><span>${order.price+30}</span></div>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
