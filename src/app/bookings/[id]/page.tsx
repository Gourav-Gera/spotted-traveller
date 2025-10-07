"use client";
import MainHeader from '../../../components/MainHeader';
import Footer from '../../../components/Footer';
import { publicBookings, formatRange } from '../../../data/publicBookings';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiEdit2 } from 'react-icons/fi';

function StatusBadge({status}:{status:string}){
  const map:Record<string,string>={
    upcoming:'var(--color-accent-secondary)', /* could define a tertiary if needed */
    ongoing:'var(--color-accent-secondary)',
    completed:'var(--color-accent-primary)',
    cancelled:'var(--color-accent-secondary)'
  };
  return <span className="text-[10px] px-2 py-1 rounded-sm text-white" style={{background:map[status]||'var(--color-accent-primary)'}}>{status.charAt(0).toUpperCase()+status.slice(1)}</span>;
}

export default function PublicBookingDetail(){
  const { id } = useParams();
  const booking = publicBookings.find(b=> b.id===Number(id));
  if(!booking) return <div>Not found</div>;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 app-container w-full px-5 sm:px-8 lg:px-10 pt-12 sm:pt-14 pb-24 sm:pb-28 text-[13px]">
        <h1 className="sm:text-[26px] text-[24px] font-semibold mb-10 text-black">Booking Details</h1>
        <div className="grid md:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
          {/* Left Column */}
          <div>
            {/* Hotel Header */}
            <div className="flex items-center gap-4 mb-8">
              <Image src="/images/hotel-img-table.png" alt={booking.hotel} width={72} height={72} className="w-[72px] h-[72px] rounded-md object-cover" />
              <div className="flex-1 items-center min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <p className="text-[14px] font-semibold text-black">{booking.hotel}</p>
                  <StatusBadge status={booking.status} />
                </div>
                <p className="text-[12px] text-primary font-semibold">${booking.pricePerNight}/night</p>
              </div>
            </div>
            {/* Detail Rows */}
            <div className="divide-y divide-gray-200 border-t border-b">
              <div className="py-5 flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[16px] text-black mb-1">Check-in / Check-out date</p>
                  <p className="text-[14px] text-desc">{formatRange(booking.startDate, booking.endDate)}</p>
                </div>
                <button aria-label="Edit dates" className="text-gray-500 hover:text-black p-1"><FiEdit2 className="text-[14px]" /></button>
              </div>
              <div className="py-5 flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[16px] text-black mb-1">No of guests</p>
                  <p className="text-[14px] text-desc">2</p>
                </div>
                <button aria-label="Edit guests" className="text-gray-500 hover:text-black p-1"><FiEdit2 className="text-[14px]" /></button>
              </div>
              <div className="py-5 flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[16px] text-black mb-1">Location</p>
                  <p className="text-[14px] text-desc">Rome, Italy</p>
                </div>
                <Link href="#map" className="text-[12px] font-medium underline underline-offset-2 pt-1 text-primary">View on map</Link>
              </div>
              <div className="py-6">
                <p className="font-semibold text-[16px] text-black mb-2">Cancellation policy</p>
                <p className="text-[14px] text-desc leading-relaxed max-w-xl">Vestibulum tristique turpis quis velit efficitur, elementum posuere lectus suscipit. Maecenas convallis felis commodo justo pharetra dapibus. Nulla hendrerit purus vel neque aliquet eleifend. Sed iaculis libero eget lorem volutpat pellentesque.</p>
              </div>
            </div>
            {/* Action Button */}
            <div className="pt-8 flex flex-wrap gap-4">
              {booking.status==='upcoming' && (
                <Link href={`/bookings/cancel?id=${booking.id}`} className="inline-flex items-center justify-center h-11 px-8 sm:px-10 rounded-full text-white text-[12px] min-w-[200px] w-full sm:w-auto" style={{background:'var(--color-accent-primary)'}}>Cancel Booking</Link>
              )}
              {(booking.status==='completed' || booking.status==='cancelled' || booking.status==='ongoing') && (
                <Link href="/bookings" className="inline-flex items-center justify-center h-11 px-8 sm:px-10 rounded-full border border-gray-400 text-[12px] min-w-[200px] w-full sm:w-auto">Book Again</Link>
              )}
            </div>
          </div>
          {/* Price Breakdown */}
          <div className="bg-white rounded-2xl box-shadow-sm  p-6 text-[12px] space-y-3 w-full md:w-[360px] mt-10 md:mt-0">
            <h3 className="font-semibold mb-3 text-black text-[16px]">Price details</h3>
            <div className="flex justify-between text-desc"><span>Price</span><span className="text-black text-[16px] font-semibold">${booking.pricePerNight}</span></div>
            <div className="flex justify-between text-desc"><span>Services fee</span><span className="text-black text-[16px] font-semibold">$10</span></div>
            <div className="flex justify-between text-desc"><span>Taxes</span><span className="text-black text-[16px] font-semibold">$10</span></div>
            <hr className="border-gray-200" />
            {booking.status==='cancelled' ? (
              <div className="flex justify-between font-semibold"><span className="text-black text-[14px]">Total Refund</span><span className="text-primary text-[16px] font-semibold">${booking.pricePerNight+20}</span></div>
            ) : (
              <div className="flex justify-between font-semibold"><span className="text-black text-[14px]">Grand Total</span><span className="text-primary text-[16px] font-semibold">${booking.pricePerNight+20}</span></div>
            )}
          </div>
        </div>
      </main>
  <Footer />
    </div>
  );
}
