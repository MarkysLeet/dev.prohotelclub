import React from 'react';
import { cn } from '@/lib/utils';

interface HotelMediaSkeletonProps {
  count: number;
}

export function HotelMediaSkeleton({ count }: HotelMediaSkeletonProps) {
  if (count <= 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-full bg-gray-200 rounded-xl relative overflow-hidden",
            // Имитация пульсации для skeleton effect
            "animate-pulse"
          )}
          style={{
            // Соотношение сторон 16:9 (9 / 16 * 100 = 56.25%)
            paddingBottom: '56.25%'
          }}
        >
          {/* В будущем здесь будет img или next/image */}
        </div>
      ))}
    </div>
  );
}
