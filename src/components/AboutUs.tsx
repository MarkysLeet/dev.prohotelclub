import React from 'react';

export default function AboutUs() {
  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-soft-sand px-6 lg:px-[35px] relative z-20 flex flex-col justify-center py-12 lg:py-0">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">

        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <h2 className="font-moniqa text-[clamp(40px,6vw,80px)] text-primary-text leading-[0.9] m-0 p-0 mb-6 xl:mb-8">
            Наш опыт — <br />
            ваше спокойствие
          </h2>

          <p className="font-century-gothic text-[clamp(16px,1.5vw,24px)] text-secondary-text leading-[1.6] m-0 p-0 mb-8 xl:mb-10 max-w-[540px]">
            Мы лично изучили более <span className="text-evergreen-forest font-bold">250 отелей</span> и обладаем глубоким опытом в сфере премиального отдыха. Мы видим дальше красивых фасадов: знаем как сильные стороны, так и скрытые нюансы каждого курорта. Мы делимся честной экспертизой, чтобы вы могли принимать безупречные решения.
          </p>

          <button className="flex items-center justify-center border border-evergreen-forest bg-evergreen-forest text-soft-sand font-century-gothic text-[clamp(16px,1.5vw,20px)] rounded-[26px] hover:bg-[#1F3520] hover:border-[#1F3520] transition-colors duration-200 px-6 py-2 xl:px-8 xl:py-3 min-w-[220px]">
            Наши стандарты
          </button>
        </div>

        {/* Right: Image Placeholder */}
        <div className="w-full lg:w-1/2 relative aspect-[4/5] lg:aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#2E4B2F]/5 transition-shadow duration-500 max-h-[80vh]">
          <div className="absolute inset-0 bg-[#FAEDDB] border border-[#2E4B2F]/10 flex flex-col items-center justify-center text-[#5A6B5D]">
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 opacity-50">
                <path d="M21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 16L10 9L15 14L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
             <span className="font-century-gothic text-sm tracking-widest uppercase opacity-70">Место для фото</span>
          </div>
        </div>

      </div>
    </section>
  );
}
