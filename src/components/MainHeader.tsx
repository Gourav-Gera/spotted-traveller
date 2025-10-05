"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

const nav = [
  { href:'/cities', label:'Cities' },
  { href:'/events', label:'Events' },
  { href:'/attractions', label:'Attractions' },
  { href:'/ecommerce', label:'E-Commerce' },
  { href:'/crowdfunding', label:'Crowdfunding' }
];

export default function MainHeader(){
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open,setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    function onDoc(e:MouseEvent){ if(!menuRef.current) return; if(!menuRef.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener('mousedown', onDoc); return ()=> document.removeEventListener('mousedown', onDoc);
  },[]);
  return (
  <header className={"w-full bg-white h-[64px] sm:h-[70px] flex items-center "+(!isHome? 'border-b border-token':'')}>   
  <div className="app-container grid grid-cols-[auto_1fr_auto] items-center px-0">
        {/* Left: burger (mobile) + Logo */}
        <div className="flex items-center gap-2 pr-2 sm:pr-4">
          <button
            aria-label="Open menu"
            onClick={()=>setMobileOpen(true)}
            className="md:hidden inline-flex w-10 h-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
          >
            <FiMenu className="text-[20px]" />
          </button>
          <Link href="/" className="font-bold text-[22px] tracking-tight pr-2 sm:pr-6">Spotted.</Link>
        </div>
        {/* Center Nav */}
      <nav className="hidden md:flex justify-center md:gap-6 lg:gap-10 md:text-[13px] lg:text-[14px] font-medium text-[#4A4A4A]">
          {nav.map(n=>{
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={"relative transition-colors text-desc hover:text-black px-1 " + (active ? ' text-black after:absolute after:-bottom-2 lg:after:-bottom-3 after:left-0 after:h-[2px] after:w-full after:bg-[#222]' : '')}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        {/* Right Actions */}
        <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2 justify-end pl-2 sm:pl-4 lg:pl-8 relative" ref={menuRef}>
          <Link href="/notifications" aria-label="Notifications" className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100">
            <FiBell className="text-[18px]" />
          </Link>
          <Link href="/ecommerce/cart" aria-label="Cart" className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100">
            <FiShoppingCart className="text-[18px]" />
          </Link>
          <button aria-label="Search" className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100">
            <FiSearch className="text-[18px] text-primary" />
          </button>
          {/* Mobile avatar (shows account on tap) */}
          <button onClick={()=>setOpen(o=>!o)} className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full border-2 hover:bg-gray-100 transition" style={{borderColor:'var(--color-accent-primary)'}} aria-label="Account menu">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-[11px] font-semibold text-gray-600">JD</div>
          </button>
          {/* Compact avatar on tablets (md to <lg) */}
          <button onClick={()=>setOpen(o=>!o)} className="hidden md:inline-flex lg:hidden items-center justify-center w-10 h-10 rounded-full border-2 hover:bg-gray-100 transition" style={{borderColor:'var(--color-accent-primary)'}} aria-label="Account menu">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-[11px] font-semibold text-gray-600">JD</div>
          </button>
          {/* Full pill on desktop (lg and up) */}
          <button onClick={()=>setOpen(o=>!o)} className="hidden lg:flex items-center gap-2 cursor-pointer pl-1 pr-5 h-11 rounded-full border-2 hover:bg-gray-100 transition" style={{borderColor:'var(--color-accent-primary)'}}>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-[11px] font-semibold text-gray-600">JD</div>
            <span className="text-[13px] font-medium text-gray-700">John Doe</span>
          </button>
          {open && (
            <div className="absolute top-[72px] right-0 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-3 z-50 animate-fadeIn">
              <ul className="text-[12px] font-medium text-gray-700">
                <li><Link onClick={()=>setOpen(false)} href="/profile/edit" className="block px-5 py-2 hover:bg-gray-50 text-sm">Edit Profile</Link></li>
                <li><Link onClick={()=>setOpen(false)} href="/profile/change-password" className="block px-5 py-2 hover:bg-gray-50 text-sm">Change Password</Link></li>
                <li><Link onClick={()=>setOpen(false)} href="/profile/contact" className="block px-5 py-2 hover:bg-gray-50 text-sm">Contact Us</Link></li>
                <li><button className="w-full text-left px-5 py-2 hover:bg-gray-50 cursor-pointer text-red-500 text-sm">Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Mobile slide-over nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl border-l border-gray-200 p-5 flex flex-col animate-slideIn">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-[18px]">Menu</span>
              <button aria-label="Close menu" onClick={()=>setMobileOpen(false)} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
                <FiX className="text-[20px]" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {nav.map(n=>{
                const active = pathname.startsWith(n.href);
                return (
                  <Link key={n.href} href={n.href} onClick={()=>setMobileOpen(false)} className={`px-3 py-3 rounded-lg text-[14px] ${active? 'text-black bg-gray-100':'text-gray-700 hover:bg-gray-50'}`}>
                    {n.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-[11px] font-semibold text-gray-600">JD</div>
                <div className="text-[13px] font-medium text-gray-800">John Doe</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[13px]">
                <Link href="/notifications" onClick={()=>setMobileOpen(false)} className="px-3 py-2 rounded-lg border border-gray-200 text-center">Alerts</Link>
                <Link href="/ecommerce/cart" onClick={()=>setMobileOpen(false)} className="px-3 py-2 rounded-lg border border-gray-200 text-center">Cart</Link>
                <Link href="/search" onClick={()=>setMobileOpen(false)} className="px-3 py-2 rounded-lg border border-gray-200 text-center">Search</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
