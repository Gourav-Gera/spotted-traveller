"use client";
import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import { useParams } from 'next/navigation';
import { publicOrders } from '../../../data/publicOrders';
import Image from 'next/image';
import Link from 'next/link';
import { FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';

// Base steps for active (non-cancelled) orders
const activeSteps = ['Order Confirmed','On the Way','Completed'];

function StatusBadge({status}:{status:string}){
  const map:Record<string,string>={
    confirmed:'var(--color-accent-primary)',
    on_the_way:'#B3541E',
    delivered:'var(--color-accent-primary)',
    cancelled:'#B3541E'
  };
  const labelMap:Record<string,string>={confirmed:'Confirmed',on_the_way:'On the Way',delivered:'Delivered',cancelled:'Cancelled'};
  return <span className="text-[11px] px-3 py-1 rounded-md text-white" style={{background:map[status]||'var(--color-accent-primary)'}}>{labelMap[status]||status}</span>;
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
        <main className="flex-1 app-container w-full px-5 sm:px-8 lg:px-10 pt-10 sm:pt-8 pb-24 sm:pb-28 text-[13px]">
        <h1 className="sm:text-[26px] font-semibold mb-8 text-black">Order Details</h1>
        <div className="grid md:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Image src="/images/hotel-img-table.png" alt={order.product} width={60} height={60} className="w-[60px] h-[60px] rounded-md object-cover" />
              <div className="flex-1 items-center min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <p className="text-[15px] font-semibold flex items-center gap-2 text-black">{order.product}
                    {/* <span className="text-[11px] font-normal text-gray-400"># {order.id}</span> */}
                  </p>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-[12px] text-primary font-semibold">${order.price}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="border-b pb-4 border-[#E5E5E5] mb-4">
                <p className="font-semibold mb-1 text-[16px] text-black">Delivery Address</p>
                <p className="text-[14px] text-desc leading-relaxed">{order.address}</p>
              </div>
              <div className="pb-0">
                <p className="font-semibold mb-5 text-[16px] text-black">Order Updates</p>
                {isCancelled ? (
                  <div className="w-full">
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-white" style={{background:'#68D585'}}>
                        <FiCheck className="w-3 h-3" />
                      </div>
                      <div className="h-px flex-1 mx-2" style={{background:'#68D585'}}></div>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-white" style={{background:'var(--color-accent-secondary)'}}>
                        <FiX className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex justify-between text-[11px] text-desc">
                      <span className="font-medium text-black">Order Confirmed</span>
                      <span className="font-medium" style={{color:'var(--color-accent-secondary)'}}>Cancelled</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-5">
                      {activeSteps.map((s,i)=>{
                        const done = i<=activeIndex;
                        const last = i===activeSteps.length-1;
                        return (
                          <div key={s} className="flex-1 flex items-center">
                            {/* Left line (omit for first) */}
                            {i>0 && (<div className="h-px flex-1 mx-2" style={{background:'#E5E5E5'}} />)}
                            {/* Node */}
                            <div className={`w-4 h-4 md:w-4 md:h-4 rounded-full flex items-center justify-center ${done? 'text-white':'text-gray-400'}`} style={{background:done? '#68D585':'#D1D5DB'}}>
                              <FiCheck className="w-3 h-3" />
                            </div>
                            {/* Right line (omit for last) */}
                            {!last && (<div className="h-px flex-1 mx-2" style={{background:'#E5E5E5'}} />)}
                          </div>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-3 text-[12px] text-desc px-0.5 mt-1">
                      <span className={`${activeIndex===0?'text-black font-medium':''} text-left`}>{activeSteps[0]}</span>
                      <span className={`${activeIndex===1?'text-black font-medium':''} text-center`}>{activeSteps[1]}</span>
                      <span className={`${activeIndex===2?'text-black font-medium':''} text-right`}>{activeSteps[2]}</span>
                    </div>
                    {/* Contact Us removed as per design */}
                  </>
                )}
              </div>
              <div className="flex flex-col gap-4">
                {order.status==='confirmed' && (
                  <Link href={`/orders/cancel?id=${order.id}`} className="inline-flex items-center justify-center h-11 px-10 rounded-full text-[14px] min-w-[210px] transition bg-[color:var(--color-accent-primary)] text-white hover:opacity-95"> 
                    Cancel Order
                  </Link>
                )}
                {order.status==='on_the_way' && (
                  <Link href="/contact" className="inline-flex items-center justify-center h-11 px-10 rounded-full border text-[14px] min-w-[210px] hover:bg-gray-50" style={{borderColor:'var(--color-accent-primary)', color:'var(--color-accent-primary)'}}>
                    Contact Us
                  </Link>
                )}
                {(order.status==='delivered' || order.status==='cancelled') && (
                  <Link href="/orders" className="inline-flex items-center justify-center gap-2 h-11 px-10 rounded-full border text-[14px] min-w-[210px] hover:bg-gray-50" style={{borderColor:'var(--color-accent-primary)', color:'var(--color-accent-primary)'}}>
                    <FiRefreshCw className="w-4 h-4" />
                    Order Again
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl box-shadow-sm  p-6 text-[12px] space-y-3 w-full md:w-[360px] mt-10 md:mt-0">
            <h3 className="font-semibold mb-3 text-black text-[16px]">Price details</h3>
            <div className="flex justify-between text-desc"><span>Price</span><span className="text-black text-[16px] font-semibold">${order.price}</span></div>
            <div className="flex justify-between text-desc"><span>Services fee</span><span className="text-black text-[16px] font-semibold">$10</span></div>
            <div className="flex justify-between text-desc"><span>Delivery fee</span><span className="text-black text-[16px] font-semibold">$10</span></div>
            <div className="flex justify-between text-desc"><span>Taxes</span><span className="text-black text-[16px] font-semibold">$10</span></div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-semibold"><span className="text-black text-[14px]">Grand Total</span><span className="text-primary text-[16px] font-semibold">${order.price+30}</span></div>
          </div>
        </div>
      </main>
  <Footer />
    </div>
  );
}
