import MainHeader from '../../components/MainHeader';
import MainFooter from '../../components/MainFooter';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ecommerce/ProductCard';

export default function EcommerceListing(){
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
  <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 pt-10 pb-24 flex gap-10">
        {/* Filters */}
        <aside className="w-64 bg-white rounded-xl border border-gray-200 h-fit text-[11px] flex flex-col">
          <div className="px-6 pt-5 pb-4">
            <h3 className="font-semibold text-[12px] mb-4">Filters</h3>
            {/* Price */}
            <div className="mb-5">
              <p className="font-medium mb-3">Price</p>
              <div className="flex gap-3">
                <input placeholder="Min price" className="flex-1 h-8 rounded-full border border-gray-300 px-3 outline-none text-[11px]" />
                <input placeholder="Max price" className="flex-1 h-8 rounded-full border border-gray-300 px-3 outline-none text-[11px]" />
              </div>
            </div>
            <hr className="border-gray-200" />
            {/* Category */}
            <div className="py-5 border-b border-gray-200">
              <p className="font-medium mb-3">Category</p>
              <div className="space-y-2">
                {['All','Cloths','Jewelry','Footwear'].map(c=> (
                  <label key={c} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked={c==='All'} />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Gender */}
            <div className="py-5 border-b border-gray-200">
              <p className="font-medium mb-3">Gender</p>
              <div className="space-y-2">
                {['All','Male','Female'].map(g=> (
                  <label key={g} className="flex items-center gap-2">
                    <input type="radio" name="gender" defaultChecked={g==='All'} />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Sort */}
            <div className="py-5">
              <p className="font-medium mb-3">Sort by</p>
              <div className="space-y-2">
                {['Price: High to Low','Price: Low to High','Newest Arrival'].map(s=> (
                  <label key={s} className="flex items-center gap-2">
                    <input type="radio" name="sort" defaultChecked={s==='Price: High to Low'} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 px-6 py-4 bg-transparent border-t border-gray-200 mt-auto">
            <button className="text-[11px] text-red-500 whitespace-nowrap">× Clear all</button>
            <button className="text-[11px] bg-[#3E5F55] text-white px-8 py-2 rounded-full">Apply Filter</button>
          </div>
        </aside>
        {/* Products */}
        <div className="flex-1">
          <h1 className="text-[22px] font-semibold mb-6">All Products (100)</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p=> <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
