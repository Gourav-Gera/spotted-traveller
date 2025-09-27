"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MultiImageUploader from '@/components/MultiImageUploader';

// Edit page visually matches the "new event" design
export default function EditEventPage({ params }:{ params:{ id:string }}) {
  const id = params.id;
  const [, setImages] = useState<File[]>([]);

  return (
    <div className="min-h-screen p-0 ">
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-xl mb-4 text-primary">Events</h1>
          <Link href={`/dashboard/events/${id}`} className="text-sm text-[var(--gray)]">Cancel</Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <input className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]" placeholder="Event Name" />
            </div>

            <div>
              <input className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]" placeholder="City / Municipality" />
            </div>

            <div>
              <textarea className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-4 text-[var(--gray)]" style={{ minHeight: 140 }} placeholder="Event details.." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <select className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]">
                  <option>Event Date</option>
                </select>
              </div>
              <div>
                <select className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]">
                  <option>Event Time</option>
                </select>
              </div>
            </div>

            <div>
              <input className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]" placeholder="Entry Fee" />
            </div>

            <div>
              <input className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]" placeholder="Add Location" />
            </div>

            <div className="rounded-xl border border-[#EDEDED] bg-white p-6 text-center shadow-sm">
              <div className="text-lg text-[var(--gray)] mb-1 font-semibold">Upload Event Images</div>
              <div className="text-md text-[var(--gray)] mb-6">Add up to 5 images to showcase the events to travelers.</div>
              <MultiImageUploader max={5} onChange={setImages} className="inline-block" />
            </div>

            <div className="mt-6">
              <button className="w-full bg-[var(--primary)] text-white rounded-full py-4 text-lg font-semibold cursor-pointer shadow-sm">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
