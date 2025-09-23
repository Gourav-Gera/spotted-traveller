import React from 'react';

// Mock notifications (could later be fetched from API)
const notifications = Array.from({length:9}).map((_,i)=>({
  id:i+1,
  title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  body:'Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id feugiat libero. Donec eget interdum magna.',
  time:'12:00PM',
  read: i>2 // first 3 unread
}));

export default function NotificationsPage(){
  return (
    <div className="">
      <h1 className="text-xl text-primary font-semibold mb-6">Notifications</h1>
      <div className=" rounded-xl border border-gray-100 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {notifications.map(n=> (
            <li key={n.id} className="flex items-start gap-6 px-0 py-5 pt-0 bg-transparent">
              <div className="flex-1">
                <h3 className="text-[18px] leading-snug font-semibold text-gray-800 mb-2">{n.title}</h3>
                <p className="text-[16px] leading-relaxed text-gray-400 max-w-3xl">{n.body}</p>
              </div>
              <div className="text-sm font-medium text-gray-400 whitespace-nowrap pt-1">{n.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
