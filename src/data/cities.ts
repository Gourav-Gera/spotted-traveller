// Central mock data + types for cities domain
export interface Attraction { id: string; name: string; image: string; city: string; blurb: string; }
export interface EventItem { id: string; title: string; date: string; price: string; city: string; }
export interface Review { id: string; user: string; rating: number; text: string; avatar?: string; }
export interface Accommodation { id: string; city: string; name: string; price: number; images: string[]; short: string; rating: number; reviews: Review[]; }
export interface CityMeta { slug: string; name: string; region: string; country: string; description: string; tags: string[]; hero: string; gallery: string[]; municipality: { heading: string; body: string[]; images: string[]; }; }

export const cities: CityMeta[] = [
  {
    slug: 'rome',
    name: 'Rome',
    region: 'Lazio',
    country: 'Italy',
    description: 'Historic capital with layers of ancient, renaissance and modern culture.',
    tags: ['Historic','Culture','Food','Architecture'],
    hero: '/images/rome-city-image-1.png',
    gallery: ['/images/rome-city-image-1.png','/images/rome-city-image-2.png','/images/rome-city-image-3.png'],
    municipality: {
      heading: 'About Rome Municipality',
      body: [
        'Rome is a sprawling open‑air museum where layers of history unfold across vibrant piazzas, ancient forums and baroque masterpieces.',
        'The municipality balances heritage preservation with contemporary innovation, supporting local artisans, sustainable mobility and cultural events.'
      ],
      images: ['/images/rome-city-image-2.png','/images/rome-city-image-3.png']
    }
  },
  {
    slug: 'genoa',
    name: 'Genoa',
    region: 'Liguria',
    country: 'Italy',
    description: 'Maritime heritage, caruggi alleys and rich mercantile traditions.',
    tags: ['Port','Heritage','Seafood'],
    hero: '/images/rome-city-image-3.png',
    gallery: ['/images/rome-city-image-3.png','/images/rome-city-image-1.png','/images/rome-city-image-2.png'],
    municipality: {
      heading: 'About Genoa Municipality',
      body: ['Genoa blends medieval streets with dynamic port redevelopment projects.'],
      images: ['/images/rome-city-image-1.png','/images/rome-city-image-2.png']
    }
  }
];

export const accommodations: Accommodation[] = Array.from({length:18}).map((_,i)=>({
  id: `acc-${i+1}`,
  city: i%2? 'rome':'genoa',
  name: `Hotel Park Palace ${i+1}`,
  price: 100 + (i%5)*20,
  images: ['/images/hotel-img-table.png','/images/hotel-thumb-image.png','/images/rome-city-image-1.png','/images/rome-city-image-2.png','/images/rome-city-image-3.png'],
  short: 'Cozy modern rooms with local charm and quick access to landmarks.',
  rating: 4.5,
  reviews: Array.from({length:3}).map((__,r)=>( { id:`r-${i}-${r}`, user:'wilson', rating: 5-r%2, text:'Excellent hospitality and clean interiors. Would return!' }))
}));

export const attractions: Attraction[] = [
  { id:'att-1', city:'rome', name:'Colosseum', image:'/images/attraction-img-1.png', blurb:'Iconic ancient amphitheatre.'},
  { id:'att-2', city:'rome', name:"Saint Peter's Basilica", image:'/images/attraction-img-2.png', blurb:'Renaissance dome & papal basilica.'},
  { id:'att-3', city:'rome', name:'Roman Forum', image:'/images/attraction-img-3.png', blurb:'Center of ancient Roman life.'},
  { id:'att-4', city:'rome', name:'Trevi Fountain', image:'/images/attraction-img-4.png', blurb:'Baroque fountain legend.'},
  { id:'att-5', city:'rome', name:'Pantheon', image:'/images/attraction-img-5.png', blurb:'Temple turned church marvel.'},
  { id:'att-6', city:'genoa', name:'Old Port', image:'/images/attraction-img-6.png', blurb:'Revitalised waterfront.'},
  { id:'att-7', city:'genoa', name:'Cathedral of Genoa', image:'/images/roman-forum-img.svg', blurb:'Medieval cathedral & art.'},
  { id:'att-8', city:'genoa', name:'Harbour Promenade', image:'/images/attraction-img-8.png', blurb:'Seaside views & cultural spots.'}
];

export const events: EventItem[] = [
  { id:'ev-1', city:'rome', title:'Summer Music Fest', date:'2025-07-10', price:'Free' },
  { id:'ev-2', city:'rome', title:'Ancient Trails Walk', date:'2025-07-14', price:'$20' },
  { id:'ev-3', city:'genoa', title:'Harbour Lights', date:'2025-08-02', price:'$15' },
  { id:'ev-4', city:'genoa', title:'Maritime Expo', date:'2025-08-12', price:'$30' }
];

export function getCity(slug:string){ return cities.find(c=>c.slug===slug); }
export function getCityAccommodations(slug:string){ return accommodations.filter(a=>a.city===slug); }
export function getAccommodation(id:string){ return accommodations.find(a=>a.id===id); }
export function getCityAttractions(slug:string){ return attractions.filter(a=>a.city===slug); }
export function getCityEvents(slug:string){ return events.filter(e=>e.city===slug); }
