export interface Hotel {
  id: string;
  name: string;
  tags: string[];
  description: string;
  imageUrl: string;
  link: string;
}

export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Aman Tokyo',
    tags: ['Urban Retreat', 'Minimalist', 'Panoramic Views'],
    description: 'A monument to the modern Japanese capital, Aman Tokyo is a place of balance and calm. Find sanctuary high above the streets.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c1e?q=80&w=2574&auto=format&fit=crop', // luxury hotel architecture
    link: '#',
  },
  {
    id: '2',
    name: 'Amangiri Resort',
    tags: ['Desert Oasis', 'Canyon Point', 'Secluded Luxury'],
    description: 'Tucked into a protected valley with sweeping views, the resort blends into its dramatic surroundings of deep canyons and towering plateaus.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89af14fb181?q=80&w=2670&auto=format&fit=crop', // minimalist resort interior
    link: '#',
  },
  {
    id: '3',
    name: 'Six Senses Ibiza',
    tags: ['Mediterranean', 'Wellness', 'Sustainable'],
    description: 'Immerse yourself in a setting that celebrates the bohemian spirit of Ibiza, bringing people together through deep connections and profound wellness.',
    imageUrl: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2732&auto=format&fit=crop', // premium aesthetic building
    link: '#',
  }
];
