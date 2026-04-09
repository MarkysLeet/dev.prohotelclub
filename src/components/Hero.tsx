import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-85px)] mt-[85px] bg-soft-sand px-[clamp(1.5rem,4vw,3rem)] py-[clamp(2rem,5vw,4rem)]">
      {/* Main Content Wrapper */}
      <div className="w-full h-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,4vw,4rem)]">

        {/* Left Column: Text */}
        <div className="flex flex-col justify-center text-left animate-fade-in order-2 lg:order-1 pt-4 lg:pt-[10%]">
          <h1 className="font-moniqa text-[clamp(3.75rem,7vw,7.5rem)] text-primary-text leading-[0.85] tracking-tight m-0 p-0">
            Профессиональная среда <br className="hidden md:block" />
            для работы с отелями
          </h1>

          <p className="font-century-gothic text-[clamp(1rem,1.5vw,1.5rem)] text-primary-text leading-tight m-0 p-0 mt-6 lg:mt-[clamp(2rem,5vw,4rem)] max-w-[40rem]">
            Качественные превью и структурированные данные.<br className="hidden md:block" />
            Создано экспертами для экспертов индустрии.
          </p>

          <button className="mt-8 lg:mt-12 flex items-center justify-center border border-evergreen-forest text-evergreen-forest font-century-gothic text-[clamp(1rem,1.5vw,1.5rem)] rounded-[1.625rem] hover:bg-evergreen-forest hover:text-soft-sand transition-colors duration-200 px-[2rem] py-[0.75rem] w-full sm:w-auto min-w-[17.5rem] self-start">
            Подробнее о нас
          </button>
        </div>

        {/* Right Column: Image and Card */}
        <div className="relative w-full aspect-square lg:aspect-auto lg:h-full lg:min-h-[70vh] rounded-[clamp(1rem,2vw,1.5rem)] overflow-hidden order-1 lg:order-2">

          <Image
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1b/8e/caption.jpg?w=1200&h=-1&s=1"
            alt="Luxury Hotel"
            fill
            className="object-cover"
            priority
            unoptimized
          />

          {/* Hotel Info Card positioned absolutely at bottom right */}
          <div className="absolute bottom-0 right-0 z-10 w-full md:w-auto md:min-w-[clamp(20rem,35vw,35rem)] bg-soft-sand p-[clamp(1.5rem,3vw,2.5rem)] rounded-tl-[clamp(2rem,4vw,3rem)] flex flex-col justify-end">

            {/* Pseudo-elements for the inverse border radius to blend smoothly with the image */}
            <div className="hidden md:block absolute -top-[2rem] right-0 w-[2rem] h-[2rem] pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-transparent before:shadow-[1rem_1rem_0_0_#F6EEE1] before:rounded-br-[2rem]" />
            <div className="hidden md:block absolute bottom-0 -left-[2rem] w-[2rem] h-[2rem] pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-transparent before:shadow-[1rem_1rem_0_0_#F6EEE1] before:rounded-br-[2rem]" />

            <div className="relative z-10 flex flex-col">
              <h2 className="font-moniqa text-[clamp(2rem,4vw,3.125rem)] text-primary-text leading-none m-0 p-0 mb-[1.5rem]">
                Название отеля
              </h2>

              <div className="flex flex-wrap gap-[0.5rem] lg:gap-[1.25rem] mb-[1.5rem]">
                {["Семейный", "Всё включено", "16+"].map((tag) => (
                  <div key={tag} className="flex items-center justify-center h-[1.6875rem] px-[1rem] rounded-[0.8125rem] border-[0.5px] border-dashed border-evergreen-forest">
                    <span className="text-evergreen-forest font-century-gothic text-[0.75rem] uppercase tracking-wider mt-[0.125rem]">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>

              <p className="font-century-gothic text-[clamp(1rem,1.5vw,1.5rem)] text-primary-text leading-snug m-0 p-0 mb-[2rem] max-w-[38rem]">
                Короткое описание отеля, локации, преимуществ
              </p>

              <button className="relative w-full sm:w-[17.6875rem] h-[3.3125rem] group focus:outline-none rounded-[1.625rem]">
                  <div className="absolute inset-0 w-full h-full bg-evergreen-forest rounded-[1.625rem] border border-black transition-colors group-hover:bg-[#1F3520]" />
                  <span className="absolute inset-0 flex items-center justify-center font-century-gothic text-white text-[clamp(1rem,1.5vw,1.5rem)] font-normal tracking-wide">
                    Посмотреть детали
                  </span>
              </button>
            </div>
          </div>

          {/* Dots on top of image */}
          <div className="absolute bottom-[2rem] left-[2rem] z-20 flex gap-[0.5rem]">
            <div className="w-[0.78125rem] h-[0.78125rem] bg-white rounded-full border-2 border-evergreen-forest cursor-pointer" />
            <div className="w-[0.78125rem] h-[0.78125rem] bg-white/70 hover:bg-white rounded-full cursor-pointer transition-colors" />
            <div className="w-[0.78125rem] h-[0.78125rem] bg-white/70 hover:bg-white rounded-full cursor-pointer transition-colors" />
          </div>

        </div>
      </div>
    </section>
  );
}
