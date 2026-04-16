import { notFound } from 'next/navigation';
import { getHotelBySlug } from '@/lib/hotel-mock-data';
import { HotelAnchorMenu } from '@/components/hotel-detail/HotelAnchorMenu';
import { HotelSection } from '@/components/hotel-detail/HotelSection';
import { HotelPageClient } from './HotelPageClient';
import Image from 'next/image';
import Header from '@/components/Header';

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
    <main className="min-h-screen bg-soft-sand relative pt-[56px] lg:pt-[64px]">
      <Header />
      <HotelPageClient hotelName={hotelData.name} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Top Section: Meta & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <p className="text-secondary-text text-sm uppercase tracking-widest font-century-gothic font-medium">
              {hotelData.location} &bull; Съемка: {hotelData.shootingDate}
            </p>
            <h1 className="font-moniqa text-5xl md:text-7xl font-medium text-primary-text leading-[0.9] tracking-tight">
              {hotelData.name}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 bg-evergreen-forest text-soft-sand rounded-xl font-medium font-century-gothic text-sm transition-all hover:bg-evergreen-hover duration-300 shadow-sm flex items-center justify-center">
              Сводный отчет (PDF)
            </button>
            <button className="px-6 py-3 bg-white text-evergreen-forest border border-gray-200 rounded-xl font-medium font-century-gothic text-sm transition-all hover:bg-gray-50 hover:border-gray-300 duration-300 shadow-sm flex items-center justify-center">
              Концепция отеля
            </button>
          </div>
        </div>

        {/* Hero Image Card */}
        {hotelData.heroImage && (
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-sm mb-16">
            <Image
              src={hotelData.heroImage}
              alt={hotelData.name}
              fill
              className="object-cover transition-transform duration-[2000ms] hover:scale-105"
              priority
            />
          </div>
        )}

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-1/4 hidden lg:block sticky top-32 self-start h-[calc(100vh-8rem)]">
             <HotelAnchorMenu sections={hotelData.sections} />
          </aside>

          {/* Sections */}
          <div className="w-full lg:w-3/4 flex flex-col gap-16">
            {hotelData.sections.map((section) => (
              <HotelSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
