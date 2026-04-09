import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[995px] mt-[85px] overflow-hidden flex items-start">

      {/*
        Hero Background Image:
        According to Figma data, X is 576, meaning the image doesn't start from the left edge.
        It starts at 576px from left, and has width 1905px (stretching beyond 1920px screen).
        This gives a split-screen or overlay effect where the left side text is on a solid background,
        and the image is on the right.
      */}
      <div
        className="absolute top-0 right-0 h-full z-0"
        style={{
          width: 'calc(100% - 576px)',
          minWidth: '50%', // fallback for smaller screens
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1542314831-c6a4d1409e50?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Hotel"
          fill
          className="object-cover"
          priority
        />
        {/* We can add a gradient or subtle overlay to match the design's "cut" if there was any masking */}
      </div>

      {/* Main Container 1920px max width to keep text aligned to Figma coordinates */}
      <div className="relative z-10 w-full max-w-[1920px] h-full mx-auto">

        {/* Left Block */}
        {/* Y: 339 absolute from top = 339 - 85(header) = 254px top margin inside this section */}
        <div
          className="absolute flex flex-col items-start animate-fade-in"
          style={{ top: '254px', left: '52px', width: '869px' }}
        >
          {/* Профессиональная среда для работы с отелями (Y: 339 relative to top = top of container) */}
          <h1 className="font-moniqa text-[120px] text-primary-text leading-[0.85] tracking-tight">
            Профессиональная среда <br />
            для работы с отелями
          </h1>

          {/* Качественные превью... Y: 620 absolute -> 620 - 339 = 281px gap from top of this block */}
          <p className="font-century-gothic text-[24px] text-primary-text leading-[1.4] mt-[161px]">
            Качественные превью и структурированные данные.<br />
            Создано экспертами для экспертов индустрии.
          </p>

          {/* Кнопка Y: 722 -> 722 - 620 = 102px gap minus text height */}
          <button className="mt-[44px] px-[40px] py-[15px] border border-evergreen-forest text-evergreen-forest font-century-gothic text-[24px] rounded-xl hover:bg-evergreen-forest hover:text-soft-sand transition-all duration-200 cinematic-easing">
            Подробнее о нас
          </button>
        </div>

        {/* Hotel Info Card (Right Bottom) */}
        {/* Absolute X: 1020, Y: 725 -> Top offset = 725 - 85 = 640px */}
        <div
          className="absolute bg-white/90 backdrop-blur-md flex flex-col justify-between shadow-xl animate-fade-in-delayed"
          style={{
            top: '640px',
            left: '1020px',
            width: '900px',
            height: '356px',
            borderTopLeftRadius: '40px', // Typical for these corner "cut" designs in Figma, matching rounded design.md
          }}
        >
          {/* We use padding based on text relative coordinates.
              Let's flex it nicely while respecting the general layout */}
          <div className="w-full h-full p-10 flex flex-col justify-end items-end text-right">

            {/* Название отеля. Rel Y: 828. Absolute Y is 725. Diff = 103px from top of card. */}
            <h2 className="font-moniqa text-[50px] text-primary-text leading-none mb-4 w-full text-right">
              Название отеля
            </h2>

            <div className="flex gap-3 mb-6 justify-end w-full">
              {["Семейный", "Всё включено", "16+"].map((tag) => (
                <span key={tag} className="px-4 py-1 border-[0.5px] border-dashed border-evergreen-forest text-evergreen-forest font-century-gothic text-[12px] rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            <p className="font-century-gothic text-[24px] text-primary-text leading-snug mb-8 max-w-[400px]">
              Короткое описание отеля, локации, преимуществ
            </p>

            {/* Action */}
            <button className="relative w-[283px] h-[53px] group focus:outline-none rounded-[26px]">
                <div className="absolute inset-0 w-full h-full bg-[#2e4b2f] rounded-[26px] border border-black transition-colors group-hover:bg-[#1F3520]" />
                <span className="absolute inset-0 flex items-center justify-center font-century-gothic text-white text-[24px] font-normal tracking-wide">
                  Посмотреть детали
                </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
