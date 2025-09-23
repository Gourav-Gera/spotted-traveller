"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type Mode = 'monthly' | 'weekly' | 'today';

export default function EarningChart({ mode = 'monthly' }: { mode?: Mode }){
  // datasets for different modes (simplified)
  const dataMap: Record<Mode, { categories: string[]; series: { name:string; data:number[] }[] }> = {
    monthly: {
      categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
      series: [
        { name: 'series1', data: [30,40,35,50,45,110,100] },
        { name: 'series2', data: [10,30,45,35,40,50,38] }
      ]
    },
    weekly: {
      categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      series: [
        { name: 'series1', data: [10,20,15,30,28,60,55] },
        { name: 'series2', data: [5,15,25,20,18,30,25] }
      ]
    },
    today: {
      categories: ['00','04','08','12','16','20','24'],
      series: [
        { name: 'series1', data: [2,4,3,6,5,9,8] },
        { name: 'series2', data: [1,3,4,3,4,5,4] }
      ]
    }
  }

  const payload = dataMap[mode];

  const options: ApexOptions = {
    chart: { toolbar:{show:false}, zoom:{enabled:false}, animations: { enabled: true } },
    stroke: { curve: 'smooth', width: [3,2], dashArray: [0,4] },
    markers:{ size:6, hover: { size:8 } },
    dataLabels: { enabled: true, formatter: (val:number) => `${val}`, style: { fontSize: '12px' } },
    grid:{ show:true, borderColor:'#f2f2f2', strokeDashArray: 4 },
    xaxis: { categories: payload.categories, labels:{ style:{ colors:'#666' } } },
    yaxis: { labels:{ formatter: (val:number) => `${val}` } },
    colors: ['#2ea3ff', '#8CC6A3'],
    tooltip: { shared: true, intersect: false },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, inverseColors: false, opacityFrom: 0.6, opacityTo: 0.05, stops: [0, 60, 100] }
    },
  legend: { show: false }
  };

  return <Chart options={options} series={payload.series} type="area" height={260} />
}
