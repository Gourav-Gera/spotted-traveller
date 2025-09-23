"use client";
import Link from 'next/link';
import React from 'react';

export default function EarningDetailPage({ params }: { params: { id: string } }) {
  const id = params?.id ?? 'unknown';
  return (
    <div className="min-h-screen p-0">
      <div className="card-surface rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Earning Detail</h1>
          <div>
            <Link href="/dashboard/earnings" className="text-sm text-[var(--primary)]">Back to earnings</Link>
          </div>
        </div>
        <div>
          <p className="text-sm">Transaction ID: <span className="font-medium">{id}</span></p>
          <p className="mt-4 text-sm text-[var(--gray)]">This is a placeholder detail page for the earnings item.</p>
        </div>
      </div>
    </div>
  );
}
