import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-soft-sand overflow-hidden">
      {/*
        DESKTOP LAYOUT (Flex/Grid Based)
        Visible only on lg (1024px) and above.
        Occupies exactly 100vh minus the 64px header.
      */}
      <div className="hidden lg:flex relative w-full h-[calc(100vh-64px)] max-w-[1920px] mx-auto">

        {/* Left Content Area (Text & Button) */}
        <div className="w-[45%] h-full flex flex-col justify-center px-12 xl:px-24 z-10 relative">
          <h1 className="font-moniqa text-[clamp(60px,6.25vw,120px)] text-primary-text leading-[0.85] tracking-tight m-0 p-0 whitespace-nowrap">
            Профессиональная среда <br />
            для работы с отелями
          </h1>

          <p className="font-century-gothic text-[clamp(16px,1.25vw,24px)] text-primary-text leading-[1.4] m-0 p-0 mt-8 xl:mt-12 w-[85%]">
            Качественные превью и структурированные данные.<br />
            Создано экспертами для экспертов индустрии.
          </p>

          <button className="mt-8 xl:mt-12 flex items-center justify-center border border-evergreen-forest text-evergreen-forest font-century-gothic text-[clamp(16px,1.25vw,24px)] rounded-[26px] hover:bg-evergreen-forest hover:text-soft-sand transition-colors duration-200 px-6 py-2 xl:px-8 xl:py-3 w-fit min-w-[220px] xl:min-w-[281px]">
            Подробнее о нас
          </button>

          {/* Dots (Slider) - positioned relative to content area */}
          <div className="absolute bottom-12 left-12 xl:left-24 z-20 flex gap-2">
            <div className="w-[13px] h-[13px] bg-white rounded-[6.5px] border-2 border-evergreen-forest cursor-pointer" />
            <div className="w-[13px] h-[13px] bg-white/70 hover:bg-white rounded-[6.5px] cursor-pointer transition-colors border-2 border-transparent" />
            <div className="w-[13px] h-[13px] bg-white/70 hover:bg-white rounded-[6.5px] cursor-pointer transition-colors border-2 border-transparent" />
          </div>
        </div>

        {/* Right Content Area (Image & Hotel Info) */}
        <div className="w-[55%] h-full relative">
          {/* Main Hero Image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1b/8e/caption.jpg?w=1200&h=-1&s=1"
              alt="Luxury Hotel"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Hotel Info Block with SVG Background */}
          {/* We position it at the bottom right based on the original design. */}
          <div className="absolute right-0 bottom-0 w-[85%] max-w-[900px] aspect-[900/357] z-10">

            {/* Exact SVG from Figma acting as background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <svg
                viewBox="0 0 900 357"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-fill"
                preserveAspectRatio="none"
              >
                <path d="M899.929 0L899.646 6.06825C899.747 27.837 877.266 71.3744 786.532 71.3744H300.266C262.001 72.2247 185.47 96.3743 185.47 186.17V189.742V296.374C185.47 320.543 158.369 356.547 80.8181 356.547C3.2671 356.547 -5.5163 351.978 2.30683 356.547H80.8181H695.054H899.427L900 0H899.929Z" fill="#F6EEE1"/>
              </svg>
            </div>

            {/* Content layered over SVG using a Safe Area to avoid overlapping out of bounds */}
            <div className="absolute right-[5.5%] bottom-[12%] top-[25%] left-[30%] z-10 flex flex-col justify-between items-end">

              {/* Hotel Name */}
              <h2 className="font-moniqa text-[clamp(28px,3vw,50px)] text-primary-text leading-none m-0 p-0 whitespace-nowrap">
                Название отеля
              </h2>

              {/* Tags */}
              <div className="flex gap-2 xl:gap-3">
                 {["16+", "Семейный", "Всё включено"].map((tag) => (
                   <div key={tag} className="flex items-center justify-center px-3 py-1 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]">
                     <span className="text-[#2e4b2f] font-century-gothic text-[clamp(10px,0.8vw,12px)] uppercase tracking-wider mt-[1px] whitespace-nowrap">
                       {tag}
                     </span>
                   </div>
                 ))}
              </div>

              {/* Description */}
              <p className="font-century-gothic text-[clamp(12px,1.2vw,20px)] text-primary-text leading-snug m-0 p-0 text-right max-w-[80%]">
                Короткое описание отеля, локации, преимуществ
              </p>

              {/* Button */}
              <div className="w-auto group focus:outline-none">
                  <button className="flex items-center justify-center font-century-gothic text-soft-sand text-[clamp(12px,1vw,16px)] font-normal tracking-wide bg-evergreen-forest border border-black rounded-[26px] transition-colors group-hover:bg-[#1F3520] px-5 py-2 xl:px-8 xl:py-2.5 whitespace-nowrap">
                    Посмотреть детали
                  </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET LAYOUT (Standard Flow) */}
      <div className="lg:hidden relative w-full flex flex-col">
        {/* Image takes top portion */}
        <div className="relative w-full h-[50vh] z-0 overflow-hidden">
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
          <h1 className="font-moniqa text-[clamp(50px,12vw,90px)] text-primary-text leading-[0.85] tracking-tight m-0 p-0">
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
