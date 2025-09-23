"use client";

import React from 'react';
import Link from 'next/link';

const MinimalFooter = () => (

  <footer className="absolute left-0 right-0 bottom-0 bg-transparent">
    <div className="px-6">
      <div className=" pt-3 pb-3 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-between text-[11px] sm:text-xs text-gray-400">
          <div className="order-2 sm:order-1">&copy; {new Date().getFullYear()} Copyright, All Right Reserved</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 order-1 sm:order-2">
            <Link href="#" className="hover:underline whitespace-nowrap">Term & Conditions</Link>
            <Link href="#" className="hover:underline whitespace-nowrap">Privacy Policy</Link>
            <Link href="#" className="hover:underline whitespace-nowrap">About Us</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default MinimalFooter;
