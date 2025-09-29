"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiSearch, FiShoppingCart } from 'react-icons/fi';

const nav = [
  { href:'/cities', label:'Cities' },
  { href:'/events', label:'Events' },
  { href:'/attractions', label:'Attractions' },
  { href:'/ecommerce', label:'E-Commerce' },
  { href:'/crowdfunding', label:'Crowdfunding' }
];

export default function MainHeader(){
  const pathname = usePathname();
  const [open,setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    function onDoc(e:MouseEvent){ if(!menuRef.current) return; if(!menuRef.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener('mousedown', onDoc); return ()=> document.removeEventListener('mousedown', onDoc);
  },[]);
  return (
    <header className="w-full bg-white border-b border-[#E5E5E5] px-4 sm:px-6 lg:px-10 h-[64px] sm:h-[70px] flex items-center">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-[auto_1fr_auto] items-center px-1 sm:px-2 lg:px-0">
        {/* Left Logo */}
        <Link href="/" className="font-bold text-[22px] tracking-tight pr-8">Spotted.</Link>
        {/* Center Nav */}
  <nav className="hidden md:flex justify-center gap-10 text-[14px] font-medium text-[#4A4A4A]">
          {nav.map(n=>{
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={"relative transition-colors hover:text-black px-1 "+(active? 'text-black after:absolute after:-bottom-3 after:left-0 after:h-[2px] after:w-full after:bg-[#222]':'')}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        {/* Right Actions */}
        <div className="flex items-center gap-4 justify-end pl-8 relative" ref={menuRef}>
          <Link href="/notifications" aria-label="Notifications" className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50">
            <FiBell className="text-[18px]" />
          </Link>
          <Link href="/ecommerce/cart" aria-label="Cart" className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50">
            <FiShoppingCart className="text-[18px]" />
          </Link>
          <button aria-label="Search" className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50">
            <FiSearch className="text-[18px]" />
          </button>
          <button onClick={()=>setOpen(o=>!o)} className="flex items-center gap-2 pl-1 pr-5 h-11 rounded-full border border-gray-300 hover:bg-gray-50">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-[11px] font-semibold text-gray-600">JD</div>
            <span className="text-[13px] font-medium text-gray-700">John Doe</span>
          </button>
          {open && (
            <div className="absolute top-[72px] right-0 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-3 z-50 animate-fadeIn">
              <ul className="text-[12px] font-medium text-gray-700">
                <li><Link onClick={()=>setOpen(false)} href="/profile/edit" className="block px-5 py-2 hover:bg-gray-50">Edit Profile</Link></li>
                <li><Link onClick={()=>setOpen(false)} href="/profile/change-password" className="block px-5 py-2 hover:bg-gray-50">Change Password</Link></li>
                <li><Link onClick={()=>setOpen(false)} href="/profile/contact" className="block px-5 py-2 hover:bg-gray-50">Contact Us</Link></li>
                <li><button className="w-full text-left px-5 py-2 hover:bg-gray-50 text-red-500">Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
