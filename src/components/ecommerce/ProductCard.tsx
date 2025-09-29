"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Product } from '../../data/products';

export function ProductCard({p}:{p:Product}){
  return (
    <Link href={`/ecommerce/products/${p.id}`} className="group block rounded-[16px] overflow-hidden border border-[#E5E5E5] bg-white hover:shadow-md transition">
      <div className="relative h-40 sm:h-44 md:h-48 bg-gray-100">
        <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-[1.03] transition-transform" />
      </div>
      <div className="p-3 sm:p-4 space-y-1.5">
        <h3 className="text-[13px] sm:text-[14px] font-semibold line-clamp-1 text-[#060608]">{p.title}</h3>
        <p className="text-[11px] sm:text-[12px] text-gray-500 line-clamp-2 leading-snug">A comfortable & stylish element of urban wardrobe.</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-[13px] sm:text-[14px] font-semibold text-[#4A5D52]">${p.price}</span>
          <button className="text-[11px] sm:text-[12px] px-3 sm:px-4 py-1.5 rounded-full border border-[#4A5D52] text-[#060608] hover:bg-[#4A5D52] hover:text-white transition-colors">Add</button>
        </div>
      </div>
    </Link>
  );
}
