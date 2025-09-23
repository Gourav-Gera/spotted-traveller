import Link from 'next/link';

export default function DesignScreens() {
  const routes = [
    '/',
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/verify-code',
    '/auth/verify-email',
    '/auth/reset-password',
    '/auth/password-updated',
    '/dashboard',
    '/dashboard/about',
    '/dashboard/accommodations',
    '/dashboard/attractions',
    '/dashboard/bookings',
    '/dashboard/bookings/1',
    '/dashboard/bookings/cancel',
    '/dashboard/cities',
    '/dashboard/crowdfunding',
    '/dashboard/earnings',
    '/dashboard/ecommerce',
    '/dashboard/events',
    '/dashboard/orders',
    '/dashboard/profile'
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFB] p-8">
      <div className="max-w-4xl mx-auto card-surface">
        <h1 className="text-2xl font-bold mb-4">Design screens (click to review)</h1>
        <p className="text-sm text-[var(--gray)] mb-6">This page lists every static screen already implemented so you can click through and verify the designs match Figma.</p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {routes.map(r => (
            <li key={r}>
              <Link href={r} className="block p-3 rounded-lg border hover:bg-gray-50">{r}</Link>
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
}
