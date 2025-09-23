"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MultiImageUploader from '@/components/MultiImageUploader';

export default function NewAccommodationPage() {
  const [images, setImages] = useState<File[]>([]);

  return (
    <div className="min-h-screen p-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-primary">Accommodation</h1>
        <Link href="/dashboard/accommodations" className="text-sm text-[var(--gray)]">Cancel</Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <input className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]" placeholder="Enter Accommodation Name" />
          </div>
          <div>
            <textarea className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-4 text-[var(--gray)]" style={{ minHeight: 140 }} placeholder="About Accommodation details.." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]">
                <option>Number of Rooms</option>
              </select>
            </div>
            <div>
              <select className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]">
                <option>Guests Per Room</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input className="flex-1 bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]" placeholder="Add Price" />
              <span className="text-sm text-[var(--gray)] whitespace-nowrap">$/night</span>
            </div>
          </div>
          <div>
            <input className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]" placeholder="Add Location" />
          </div>
          <div>
            <div className="rounded-xl border border-[#EDEDED] bg-white p-6 text-center shadow-sm">
              <div className="text-lg text-[var(--gray)] mb-1 font-semibold">Upload Accommodation Images</div>
              <div className="text-md text-[var(--gray)] mb-6">Add up to 5 images to showcase the city to travelers."</div>
              <MultiImageUploader max={5} onChange={setImages} className="inline-block" />
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full bg-[var(--primary)] text-white rounded-full py-4 text-lg font-semibold cursor-pointer shadow-sm">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
