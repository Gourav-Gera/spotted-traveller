"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

function AuthHeader({ rightLabel, rightHref }: { rightLabel?: string; rightHref?: string }){
  return (
    <div className="flex items-center justify-between py-5 px-0 border-b border-[#E5E5E5] mx-8 bg-white">
      <div className="text-2xl font-bold">Spotted.</div>
      <div>
        {rightLabel ? <Link href={rightHref|| '#'} className="px-5 py-2 text-sm rounded-full border">{rightLabel}</Link> : null}
      </div>
    </div>
  )
}

export default function PasswordUpdated(){
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFB]">
      <AuthHeader rightLabel="Need Help?" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="card-surface max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-3">Password Updated</h1>
          <p className="text-md text-gray-400 mb-10">Your password has been reset successfully.</p>
          <div className="mb-10 flex items-center justify-center">
            <img src="/images/password-updated-icon.svg" alt="password updated" className="w-60 h-52 object-contain" />
          </div>
         
          <div className="px-6">
            <button onClick={()=>router.push('/auth/login')} className="w-full btn-primary-pill py-3">Back to Login</button>
          </div>
          <div className="h-6" />
        </div>
      </div>
    </div>
  )
}
