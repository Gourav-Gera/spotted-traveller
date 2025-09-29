export type PublicOrderStatus = 'confirmed' | 'on_the_way' | 'delivered' | 'cancelled';
export interface PublicOrder { id:number; product:string; price:number; placed:string; status:PublicOrderStatus; address:string; }
export const publicOrders:PublicOrder[] = [
  {id:1, product:'Male Trending Tshirt', price:100, placed:'2025-06-30', status:'confirmed', address:'John Doe, (919) 471-0296, 7723 Guess Rd, Hillsborough, North Carolina, 27278'},
  {id:2, product:'Male Trending Tshirt', price:100, placed:'2025-06-30', status:'on_the_way', address:'John Doe, (919) 471-0296, 7723 Guess Rd, Hillsborough, North Carolina, 27278'},
  {id:3, product:'Male Trending Tshirt', price:100, placed:'2025-06-30', status:'delivered', address:'John Doe, (919) 471-0296, 7723 Guess Rd, Hillsborough, North Carolina, 27278'},
  {id:4, product:'Male Trending Tshirt', price:100, placed:'2025-06-30', status:'cancelled', address:'John Doe, (919) 471-0296, 7723 Guess Rd, Hillsborough, North Carolina, 27278'},
];
export const formatOrderDate = (iso:string)=> new Date(iso).toLocaleDateString(undefined,{month:'short', day:'2-digit', year:'numeric'});
