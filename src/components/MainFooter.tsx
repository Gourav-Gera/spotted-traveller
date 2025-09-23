import Link from 'next/link';
import React from 'react';

export default function MainFooter(){
  return (
    <footer className="mt-20 bg-[#2B2F32] text-gray-300 text-[11px] md:text-xs">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-20">
          <div className="max-w-sm">
            <div className="font-bold text-white text-lg mb-3">Spotted.</div>
            <p className="leading-relaxed">With lots of unique blocks, you can easily build a page without coding. Build your next landing page.</p>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-10 text-white/80">
            <div>
              <h4 className="font-semibold mb-3 text-white text-xs tracking-wide">COMPANY</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">About us</Link></li>
                <li><Link href="#" className="hover:underline">Contact us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white text-xs tracking-wide">LEGAL</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:underline">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:underline">Return Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white text-xs tracking-wide">EXPLORE</h4>
              <ul className="space-y-2">
                <li><Link href="/cities" className="hover:underline">Cities</Link></li>
                <li><Link href="/events" className="hover:underline">Events</Link></li>
                <li><Link href="/attractions" className="hover:underline">Attractions</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-white/60">&copy; {new Date().getFullYear()} Spotted, All Right Reserved</div>
          <div className="flex flex-wrap gap-6 text-white/60">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
