"use client";
import React from "react";
import Link from 'next/link';

const Header = () => (
  <header className="w-full py-6 px-3 bg-white rounded-t-2xl">
   <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl tracking-tight">Spotted.</div>
        <nav className="hidden md:flex gap-8 text-gray-700 text-sm font-medium">
  <Link href="#" className="hover:text-black">Why Spotted?</Link>
  <Link href="#" className="hover:text-black">Features</Link>
  <Link href="#" className="hover:text-black">Pricing</Link>
  <Link href="#" className="hover:text-black">Contact</Link>
        </nav>
        <Link href="/auth/login" className="border border-gray-300 rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-100 transition">Login / Sign Up</Link>
    </div>
  </header>
);

export default Header;