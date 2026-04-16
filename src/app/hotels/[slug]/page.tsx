import { notFound } from 'next/navigation';
import { getHotelBySlug } from '@/lib/hotel-mock-data';
import { HotelAnchorMenu } from '@/components/hotel-detail/HotelAnchorMenu';
import { HotelSection } from '@/components/hotel-detail/HotelSection';
import { HotelPageClient } from './HotelPageClient';
import Image from 'next/image';
import Header from '@/components/Header';
import { StarIcon, WaveIcon, City01Icon, Location01Icon, GoogleIcon, Calendar01Icon, Restaurant01Icon } from 'hugeicons-react';

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

        {/* Hero Area */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16 h-auto lg:h-[500px]">
          {/* Main Image */}
          {hotelData.heroImage && (
            <div className="relative w-full lg:w-[60%] h-[300px] md:h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={hotelData.heroImage}
                alt={hotelData.name}
                fill
                className="object-cover transition-transform duration-[2000ms] hover:scale-105"
                priority
              />
            </div>
          )}

          {/* Info Panel */}
          <div className="w-full lg:w-[40%] bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col justify-between">
             <div className="space-y-6">
                <h3 className="font-moniqa text-3xl text-primary-text mb-2">Общая информация</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {/* Stars */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0">
                      <StarIcon size={20} className="fill-current" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">Категория</p>
                      <p className="text-primary-text font-medium text-sm">{hotelData.stars || 5} звёзд</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0">
                      <GoogleIcon size={20}  />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">Google Rating</p>
                      <p className="text-primary-text font-medium text-sm">{hotelData.googleRating || 4.8} / 5</p>
                    </div>
                  </div>

                  {/* Distance to Sea */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0">
                      <WaveIcon size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">До моря</p>
                      <p className="text-primary-text font-medium text-sm">{hotelData.distanceToSea || "Первая линия"}</p>
                    </div>
                  </div>

                  {/* Distance to City */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0">
                      <City01Icon size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">До города</p>
                      <p className="text-primary-text font-medium text-sm">{hotelData.distanceToCity || "5 км"}</p>
                    </div>
                  </div>

                  {/* Meal Plan */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0">
                      <Restaurant01Icon size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">Питание</p>
                      <p className="text-primary-text font-medium text-sm">{hotelData.mealPlan || "Ultra All Inclusive"}</p>
                    </div>
                  </div>

                  {/* Build Year */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest shrink-0">
                      <Calendar01Icon size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-secondary-text font-semibold">Год постройки</p>
                      <p className="text-primary-text font-medium text-sm">{hotelData.buildYear || 2024}</p>
                    </div>
                  </div>
                </div>
             </div>

             <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                <Location01Icon size={20} className="text-evergreen-forest shrink-0" />
                <p className="text-sm text-secondary-text leading-tight">
                  <span className="block text-primary-text font-medium mb-0.5">Локация</span>
                  {hotelData.location}
                </p>
             </div>
          </div>
        </div>

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
