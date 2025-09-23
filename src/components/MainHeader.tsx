"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const nav = [
  { href:'/cities', label:'Cities' },
  { href:'/events', label:'Events' },
  { href:'/attractions', label:'Attractions' },
  { href:'/ecommerce', label:'E-Commerce' },
  { href:'/crowdfunding', label:'Crowdfunding' }
];

export default function MainHeader(){
  const pathname = usePathname();
  return (
    <header className="w-full bg-white border-b border-[#E5E5E5] px-4 md:px-8 h-16 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center gap-10">
        <Link href="/" className="font-bold text-lg md:text-xl tracking-tight">Spotted.</Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          {nav.map(n=>{
            const active = pathname.startsWith(n.href);
            return <Link key={n.href} href={n.href} className={"hover:text-black relative "+(active? 'text-black after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-[var(--primary)]':'')}>{n.label}</Link>;
          })}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <button aria-label="Search" className="hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50">🔍</button>
          <Link href="/auth/login" className="px-5 py-2 rounded-full text-sm border border-gray-300 font-medium hover:bg-gray-100">Login</Link>
        </div>
      </div>
    </header>
  );
}
