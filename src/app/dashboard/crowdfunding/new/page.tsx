"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MultiImageUploader from '@/components/MultiImageUploader';

export default function NewCampaignPage(){ 
  const [images, setImages] = useState<File[]>([]);

  return (
    <div className="min-h-screen p-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-primary">Add Crowdfunding</h1>
        <Link href="/dashboard/crowdfunding" className="text-sm text-[var(--gray)]">Cancel</Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
        <input className="w-full bg-white border border-[#E5E7EB] rounded-full px-5 py-3 text-sm text-[var(--gray)]" placeholder="Add Campaign Title" />
        {/* Purpose Select */}
        <div className="relative">
          <select defaultValue="" className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-full px-5 py-3 pr-10 text-sm text-[var(--gray)] focus:outline-none">
            <option value="" disabled>Purpose of the Campaign</option>
            <option>Community Development</option>
            <option>Education</option>
            <option>Healthcare</option>
            <option>Environment</option>
            <option>Emergency Relief</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#6B7280]">▾</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Target Amount Select */}
          <div className="relative">
            <select defaultValue="" className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-full px-5 py-3 pr-10 text-sm text-[var(--gray)] focus:outline-none">
              <option value="" disabled>€  Target Amount</option>
              <option>€ 500</option>
              <option>€ 1,000</option>
              <option>€ 2,500</option>
              <option>€ 5,000</option>
              <option>€ 10,000</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#6B7280]">▾</span>
          </div>
          <input className="w-full bg-white border border-[#E5E7EB] rounded-full px-5 py-3 text-sm text-[var(--gray)]" placeholder="Duration of the Campaign" />
        </div>
        {/* Beneficiary Select */}
        <div className="relative">
          <select defaultValue="" className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-full px-5 py-3 pr-10 text-sm text-[var(--gray)] focus:outline-none">
            <option value="" disabled>Who are you raising funds for?</option>
            <option>Individual</option>
            <option>Family</option>
            <option>Community Project</option>
            <option>Non-Profit Organization</option>
            <option>Other</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#6B7280]">▾</span>
        </div>
        <textarea className="w-full bg-white border border-[#E5E7EB] rounded-lg px-5 py-4 text-sm text-[var(--gray)]" style={{ minHeight: 180 }} placeholder="Detailed Description" />
        <div className="rounded-xl border border-[#EDEDED] bg-white p-10 text-center shadow-sm">
          <div className="text-sm text-[var(--gray)] mb-1 font-semibold">Upload Images</div>
          <div className="text-xs text-[var(--gray)] mb-6">Add up to 5 images to visually support your campaign</div>
          <MultiImageUploader max={5} onChange={setImages} className="inline-block" />
        </div>
        <label className="flex items-start gap-2 text-[10px] leading-relaxed text-[var(--gray)]">
          <input type="checkbox" className="mt-1" defaultChecked />
          <span>I hereby confirm that all information provided in this crowdfunding campaign is true, complete, and submitted in good faith. I understand that the campaign must comply with municipal regulations and community standards. By submitting this form, I agree to the platform's Privacy Policy and accept responsibility for the content and purpose of this campaign.</span>
        </label>
        <button className="w-full bg-[var(--primary)] text-white rounded-full py-4 text-sm font-medium cursor-pointer shadow-sm">Submit</button>
      </div>
    </div>
  );
}
