import React from 'react';
import Image from "next/image";
export const metadata = {
  title: 'Pricing - Spotted',
};

export default function PricePage(){
  return (
    <div className="min-h-screen bg-gray-200 font-gilroy">
      <div className="w-full bg-white min-h-screen shadow-sm">
        <header className="flex items-center justify-between py-6 mx-8 border-b border-[#E5E5E5]">
          <div className="text-2xl font-bold">Spotted.</div>
          <div>
            <button className="text-sm px-4 py-2 rounded-full border border-gray-300">Need Help?</button>
          </div>
        </header>
        
        <main className="px-10 py-12">
          <h1 className="text-3xl font-semibold text-center mb-8">Price & Planning</h1>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20">
            {/* Basic */}
            <div className="bg-[#EFEFEF] rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="uppercase text-xs font-bold tracking-widest mb-4 text-[#4A5D52]">Basic</div>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold"><span className="text-2xl font-bold">$</span>19</span>
                <span className="text-base font-medium ml-2.5 mb-1"> / month</span>
              </div>
              <div className="text-sm text-[var(--gray)] mb-6">billed monthly</div>
              <ul className="text-sm space-y-3 mb-6">
                <li className="flex items-center justify-between"><span className="font-semibold">Digital Infopoint</span>
                  <Image
                    src="/images/check-icon-green.svg"
                    alt="Home"
                    width={10}
                    height={10}
                    className="w-4 h-4 ml-auto"
                    priority
                  />
                </li>
                <li className="flex items-center justify-between"><span className="font-semibold">AI Chatbot</span><span className="text-sm">Limited</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Interactive Map</span><span className="text-sm">10 POIs</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Booking System</span><span className="text-sm">Inquiry Only</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">E-commerce</span><span className="text-sm">1-2 Products</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Crowdfunding</span>
                  <Image
                    src="/images/cross-icon-red.svg"
                    alt="Home"
                    width={10}
                    height={10}
                    className="w-4 h-4 ml-auto"
                    priority
                  />
                </li>
                <li className="flex items-center justify-between"><span className="font-semibold">User Access</span><span className="text-sm">1 Admin</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Translation</span><span className="text-sm">Italian Only</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Newsletter</span>
                  <Image
                    src="/images/cross-icon-red.svg"
                    alt="Home"
                    width={10}
                    height={10}
                    className="w-4 h-4 ml-auto"
                    priority
                  />
                </li>
                <li className="flex items-center justify-between"><span className="font-semibold">Pages</span><span className="text-sm">Up to 5</span></li>
              </ul>
              <button className="w-full border border-[#4A5D52] rounded-full cursor-pointer py-2 font-medium text-[#4A5D52] hover:bg-gray-100 transition">Buy Now →</button>
            </div>

            {/* Pro */}
            <div className="bg-[#EFEFEF] rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="uppercase text-xs font-bold tracking-widest mb-4 text-[#4A5D52]">Pro</div>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold"><span className="text-2xl font-bold">$</span>49</span>
                <span className="text-base font-medium ml-2.5 mb-1"> / month</span>
              </div>
              <div className="text-sm text-[var(--gray)] mb-6">billed monthly</div>
              <ul className="text-sm space-y-3 mb-6">
                <li className="flex items-center justify-between"><span className="font-semibold">Digital Infopoint</span><span className="text-green-600 font-bold">✓</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">AI Chatbot</span><span className="text-sm">Unlimited</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Interactive Map</span><span className="text-sm">25 POIs</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Booking System</span><span className="text-sm">Full Calendar</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">E-commerce</span><span className="text-sm">10 Products</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Crowdfunding</span><span className="text-red-500 font-bold">✗</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">User Access</span><span className="text-sm">1 Admin</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Translation</span><span className="text-sm">Italian + English</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Newsletter</span>
                  <Image
                    src="/images/cross-icon-red.svg"
                    alt="Home"
                    width={10}
                    height={10}
                    className="w-4 h-4 ml-auto"
                    priority
                  />
                </li>
                <li className="flex items-center justify-between"><span className="font-semibold">Pages</span><span className="text-sm">Up to 10</span></li>
              </ul>
              <button className="w-full border border-[#4A5D52] rounded-full cursor-pointer py-2 font-medium text-[#4A5D52] hover:bg-gray-100 transition">Buy Now →</button>
            </div>

            {/* Premium */}
            <div className="bg-[#EFEFEF] rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="uppercase text-xs font-bold tracking-widest mb-4 text-[#4A5D52]">Premium</div>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold"><span className="text-2xl font-bold">$</span>99</span>
                <span className="text-base font-medium ml-2.5 mb-1"> / month</span>
              </div>
              <div className="text-sm text-[var(--gray)] mb-6">billed monthly</div>
              <ul className="text-sm space-y-3 mb-6">
                <li className="flex items-center justify-between"><span className="font-semibold">Digital Infopoint</span><span className="text-green-600 font-bold">✓</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">AI Chatbot</span>  
                <Image
                    src="/images/check-icon-green.svg"
                    alt="Home"
                    width={10}
                    height={10}
                    className="w-4 h-4 ml-auto"
                    priority
                  />
                </li>
                <li className="flex items-center justify-between"><span className="font-semibold">Interactive Map</span><span className="text-sm">Unlimited</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Booking System</span><span className="text-sm">Full Calendar</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">E-commerce</span><span className="text-sm">20 Products + Variants</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Crowdfunding</span><span className="text-green-600 font-bold">✓</span></li>
              <li className="flex items-center justify-between"><span className="font-semibold">User Access</span><span className="text-sm">1 Admin</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Translation</span><span className="text-sm">Multilingual</span></li>
                <li className="flex items-center justify-between"><span className="font-semibold">Newsletter</span>
                  <Image
                    src="/images/check-icon-green.svg"
                    alt="Home"
                    width={10}
                    height={10}
                    className="w-4 h-4 ml-auto"
                    priority
                  />
                </li>
                <li className="flex items-center justify-between"><span className="font-semibold">Pages</span><span className="text-sm">10+</span></li>
              </ul>
              <button className="w-full border border-[#4A5D52] rounded-full cursor-pointer py-2 font-medium text-[#4A5D52] hover:bg-gray-100 transition">Buy Now →</button>
            </div>
          </div>
        </main>

      </div>
    </div>
  )
}
