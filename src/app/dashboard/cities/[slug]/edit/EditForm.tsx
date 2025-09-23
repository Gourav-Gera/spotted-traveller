"use client";
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  initialTitle?: string;
}

export default function EditForm({ initialTitle = '' }: Props) {
  const [title, setTitle] = useState(initialTitle);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // placeholder: implement save logic
    alert(`Saved: ${title}`);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
      <label className="block text-sm text-[var(--gray)] mb-2">City Name</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-4 p-3 border rounded" />
      <div className="flex gap-3">
        <button type="submit" className="px-4 py-2 bg-[#445B50] text-white rounded">Save</button>
  <Link href="/dashboard/cities" className="px-4 py-2 border rounded text-primary">Cancel</Link>
      </div>
    </form>
  );
}
