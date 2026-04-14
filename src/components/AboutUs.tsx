import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-soft-sand px-6 lg:px-[35px] relative z-20 flex flex-col justify-center py-16 lg:py-24">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 lg:gap-24">

        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <h2 className="font-moniqa text-[clamp(40px,6vw,80px)] text-primary-text leading-[0.9] m-0 p-0 mb-8 xl:mb-10">
            О проекте
          </h2>

          <div className="font-century-gothic text-[clamp(16px,1.2vw,20px)] text-secondary-text leading-[1.6] mb-8 space-y-6 max-w-[600px]">
            <p>
              <strong className="text-primary-text font-medium">Клуб Про Отели</strong> — это рабочая база отелей для турагентов, собранная на основе личных инспекций и съёмок. Не переписанные описания и не отзывы туристов, а реальная картина: номера, территория, питание, пляж, нюансы размещения.
            </p>
            <p>
              В каждом обзоре — фото, видео и практические выводы: кому отель подходит, кому не стоит предлагать, где риски и где сильные стороны. Это инструмент для уверенных продаж и точного подбора.
            </p>
          </div>

          <div className="font-century-gothic w-full max-w-[600px] bg-white/40 p-6 md:p-8 rounded-xl border border-[#2E4B2F]/10 mb-10">
            <h3 className="text-primary-text font-medium text-xl mb-4">Кто стоит за Клубом?</h3>
            <p className="text-secondary-text mb-4">
              Проект веду я лично — <strong className="text-primary-text font-medium">Татьяна Бабанина</strong>. Практикующий турагент и инспектор отелей, без переписанных описаний и маркетинговой мишуры.
            </p>
            <ul className="space-y-3 text-secondary-text">
              <li className="flex items-start">
                <span className="text-evergreen-forest mr-3 mt-1.5">•</span>
                <span><strong className="text-primary-text font-medium">6+ лет в туризме</strong> — собственные агентства в РФ и Казахстане</span>
              </li>
              <li className="flex items-start">
                <span className="text-evergreen-forest mr-3 mt-1.5">•</span>
                <span><strong className="text-primary-text font-medium">7 лет</strong> живу в Турции и работаю «в поле»</span>
              </li>
              <li className="flex items-start">
                <span className="text-evergreen-forest mr-3 mt-1.5">•</span>
                <span>Личные инспекции отелей и съёмки — не по каталогам</span>
              </li>
              <li className="flex items-start">
                <span className="text-evergreen-forest mr-3 mt-1.5">•</span>
                <span>Бэкграунд: <strong className="text-primary-text font-medium">отельер-ресторатор</strong> — смотрю на сервис и состояние профессионально</span>
              </li>
              <li className="flex items-start">
                <span className="text-evergreen-forest mr-3 mt-1.5">•</span>
                <span>В базе — только фактическое состояние объектов</span>
              </li>
              <li className="flex items-start">
                <span className="text-evergreen-forest mr-3 mt-1.5">•</span>
                <span>Даю рекомендации: кому предлагать, кому — нет</span>
              </li>
            </ul>
          </div>

          <Link
            href="/hotels"
            className="flex items-center justify-center border border-evergreen-forest bg-evergreen-forest text-soft-sand font-century-gothic text-[clamp(16px,1.5vw,20px)] rounded-[12px] hover:bg-evergreen-hover hover:border-evergreen-hover transition-colors duration-200 px-6 py-3 xl:px-8 min-w-[220px]"
          >
            В библиотеку отелей
          </Link>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:w-5/12 xl:w-2/5 relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#2E4B2F]/5 transition-shadow duration-500">
          <Image
            src="https://static.tildacdn.one/tild3233-3763-4531-b034-386263346530/DSC04517.jpeg"
            alt="Татьяна Бабанина - Основатель Клуб Про Отели"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
          />
        </div>

      </div>
    </section>
  );
}
