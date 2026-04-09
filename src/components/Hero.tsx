import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-soft-sand overflow-hidden">

      {/*
        DESKTOP LAYOUT (Aspect-Ratio Scaled)
        Visible only on lg (1024px) and above.
        Maintains the exact 1920x995 proportion and coordinates from Figma.
      */}
      <div className="hidden lg:block relative mx-auto w-full max-w-[1920px] aspect-[1920/995]">

        {/* Hero Image (x:576, y:0 relative to the 995 height header is outside) -> x: 576/1920 = 30%, w: 1905-576 = 1344/1920 = 70%, h: 995/995 = 100% */}
        <div className="absolute left-[30%] top-0 w-[70%] h-[100%] overflow-hidden">
          <Image
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1b/8e/caption.jpg?w=1200&h=-1&s=1"
            alt="Luxury Hotel"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Left Block (Text and Button) */}
        {/* x: 52/1920 = 2.708%, y: 254/995 = 25.52%, w: 869/1920 = 45.26% */}
        <div className="absolute left-[2.708%] top-[25.52%] w-[45.26%] flex flex-col items-start z-10">
          <h1 className="font-moniqa text-[6.25vw] 2xl:text-[120px] text-primary-text leading-[0.85] tracking-tight m-0 p-0 whitespace-nowrap">
            Профессиональная среда <br />
            для работы с отелями
          </h1>

          {/* Spacing from Figma: y: 620 - 339 = 281 difference, minus text height. Let's use % based mt */}
          <p className="font-century-gothic text-[1.25vw] 2xl:text-[24px] text-primary-text leading-[1.4] m-0 p-0 mt-[16.08%] w-[74%]">
            Качественные превью и структурированные данные.<br />
            Создано экспертами для экспертов индустрии.
          </p>

          <button className="mt-[11.7%] flex items-center justify-center border border-evergreen-forest text-evergreen-forest font-century-gothic text-[1.25vw] 2xl:text-[24px] rounded-[26px] hover:bg-evergreen-forest hover:text-soft-sand transition-colors duration-200 px-[1.5vw] py-[0.7vw] 2xl:px-8 2xl:py-3 min-w-[281px]">
            Подробнее о нас
          </button>
        </div>

        {/* Right Hotel Info Block with SVG Background */}
        {/* x: 1020/1920 = 53.125%, y: 638/995 = 64.12%, w: 900/1920 = 46.875%, h: 357/995 = 35.879% */}
        <div className="absolute left-[53.125%] bottom-0 w-[46.875%] h-[35.879%] z-10 flex flex-col items-end justify-end pb-[2.81%] pr-[2.7%]">

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
             {/* Text positioning based on Figma bounding boxes relative to 900x357 block */}

             {/* Name: x: 1671-1020 = 651/900 = 72.33%, y: 828-726 = 102/357 = 28.57% */}
             <div className="absolute left-[72.33%] top-[28.57%] w-auto">
               <h2 className="font-moniqa text-[2.6vw] 2xl:text-[50px] text-primary-text leading-none m-0 p-0 whitespace-nowrap">
                 Название отеля
               </h2>
             </div>

             {/* Tags: y: 889-726 = 163/357 = 45.65%, right-aligned effectively */}
             <div className="absolute right-[0.5%] top-[45.65%] flex gap-[1.04vw] 2xl:gap-[20px]">
               {["16+", "Семейный", "Всё включено"].map((tag) => (
                 <div key={tag} className="flex items-center justify-center h-[27px] px-4 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]">
                   <span className="text-[#2e4b2f] font-century-gothic text-[12px] uppercase tracking-wider mt-0.5 whitespace-nowrap">
                     {tag}
                   </span>
                 </div>
               ))}
             </div>

             {/* Description: x: 1276-1020 = 256/900 = 28.44%, y: 929-726 = 203/357 = 56.86% */}
             <div className="absolute left-[28.44%] top-[56.86%] w-[68.33%] text-right">
                <p className="font-century-gothic text-[1.25vw] 2xl:text-[24px] text-primary-text leading-snug m-0 p-0">
                  Короткое описание отеля, локации, преимуществ
                </p>
             </div>

             {/* Button: x: 1610-1020 = 590/900 = 65.55%, y: 981-726 = 255/357 = 71.42% */}
             <div className="absolute left-[65.55%] top-[71.42%] w-[31.22%] h-[14.84%] group focus:outline-none rounded-[26px]">
                <div className="absolute inset-0 w-full h-full bg-evergreen-forest rounded-[26px] border border-black transition-colors group-hover:bg-[#1F3520]" />
                <button className="absolute inset-0 flex items-center justify-center font-century-gothic text-soft-sand text-[1.25vw] 2xl:text-[24px] font-normal tracking-wide w-full h-full">
                  Посмотреть детали
                </button>
             </div>
          </div>
        </div>

        {/* Dots (Slider) x:861, y:1028 -> relative to Hero height? In Figma Hero is y:85. y:1028-85 = 943. 943/995 = 94.77% */}
        <div className="absolute left-[44.84%] top-[94.77%] z-20 flex gap-2">
          <div className="w-[13px] h-[13px] bg-white rounded-[6.5px] border-2 border-evergreen-forest cursor-pointer" />
          <div className="w-[13px] h-[13px] bg-white/70 hover:bg-white rounded-[6.5px] cursor-pointer transition-colors" />
          <div className="w-[13px] h-[13px] bg-white/70 hover:bg-white rounded-[6.5px] cursor-pointer transition-colors" />
        </div>
      </div>

      {/* MOBILE & TABLET LAYOUT (Standard Flow) */}
      <div className="lg:hidden relative w-full min-h-[calc(100vh-85px)] flex flex-col">
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
