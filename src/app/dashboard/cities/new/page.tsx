"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import MultiImageUploader from '@/components/MultiImageUploader';

const SAMPLE_TAGS = ['beach','historic','mountain','family-friendly','romantic','nightlife'];

export default function NewCityPage() {
  const [images, setImages] = useState<File[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [tagOpen, setTagOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tagRef = useRef<HTMLDivElement | null>(null);

  // previews handled internally by MultiImageUploader

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (tagRef.current && !tagRef.current.contains(e.target as Node)) setTagOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  useEffect(() => {
    // Read slug from URL query to support edit flow: /dashboard/cities/new?slug=City%201
    try {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('slug');
      if (s) {
        const decoded = decodeURIComponent(s);
        setName(decoded);
        // In a real app, fetch city details here to prefill description, tags, images, etc.
        setDescription('');
      }
    } catch (e) {
      // ignore on server or malformed URL
    }
  }, []);

  // uploads handled by MultiImageUploader

  function toggleTag(tag: string) {
    setSelectedTags((s) => (s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag]));
  }

  return (
    <div className="min-h-screen p-0 ">
      <div >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-primary">Cities</h1>
          <Link href="/dashboard/cities" className="text-sm text-[var(--gray)]">Cancel</Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              {/* <label className="block text-sm font-medium mb-2">City name</label> */}
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white border border-[#E5E7EB] rounded-full px-4 py-3 text-[var(--gray)]" placeholder="Enter city name" />
            </div>

            <div>
              {/* <label className="block text-sm font-medium mb-2">Short description</label> */}
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-4 text-[var(--gray)]" style={{ minHeight: 180 }} placeholder="About City.." />
            </div>

            <div ref={tagRef} className="relative">
              {/* <label className="block text-sm font-medium mb-2">Add Hashtags</label> */}
              <div className="w-full bg-white border border-[#E5E7EB] rounded-full px-5 py-4 flex items-center gap-2 cursor-pointer" onClick={() => setTagOpen((v) => !v)}>
                <div className="flex-1 flex items-center gap-2 flex-wrap">
                  {selectedTags.length === 0 ? (
                    <div className="text-[var(--gray)]">Add Hashtags</div>
                  ) : (
                    selectedTags.map((t) => (
                      <div key={t} className="text-xs bg-[#F1F3F4] px-2 py-1 rounded">{t}</div>
                    ))
                  )}
                </div>
                <div className="text-sm text-[var(--gray)]">▾</div>
              </div>

              {tagOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded shadow-sm z-20 p-3">
                  <div className="grid grid-cols-2 gap-2">
                    {SAMPLE_TAGS.map((t) => (
                      <button key={t} onClick={() => toggleTag(t)} className={`text-sm px-3 py-2 rounded ${selectedTags.includes(t) ? 'bg-[var(--primary)] text-white' : 'bg-gray-50 text-[var(--gray)]'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="rounded-xl border border-[#EDEDED] bg-white p-8 text-center shadow-sm">
                <div className="text-lg text-[var(--gray)] mb-1 font-semibold">Upload City Images</div>
                <div className="text-md text-[var(--gray)] mb-6">Add up to 5 images to showcase the city to travelers.</div>
                <MultiImageUploader max={5} onChange={setImages} className="inline-block" />
              </div>
            </div>

            {/* Optional sections */}
            <div className="space-y-4">
              {['Accommodation','Attractions','Events'].map((title)=> (
                <div key={title} className="flex items-center justify-between bg-white rounded-xl p-4 border border-[#F0F2F1] shadow-sm">
                  <div className="font-semibold text-primary">{title} <span className="text-sm text-[var(--gray)] ml-2">(Optional)</span></div>
                  <button className="inline-flex items-center gap-2 border-2 border-[#4A5D52] text-primary font-medium rounded-full px-6 cursor-pointer py-2 text-sm">+ Add New</button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button className="w-full bg-[var(--primary)] text-white rounded-full py-4 text-lg font-semibold cursor-pointer shadow-sm">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
