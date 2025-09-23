"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

function AuthHeader({ rightLabel, rightHref }: { rightLabel?: string; rightHref?: string }){
  return (
    <div className="flex items-center justify-between py-5 px-6 border-b bg-white">
      <div className="text-sm font-semibold">Spotted.</div>
      <div>
        {rightLabel ? <Link href={rightHref|| '#'} className="px-3 py-1 text-sm rounded-full border">{rightLabel}</Link> : null}
      </div>
    </div>
  )
}

export default function VerifyEmail(){
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFB]">
      <AuthHeader rightLabel="Need Help?" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="card-surface max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold mb-3">Verify Email Address</h1>
           <p className="text-md text-gray-400 mb-8">
            Please enter the 4 digit code sent to your registered email id
            <b> johndoe123@gmail.com</b></p>
          <div className="flex justify-center gap-3 mb-6">
            {[0,1,2,3].map(i=> <input key={i} className="w-16 h-16  text-center border rounded-md" maxLength={1} />)}
          </div>
          <button onClick={()=>router.push('/auth/password-updated')} className="w-full btn-primary-pill">Verify</button>
          <div className="text-sm  pt-6 w-full ">Resend code in 
            <Link href="/auth/login" className="text-[var(--primary)] font-medium"> 00:30</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
