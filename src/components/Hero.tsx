"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hotels } from "@/lib/mock-data";

export default function Hero() {
  const heroHotels = hotels.slice(0, 4); // Take first 4 hotels for the hero slider
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play (8s interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroHotels.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroHotels.length]);

  const currentHotel = heroHotels[currentIndex];

  return (
    <section className="relative w-full bg-soft-sand overflow-hidden">
      {/*
        DESKTOP LAYOUT (Flex/Grid Based)
        Visible only on lg (1024px) and above.
        Occupies exactly 100vh minus the 64px header.
      */}
      <div className="hidden lg:flex relative w-full h-[calc(100vh-64px)] max-w-[1920px] mx-auto">

        {/* Left Content Area (Text & Button) */}
        <div className="w-[50%] h-full flex flex-col justify-center pl-12 pr-6 xl:pl-24 xl:pr-12 z-10 relative">
          <h1 className="font-moniqa text-[clamp(50px,5vw,100px)] text-primary-text leading-[0.85] tracking-tight m-0 p-0 whitespace-nowrap">
            Профессиональная среда <br />
            для работы с отелями
          </h1>

          <p className="font-century-gothic text-[clamp(16px,1.25vw,24px)] text-primary-text leading-[1.4] m-0 p-0 mt-8 xl:mt-12 w-[85%]">
            Качественные превью и структурированные данные.<br />
            Создано экспертами для экспертов индустрии.
          </p>

          <Link href="/about" className="mt-8 xl:mt-12 flex items-center justify-center border border-evergreen-forest text-evergreen-forest font-century-gothic text-[clamp(16px,1.25vw,24px)] rounded-[26px] hover:bg-evergreen-forest hover:text-soft-sand transition-colors duration-200 px-6 py-2 xl:px-8 xl:py-3 w-fit min-w-[220px] xl:min-w-[281px]">
            Подробнее о нас
          </Link>

          {/* Dots (Slider) - positioned relative to content area */}
          <div className="absolute bottom-12 left-12 xl:left-24 z-20 flex gap-2">
            {heroHotels.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-[13px] h-[13px] rounded-[6.5px] cursor-pointer transition-colors border-2 ${
                  index === currentIndex
                    ? "bg-white border-evergreen-forest"
                    : "bg-white/70 hover:bg-white border-transparent"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Content Area (Image & Hotel Info) */}
        <div className="w-[50%] h-full relative">
          <AnimatePresence>
            <motion.div
              key={currentHotel.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {/* Main Hero Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={currentHotel.imageUrl}
                  alt={currentHotel.name}
                  fill
                  className="object-cover scale-100 hover:scale-105 transition-transform duration-[20s] ease-out"
                  priority
                  unoptimized
                />
              </div>

              {/* Hotel Info Block with SVG Background */}
              {/* We position it at the bottom right based on the original design. */}
              <div className="absolute right-0 bottom-0 w-[85%] max-w-[900px] z-10">
                <div className="bg-soft-sand rounded-tl-[80px] p-8 md:p-10 xl:p-12 pr-[5.5%] flex flex-col justify-end items-end gap-4 shadow-[-10px_-10px_20px_rgba(0,0,0,0.02)]">
                  {/* Hotel Name */}
                  <h2 className="font-moniqa text-[clamp(28px,3vw,50px)] text-primary-text leading-[0.9] m-0 p-0 text-right w-full">
                    {currentHotel.name}
                  </h2>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 xl:gap-3 justify-end">
                     {currentHotel.tags.slice(0, 3).map((tag) => (
                       <div key={tag} className="flex items-center justify-center px-3 py-1 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]">
                         <span className="text-[#2e4b2f] font-century-gothic text-[clamp(10px,0.8vw,12px)] uppercase tracking-wider mt-[1px] whitespace-nowrap">
                           {tag}
                         </span>
                       </div>
                     ))}
                  </div>

                  {/* Description */}
                  <p className="font-century-gothic text-[clamp(12px,1.2vw,20px)] text-primary-text leading-snug m-0 p-0 text-right max-w-[80%] line-clamp-3">
                    {currentHotel.description}
                  </p>

                  {/* Button */}
                  <div className="w-auto group focus:outline-none mt-2">
                      <Link href="/hotels" className="flex items-center justify-center font-century-gothic text-soft-sand text-[clamp(12px,1vw,16px)] font-normal tracking-wide bg-evergreen-forest border border-black rounded-[26px] transition-colors group-hover:bg-[#1F3520] px-5 py-2 xl:px-8 xl:py-2.5 whitespace-nowrap">
                        Посмотреть детали
                      </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE & TABLET LAYOUT (Standard Flow) */}
      <div className="lg:hidden relative w-full flex flex-col">
        {/* Image takes top portion */}
        <div className="relative w-full h-[50vh] z-0 overflow-hidden">
          <AnimatePresence>
            <motion.div
               key={currentHotel.id}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
               className="absolute inset-0"
            >
              <Image
                src={currentHotel.imageUrl}
                alt={currentHotel.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
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

          <Link href="/about" className="mt-8 flex items-center justify-center border border-evergreen-forest text-evergreen-forest font-century-gothic text-[clamp(16px,4vw,20px)] rounded-[26px] hover:bg-evergreen-forest hover:text-soft-sand transition-colors duration-200 px-8 py-3 w-full sm:w-auto">
            Подробнее о нас
          </Link>

          {/* Dots (Slider) - for mobile */}
          <div className="mt-8 flex gap-2 justify-center w-full">
            {heroHotels.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-[13px] h-[13px] rounded-[6.5px] cursor-pointer transition-colors border-2 ${
                  index === currentIndex
                    ? "bg-evergreen-forest border-evergreen-forest"
                    : "bg-black/10 hover:bg-black/20 border-transparent"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Hotel Info Card for Mobile */}
          <div className="relative mt-8 w-full pt-8 flex flex-col">
            <div className="absolute inset-0 z-0 bg-soft-sand/95 backdrop-blur-sm rounded-xl border border-[#2e4b2f]/20 shadow-xl" />

            <div className="relative z-10 p-6 flex flex-col gap-4">
              <AnimatePresence>
                <motion.div
                  key={currentHotel.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-4"
                >
                  <h2 className="font-moniqa text-[clamp(32px,8vw,50px)] text-primary-text leading-none m-0 p-0">
                    {currentHotel.name}
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {currentHotel.tags.slice(0, 3).map((tag) => (
                      <div key={tag} className="flex items-center justify-center h-[27px] px-4 rounded-[13px] border-[0.5px] border-dashed border-[#2e4b2f]">
                        <span className="text-[#2e4b2f] font-century-gothic text-[12px] uppercase tracking-wider mt-0.5">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="font-century-gothic text-[clamp(16px,4vw,20px)] text-primary-text leading-snug m-0 p-0 line-clamp-3">
                    {currentHotel.description}
                  </p>

                  <Link href="/hotels" className="relative w-full h-[53px] group focus:outline-none rounded-[26px] mt-2 block">
                    <div className="absolute inset-0 w-full h-full bg-evergreen-forest rounded-[26px] border border-black transition-colors group-hover:bg-[#1F3520]" />
                    <span className="absolute inset-0 flex items-center justify-center font-century-gothic text-white text-[16px] font-normal tracking-wide">
                      Посмотреть детали
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
