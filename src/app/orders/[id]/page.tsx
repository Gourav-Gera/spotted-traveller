"use client";
import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import { useParams } from 'next/navigation';
import { publicOrders } from '../../../data/publicOrders';
import Image from 'next/image';
import Link from 'next/link';

// Base steps for active (non-cancelled) orders
const activeSteps = ['Order Confirmed','On the Way','Delivered'];

function StatusBadge({status}:{status:string}){
  const map:Record<string,string>={
    confirmed:'var(--color-accent-primary)',
    on_the_way:'var(--color-accent-secondary)',
    delivered:'var(--color-accent-primary)',
    cancelled:'var(--color-accent-secondary)'
  };
  const labelMap:Record<string,string>={confirmed:'Confirmed',on_the_way:'On the Way',delivered:'Delivered',cancelled:'Cancelled'};
  return <span className="text-[10px] px-2 py-1 rounded-sm text-white" style={{background:map[status]||'var(--color-accent-primary)'}}>{labelMap[status]||status}</span>;
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
  <main className="flex-1 app-container w-full px-5 sm:px-8 lg:px-10 pt-10 sm:pt-12 pb-24 sm:pb-28 text-[13px]">
    <h1 className="text-[26px] sm:text-[32px] font-semibold mb-8 text-black">Order Details</h1>
  <div className="grid md:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
          <div>
            <div className="flex items-start gap-4 mb-8">
              <Image src="/images/hotel-img-table.png" alt={order.product} width={60} height={60} className="w-[60px] h-[60px] rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-1">
                  <p className="text-[14px] font-semibold flex items-center gap-2">{order.product}<span className="text-[10px] font-normal text-gray-400"># {order.id}</span></p>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-[11px] text-desc">${order.price}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="border-b pb-4">
                <p className="font-semibold mb-1 text-[12px]">Delivery Address</p>
                <p className="text-[11px] text-desc leading-relaxed">{order.address}</p>
              </div>
              <div className="border-b pb-6">
                <p className="font-semibold mb-5 text-[12px]">Order Updates</p>
                {isCancelled ? (
                  <div className="w-full">
                    <div className="flex items-center w-full mb-4">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white" style={{background:'var(--color-accent-secondary)'}}>✓</div>
                      <div className="h-px flex-1 mx-2" style={{background:'var(--color-accent-secondary)'}}></div>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white" style={{background:'var(--color-accent-secondary)'}}>✕</div>
                    </div>
                    <div className="flex justify-between text-[11px] text-desc">
                      <span className="font-medium text-gray-800">Order Confirmed</span>
                      <span className="font-medium" style={{color:'var(--color-accent-secondary)'}}>Cancelled</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-5 px-1">
                      {activeSteps.map((s,i)=>{
                        const done = i<=activeIndex;
                        return (
                          <div key={s} className="flex-1 flex items-center">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${done? 'text-white':'text-transparent'}`} style={{background:done? 'var(--color-accent-primary)':'#D1D5DB'}}>
                              ✓
                            </div>
                            {i<activeSteps.length-1 && <div className={`h-px flex-1 mx-2 ${i<activeIndex? '' : ''}`} style={{background: i<activeIndex? 'var(--color-accent-primary)':'#D1D5DB'}}></div>}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-desc px-0.5">
                      {activeSteps.map((s,i)=> <span key={s} className={`${i===activeIndex?'text-gray-800 font-medium':''}`}>{s}</span>)}
                    </div>
                  </>
                )}
              </div>
              <div>
                {order.status==='confirmed' && (
                  <Link href={`/orders/cancel?id=${order.id}`} className="inline-flex items-center justify-center h-11 px-10 rounded-full border text-[12px] min-w-[210px] transition" style={{borderColor:'var(--color-accent-primary)', color:'var(--color-accent-primary)'}}>
                    <span className="group-hover:text-white">Cancel Order</span>
                  </Link>
                )}
                {(order.status==='delivered' || order.status==='cancelled' || order.status==='on_the_way') && (
                  <Link href="/orders" className="inline-flex items-center justify-center h-11 px-10 rounded-full border border-gray-400 text-[12px] min-w-[210px] hover:bg-gray-50">Order Again</Link>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm p-6 text-[12px] space-y-3 w-full md:w-[360px] mt-10 md:mt-0">
            <h3 className="font-semibold mb-3 text-black">Price details</h3>
            <div className="flex justify-between text-desc"><span>Price</span><span className="text-black">${order.price}</span></div>
            <div className="flex justify-between text-desc"><span>Services fee</span><span className="text-black">$10</span></div>
            <div className="flex justify-between text-desc"><span>Delivery fee</span><span className="text-black">$10</span></div>
            <div className="flex justify-between text-desc"><span>Taxes</span><span className="text-black">$10</span></div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-semibold"><span className="text-black">Grand Total</span><span className="text-[color:var(--color-accent-primary)]">${order.price+30}</span></div>
          </div>
        </div>
      </main>
  <Footer />
    </div>
  );
}
