import React from "react";
import Link from 'next/link';

const DashboardFooter = () => (
  <footer className="w-full bg-white mt-10">
    <div className="border-t border-[#E5E5E5] py-4 px-4 md:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-between text-sm sm:text-base text-gray-black">
        <div className="order-2 sm:order-1">&copy; {new Date().getFullYear()} Copyright, All Right Reserved</div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 order-1 sm:order-2">
          <Link href="#" className="underline text-primary whitespace-nowrap">Term & Conditions</Link>
          <Link href="#" className="underline text-primary whitespace-nowrap">Privacy Policy</Link>
          <Link href="#" className="underline text-primary whitespace-nowrap">About Us</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default DashboardFooter;
