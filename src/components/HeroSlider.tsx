"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hotels } from "@/lib/mock-data";
import { ArrowRight01Icon } from "hugeicons-react";
import Image from "next/image";

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play (8s interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hotels.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentHotel = hotels[currentIndex];

  return (
    <section className="relative w-full h-screen bg-soft-sand overflow-hidden flex pt-24 px-8 pb-8 max-w-7xl mx-auto">
      {/* Left Static Side */}
      <div className="w-[40%] h-full flex flex-col justify-center pr-12 z-10 relative">
        <h1 className="font-moniqa text-[120px] leading-[0.85] text-primary-text mb-12">
          EXCLUSIVE<br />HOTELS
        </h1>
      </div>

      {/* Right Dynamic Side (Image & L-Shape Text Cutout) */}
      <div className="w-[60%] h-full relative">
        {/* Pagination Dots (centered in the left 15% 'tail' of the image) */}
        <div className="absolute bottom-12 left-[7.5%] -translate-x-1/2 flex gap-3 z-20">
          {hotels.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentHotel.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* The Image Wrapper - Rounded Bottom Left */}
            <div className="w-full h-full rounded-bl-3xl overflow-hidden relative shadow-sm">
              <Image
                src={currentHotel.imageUrl}
                alt={currentHotel.name}
                fill
                className="object-cover scale-100 hover:scale-105 transition-transform duration-[20s] ease-out"
                priority
              />
            </div>

            {/* The Cutout (Seamless Overlap Method) */}
            {/* Placed bottom-right, has the same background as page to "cut" the image */}
            <div className="absolute bottom-0 right-0 w-[85%] bg-soft-sand rounded-tl-3xl pt-8 pl-8 flex flex-col items-start z-10 pb-4">

              {/* Tags */}
              <div className="flex gap-4 mb-4">
                {currentHotel.tags.map((tag) => (
                  <span key={tag} className="font-century-gothic text-[12px] uppercase tracking-wider text-secondary-text">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="font-moniqa text-[80px] leading-[0.9] text-primary-text mb-4">
                {currentHotel.name}
              </h2>

              {/* Description */}
              <p className="font-century-gothic text-[24px] leading-[1.6] text-primary-text mb-8 max-w-[80%]">
                {currentHotel.description}
              </p>

              {/* CTA Button */}
              <a
                href={currentHotel.link}
                className="group flex items-center gap-3 bg-evergreen-forest text-soft-sand font-century-gothic text-[18px] px-8 py-4 rounded-xl hover:bg-evergreen-hover transition-colors duration-200"
              >
                <span>View Hotel</span>
                <ArrowRight01Icon size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
