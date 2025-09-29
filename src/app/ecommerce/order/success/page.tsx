import MainHeader from '../../../../components/MainHeader';
import MainFooter from '../../../../components/MainFooter';
import Link from 'next/link';

export default function OrderSuccess(){
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
    <main className="flex-1 max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-10 pt-20 sm:pt-24 pb-28 sm:pb-32 text-center">
  <div className="w-20 h-20 rounded-full mx-auto bg-[#4A5D52] text-white flex items-center justify-center text-3xl mb-10">✓</div>
  <h1 className="text-xl sm:text-2xl font-semibold mb-4">Order Placed Successfully</h1>
  <p className="text-[12px] sm:text-[13px] text-gray-600 max-w-lg mx-auto leading-relaxed mb-10 px-2">Your order has been placed successfully and is expected to be delivered to you on <span className="font-medium">5th July 2025</span>.</p>
  <Link href="/ecommerce" className="inline-flex h-11 px-10 rounded-full bg-[#4A5D52] text-white text-[12px] items-center justify-center">Explore More</Link>
      </main>
      <MainFooter />
    </div>
  );
}
