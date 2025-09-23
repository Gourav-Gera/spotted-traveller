"use client";
import React, { useEffect, useRef, useState } from "react";

export type MultiImageUploaderProps = {
  max?: number;
  onChange?: (files: File[]) => void;
  buttonLabel?: string;
  className?: string;
};

/**
 * MultiImageUploader
 * - Select multiple images (up to `max`)
 * - Shows removable thumbnails with an overlay "x"
 * - Emits selected files via `onChange`
 */
export default function MultiImageUploader({ max = 5, onChange, buttonLabel = "+ Upload Photo", className = "" }: MultiImageUploaderProps){
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  // Keep object URLs in sync and revoke when replaced/removed
  useEffect(() => {
    const newUrls = files.map(f => URL.createObjectURL(f));
    setUrls(newUrls);
    return () => newUrls.forEach(u => URL.revokeObjectURL(u));
  }, [files]);

  useEffect(() => { onChange?.(files); }, [files, onChange]);

  function trigger(){ fileRef.current?.click(); }

  function onFiles(e: React.ChangeEvent<HTMLInputElement>){
    const list = e.target.files; if(!list) return;
    const next = [...files, ...Array.from(list)];
    setFiles(next.slice(0, max));
    // clear the input so selecting the same file again still triggers change
    e.target.value = "";
  }

  function removeAt(idx: number){
    setFiles(prev => prev.filter((_,i)=> i!==idx));
  }

  return (
    <div className={className}>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={onFiles} className="hidden" />
      <button type="button" onClick={trigger} className="inline-flex items-center gap-2 border-2 border-[#4A5D52] rounded-full px-6 py-2 text-sm cursor-pointer text-[var(--primary)]">
        {buttonLabel}
      </button>
      {urls.length > 0 && (
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {urls.map((src, i) => (
            <div key={i} className="relative w-20 h-24">
              <img src={src} alt={`preview-${i}`} className="w-20 h-24 object-cover rounded-md border" />
              <button aria-label="Remove image" onClick={() => removeAt(i)} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black/70 text-white text-xs flex items-center justify-center">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
