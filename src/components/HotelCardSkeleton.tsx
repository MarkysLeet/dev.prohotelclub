import { cn } from "@/lib/utils";

interface HotelCardSkeletonProps {
  variant?: 'collection' | 'dashboard';
  className?: string;
}

export function HotelCardSkeleton({ variant = 'collection', className }: HotelCardSkeletonProps) {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full",
        className
      )}
    >
      {/* Image Area Skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 animate-pulse">
        {/* Top Badges Skeleton */}
        <div className="absolute top-4 left-4 z-10 w-24 h-6 bg-white/40 rounded-lg" />
        <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/40 rounded-full" />
      </div>

      {/* Content Area Skeleton */}
      <div className="p-6 flex-1 flex flex-col animate-pulse">
        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <div className="w-16 h-5 bg-gray-200 rounded-md" />
          <div className="w-20 h-5 bg-gray-200 rounded-md" />
          <div className="w-14 h-5 bg-gray-200 rounded-md" />
        </div>

        {/* Title Skeleton */}
        <div className="w-3/4 h-8 bg-gray-200 rounded mb-4" />

        {/* Description Skeleton */}
        <div className="space-y-2 mb-6 flex-1">
          <div className="w-full h-4 bg-gray-200 rounded" />
          <div className="w-full h-4 bg-gray-200 rounded" />
          <div className="w-2/3 h-4 bg-gray-200 rounded" />
        </div>

        {/* Footer Skeleton */}
        {variant === 'collection' ? (
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="w-24 h-4 bg-gray-200 rounded" />
            <div className="w-24 h-9 bg-gray-200 rounded-lg" />
          </div>
        ) : (
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="w-full h-10 bg-gray-200 rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
