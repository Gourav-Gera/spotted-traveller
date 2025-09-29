export interface CrowdfundingCampaign {
  id: string;            // numeric id as string for routing
  title: string;
  slug: string;          // SEO slug (not currently used for routing, but available)
  shortDescription: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
  daysPassed: number;
  duration: number;      // total days
  city?: string;         // city slug (optional)
  hero: string;          // primary image path
  gallery: string[];     // secondary images
  category?: string;
  status: 'Ongoing' | 'Completed' | 'Cancelled';
}

// Sample seed campaigns (public facing)
export const crowdfundingCampaigns: CrowdfundingCampaign[] = [
  {
    id: '1',
    title: 'Restore Historic City Library',
    slug: 'restore-historic-city-library',
    shortDescription: 'Help us preserve knowledge by restoring the old municipal library reading halls & archive wing.',
    description: 'Our historic city library has served generations and holds thousands of rare volumes that need controlled environments. The roof leakage and outdated climate system threaten these invaluable records. Funds will be used for structural reinforcement, energy‑efficient HVAC installation, reading lounge refurbishment and accessible ramps. Transparency reports will be shared weekly including invoices & progress photos.',
    raised: 6200,
    goal: 10000,
    donors: 233,
    daysPassed: 12,
    duration: 30,
    hero: '/images/why-1.webp',
    gallery: ['/images/rome-city-image-1.png','/images/rome-city-image-2.png','/images/rome-city-image-3.png'],
    category: 'Community',
    status: 'Ongoing'
  },
  {
    id: '2',
    title: 'Green Riverside Park Expansion',
    slug: 'green-riverside-park-expansion',
    shortDescription: 'Expanding public green spaces with native plants, play area & cycling loop along the river.',
    description: 'The riverside has long lacked accessible recreation areas. This campaign funds soil restoration, flood‑resilient native plant beds, eco‑friendly playground equipment and solar pathway lighting. Community volunteers will join scheduled planting weekends. Full budget and timeline milestones published openly.',
    raised: 9800,
    goal: 12000,
    donors: 401,
    daysPassed: 24,
    duration: 40,
    hero: '/images/why-2.webp',
    gallery: ['/images/rome-city-img.png','/images/rome-city-img-3.png','/images/why-3.webp'],
    category: 'Environment',
    status: 'Ongoing'
  },
  {
    id: '3',
    title: 'Local Artisans Digital Marketplace',
    slug: 'local-artisans-digital-marketplace',
    shortDescription: 'Build an online platform enabling rural artisans to showcase and sell crafts globally.',
    description: 'Rural artisans struggle with limited visibility and fragmented logistics. Funds cover platform UX design, secure checkout integration, artisan training workshops, photography micro‑grants and initial pooled shipping support. Impact metrics: artisan onboard count, order conversion, average craft price uplift.',
    raised: 12000,
    goal: 12000,
    donors: 512,
    daysPassed: 30,
    duration: 30,
    hero: '/images/why-3.webp',
    gallery: ['/images/home-banner-img.webp','/images/home-img.png','/images/rome-city-image-1.png'],
    category: 'Economic',
    status: 'Completed'
  }
];

export function getCampaignById(id: string){
  return crowdfundingCampaigns.find(c => c.id === id);
}
