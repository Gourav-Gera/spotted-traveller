"use client";
import React, { useState } from 'react';

export default function SubscriptionPage(){
  const [plan] = useState({ name:'Basic', price:19, period:'month', nextBilling:'12 August 2025', card:'6037' });
  const [upgrading,setUpgrading] = useState(false);
  const [updatingCard,setUpdatingCard] = useState(false);

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-[var(--primary)] mb-6">Subscription</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
        {/* Top row: plan info + action button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-6">
          <div>
            <div className="text-[13px] text-primary tracking-wide font-semibold mb-4">CURRENT PLAN : {plan.name.toUpperCase()}</div>
            <div className="flex items-end gap-3">
              <div className="text-6xl font-bold leading-none flex items-end gap-1"><span className='text-xl'>$</span>{plan.price}</div>
              <div className="text-base font-medium mb-3">/ {plan.period}</div>
            </div>
            <div className="mt-5 text-sm text-gray-500">Next billing date: {plan.nextBilling}</div>
          </div>
          <div className="md:shrink-0">
            <button onClick={()=>{setUpgrading(true); setTimeout(()=>setUpgrading(false),800);}} className="bg-[#4A5D52] text-white text-sm font-medium px-10 h-12 rounded-full flex items-center justify-center disabled:opacity-50 min-w-[260px]" disabled={upgrading}>{upgrading? 'Processing...' : 'Upgrade Subscription'}</button>
          </div>
        </div>

        {/* Payment details */}
        <div className="pt-6 border-t border-gray-200">
          <div className="text-[13px] text-primary tracking-wide font-semibold mb-5">PAYMENT DETAILS</div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3 text-base font-medium">
              <span className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <img src="/images/payment-detail-icon.svg" alt="payment method" className="w-5 h-5" />
              </span>
              <span>************{plan.card}</span>
            </div>
            <button onClick={()=>{setUpdatingCard(true); setTimeout(()=>setUpdatingCard(false),800);}} className="bg-[#4A5D52] text-white text-sm font-medium px-10 h-12 rounded-full disabled:opacity-50 md:self-end min-w-[260px]" disabled={updatingCard}>{updatingCard? 'Updating...' : 'Upgrade Payment Details'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
