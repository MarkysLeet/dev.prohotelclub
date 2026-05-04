"use client";

import { useRouter } from 'next/navigation';
import { HotelPageClient } from './HotelPageClient';
import { HotelInteractiveContainer } from '@/components/hotel-detail/HotelInteractiveContainer';
import { HotelComments } from '@/components/hotel-detail/HotelComments';
import { HotelWidgetsPanel } from '@/components/hotel-detail/HotelWidgetsPanel';
import { SimilarHotels } from '@/components/hotel-detail/SimilarHotels';
import { HotelPageSkeleton } from '@/components/hotel-detail/HotelPageSkeleton';
import Image from 'next/image';
import Header from '@/components/Header';
import { use, useEffect, useState } from 'react';
import { HotelDetailData } from '@/lib/hotel-mock-data';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { ReviewRequestModal } from '@/components/hotel-detail/ReviewRequestModal';
import { HotelSubscribeButton } from '@/components/hotel-detail/HotelSubscribeButton';

import Footer from "@/components/Footer";
interface HotelPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function HotelPage({ params }: HotelPageProps) {
  const { slug } = use(params);
  const [hotelData, setHotelData] = useState<HotelDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { user } = useAuth();
  const { success } = useToast();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    async function fetchHotel() {
      const data = await api.getHotelDetailBySlug(slug);
      if (mounted) {
        if (data) {
          setHotelData(data);
        }
        setLoading(false);
      }
    }
    fetchHotel();
    return () => { mounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-soft-sand relative pt-[56px] lg:pt-[64px]">
        <Header />
        <HotelPageSkeleton />
        <Footer />
    </main>
    );
  }

  if (!hotelData) {
    router.replace('/404');
    return null;
  }

  const handleReviewRequestSubmit = async (reason: string) => {
    if (!user || !hotelData) return;
    await api.addReviewRequest(hotelData.slug, hotelData.name, user.id, reason);
    success('Запрос на обзор успешно отправлен!');
  };

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
            <HotelSubscribeButton hotelSlug={hotelData.slug} />
            {user?.hasActiveSubscription && (
              <button 
                onClick={() => setIsReviewModalOpen(true)}
                className="px-6 py-3 bg-[#D4AF37] text-white rounded-xl font-medium font-century-gothic text-sm transition-all hover:bg-[#B5952F] duration-300 shadow-sm flex items-center justify-center">
                Запросить обзор
              </button>
            )}
          </div>
        </div>

        {/* Hero Area (60/40 Layout) */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16 h-auto lg:h-[500px]">
          {/* Main Image (60%) */}
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

          {/* Info Panel with Widgets (40%) */}
          <div className="w-full lg:w-[40%] h-full">
            <HotelWidgetsPanel hotelData={hotelData} />
          </div>
        </div>

        {/* Interactive Content Container (Grid of Buttons + Content Area) */}
        <HotelInteractiveContainer hotelData={hotelData} />

        {/* Two Column Layout for Comments and Similar Hotels */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-full lg:w-[65%]">
            <HotelComments hotelSlug={slug} />
          </div>
          <div className="w-full lg:w-[35%] pt-8">
            <SimilarHotels />
          </div>
        </div>
      </div>

      {hotelData && (
        <ReviewRequestModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmit={handleReviewRequestSubmit}
          hotelName={hotelData.name}
        />
      )}
    </main>
  );
}
