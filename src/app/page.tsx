import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-[100dvh] lg:h-[100dvh] lg:overflow-hidden flex flex-col bg-soft-sand relative">
      <Header />

      <div className="flex-1 w-full flex flex-col lg:flex-row mt-[80px] lg:h-[calc(100dvh-80px)]">

        {/* Left Column */}
        <section className="w-full lg:w-[38%] h-auto lg:h-full bg-soft-sand relative z-10 flex flex-col justify-center py-12 px-6 sm:px-12 lg:py-0 lg:pl-16 xl:pl-24 lg:pr-12 animate-in fade-in duration-700 ease-cinematic delay-100 fill-mode-both shrink-0">
          <h1 className="font-moniqa font-semibold text-primary-text text-[64px] sm:text-[80px] md:text-[90px] xl:text-[120px] leading-[0.85] m-0">
            Профессиональная<br/>
            среда<br/>
            для работы<br/>
            с отелями.
          </h1>

          <p className="font-century-gothic text-secondary-text text-[16px] md:text-[18px] leading-relaxed mt-8 lg:mt-10 max-w-[380px]">
            Качественные превью и структурированные данные. Создано экспертами для экспертов индустрии.
          </p>

          <button className="mt-10 lg:mt-12 w-fit px-8 py-3.5 rounded-full border border-primary-text text-primary-text font-century-gothic text-[16px] transition-colors duration-200 hover:bg-primary-text hover:text-soft-sand focus:outline-none focus:ring-2 focus:ring-evergreen-forest focus:ring-offset-2 focus:ring-offset-soft-sand">
            Подробнее о нас
          </button>
        </section>

        {/* Right Column */}
        <section className="w-full h-[60vh] sm:h-[70vh] lg:h-full lg:w-[62%] relative z-0 animate-in fade-in duration-700 ease-cinematic delay-300 fill-mode-both group shrink-0">
          {/* Main Background Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1b/8e/caption.jpg?w=1200&h=-1&s=1"
              alt="Hotel Interior"
              fill
              className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
              priority
              unoptimized
            />
          </div>

          {/* Pagination */}
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-white opacity-80 cursor-pointer transition-transform hover:scale-110"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white opacity-80 cursor-pointer transition-transform hover:scale-110"></div>
            <div className="w-3 h-3 rounded-full border-[2px] border-evergreen-forest bg-white/20 backdrop-blur-sm cursor-pointer transition-transform hover:scale-110"></div>
          </div>

          {/* Bottom Right Absolute Card */}
          {/* Using custom extremely large border radius. Included on mobile but with adjusted padding/radius */}
          <div className="absolute bottom-0 right-0 w-[95%] sm:w-[85%] max-w-[420px] bg-soft-sand rounded-tl-[80px] md:rounded-tl-[150px] p-6 md:p-10 pr-6 lg:pr-12 text-right flex flex-col items-end z-30 shadow-[-10px_-10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[-15px_-15px_40px_rgba(46,75,47,0.05)]">
            <h2 className="font-moniqa font-semibold text-primary-text text-[40px] md:text-[64px] leading-[0.9] mb-4 mt-4 md:mt-0">
              The Caption Hotel
            </h2>

            <div className="flex flex-wrap items-center justify-end gap-2 mb-4 font-century-gothic">
              <span className="px-3 py-1 rounded-full border border-secondary-text/30 text-[10px] md:text-[11px] text-secondary-text tracking-wide uppercase">16+</span>
              <span className="px-3 py-1 rounded-full border border-secondary-text/30 text-[10px] md:text-[11px] text-secondary-text tracking-wide uppercase">Семейный</span>
              <span className="px-3 py-1 rounded-full border border-secondary-text/30 text-[10px] md:text-[11px] text-secondary-text tracking-wide uppercase">Всё включено</span>
            </div>

            <p className="font-century-gothic text-secondary-text text-[13px] md:text-[14px] leading-relaxed mb-6 md:mb-8 max-w-[280px]">
              Идеальное место для уединенного отдыха с потрясающим видом и безупречным сервисом.
            </p>

            <button className="px-8 py-3.5 rounded-full bg-evergreen-forest text-soft-sand font-century-gothic text-[13px] md:text-[14px] tracking-wide transition-colors duration-200 hover:bg-evergreen-hover focus:outline-none focus:ring-2 focus:ring-evergreen-forest focus:ring-offset-2 focus:ring-offset-soft-sand">
              Посмотреть детали
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
