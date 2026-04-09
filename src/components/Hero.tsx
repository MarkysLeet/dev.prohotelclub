import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-soft-sand overflow-hidden">
      {/*
        DESKTOP LAYOUT
        Fluid layout: fills available height, uses grid/flex for dynamic scaling
      */}
      <div className="hidden lg:flex relative mx-auto w-full max-w-[1920px] h-[calc(100vh-85px)] min-h-[600px] items-stretch">

        {/* Left Space (30%) & Right Image Area (70%) */}
        <div className="w-[30%] h-full shrink-0 relative z-10" />
        <div className="w-[70%] h-full relative z-0 overflow-hidden">
          <Image
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1b/8e/caption.jpg?w=1200&h=-1&s=1"
            alt="Luxury Hotel"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Left Block (Text and Button) - Overlaps slightly with image */}
        <div className="absolute left-[2.7%] top-1/2 -translate-y-[65%] w-[45%] flex flex-col items-start z-10">
          <h1 className="font-moniqa text-[clamp(60px,6.25vw,120px)] text-primary-text leading-[0.85] tracking-tight m-0 p-0 whitespace-nowrap">
            Профессиональная среда <br />
            для работы с отелями
          </h1>

          <p className="font-century-gothic text-[clamp(16px,1.25vw,24px)] text-primary-text leading-[1.4] m-0 p-0 mt-[16%] w-[85%] 2xl:w-[74%]">
            Качественные превью и структурированные данные.<br />
            Создано экспертами для экспертов индустрии.
          </p>

          <button className="mt-[11%] flex items-center justify-center border border-evergreen-forest text-evergreen-forest font-century-gothic text-[clamp(16px,1.25vw,24px)] rounded-[26px] hover:bg-evergreen-forest hover:text-soft-sand transition-colors duration-200 px-[1.5vw] py-[0.7vw] 2xl:px-8 2xl:py-3 min-w-[281px]">
            Подробнее о нас
          </button>
        </div>

        {/* Right Hotel Info Block with SVG Background */}
        <div className="absolute right-0 bottom-0 w-[46.875%] aspect-[900/357] z-10 flex flex-col items-end justify-end pb-[2.81%] pr-[2.7%]">
          {/* Exact SVG from Figma acting as background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg
              viewBox="0 0 900 357"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path d="M899.929 0L899.646 6.06825C899.747 27.837 877.266 71.3744 786.532 71.3744H300.266C262.001 72.2247 185.47 96.3743 185.47 186.17V189.742V296.374C185.47 320.543 158.369 356.547 80.8181 356.547C3.2671 356.547 -5.5163 351.978 2.30683 356.547H80.8181H695.054H899.427L900 0H899.929Z" fill="#F6EEE1"/>
            </svg>
          </div>

          {/* Content layered over SVG */}
          <div className="relative z-10 flex flex-col items-end text-left w-full h-full">
             {/* Name */}
             <div className="absolute left-[72.33%] top-[28.57%] w-auto">
               <h2 className="font-moniqa text-[clamp(28px,2.6vw,50px)] text-primary-text leading-none m-0 p-0 whitespace-nowrap">
                 Название отеля
               </h2>
             </div>

             {/* Tags */}
             <div className="absolute right-[0.5%] top-[45.65%] flex gap-[1.04vw] 2xl:gap-[20px]">
               {["16+", "Семейный", "Всё включено"].map((tag) => (
                 <div key={tag} className="flex items-center justify-center h-[27px] px-2 xl:px-4 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]">
                   <span className="text-[#2e4b2f] font-century-gothic text-[10px] xl:text-[12px] uppercase tracking-wider mt-0.5 whitespace-nowrap">
                     {tag}
                   </span>
                 </div>
               ))}
             </div>

             {/* Description */}
             <div className="absolute left-[28.44%] top-[56.86%] w-[68.33%] text-right">
                <p className="font-century-gothic text-[clamp(14px,1.25vw,24px)] text-primary-text leading-snug m-0 p-0">
                  Короткое описание отеля, локации, преимуществ
                </p>
             </div>

             {/* Button */}
             <div className="absolute left-[65.55%] top-[71.42%] w-[31.22%] h-[14.84%] group focus:outline-none rounded-[26px]">
                <div className="absolute inset-0 w-full h-full bg-evergreen-forest rounded-[26px] border border-black transition-colors group-hover:bg-[#1F3520]" />
                <button className="absolute inset-0 flex items-center justify-center font-century-gothic text-soft-sand text-[clamp(12px,1.25vw,24px)] font-normal tracking-wide w-full h-full">
                  Посмотреть детали
                </button>
             </div>
          </div>
        </div>

        {/* Dots (Slider) */}
        <div className="absolute left-[44.84%] bottom-8 z-20 flex gap-2">
          <div className="w-[13px] h-[13px] bg-white rounded-[6.5px] border-2 border-evergreen-forest cursor-pointer" />
          <div className="w-[13px] h-[13px] bg-white/70 hover:bg-white rounded-[6.5px] cursor-pointer transition-colors" />
          <div className="w-[13px] h-[13px] bg-white/70 hover:bg-white rounded-[6.5px] cursor-pointer transition-colors" />
        </div>
      </div>

      {/* MOBILE & TABLET LAYOUT */}
      <div className="lg:hidden relative w-full min-h-[calc(100vh-85px)] flex flex-col">
        {/* Image takes top portion */}
        <div className="relative w-full h-[50vh] min-h-[400px] z-0 overflow-hidden">
          <Image
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1b/8e/caption.jpg?w=1200&h=-1&s=1"
            alt="Luxury Hotel"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Content Flow */}
        <div className="relative z-10 w-full flex flex-col px-6 pt-12 pb-12 flex-1">
          <h1 className="font-moniqa text-[clamp(60px,12vw,90px)] text-primary-text leading-[0.85] tracking-tight m-0 p-0">
            Профессиональная среда <br />
            для работы с отелями
          </h1>

          <p className="font-century-gothic text-[clamp(16px,4vw,20px)] text-primary-text leading-[1.4] m-0 p-0 mt-6 max-w-[644px]">
            Качественные превью и структурированные данные.<br />
            Создано экспертами для экспертов индустрии.
          </p>

          <button className="mt-8 flex items-center justify-center border border-evergreen-forest text-evergreen-forest font-century-gothic text-[clamp(16px,4vw,20px)] rounded-[26px] hover:bg-evergreen-forest hover:text-soft-sand transition-colors duration-200 px-8 py-3 w-full sm:w-auto">
            Подробнее о нас
          </button>

          {/* Hotel Info Card for Mobile */}
          <div className="relative mt-12 w-full pt-8 flex flex-col">
            <div className="absolute inset-0 z-0 bg-soft-sand/95 backdrop-blur-sm rounded-xl border border-[#2e4b2f]/20 shadow-xl" />

            <div className="relative z-10 p-6 flex flex-col gap-4">
              <h2 className="font-moniqa text-[clamp(32px,8vw,50px)] text-primary-text leading-none m-0 p-0">
                Название отеля
              </h2>

              <div className="flex flex-wrap gap-2">
                {["16+", "Семейный", "Всё включено"].map((tag) => (
                  <div key={tag} className="flex items-center justify-center h-[27px] px-4 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]">
                    <span className="text-[#2e4b2f] font-century-gothic text-[12px] uppercase tracking-wider mt-0.5">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>

              <p className="font-century-gothic text-[clamp(16px,4vw,20px)] text-primary-text leading-snug m-0 p-0">
                Короткое описание отеля, локации, преимуществ
              </p>

              <button className="relative w-full h-[53px] group focus:outline-none rounded-[26px] mt-2">
                <div className="absolute inset-0 w-full h-full bg-evergreen-forest rounded-[26px] border border-black transition-colors group-hover:bg-[#1F3520]" />
                <span className="absolute inset-0 flex items-center justify-center font-century-gothic text-white text-[16px] font-normal tracking-wide">
                  Посмотреть детали
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
