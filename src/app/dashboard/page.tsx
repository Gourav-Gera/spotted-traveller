"use client";
import React, { useState } from "react";
import EarningChart from "../../components/EarningChart";
import Link from "next/link";
import Image from "next/image";
import { HiChevronRight } from 'react-icons/hi';


const StatCard = ({ icon, value, label }: { icon: string; value: string; label: string }) => (
	<div className="flex items-center gap-4 bg-white px-6 py-4 flex-1">
		<div className="">
			{/* icon is the filename located in public/images, e.g. 'product-dash-icon.svg' */}
			<Image src={`/images/${icon}`} alt={`${label} icon`} width={48} height={48} className="object-contain" />
		</div>
		<div>
			<div className="font-bold text-lg">{value}</div>
			<div className="text-xs text-gray-400">{label}</div>
		</div>
	</div>
);

export default function DashboardPage() {
	const [orderMode, setOrderMode] = useState<'monthly'|'weekly'|'today'>('monthly');
	const [chartMode, setChartMode] = useState<'monthly'|'weekly'|'today'>('monthly');

	// Order summary numbers per mode
	const orderData: Record<'monthly'|'weekly'|'today', { main: number; onTheWay:number; delivered:number; cancelled:number }>= {
		monthly: { main: 25, onTheWay: 25, delivered: 60, cancelled: 7 },
		weekly: { main: 8, onTheWay: 8, delivered: 20, cancelled: 2 },
		today: { main: 2, onTheWay: 2, delivered: 5, cancelled: 0 }
	};

	const currentOrder = orderData[orderMode];

	return (
    <>
      <div>
			<h2 className="font-bold text-xl mb-4 text-primary">Dashboard</h2>
			<div className="mb-6 shadow-sm rounded-xl overflow-hidden bg-white">
				<div className="grid grid-cols-1 md:grid-cols-4 divide-x divide-[#E5E5E5]">
					<StatCard icon="accomdation-img-icon.svg" value="56" label="Accommodations listed" />
					<StatCard icon="earning-dash-icon.svg" value="$12K" label="Earning" />
					<StatCard icon="product-dash-icon.svg" value="100" label="Products listed" />
					<StatCard icon="attraction-dash-icon.svg" value="50" label="Attractions listed" />
				</div>
			</div>
        	<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<div className="bg-white rounded-xl shadow p-6  flex flex-col gap-4">
					<div className="flex items-center justify-between mb-3">
						<div className="font-bold text-xl">Order Summary</div>
						<div className="flex gap-2 border border-[#E5E5E5] rounded-full p-1">
							<button className={`px-3 py-2 rounded-full font-semibold text-xs ${orderMode==='monthly' ? 'bg-[var(--primary)] text-white' : 'bg-transparent text-gray-600'}`} onClick={()=>setOrderMode('monthly')}>Monthly</button>
							<button className={`px-3 py-2 rounded-full font-semibold text-xs ${orderMode==='weekly' ? 'bg-[var(--primary)] text-white' : 'bg-transparent text-gray-600'}`} onClick={()=>setOrderMode('weekly')}>Weekly</button>
							<button className={`px-3 py-2 rounded-full font-semibold text-xs ${orderMode==='today' ? 'bg-[var(--primary)] text-white' : 'bg-transparent text-gray-600'}`} onClick={()=>setOrderMode('today')}>Today</button>
						</div>
					</div>
					<div className="flex items-center gap-4 justify-between bg-[#E6F4EA] rounded-2xl p-2">
						<div className=" text-[var(--primary)] rounded-lg px-4 py-3 flex gap-4 items-center">
							<div className="font-bold text-3xl text-white bg-[#68D585] p-2 px-3 rounded-md flex items-center gap-2">
								<span>25</span>
							</div>
							<div className="text-md text-black font-semibold">New Orders</div>
							<span className="w-4 h-4 bg-[#68D585] rounded-full"></span>
						</div>
						<div className="flex flex-col justify-end pr-3">
							<Link href="#" className="font-semibold text-sm hover:underline text-[#68D585] inline-flex items-center gap-1">Manage Orders <HiChevronRight className="w-6 h-6 text-[#68D585]" /></Link>
						</div>
					</div>
					<div className="flex-1 flex justify-between items-center gap-2">
						<div className="border border-[#E5E5E5] rounded-xl text-center justify-center px-4 py-3 flex h-full items-center flex-1">
							<div>
								<div className="font-bold text-3xl">{currentOrder.onTheWay}</div>
								<div className="text-md text-gray-400">On the Way</div>
							</div>
						</div>
						<div className="border border-[#E5E5E5] rounded-xl text-center justify-center px-4 py-3 flex h-full items-center flex-1">
							<div>
								<div className="font-bold text-3xl">{currentOrder.delivered}</div>
								<div className="text-md text-gray-400">Delivered</div>
							</div>
						</div>
						<div className="border border-[#E5E5E5] rounded-xl text-center justify-center px-4 py-3 flex h-full items-center flex-1">
							<div>
								<div className="font-bold text-3xl">{String(currentOrder.cancelled).padStart(2,'0')}</div>
								<div className="text-md text-gray-400">Cancelled</div>
							</div>
						</div>
					</div>
				</div>
    			<div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="font-bold text-lg">Earning</div>
						<div className="flex gap-2 border border-[#E5E5E5] rounded-full p-1">
							<button className={`px-3 py-2 rounded-full font-semibold text-xs ${chartMode==='monthly' ? 'bg-[var(--primary)] text-white' : 'bg-transparent text-gray-600'}`} onClick={()=>setChartMode('monthly')}>Monthly</button>
							<button className={`px-3 py-2 rounded-full font-semibold text-xs ${chartMode==='weekly' ? 'bg-[var(--primary)] text-white' : 'bg-transparent text-gray-600'}`} onClick={()=>setChartMode('weekly')}>Weekly</button>
							<button className={`px-3 py-2 rounded-full font-semibold text-xs ${chartMode==='today' ? 'bg-[var(--primary)] text-white' : 'bg-transparent text-gray-600'}`} onClick={()=>setChartMode('today')}>Today</button>
						</div>
					</div>
					<div>
						<EarningChart key={chartMode} mode={chartMode} />
					</div>
          		</div>
        	</div>
        	<div className="bg-white rounded-xl shadow p-6 table-column-wrap">
          	<div className="font-bold text-lg mb-4">Today&apos;s Bookings</div>
          	<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
					<thead>
						<tr className="text-left bg-[#F6F6F6] text-[var(--gray)]">
							<th className="py-2 px-2">#</th>
							<th className="py-2 px-2">Order Id</th>
							<th className="py-2 px-2">Hotel Name</th>
							<th className="py-2 px-2">User Name</th>
							<th className="py-2 px-2">Amount</th>
							<th className="py-2 px-2">Booking Date</th>
							<th className="py-2 px-2 text-right">Action</th>
						</tr>
					</thead>
					<tbody>
						{[1,2,3,4].map((i) => (
							<tr key={i} className="border-b last:border-0">
							<td className="py-2 px-2 font-semibold">{`0${i}`}</td>
							<td className="py-2 px-2 font-semibold">#234677</td>
							<td className="py-2 px-2 flex items-center gap-2">
								<div className="flex items-center gap-3">
									<Image src="/images/hotel-img-table.png" alt="hotel" width={40} height={40} className="w-10 h-10 rounded-md object-cover block" />
									<span className="font-semibold">Hotel Name</span>
								</div>
							</td>
							<td className="py-2 px-2">User Name</td>
							<td className="py-2 px-2 font-semibold">$100</td>
							<td className="py-2 px-2">3 July 2025</td>
							<td className="py-2 px-2 text-right">
								<div className="inline-flex items-center justify-end gap-2">
									<Link href="#" className="text-[var(--primary)]">
										<Image src="/images/eye-icon.svg" alt="eye icon" width={16} height={16} className="w-4 h-4 block" />
									</Link>
									<Link href="#" className="text-sm">
										<Image src="/images/edit-icon.svg" alt="edit icon" width={16} height={16} className="w-4 h-4 block" />
									</Link>
								</div>
							</td>
							</tr>
						))}
					</tbody>
					</table>
          	</div>
        	</div>
			</div>
			{/* Footer is rendered by DashboardShell globally */}
    </>
  );
}