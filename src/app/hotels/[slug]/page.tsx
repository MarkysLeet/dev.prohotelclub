import { notFound } from 'next/navigation';
import { getHotelBySlug } from '@/lib/hotel-mock-data';
import { HotelHero } from '@/components/hotel-detail/HotelHero';
import { HotelAnchorMenu } from '@/components/hotel-detail/HotelAnchorMenu';
import { HotelSection } from '@/components/hotel-detail/HotelSection';
import { HotelHeader } from '@/components/hotel-detail/HotelHeader';

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
      <HotelHeader hotelName={hotelData.name} />

      {/* pt-16 is added to offset the fixed 4rem (16) header height */}
      <div className="pt-16">
        <HotelHero
          name={hotelData.name}
          location={hotelData.location}
          shootingDate={hotelData.shootingDate}
          heroImage={hotelData.heroImage}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-1/4 hidden lg:block relative">
             <HotelAnchorMenu sections={hotelData.sections} />
          </aside>

          {/* Content Area */}
          <div className="w-full lg:w-3/4 flex flex-col">
            {hotelData.sections.map((section) => (
              <HotelSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
