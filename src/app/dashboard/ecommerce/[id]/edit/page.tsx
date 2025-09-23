"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import MultiImageUploader from '@/components/MultiImageUploader';

export default function EditProductPage({ params }: { params: { id: string } }){
  const [images, setImages] = useState<File[]>([]);

  return (
    <div className="min-h-screen p-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-primary">Edit Product</h1>
        <Link href={`/dashboard/ecommerce/${params.id}`} className="text-sm text-[var(--gray)]">Cancel</Link>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-6">
          <input className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]" placeholder="Enter Product Name" defaultValue="Male Trending T-shirt" />
          <textarea className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-4 text-[var(--gray)]" style={{ minHeight: 140 }} placeholder="About Product" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          <input className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]" placeholder="Enter Product Id" defaultValue="#23467" />
          <div className="relative">
            <select className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 pr-10 text-[var(--gray)] appearance-none" defaultValue="S, M, L">
              <option>Add Sizes</option>
              <option>S, M, L</option>
              <option>XL, XXL</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#6B7280]">▾</span>
          </div>
          <div className="relative">
            <select className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 pr-10 text-[var(--gray)] appearance-none" defaultValue="Green">
              <option>Add Colors</option>
              <option>Green</option>
              <option>Black</option>
              <option>White</option>
              <option>Brown</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#6B7280]">▾</span>
          </div>
          <div className="rounded-xl border border-[#EDEDED] bg-white p-6 shadow-sm">
            <div className="text-[var(--gray)] mb-2 font-semibold">Upload Images</div>
            <div className="text-xs text-[var(--gray)] mb-4">Add up to 5 product images</div>
            <MultiImageUploader max={5} onChange={setImages} />
          </div>
          <button className="w-full bg-[var(--primary)] text-white rounded-full py-4 text-sm font-semibold cursor-pointer shadow-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
