"use client";
import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/MainFooter';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ecommerce/ProductCard';
import { useState } from 'react';

// Design tokens (simple constants – could be moved to a theme file)
const PRIMARY = '#4A5D52';
const TEXT_DARK = '#060608';

export default function EcommerceListing(){
  const [open,setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-white text-[13px] text-[color:var(--text-dark)]" style={{['--text-dark' as any]:TEXT_DARK}}>
      <MainHeader />
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-10 pt-8 sm:pt-10 pb-20 sm:pb-24 flex gap-8 lg:gap-10">
        {/* Filters (desktop) */}
        <aside className="hidden md:flex w-64 bg-white rounded-xl border border-gray-200 h-fit text-[12px] flex-col">
          <div className="px-6 pt-5 pb-4">
            <h3 className="font-semibold text-[13px] mb-5">Filters</h3>
            {/* Price */}
            <div className="mb-5">
              <p className="font-medium mb-3">Price</p>
              <div className="flex gap-3">
                  <input placeholder="Min price" className="h-8 w-full rounded-full border border-gray-300 px-3 outline-none text-[11px] focus:border-[#4A5D52]" />
                  <input placeholder="Max price" className="h-8 w-full rounded-full border border-gray-300 px-3 outline-none text-[11px] focus:border-[#4A5D52]" />
              </div>
            </div>
            <hr className="border-gray-200" />
            {/* Category */}
            <div className="py-5 border-b border-gray-200">
              <p className="font-medium mb-3">Category</p>
              <div className="space-y-2">
                  {['All','Cloths','Jewelry','Footwear'].map(c=> (
                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" style={{accentColor:'#4A5D52'}} className="rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-0" defaultChecked={c==='All'} />
                      <span className="text-[12px]">{c}</span>
                    </label>
                  ))}
              </div>
            </div>
            {/* Gender */}
            <div className="py-5 border-b border-gray-200">
              <p className="font-medium mb-3">Gender</p>
              <div className="space-y-2">
                  {['All','Male','Female'].map(g=> (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" style={{accentColor:'#4A5D52'}} name="gender" className="text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-0" defaultChecked={g==='All'} />
                      <span className="text-[12px]">{g}</span>
                    </label>
                  ))}
              </div>
            </div>
            {/* Sort */}
            <div className="py-5">
              <p className="font-medium mb-3">Sort by</p>
              <div className="space-y-2">
                  {['Price: High to Low','Price: Low to High','Newest Arrival'].map(s=> (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" style={{accentColor:'#4A5D52'}} name="sort" className="text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-0" defaultChecked={s==='Price: High to Low'} />
                      <span className="text-[12px]">{s}</span>
                    </label>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 px-6 py-4 bg-transparent border-t border-gray-200 mt-auto">
            <button className="text-[12px] text-red-500 whitespace-nowrap">× Clear all</button>
            <button className="text-[12px] border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white px-7 py-2 rounded-full transition">Apply Filter</button>
          </div>
        </aside>
        {/* Drawer overlay for mobile filters */}
        {open && (
          <div className="fixed inset-0 z-40 md:hidden" aria-modal="true">
            <div className="absolute inset-0 bg-black/30" onClick={()=>setOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-[82%] max-w-xs bg-white shadow-xl flex flex-col text-[12px] animate-slideIn">
              <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b">
                <h3 className="font-semibold text-[14px]">Filters</h3>
                <button onClick={()=>setOpen(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-lg">×</button>
              </div>
              <div className="px-5 pt-5 pb-4 overflow-y-auto flex-1">
                {/* Price */}
                <div className="mb-6">
                  <p className="font-medium mb-3">Price</p>
                  <div className="flex gap-3">
                      <input placeholder="Min" className="h-9 w-full rounded-full border border-gray-300 px-3 outline-none text-[11px] focus:border-[#4A5D52]" />
                      <input placeholder="Max" className="h-9 w-full rounded-full border border-gray-300 px-3 outline-none text-[11px] focus:border-[#4A5D52]" />
                  </div>
                </div>
                <hr className="border-gray-200" />
                {/* Category */}
                <div className="py-5 border-b border-gray-200">
                  <p className="font-medium mb-3">Category</p>
                  <div className="space-y-2">
                      {['All','Cloths','Jewelry','Footwear'].map(c=> (
                        <label key={c} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" style={{accentColor:'#4A5D52'}} className="rounded border-gray-300" defaultChecked={c==='All'} />
                          <span className="text-[12px]">{c}</span>
                        </label>
                      ))}
                  </div>
                </div>
                {/* Gender */}
                <div className="py-5 border-b border-gray-200">
                  <p className="font-medium mb-3">Gender</p>
                  <div className="space-y-2">
                      {['All','Male','Female'].map(g=> (
                        <label key={g} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" style={{accentColor:'#4A5D52'}} name="m-gender" defaultChecked={g==='All'} />
                          <span className="text-[12px]">{g}</span>
                        </label>
                      ))}
                  </div>
                </div>
                {/* Sort */}
                <div className="py-5">
                  <p className="font-medium mb-3">Sort by</p>
                  <div className="space-y-2">
                      {['Price: High to Low','Price: Low to High','Newest Arrival'].map(s=> (
                        <label key={s} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" style={{accentColor:'#4A5D52'}} name="m-sort" defaultChecked={s==='Price: High to Low'} />
                          <span className="text-[12px] leading-tight">{s}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-gray-200">
                <button className="text-[12px] text-red-500 whitespace-nowrap">× Clear</button>
                <button onClick={()=>setOpen(false)} className="text-[12px] border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white px-6 py-2 rounded-full transition">Apply</button>
              </div>
            </div>
          </div>
        )}
        {/* Products & toolbar */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-6">
            <h1 className="text-[22px] sm:text-[24px] font-semibold text-[color:var(--text-dark)]">All Products (100)</h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-[#F8F8F8] border border-[#E4E4E4] rounded-full px-4 h-11 flex-1 sm:flex-none w-full sm:w-80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                <input placeholder="Search products..." className="flex-1 bg-transparent outline-none text-[12px]" />
              </div>
              <button onClick={()=>setOpen(true)} className="md:hidden h-11 px-6 rounded-full border border-gray-300 text-[12px] font-medium whitespace-nowrap">Filters</button>
            </div>
          </div>
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map(p=> <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
