"use client";
import React, { useState } from 'react';

export default function ContactPage(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [subject,setSubject] = useState('');
  const [message,setMessage] = useState('');
  const [sending,setSending] = useState(false);
  const [sent,setSent] = useState(false);

  function submit(e:React.FormEvent){
    e.preventDefault(); setSending(true); setSent(false);
    setTimeout(()=>{ setSending(false); setSent(true); setName(''); setEmail(''); setSubject(''); setMessage(''); }, 900);
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-[var(--primary)] mb-6">Contact Us</h1>
      <form onSubmit={submit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-[14px] font-semibold mb-2">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter full name here" className="w-full rounded-full placeholder:text-gray-400 bg-white border border-[#E5E5E5] px-6 py-3.5 text-base focus:outline-none" />
        </div>
        <div>
          <label className="block text-[14px] font-semibold mb-2">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter email" className="w-full rounded-full placeholder:text-gray-400 bg-white border border-[#E5E5E5] px-6 py-3.5 text-base focus:outline-none" />
        </div>
        <div>
          <label className="block text-[14px] font-semibold mb-2">Subject</label>
          <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Add subject here" className="w-full rounded-full placeholder:text-gray-400 bg-white border border-[#E5E5E5] px-6 py-3.5 text-base focus:outline-none" />
        </div>
        <div>
          <label className="block text-[14px] font-semibold mb-2">Message</label>
          <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write here..." rows={5} className="w-full placeholder:text-gray-400 rounded-3xl bg-white border border-[#E5E5E5] px-6 py-4 text-base focus:outline-none resize-none" />
        </div>
        {sent && <div className="text-sm text-green-600">Message sent.</div>}
  <button disabled={sending} className="w-full rounded-full bg-[#4A5D52] text-white text-base py-4 font-medium disabled:opacity-60">{sending? 'Sending...' : 'Submit Details'}</button>
      </form>
    </div>
  );
}
