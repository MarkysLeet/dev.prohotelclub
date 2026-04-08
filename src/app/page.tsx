import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  const slides = [{ id: 0 }, { id: 1 }, { id: 2 }];
  const activeSlide = 0;

  const tags = [
    { label: "16+", width: "w-[39px]" },
    { label: "Семейный", width: "w-[92px]" },
    { label: "Всё включено", width: "w-[98px]" },
  ];

  return (
    <main className="w-full min-h-[100dvh] bg-[#f6eee1] relative overflow-x-hidden flex flex-col">
      <Header />

      <div className="flex-1 w-full flex flex-col lg:flex-row mt-[85px] relative">
        {/* Left Content Area */}
        <section className="w-full lg:w-[45%] h-auto lg:h-[calc(100vh-85px)] relative z-10 flex flex-col justify-center px-6 md:px-12 xl:px-[52px] py-12 lg:py-0 shrink-0">

          {/* Main Heading */}
          <h1 className="font-moniqa font-normal text-black text-[70px] md:text-[90px] xl:text-[120px] leading-[0.9] tracking-[0] m-0 mb-12 animate-fade-up">
            Профессиональная среда <br className="hidden md:block" />
            для работы с отелями
          </h1>

          {/* Subtext */}
          <p className="font-century-gothic font-normal text-black text-[18px] md:text-[20px] xl:text-[24px] leading-normal tracking-[0] max-w-[500px] mb-12 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Качественные превью и структурированные данные. <br />
            Создано экспертами для экспертов индустрии.
          </p>

          {/* Button: Подробнее о нас */}
          <button className="w-[283px] h-[53px] relative group animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute inset-0 w-[281px] h-[53px] rounded-[26px] border border-[#2e4b2f] transition-colors group-hover:bg-[#2e4b2f]/5" />
            <span className="absolute inset-0 flex items-center justify-center font-century-gothic font-normal text-[#2e4b2f] text-xl md:text-2xl tracking-[0]">
              Подробнее о нас
            </span>
          </button>
        </section>

        {/* Right Content Area (Image & Overlapping Details) */}
        <section className="w-full h-[50vh] sm:h-[60vh] lg:h-[calc(100vh-85px)] lg:flex-1 relative z-0 shrink-0 flex items-end justify-end">
          {/* Main Image (Rectangle 166) */}
          <div className="absolute top-0 right-0 w-full lg:w-[1344px] lg:max-w-full h-full lg:h-[995px] overflow-hidden lg:rounded-bl-[100px]">
            <Image
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1b/8e/caption.jpg?w=1200&h=-1&s=1"
              alt="Hotel Background"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Pagination Controls */}
          {/* Located centrally in the design, overlapping the image */}
          <div className="absolute bottom-[20px] lg:bottom-[40px] left-1/2 -translate-x-1/2 flex items-center shadow-[0px_0px_1px_#00000042,0px_2px_2px_#00000038,0px_4px_2px_#00000021,0px_7px_3px_#0000000a,0px_10px_3px_transparent]">
            {slides.map((slide) => (
              <button
                key={slide.id}
                aria-label={`Slide ${slide.id + 1}`}
                className={`transition-all ${
                  slide.id === activeSlide
                    ? "w-[16.5px] h-[16.5px] bg-[#f6eee1] rounded-[6.25px] border-2 border-solid border-[#2e4b2f] z-10"
                    : "w-[12.5px] h-[12.5px] bg-white rounded-[6.25px] ml-[10.5px]"
                } aspect-square cursor-pointer`}
              />
            ))}
          </div>

          {/* Vector 61 / Hotel Details Card Overlay */}
          <div className="relative w-full lg:w-auto z-20 flex flex-col items-end pr-6 pb-6 lg:pr-[80px] lg:pb-[80px] mt-auto">

            {/* The SVG wrapper simulating Vector 61 background shape */}
            <div className="absolute inset-0 right-0 bottom-0 lg:w-[900px] lg:h-[354px] bg-[#f6eee1] lg:rounded-tl-[80px] shadow-2xl -z-10 hidden lg:block" style={{
              clipPath: "polygon(0 100%, 0 40%, 40% 40%, 40% 0, 100% 0, 100% 100%)"
              // Adjusting standard CSS box to simulate the vector61 shape roughly for desktop
            }}></div>
            <div className="absolute inset-0 bg-[#f6eee1] lg:hidden -z-10 rounded-t-[40px]"></div>

            <div className="flex flex-col items-end text-right pt-8 lg:pt-16 max-w-lg">
              <h2 className="font-moniqa font-normal text-black text-[40px] md:text-[50px] leading-normal tracking-[0] whitespace-nowrap mb-6">
                Название отеля
              </h2>

              <div className="flex gap-[25px] mb-6">
                {tags.map((tag) => (
                  <div key={tag.label} className={`relative h-[27px] ${tag.width} flex items-center justify-center`}>
                    <div className="absolute inset-0 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]" />
                    <span className="font-century-gothic font-normal text-[#2e4b2f] text-xs text-center z-10">
                      {tag.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="font-century-gothic font-normal text-black text-[18px] md:text-[24px] leading-normal tracking-[0] mb-8 text-right max-w-[400px]">
                Короткое описание отеля, локации, преимуществ
              </p>

              <button className="relative w-[283px] h-[53px] group">
                <div className="absolute inset-0 w-[281px] h-[53px] bg-[#2e4b2f] rounded-[26px] border border-solid border-black transition-colors group-hover:bg-[#1F3520]" />
                <span className="absolute inset-0 flex items-center justify-center font-century-gothic font-normal text-white text-xl md:text-2xl">
                  Посмотреть детали
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
