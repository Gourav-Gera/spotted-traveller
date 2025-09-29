export type PublicBookingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface PublicBooking {
  id: number;
  hotel: string;
  pricePerNight: number;
  startDate: string; // ISO
  endDate: string; // ISO
  city: string;
  country: string;
  status: PublicBookingStatus;
}

export const publicBookings: PublicBooking[] = [
  { id:1, hotel:'Hotel Park Palace', pricePerNight:100, startDate:'2025-07-13', endDate:'2025-07-14', city:'Rome', country:'Italy', status:'upcoming' },
  { id:2, hotel:'Hotel Park Palace', pricePerNight:100, startDate:'2025-07-13', endDate:'2025-07-14', city:'Rome', country:'Italy', status:'ongoing' },
  { id:3, hotel:'Hotel Park Palace', pricePerNight:100, startDate:'2025-07-13', endDate:'2025-07-14', city:'Rome', country:'Italy', status:'completed' },
  { id:4, hotel:'Hotel Park Palace', pricePerNight:100, startDate:'2025-07-13', endDate:'2025-07-14', city:'Rome', country:'Italy', status:'cancelled' },
];

export function formatRange(start:string,end:string){
  const s = new Date(start); const e = new Date(end);
  const fmt = (d:Date)=> d.toLocaleDateString(undefined,{ day:'2-digit', month:'short', year:'numeric'});
  return `${fmt(s)} – ${fmt(e)}`;
}
