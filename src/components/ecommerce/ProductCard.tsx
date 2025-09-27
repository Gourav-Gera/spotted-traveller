"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Product } from '../../data/products';

export function ProductCard({p}:{p:Product}){
  return (
    <Link href={`/ecommerce/products/${p.id}`} className="group block rounded-[14px] overflow-hidden border border-[#E5E5E5] bg-white hover:shadow-md transition">
      <div className="relative h-44 bg-gray-100">
        <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-[12px] font-semibold line-clamp-1">{p.title}</h3>
        <p className="text-[11px] text-gray-500 line-clamp-2 leading-snug">A comfortable & stylish element of urban wardrobe.</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-[12px] font-semibold text-[#3E5F55]">${p.price}</span>
          <button className="text-[11px] px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50">Add to Cart</button>
        </div>
      </div>
    </Link>
  );
}
