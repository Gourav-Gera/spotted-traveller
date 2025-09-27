"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { useAuth } from '../hooks/useAuth';
type Props = { onToggle?: () => void };

export default function Topbar({ onToggle }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLInputElement | null>(null);
  const { user, logout } = useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  useEffect(()=>{
    if(showMobileSearch){
      const t = setTimeout(()=> mobileSearchRef.current?.focus(), 10);
      return ()=> clearTimeout(t);
    }
  },[showMobileSearch]);

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-gray-100 relative">
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={() => onToggle && onToggle()} aria-label="Toggle sidebar" className="p-2 rounded-md hover:bg-gray-100">
          <span className="text-xl">☰</span>
        </button>
        {/* Desktop / tablet search */}
        <div className="relative hidden sm:block">
          <div className="flex items-center gap-2 bg-[#fff] border border-[#E5E5E5] rounded-full px-3 py-3 w-72 md:w-96 lg:w-[320px] transition-all">
            <BiSearch className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none border-0 text-sm w-full"
            />
          </div>
        </div>
        {/* Mobile search icon (moved to right group on small screens) */}
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile search icon (right side on small screens) */}
        <button aria-label="Open search" className="p-2 rounded-md hover:bg-gray-100 sm:hidden text-gray-600" onClick={()=> setShowMobileSearch(true)}>
          <BiSearch className="text-gray-600 w-5 h-5" />
        </button>
        {/* Notification bell */}
        <Link href="/dashboard/notifications" className="hidden sm:flex items-center justify-center p-3 rounded-full bg-gray-100 hover:bg-gray-100 text-gray-600" aria-label="Notifications">
          <Image src="/images/alarm-header-icon.svg" alt="view" width={16} height={16} className="w-4 h-4" />
          {/* <BiBell className="text-gray-600 w-5 h-5" /> */}
        </Link>
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer rounded-full bg-[#4A5D52] sm:pl-5 sm:pr-0 sm:py-0 text-white px-0"
          >
            <div className="hidden sm:block text-sm font-semibold px-3">{user ? `Hello, ${user.name}` : 'Hello'}</div>
            <Image
              src={user?.avatar ? user.avatar : (user ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}` : 'https://randomuser.me/api/portraits/men/32.jpg')}
              alt="User"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md py-1 z-40">
              {user ? (
                <>
                  <Link href="/dashboard/notifications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={()=>setOpen(false)}>Notifications</Link>
                  <Link href="/dashboard/profile/edit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={()=>setOpen(false)}>Edit Profile</Link>
                  <Link href="/dashboard/profile/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={()=>setOpen(false)}>Change Password</Link>
                  <Link href="/dashboard/profile/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={()=>setOpen(false)}>Contact Us</Link>
                  <Link href="/dashboard/profile/subscription" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={()=>setOpen(false)}>Subscription</Link>
                  <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={()=>setOpen(false)}>Profile</Link>
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer" onClick={()=>{ logout(); setOpen(false); }}>Sign out</div>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={()=>setOpen(false)}>Login</Link>
                  <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={()=>setOpen(false)}>Signup</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Mobile search overlay */}
      {showMobileSearch && (
        <div className="sm:hidden fixed left-0 right-0 top-[64px] z-40 px-4">
          <div className="bg-white border border-gray-200 px-3 py-3 rounded-full shadow-sm">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2 w-full">
              <BiSearch className="text-gray-400" />
              <input ref={mobileSearchRef} type="text" placeholder="Search" className="bg-transparent outline-none border-0 text-sm flex-1" />
              <button aria-label="Close search" className="px-2 text-xs text-gray-600" onClick={()=> setShowMobileSearch(false)}>✕</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
