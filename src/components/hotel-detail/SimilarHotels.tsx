import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const similarHotelsMock = [
  {
    id: '1',
    name: 'Maxx Royal Belek Golf Resort',
    location: 'Белек, Турция',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
    slug: 'maxx-royal-belek'
  },
  {
    id: '2',
    name: 'Regnum Carya',
    location: 'Белек, Турция',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    slug: 'regnum-carya'
  },
  {
    id: '3',
    name: 'NG Phaselis Bay',
    location: 'Кемер, Турция',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    slug: 'ng-phaselis-bay'
  }
];

export function SimilarHotels() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
      <h3 className="font-moniqa text-3xl text-primary-text mb-6">Похожие отели</h3>

      <div className="flex flex-col gap-4">
        {similarHotelsMock.map((hotel) => (
          <Link
            href={`/hotels/${hotel.slug}`}
            key={hotel.id}
            className="group flex gap-4 items-center p-2 rounded-xl hover:bg-soft-sand transition-colors"
          >
            <div className="w-16 h-16 rounded-lg relative overflow-hidden shrink-0">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex-col overflow-hidden">
              <h4 className="font-century-gothic font-bold text-sm text-primary-text truncate group-hover:text-evergreen-forest transition-colors">
                {hotel.name}
              </h4>
              <p className="font-century-gothic text-xs text-secondary-text truncate mt-1">
                {hotel.location}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/hotels"
        className="block w-full text-center mt-6 text-sm font-century-gothic font-medium text-evergreen-forest hover:text-evergreen-hover transition-colors"
      >
        Смотреть все отели
      </Link>
    </div>
  );
}
