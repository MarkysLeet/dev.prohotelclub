import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-85px)] mt-[85px] flex flex-col lg:block bg-soft-sand">

      {/*
        Hero Background Image:
        On mobile/tablet: Full width, upper half.
        On desktop (lg): Right side, leaving space on the left.
        (576px / 1920px = approx 30% left space)
      */}
      <div className="relative lg:absolute lg:right-0 lg:top-0 w-full lg:w-[calc(100vw-min(30vw,576px))] h-[50vh] lg:h-full z-0 overflow-hidden">
        <Image
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1b/8e/caption.jpg?w=1200&h=-1&s=1"
          alt="Luxury Hotel"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col lg:block max-w-[1920px] mx-auto px-6 lg:px-0">

        {/* Left Block */}
        <div className="flex flex-col items-start text-left pt-12 lg:pt-[254px] lg:pl-[52px] w-full lg:w-[min(45vw,869px)] mb-12 lg:mb-0 animate-fade-in">

          <h1 className="font-moniqa text-[clamp(60px,8vw,120px)] text-primary-text leading-[0.85] tracking-tight m-0 p-0">
            Профессиональная среда <br className="hidden md:block" />
            для работы с отелями
          </h1>

          <p className="font-century-gothic text-[clamp(16px,1.5vw,24px)] text-primary-text leading-[1.4] m-0 p-0 mt-6 lg:mt-[160px] max-w-[644px]">
            Качественные превью и структурированные данные.<br className="hidden md:block" />
            Создано экспертами для экспертов индустрии.
          </p>

          <button className="mt-8 lg:mt-12 flex items-center justify-center border border-evergreen-forest text-evergreen-forest font-century-gothic text-[clamp(16px,1.5vw,24px)] rounded-[26px] hover:bg-evergreen-forest hover:text-soft-sand transition-colors duration-200 px-8 py-3 w-full sm:w-auto min-w-[281px]">
            Подробнее о нас
          </button>
        </div>

        {/* Hotel Info Card (Right Bottom on Desktop) */}
        <div className="relative lg:absolute lg:bottom-0 lg:right-0 w-full lg:w-[clamp(600px,60vw,900px)] lg:aspect-[900/357] mt-auto pb-12 lg:pb-0 animate-fade-in-delayed flex flex-col justify-end items-end">

          {/* SVG Background Layer (Desktop only) */}
          <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
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

          {/* Mobile Background */}
          <div className="lg:hidden absolute inset-0 z-0 bg-soft-sand/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl" />

          {/* Content Layer */}
          <div className="relative z-10 w-full h-full flex flex-col items-end justify-end text-left pr-0 lg:pr-[5%] pb-8 lg:pb-[10%] px-6 lg:px-0 pt-8 lg:pt-0">

            {/* Название отеля */}
            <h2 className="font-moniqa text-[clamp(32px,4vw,50px)] text-primary-text leading-none m-0 p-0 w-full lg:w-[auto] max-w-[400px] text-right lg:text-left mb-6 lg:mb-4">
              Название отеля
            </h2>

            {/* Теги */}
            <div className="flex flex-wrap gap-2 lg:gap-[20px] w-full lg:w-[auto] justify-end lg:justify-start mb-6">
              {["Семейный", "Всё включено", "16+"].map((tag) => (
                <div key={tag} className="flex items-center justify-center h-[27px] px-4 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]">
                  <span className="text-[#2e4b2f] font-century-gothic text-[12px] uppercase tracking-wider mt-0.5">
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Описание */}
            <p className="font-century-gothic text-[clamp(16px,1.5vw,24px)] text-primary-text leading-snug m-0 p-0 w-full lg:w-[auto] max-w-[615px] text-right lg:text-left mb-8">
              Короткое описание отеля, локации, преимуществ
            </p>

            {/* Action */}
            <button className="relative w-full sm:w-[283px] h-[53px] group focus:outline-none rounded-[26px]">
                <div className="absolute inset-0 w-full h-full bg-evergreen-forest rounded-[26px] border border-black transition-colors group-hover:bg-[#1F3520]" />
                <span className="absolute inset-0 flex items-center justify-center font-century-gothic text-white text-[clamp(16px,1.5vw,24px)] font-normal tracking-wide">
                  Посмотреть детали
                </span>
            </button>
          </div>
        </div>

        {/* Слайдер (точки) - Positioned on top of image for desktop */}
        <div className="hidden lg:flex absolute bottom-[10%] left-[clamp(600px,45vw,861px)] z-20 gap-2">
          <div className="w-[12.5px] h-[12.5px] bg-white rounded-[6.25px] border-2 border-evergreen-forest cursor-pointer" />
          <div className="w-[12.5px] h-[12.5px] bg-white/70 hover:bg-white rounded-[6.25px] cursor-pointer transition-colors" />
          <div className="w-[12.5px] h-[12.5px] bg-white/70 hover:bg-white rounded-[6.25px] cursor-pointer transition-colors" />
        </div>

      </div>
    </section>
  );
}
