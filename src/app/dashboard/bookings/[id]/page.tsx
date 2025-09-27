"use client";
import React from "react";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

type Props = { params: { id: string } };

export default function BookingDetail({ params }: Props) {
  const { id } = params;
  useSearchParams();

  return (
    <div className="p-0">
      <h2 className="font-bold text-xl mb-6 text-primary">Booking Details</h2>
      <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
        {/* Left card */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-[#E5E7EB] px-5 sm:px-8 py-6 space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=160&q=60" alt="hotel" width={56} height={56} className="w-14 h-14 rounded-md object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold text-sm leading-tight truncate">Hotel Park Palace</div>
                  <div className="text-sm text-primary font-semibold mt-1">$100/night</div>
                </div>
                <span className="inline-block bg-[#B3541E] text-white rounded-md px-3 py-1 text-xs font-medium">Ongoing</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <div className="font-bold text-md mb-2">Check-in / Check-out date</div>
              <div className="text-sm text-gray-400">29 June 2025 - 30 June 2025</div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="font-bold text-sm mb-2">No of guests</div>
              <div className="text-sm text-gray-600">2</div>
            </div>
            <div>
              <div className="font-bold text-sm mb-2">Location</div>
              <div className="text-sm text-gray-600">Rome, Italy</div>
            </div>
          </div>
          <div className="pt-2">
            <Link href={`/dashboard/bookings/cancel?id=${id}`} className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-full text-sm font-medium">Cancel Booking</Link>
          </div>
        </div>
        {/* Right card */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] px-5 sm:px-8 py-6 h-fit">
          <h3 className="font-bold text-md mb-4">Price breakdown</h3>
            <ul className="space-y-1">
              <li className="flex justify-between text-sm py-1 text-[#060608]"><span>$100 * 1 night</span><span className="font-semibold">$100</span></li>
              <li className="flex justify-between text-sm py-1 text-[#060608]"><span>Services fee</span><span className="font-semibold">$10</span></li>
              <li className="flex justify-between text-sm py-1 mb-2 text-[#060608]"><span>Taxes</span><span className="font-semibold">$10</span></li>
              <li className="flex justify-between text-sm font-semibold pt-3 mt-1 border-t border-[#E5E7EB]"><span>Grand Total</span><span>$120</span></li>
              <li className="flex justify-between text-sm py-1"><span>Platform fee</span><span className="font-semibold text-[#B3541E]">- $20</span></li>
              <li className="flex justify-between text-sm font-semibold pt-2 mt-1 border-t border-[#E5E7EB]"><span>Your Earning</span><span>$100</span></li>
            </ul>
        </div>
      </div>
    </div>
  );
}
