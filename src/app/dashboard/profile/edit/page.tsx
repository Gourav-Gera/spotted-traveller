"use client";
import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useAuth } from '../../../../hooks/useAuth';

export default function EditProfilePage(){
  const { user, updateUser } = useAuth();
  const [name,setName] = useState(user?.name || 'John Doe');
  const [email,setEmail] = useState(user?.email || 'johndoe123@gmail.com');
  const [avatar,setAvatar] = useState<string | undefined>(user?.avatar);
  const [fileError,setFileError] = useState<string | null>(null);
  const [saving,setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onPick = useCallback(()=>{ inputRef.current?.click(); },[]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0];
    if(!f) return;
    if(!/^image\//.test(f.type)){ setFileError('Please select an image file'); return; }
    if(f.size > 2*1024*1024){ setFileError('Image must be under 2MB'); return; }
    setFileError(null);
    const reader = new FileReader();
    reader.onload = ev => setAvatar(ev.target?.result as string);
    reader.readAsDataURL(f);
  }

  function onSubmit(e:React.FormEvent){
    e.preventDefault();
    setSaving(true);
  setTimeout(()=> { updateUser({ name, email, avatar }); setSaving(false); }, 800); // mock
  }

  return (
    <div className="">
      <h1 className="text-xl text-primary leading-tight font-semibold mb-10">Edit Profile</h1>
      <form onSubmit={onSubmit} className="max-w-xl space-y-7">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center ring-2 ring-offset-2 ring-[var(--primary)]/10">
              {avatar ? (
                <Image src={avatar} alt="Avatar preview" width={112} height={112} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-400">No Image</span>
              )}
            </div>
            <button type="button" onClick={onPick} className="absolute -bottom-2 -right-2 bg-[var(--primary)] text-white text-[10px] px-2 py-1 rounded-full shadow">Upload</button>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
          </div>
          <div className="text-xs text-gray-500 leading-relaxed max-w-xs">Upload a square image (recommended 256x256). JPG or PNG, max 2MB.</div>
        </div>
        {fileError && <div className="text-xs text-red-500">{fileError}</div>}
        <div>
          <label className="block text-[13px] tracking-wide font-semibold mb-2">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-full bg-white border border-gray-200 px-6 py-3.5 text-base focus:outline-none" />
        </div>
        <div>
          <label className="block text-[13px] tracking-wide font-semibold mb-2">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-full bg-white border border-gray-200 px-6 py-3.5 text-base focus:outline-none" />
        </div>
  <button disabled={saving} className="w-full rounded-full bg-[#4A5D52] text-white text-base py-4 font-medium disabled:opacity-50">{saving? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  );
}
