import Link from 'next/link';
import React from 'react';

export default function MainFooter(){
  return (
    <footer className="bg-[#2F3235] text-[#E3E4E6] text-[11px] md:text-[12px] mt-20">
  <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 pt-14 sm:pt-16 pb-10">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          <div>
            <div className="font-bold text-white text-[20px] mb-4 tracking-tight">Spotted.</div>
            <p className="leading-relaxed max-w-xs text-[12px]">With lots of unique blocks, you can easily build a page without coding. Build your next landing page.</p>
          </div>
          <div className="flex flex-col md:items-start gap-12 md:col-span-2 md:flex-row md:justify-end">
            <div>
              <h4 className="font-semibold mb-4 text-white tracking-wide text-[11px]">COMPANY</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link href="#" className="hover:text-white">About us</Link></li>
                <li><Link href="#" className="hover:text-white">Contact us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white tracking-wide text-[11px]">LEGAL</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-white">Return Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-white/70 text-[11px]">&copy; {new Date().getFullYear()} Copyright, All Right Reserved</div>
          <div className="flex gap-10 text-white/70 text-[11px]">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms & Conditions</Link>
            <Link href="#" className="hover:text-white">Return Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
