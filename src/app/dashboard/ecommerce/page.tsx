import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function EcommercePage() {
  const rows = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    productId: '#23467',
    name: 'Product Name',
    quantity: '150+',
    price: '$259'
  }));

  return (
    <div className="min-h-screen p-0">
      <div className="">
        <div className="mb-6 grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12">
            <h2 className="font-semibold text-3xl text-primary">E-commerce</h2>
          </div>
          <div className="col-span-12 flex flex-col items-end">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
                <div className="flex-1 min-w-0">
                <div className="hidden sm:flex items-center gap-3 bg-white rounded-full px-4 py-3 border border-[#EFEFEF] shadow-sm w-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" className="text-[#9aa09e]"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                  <input placeholder="Search by product name.." className="w-full text-sm bg-transparent placeholder:text-[#9aa09e] outline-none" />
                </div>
              </div>
              <Link href="/dashboard/ecommerce/new" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#445B50] text-white font-medium shadow-sm sm:ml-4 w-full sm:w-auto">+ Add New Product</Link>
            </div>
            <div className="mt-6 flex gap-3 justify-start w-full flex-wrap">
              <button className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm">Price Range ▾</button>
              <button className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm">Quantity ▾</button>
              <button className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-full bg-[#445B50] text-white text-sm">Sizes ▾</button>
            </div>
          </div>
        </div>
        <div className="card-surface p-0 mb-6 overflow-hidden rounded-2xl">
          {/* Desktop table */}
          <div className="overflow-x-auto booking-table-wrap hidden md:block">
            <table className="min-w-full text-sm booking-table table-fixed">
              <thead>
                <tr className="text-left bg-[#F6F6F6] text-[var(--gray)]">
                  <th className="w-12 py-4 pl-6 first:rounded-tl-2xl">#</th>
                  <th className="w-40 py-4">Product Id</th>
                  <th className="w-64 py-4">Product Name</th>
                  <th className="w-32 py-4">Quantity</th>
                  <th className="w-32 py-4">Price</th>
                  <th className="w-24 py-4 last:rounded-tr-2xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className="align-middle border-t border-[#E9E9E9]">
                    <td className="py-6 text-sm text-[#6a6f6d]">{String(r.id).padStart(2,'0')}</td>
                    <td className="py-6">{r.productId}</td>
                    <td className="py-6">
                      <div className="flex items-center gap-3">
                        <Image src="/images/user-thumb-table.svg" alt="thumb" width={32} height={32} className="rounded-md object-cover" />
                        {r.name}
                      </div>
                    </td>
                    <td className="py-6">{r.quantity}</td>
                    <td className="py-6">{r.price}</td>
                    <td className="py-6 text-right">
                      <div className="inline-flex items-center justify-end gap-3">
                        <Link href={`/dashboard/ecommerce/${r.id}`} className="text-[var(--primary)]">
                          <Image src="/images/eye-icon.svg" alt="view" width={16} height={16} className="w-4 h-4" />
                        </Link>
                        <Link href={`/dashboard/ecommerce/${r.id}/edit`} className="text-sm">
                          <Image src="/images/edit-icon.svg" alt="edit" width={16} height={16} className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="md:hidden p-4 space-y-4">
            {rows.map(r => (
              <div key={r.id} className="bg-white rounded-xl border border-[#EFEFEF] p-4 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <Image src="/images/user-thumb-table.svg" alt="prod" width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{r.name}</div>
                    <div className="text-xs text-gray-500">ID {r.productId}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/dashboard/ecommerce/${r.id}`} className="text-[var(--primary)]">
                      <Image src="/images/eye-icon.svg" alt="view" width={20} height={20} className="w-5 h-5" />
                    </Link>
                    <Link href={`/dashboard/ecommerce/${r.id}/edit`} className="text-sm">
                      <Image src="/images/edit-icon.svg" alt="edit" width={20} height={20} className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-500">Qty</span>
                  <span className="font-medium">{r.quantity}</span>
                  <span className="text-gray-500">Price</span>
                  <span className="font-semibold">{r.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

