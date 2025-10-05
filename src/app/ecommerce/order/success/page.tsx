import MainHeader from '../../../../components/MainHeader';
import Footer from '../../../../components/Footer';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';

export default function OrderSuccess(){
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-1 app-container w-full px-5 sm:px-8 lg:px-10 pt-20 sm:pt-24 pb-28 sm:pb-32 text-center">
        <div className="w-24 h-24 sm:w-22 sm:h-22 rounded-full mx-auto bg-[#4A5D52] text-white flex items-center justify-center shadow-sm ring-4 ring-[#4A5D52]/10 mb-6 sm:mb-6">
          <FiCheck className="text-white" size={54} />
        </div>
        <h1 className="text-xl sm:text-3xl font-semibold mb-4 text-black">Order Placed Successfully</h1>
        <p className="text-[14px] sm:text-[16px] text-desc max-w-lg mx-auto leading-relaxed mb-8 px-2">Your order has been placed successfully and is expected to be <span className="font-medium"> delivered to you on 5th July 2025</span>.</p>
        <Link href="/ecommerce" className="inline-flex h-11 px-10 rounded-full bg-[#4A5D52] text-white text-[14px] items-center justify-center">Explore More</Link>
      </main>
      <Footer />
    </div>
  );
}
