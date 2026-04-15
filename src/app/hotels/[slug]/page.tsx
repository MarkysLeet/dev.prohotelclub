import { notFound } from 'next/navigation';
import { getHotelBySlug } from '@/lib/hotel-mock-data';
import { HotelHero } from '@/components/hotel-detail/HotelHero';
import { HotelAnchorMenu } from '@/components/hotel-detail/HotelAnchorMenu';
import { HotelSection } from '@/components/hotel-detail/HotelSection';

interface HotelPageProps {
  params: {
    slug: string;
  };
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { slug } = await params;
  const hotelData = getHotelBySlug(slug);

  if (!hotelData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-soft-sand relative">
      <HotelHero
        name={hotelData.name}
        location={hotelData.location}
        shootingDate={hotelData.shootingDate}
        heroImage={hotelData.heroImage}
      />

      <HotelAnchorMenu sections={hotelData.sections} />

      <div className="flex flex-col pb-32">
        {hotelData.sections.map((section) => (
          <HotelSection key={section.id} section={section} />
        ))}
      </div>
    </main>
  );
}
