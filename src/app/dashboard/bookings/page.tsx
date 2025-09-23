"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// sample data: `avatar` is optional to simulate missing avatars from the API.
const sample = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  orderId: `#234${67 + i}`,
  hotel: "Hotel Name",
  user: `User ${i + 1}`,
  // provide an avatar for some rows and leave it undefined for others
  avatar: i % 3 === 0 ? undefined : "/images/user-thumb-table.svg",
  amount: "$100",
  date: "3 July 2025",
}));

export default function BookingsPage() {
  const [tab, setTab] = useState("upcoming");
  const [q, setQ] = useState("");
  // track avatar load failures per row id so we can show a fallback
  const [avatarError, setAvatarError] = useState<Record<number, boolean>>({});

  // ref + helpers for desktop table horizontal sliding when content overflows
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = tableRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    // small epsilon to avoid rounding issues
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  // direction: -1 left, +1 right
  const scrollByDir = (dir: number) => {
    const el = tableRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.7, 600);
    const target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + dir * amount));
    el.scrollTo({ left: target, behavior: "smooth" });
    // update buttons after scroll animation
    setTimeout(updateScrollButtons, 300);
  };

  useEffect(() => {
    updateScrollButtons();
    const onResize = () => updateScrollButtons();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return sample;
    return sample.filter((s) =>
      [s.orderId, s.hotel, s.user].some((v) => v.toLowerCase().includes(term))
    );
  }, [q]);

  return (
    <div className="min-h-screen  p-0">
      <div className="mx-auto">
        <h2 className="font-bold text-xl mb-4 text-primary">Bookings</h2>
        <div className="card-surface p-0">
          <div className="flex items-center justify-between  gap-4 mb-6 rounded-full border border-[#E5E5E5] w-full">
          {[
            { key: "upcoming", label: "Upcoming" },
            { key: "ongoing", label: "Ongoing" },
            { key: "completed", label: "Completed" },
            { key: "cancelled", label: "Cancelled" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`pill-tab w-[25%] ${tab === t.key ? 'bg-[var(--primary)] text-white' : 'bg-[#F6F7F9] text-[var(--gray)]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

            <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2 search-pill">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bookings..."
            className="w-full text-sm background-[#fff]"
          />
        </div>

          <div className="mt-4">
            <div className="relative hidden md:block">
              <div ref={tableRef as any} className="overflow-x-auto booking-table-wrap" onScroll={() => updateScrollButtons()}>
              <table className="min-w-full text-sm booking-table table-fixed">
                <thead>
                  <tr className="text-left bg-[#F6F6F6] text-[var(--gray)]">
                    <th className="w-12">#</th>
                    <th className="w-28">Order Id</th>
                    <th className="w-48">Hotel Name</th>
                    <th className="w-40">User Name</th>
                    <th className="w-28">Amount</th>
                    <th className="w-36">Booking Date</th>
                    <th className="w-24 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="align-middle">
                      <td className="py-4">{String(r.id).padStart(2, '0')}</td>
                      <td className="py-4">{r.orderId}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Image src="/images/hotel-img-table.png" alt="hotel" width={40} height={40} className="w-10 h-10 rounded-md object-cover block" />
                          <span className="font-semibold">{r.hotel}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3 min-w-0">
                          {r.avatar && !avatarError[r.id] ? (
                            <Image
                              src={r.avatar}
                              alt={r.user}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover block"
                              onError={() => setAvatarError((p) => ({ ...p, [r.id]: true }))}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#F1F3F4] flex items-center justify-center text-sm font-semibold text-[var(--primary)]">
                              {r.user
                                .split(" ")
                                .map((s) => s[0])
                                .slice(0, 2)
                                .join("")}
                            </div>
                          )}
                          <span className="font-semibold truncate max-w-[10rem]">{r.user}</span>
                        </div>
                      </td>
                      <td className="font-semibold py-4">{r.amount}</td>
                      <td className="py-4">{r.date}</td>
                      <td className="py-4 text-right">
                        <div className="inline-flex items-center justify-end gap-4">
                          <Link href={`/dashboard/bookings/${r.id}`} className="text-sm text-[var(--primary)]">
                            <Image src="/images/eye-icon.svg" alt="eye icon" width={16} height={16} className="w-4 h-4 block" />
                          </Link>
                          <Link href={`/dashboard/bookings/${r.id}`} className="text-sm">
                            <Image src="/images/edit-icon.svg" alt="edit icon" width={16} height={16} className="w-4 h-4 block" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>

              {/* slide controls for wide text / overflow on large screens */}
              {(canScrollLeft || canScrollRight) && (
                <>
                  <button
                    onClick={() => scrollByDir(-1)}
                    aria-label="Scroll left"
                    className="hidden md:inline-flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button
                    onClick={() => scrollByDir(1)}
                    aria-label="Scroll right"
                    className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                  </button>
                </>
              )}
            </div>

            {/* Mobile: stacked cards */}
            <div className="md:hidden space-y-4">
              {filtered.map((r) => (
                <div key={r.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Image src="/images/hotel-img-table.png" alt="hotel" width={56} height={56} className="w-14 h-14 rounded-md object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-[var(--gray)]">{r.orderId}</div>
                          <div className="font-semibold">{r.hotel}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-semibold">{r.amount}</div>
                          <div className="text-sm text-[var(--gray)]">{r.date}</div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {r.avatar && !avatarError[r.id] ? (
                            <Image src={r.avatar} alt={r.user} width={36} height={36} className="w-9 h-9 rounded-full object-cover" onError={() => setAvatarError((p) => ({ ...p, [r.id]: true }))} />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#F1F3F4] flex items-center justify-center text-sm font-semibold text-[var(--primary)]">
                              {r.user
                                .split(" ")
                                .map((s) => s[0])
                                .slice(0, 2)
                                .join("")}
                            </div>
                          )}
                          <div className="font-semibold">{r.user}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link href={`/dashboard/bookings/${r.id}`} className="text-[var(--primary)]">
                            <Image src="/images/eye-icon.svg" alt="eye icon" width={20} height={20} className="w-5 h-5" />
                          </Link>
                          <Link href={`/dashboard/bookings/${r.id}`} className="text-sm">
                            <Image src="/images/edit-icon.svg" alt="edit icon" width={20} height={20} className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
