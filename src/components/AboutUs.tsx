import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-soft-sand relative z-20 flex flex-col pt-16 pb-24">
      {/* Hero / Introduction Block */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-[35px] flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 lg:gap-24 mb-24">

        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <h1 className="font-moniqa text-[clamp(40px,6vw,80px)] text-primary-text leading-[0.9] m-0 p-0 mb-8 xl:mb-10">
            О проекте
          </h1>

          <div className="font-century-gothic text-[clamp(16px,1.2vw,20px)] text-secondary-text leading-[1.6] mb-8 space-y-6 max-w-[600px]">
            <p>
              <strong className="text-primary-text font-medium">Клуб Про Отели</strong> — это закрытая рабочая база отелей для турагентов, собранная на основе личных инспекций и съёмок. Не переписанные описания и не отзывы туристов, а реальная картина: номера, территория, питание, пляж, нюансы размещения.
            </p>
            <p>
              В каждом обзоре — фото, видео и практические выводы: кому отель подходит, кому не стоит предлагать, где риски и где сильные стороны. Это инструмент для уверенных продаж и точного подбора.
            </p>
          </div>

          <div className="font-century-gothic w-full max-w-[600px] bg-white/60 p-6 md:p-8 rounded-xl border border-[#2E4B2F]/10 shadow-sm">
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
                <span>Бэкграунд: <strong className="text-primary-text font-medium">отельер-ресторатор</strong></span>
              </li>
            </ul>
          </div>
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

      {/* What awaits you inside Block */}
      <div className="w-full bg-white/50 border-y border-gray-200/50 py-20 px-6 lg:px-[35px]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="font-moniqa text-[clamp(40px,5vw,70px)] text-primary-text leading-[0.9] mb-12">
            Что вас ждёт внутри
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl text-left">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <div className="w-12 h-12 bg-evergreen-forest/10 text-evergreen-forest rounded-lg flex items-center justify-center mb-6 font-moniqa text-3xl">190+</div>
              <h3 className="font-medium text-primary-text text-xl mb-3">Отелей в базе</h3>
              <p className="text-secondary-text leading-relaxed">
                Уже более 190 отелей с актуальными материалами. Регулярные съёмки (Анталийское и Эгейское побережье).
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <div className="w-12 h-12 bg-evergreen-forest/10 text-evergreen-forest rounded-lg flex items-center justify-center mb-6 font-moniqa text-3xl">Pro</div>
              <h3 className="font-medium text-primary-text text-xl mb-3">Готовые выводы</h3>
              <p className="text-secondary-text leading-relaxed">
                Подробные разборы локаций без «сайтовых» текстов. Что продавать, кому и с какими нюансами. Фото и видео для ваших туристов.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col">
              <div className="w-12 h-12 bg-evergreen-forest/10 text-evergreen-forest rounded-lg flex items-center justify-center mb-6 font-moniqa text-3xl">2026</div>
              <h3 className="font-medium text-primary-text text-xl mb-3">Структура по годам</h3>
              <p className="text-secondary-text leading-relaxed">
                Канал 2025 года — основная база отелей. Канал 2026 года — новые съёмки, включая Стамбул (около 50 отелей).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Benefits Block */}
      <div className="max-w-4xl mx-auto w-full px-6 lg:px-[35px] mt-20 flex flex-col items-center">
        <h2 className="font-moniqa text-4xl lg:text-5xl text-primary-text mb-8 text-center">
          После оплаты вы получаете доступ к 4 каналам
        </h2>

        <div className="w-full bg-white rounded-2xl shadow-sm border border-evergreen-forest/20 p-8 md:p-10 mb-12">
          <ul className="space-y-4 text-primary-text text-lg">
            <li className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-evergreen-forest"></span>
              <strong>ProHotelClub</strong> — основной канал (отели 2025)
            </li>
            <li className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-evergreen-forest"></span>
              <strong>ProHotelClub</strong> — отели 2026 (включая Стамбул)
            </li>
            <li className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-evergreen-forest"></span>
              <strong>ProHotelClub</strong> — новости отелей Турции
            </li>
            <li className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-evergreen-forest"></span>
              <strong>ProHotelClub</strong> — атмосферный контент
            </li>
          </ul>

          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="bg-[#D4AF37]/10 text-[#D4AF37] px-6 py-3 rounded-xl font-medium flex items-center gap-3">
              <span className="text-xl">🎁</span>
              <span>Съёмка 2023–2024 года — в подарок (доступ навсегда)</span>
            </div>

            <Link
              href="/dashboard/subscription"
              className="flex items-center justify-center border border-evergreen-forest bg-evergreen-forest text-soft-sand font-century-gothic text-[clamp(16px,1.5vw,20px)] rounded-[12px] hover:bg-evergreen-hover hover:border-evergreen-hover transition-colors duration-200 px-8 py-3 whitespace-nowrap w-full md:w-auto"
            >
              Выбрать тариф
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
