"use client";
import React from 'react';
import CancelForm from './CancelForm';

export default function CancelBooking(){
  return (
    <div className="">
      <h2 className="font-bold text-xl mb-8 text-primary">Cancel Booking</h2>
      <div className="max-w-xl">
        <CancelForm />
      </div>
  {/* DashboardFooter from DashboardShell will render here; removed MinimalFooter to avoid duplication */}
    </div>
  )
}
