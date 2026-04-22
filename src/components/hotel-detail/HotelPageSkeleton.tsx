

export function HotelPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 animate-pulse">
      {/* Top Section: Meta & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex flex-col gap-4 max-w-2xl w-full">
          <div className="w-1/3 h-4 bg-gray-200 rounded" />
          <div className="w-3/4 h-16 md:h-20 bg-gray-200 rounded" />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="w-40 h-12 bg-gray-200 rounded-xl" />
          <div className="w-40 h-12 bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Hero Area (60/40 Layout) */}
      <div className="flex flex-col lg:flex-row gap-6 mb-16 h-auto lg:h-[500px]">
        {/* Main Image (60%) */}
        <div className="w-full lg:w-[60%] h-[300px] md:h-[400px] lg:h-full rounded-2xl bg-gray-200" />

        {/* Info Panel with Widgets (40%) */}
        <div className="w-full lg:w-[40%] h-full flex flex-col gap-4">
          <div className="h-1/3 bg-white border border-gray-100 rounded-2xl p-6">
             <div className="w-1/2 h-6 bg-gray-200 rounded mb-4" />
             <div className="w-full h-12 bg-gray-200 rounded" />
          </div>
          <div className="h-1/3 bg-white border border-gray-100 rounded-2xl p-6">
             <div className="w-1/2 h-6 bg-gray-200 rounded mb-4" />
             <div className="w-full h-12 bg-gray-200 rounded" />
          </div>
          <div className="h-1/3 bg-white border border-gray-100 rounded-2xl p-6">
             <div className="w-1/2 h-6 bg-gray-200 rounded mb-4" />
             <div className="w-full h-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Interactive Content Container */}
      <div className="flex flex-col lg:flex-row gap-6 mb-16">
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
           <div className="w-full h-14 bg-gray-200 rounded-xl" />
           <div className="w-full h-14 bg-gray-200 rounded-xl" />
           <div className="w-full h-14 bg-gray-200 rounded-xl" />
        </div>
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl h-[400px]" />
      </div>
    </div>
  );
}
