"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
  ];

  const tags = [
    { label: "16+" },
    { label: "Семейный" },
    { label: "Всё включено" },
  ];

  return (
    <main className="w-full min-h-[100dvh] lg:h-[100dvh] lg:overflow-hidden flex flex-col bg-[#f6eee1] relative">
      <Header />

      <div className="flex-1 w-full flex flex-col lg:flex-row mt-[60px] lg:h-[calc(100dvh-60px)] relative">

        {/* Decorative thin line vector logic can be simulated with borders or thin divs if needed, but keeping it clean */}

        {/* Left Column */}
        <section className="w-full lg:w-[45%] h-auto lg:h-full bg-[#f6eee1] relative z-10 flex flex-col justify-between py-12 px-6 sm:px-12 lg:py-16 xl:pl-20 xl:pr-8 animate-in fade-in duration-700 ease-cinematic delay-100 fill-mode-both shrink-0">

          <div className="flex flex-col mt-4">
            <h1 className="font-moniqa font-normal text-black text-[70px] sm:text-[90px] md:text-[100px] xl:text-[120px] leading-[0.85] m-0">
              Профессиональная<br/>
              среда <br/>
              для работы с отелями
            </h1>

            <p className="font-century-gothic text-black text-[18px] md:text-[24px] leading-relaxed mt-10 lg:mt-[100px] max-w-[480px]">
              Качественные превью и структурированные данные.<br/>
              Создано экспертами для экспертов индустрии.
            </p>
          </div>

          <div className="mt-12 lg:mb-12">
            <button className="relative w-full max-w-[283px] h-[53px] group focus:outline-none focus:ring-2 focus:ring-evergreen-forest focus:ring-offset-2 focus:ring-offset-[#f6eee1] rounded-[26px]">
              <div className="absolute inset-0 w-full h-full rounded-[26px] border border-[#2e4b2f] transition-colors group-hover:bg-[#2e4b2f]/5" />
              <span className="absolute inset-0 flex items-center justify-center font-century-gothic text-[#2e4b2f] text-2xl font-normal tracking-wide">
                Подробнее о нас
              </span>
            </button>
          </div>

        </section>

        {/* Right Column / Overlapping Area */}
        <section className="w-full h-[60vh] sm:h-[70vh] lg:h-full lg:w-[55%] relative z-0 animate-in fade-in duration-700 ease-cinematic delay-300 fill-mode-both group shrink-0 lg:-ml-12 xl:-ml-24">

          {/* Main Background Image Block */}
          {/* Note: The design shows the image slightly inset from the right and top */}
          <div className="absolute top-0 md:top-[0px] lg:top-[0px] right-0 w-full lg:w-[1344px] h-full lg:h-[calc(100vh-60px)] overflow-hidden rounded-bl-[60px] lg:rounded-none">
            <Image
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/b0/1b/8e/caption.jpg?w=1200&h=-1&s=1"
              alt="Hotel Interior"
              fill
              className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
              priority
              unoptimized
            />
          </div>

          {/* L-Shape / Floating Content Box */}
          <div className="absolute bottom-0 right-0 w-[95%] sm:w-[85%] md:w-[75%] lg:w-[900px] h-auto lg:h-[354px] bg-transparent p-8 md:p-10 lg:pt-[100px] lg:pl-[120px] lg:pr-12 text-left flex flex-col items-start z-30 transition-all duration-500">


          {/* Custom SVG Background Shape */}
          <div className="absolute inset-0 w-[900px] h-[354px] hidden lg:block z-[-1] pointer-events-none">
            <svg width="900" height="354" viewBox="0 0 900 354" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 354H900V0H332C288.667 0 178 30.8 102 122C26 213.2 0 216 0 216V354Z" fill="#f6eee1"/>
            </svg>
          </div>
          <div className="absolute inset-0 w-full h-full bg-[#f6eee1] lg:hidden z-[-1] rounded-t-[40px]"></div>




            <div className="flex flex-col lg:flex-row w-full justify-between items-start lg:items-end">
              <div className="flex flex-col">
                <p className="font-century-gothic text-black text-[18px] md:text-[24px] leading-relaxed mb-4 max-w-[400px]">
                  Короткое описание отеля, локации, преимуществ
                </p>
              </div>

              <div className="flex flex-col items-start lg:items-end w-full lg:w-auto mt-6 lg:mt-0">
                <h2 className="font-moniqa font-normal text-black text-[40px] md:text-[50px] leading-[normal] mb-6 whitespace-nowrap">
                  Название отеля
                </h2>

                <div className="flex flex-wrap items-center gap-[20px] mb-8 font-century-gothic">
                  {tags.map((tag) => (
                    <div key={tag.label} className="relative flex items-center justify-center h-[27px] px-4 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]">
                      <span className="text-[#2e4b2f] text-xs font-normal tracking-[0] mt-0.5">
                        {tag.label}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="relative w-full lg:w-[283px] h-[53px] group focus:outline-none focus:ring-2 focus:ring-evergreen-forest focus:ring-offset-2 focus:ring-offset-[#f6eee1] rounded-[26px]">
                  <div className="absolute inset-0 w-full h-full bg-[#2e4b2f] rounded-[26px] border border-black transition-colors group-hover:bg-[#1F3520]" />
                  <span className="absolute inset-0 flex items-center justify-center font-century-gothic text-white text-2xl font-normal tracking-wide">
                    Посмотреть детали
                  </span>
                </button>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="absolute bottom-10 left-8 md:left-12 lg:bottom-12 lg:left-[calc(50%-450px+60px)] flex items-center gap-[10px] z-20">
              {slides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(slide.id)}
                  aria-label={`Slide ${slide.id + 1}`}
                  className={`${
                    slide.id === activeSlide
                      ? "w-[16.5px] h-[16.5px] bg-[#f6eee1] rounded-[6.25px] border-2 border-solid border-[#2e4b2f]"
                      : "w-[12.5px] h-[12.5px] bg-white/70 hover:bg-white rounded-[6.25px] transition-colors"
                  } aspect-[1] cursor-pointer`}
                />
              ))}
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
