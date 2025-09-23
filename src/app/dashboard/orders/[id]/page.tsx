import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = {
    id: params.id,
    orderId: `#234${67 + Number(params.id)}`,
    product: 'Product Name',
    productImg: '/images/hotel-img-table.png',
    amount: '$100',
    quantity: 1,
    user: 'User Name',
    address: 'John Doe, (991) 471-0296, 7723 Guess Rd, Hillsborough, North Carolina, 27278',
    date: '3 July 2025', // ordered on
    dispatchedOn: '4 July 2025',
    deliveredOn: '6 July 2025',
    fees: { service: 10, tax: 10, platform: -20 }
  };
  const grand = 100 + order.fees.service + order.fees.tax + order.fees.platform;
  return (
    <div className="p-0">
      <div className="mx-auto">
        <h2 className="font-bold text-xl mb-6 text-primary">Order Details</h2>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {/* Left card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-[#E5E7EB] px-5 sm:px-8 py-6 space-y-7">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <Image src={order.productImg} alt={order.product} width={48} height={48} className="w-12 h-12 rounded-md object-cover" />
              <div>
                <div className="font-semibold text-base leading-tight">{order.product}</div>
                <div className="text-sm text-gray-500">{order.amount}</div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="font-bold text-base mb-2">Delivery Address</div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xl">{order.address}</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="font-bold text-base mb-2">Order On</div>
                <div className="text-sm text-gray-600">{order.date}</div>
              </div>
              {order.dispatchedOn && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="font-bold text-base mb-2">Dispatched On</div>
                  <div className="text-sm text-gray-600">{order.dispatchedOn}</div>
                </div>
              )}
              {order.deliveredOn && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="font-bold text-base mb-2">Delivered On</div>
                  <div className="text-sm text-gray-600">{order.deliveredOn}</div>
                </div>
              )}
            </div>
            <div className="pt-2">
              <button className="bg-[var(--primary)] text-white text-sm font-medium px-5 py-3 rounded-full">Mark as Dispatched</button>
            </div>
            <div className="pt-1">
              <Link href="/dashboard/orders" className="text-sm text-[var(--primary)]">Back to orders</Link>
            </div>
          </div>
          {/* Right card */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] px-5 sm:px-8 py-6 h-fit">
            <h3 className="font-bold text-base mb-4">Price breakdown</h3>
            <ul className="space-y-1">
              <li className="flex justify-between text-sm py-1"><span>$100 * {order.quantity}</span><span className="font-medium">$100</span></li>
              <li className="flex justify-between text-sm py-1"><span>Services fee</span><span className="font-medium">$10</span></li>
              <li className="flex justify-between text-sm py-1 mb-2"><span>Taxes</span><span className="font-medium">$10</span></li>
              <li className="flex justify-between text-sm font-semibold pt-2 mt-1 border-t border-[#E5E7EB]"><span>Grand Total</span><span>${grand}</span></li>
              <li className="flex justify-between text-sm py-1"><span>Platform fee</span><span className="font-medium text-[#B3541E]">- $20</span></li>
              <li className="flex justify-between text-sm font-semibold pt-2 mt-1 border-t border-[#E5E7EB]"><span>Your Earning</span><span>$100</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
