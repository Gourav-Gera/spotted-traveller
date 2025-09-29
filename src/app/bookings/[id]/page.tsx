"use client";
import MainHeader from '../../../components/MainHeader';
import MainFooter from '../../../components/MainFooter';
import { publicBookings, formatRange } from '../../../data/publicBookings';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiEdit2 } from 'react-icons/fi';

function StatusBadge({status}:{status:string}){
  const map:Record<string,string>={upcoming:'#E0B45B',ongoing:'#B46D2E',completed:'#44564A',cancelled:'#B4552E'};
  return <span className="text-[10px] px-2 py-1 rounded-sm text-white" style={{background:map[status]||'#555'}}>{status.charAt(0).toUpperCase()+status.slice(1)}</span>;
}

export default function PublicBookingDetail(){
  const { id } = useParams();
  const booking = publicBookings.find(b=> b.id===Number(id));
  if(!booking) return <div>Not found</div>;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
  <main className="flex-1 max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-10 pt-12 sm:pt-14 pb-24 sm:pb-28 text-[13px]">
        <h1 className="text-[24px] font-semibold mb-10">Booking Details</h1>
  <div className="grid md:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
          {/* Left Column */}
          <div>
            {/* Hotel Header */}
            <div className="flex items-start gap-4 mb-8">
              <Image src="/images/hotel-img-table.png" alt={booking.hotel} width={72} height={72} className="w-[72px] h-[72px] rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-1">
                  <p className="text-[14px] font-semibold">{booking.hotel}</p>
                  <StatusBadge status={booking.status} />
                </div>
                <p className="text-[11px] text-gray-500">${booking.pricePerNight}/night</p>
              </div>
            </div>
            {/* Detail Rows */}
            <div className="divide-y divide-gray-200 border-t border-b">
              <div className="py-5 flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[12px] mb-1">Check-in / Check-out date</p>
                  <p className="text-[11px] text-gray-600">{formatRange(booking.startDate, booking.endDate)}</p>
                </div>
                <button aria-label="Edit dates" className="text-gray-500 hover:text-black p-1"><FiEdit2 className="text-[14px]" /></button>
              </div>
              <div className="py-5 flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[12px] mb-1">No of guests</p>
                  <p className="text-[11px] text-gray-600">2</p>
                </div>
                <button aria-label="Edit guests" className="text-gray-500 hover:text-black p-1"><FiEdit2 className="text-[14px]" /></button>
              </div>
              <div className="py-5 flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-[12px] mb-1">Location</p>
                  <p className="text-[11px] text-gray-600">Rome, Italy</p>
                </div>
                <Link href="#map" className="text-[11px] font-medium text-[#44564A] underline underline-offset-2 pt-1">View on map</Link>
              </div>
              <div className="py-6">
                <p className="font-semibold text-[12px] mb-2">Cancellation policy</p>
                <p className="text-[11px] text-gray-600 leading-relaxed max-w-xl">Vestibulum tristique turpis quis velit efficitur, elementum posuere lectus suscipit. Maecenas convallis felis commodo justo pharetra dapibus. Nulla hendrerit purus vel neque aliquet eleifend. Sed iaculis libero eget lorem volutpat pellentesque.</p>
              </div>
            </div>
            {/* Action Button */}
            <div className="pt-8 flex flex-wrap gap-4">
              {booking.status==='upcoming' && (
                <Link href={`/bookings/cancel?id=${booking.id}`} className="inline-flex items-center justify-center h-11 px-8 sm:px-10 rounded-full bg-[#44564A] text-white text-[12px] min-w-[200px] w-full sm:w-auto">Cancel Booking</Link>
              )}
              {(booking.status==='completed' || booking.status==='cancelled' || booking.status==='ongoing') && (
                <Link href="/bookings" className="inline-flex items-center justify-center h-11 px-8 sm:px-10 rounded-full border border-gray-400 text-[12px] min-w-[200px] w-full sm:w-auto">Book Again</Link>
              )}
            </div>
          </div>
          {/* Price Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6 text-[12px] space-y-3 w-full md:w-[340px] mt-10 md:mt-0">
            <h3 className="font-semibold mb-1">Price breakdown</h3>
            <div className="flex justify-between"><span>${booking.pricePerNight} * 1 night</span><span>${booking.pricePerNight}</span></div>
            <div className="flex justify-between"><span>Services fee</span><span>$10</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>$10</span></div>
            <hr />
            {booking.status==='cancelled' ? (
              <div className="flex justify-between font-semibold"><span>Total Refund</span><span>${booking.pricePerNight+20}</span></div>
            ) : (
              <div className="flex justify-between font-semibold"><span>Grand Total</span><span>${booking.pricePerNight+20}</span></div>
            )}
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
