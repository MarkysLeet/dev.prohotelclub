import React from 'react';
import Image from 'next/image';
import { Calendar01Icon, ArrowRight01Icon } from 'hugeicons-react';

const mockNews = [
  {
    id: 1,
    title: 'Обновление базы: новые отели в Белеке',
    date: '24 октября 2023',
    content: 'Мы добавили 15 новых отелей из региона Белек. В каждом обзоре доступны свежие фотографии, видео-туры по номерам и актуальные концепции на сезон зима 2023/2024. Обратите внимание на изменения в концепциях питания ряда премиальных объектов.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
    category: 'Обновление базы',
  },
  {
    id: 2,
    title: 'Новая функция: сводные отчеты в PDF',
    date: '18 октября 2023',
    content: 'Теперь вы можете скачивать сводные отчеты по любому отелю в формате PDF. Это удобно для отправки напрямую вашим клиентам. Отчет включает основные плюсы, минусы и наши рекомендации без лишней воды.',
    image: null,
    category: 'Платформа',
  },
  {
    id: 3,
    title: 'Итоги инспекции: Эгейское побережье',
    date: '10 октября 2023',
    content: 'Команда Клуба вернулась из масштабной инспекции отелей Эгейского побережья. Бодрум, Мармарис и Фетхие. Подробные отчеты уже в стадии загрузки на платформу. Спойлер: многие отели серьезно обновили номерной фонд.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    category: 'Инспекции',
  }
];

export default function RecentNews() {
  return (
    <section className="w-full bg-soft-sand px-6 lg:px-[35px] relative z-20 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center mb-12">
          <h2 className="font-moniqa text-[clamp(40px,6vw,80px)] text-primary-text leading-[0.9] m-0 p-0 mb-4">
            Новости проекта
          </h2>
          <p className="font-century-gothic text-secondary-text text-center text-lg max-w-2xl">
            Последние обновления базы отелей, отчеты с инспекций и новые функции платформы
          </p>
        </div>

        <div className="flex flex-col space-y-8">
          {mockNews.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 md:gap-8"
            >
              {news.image && (
                <div className="w-full md:w-1/3 aspect-[4/3] relative rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}

              <div className="flex flex-col flex-1 justify-center">
                <div className="flex items-center gap-4 mb-3">
                  <span className="inline-block px-3 py-1 bg-evergreen-forest/10 text-evergreen-forest font-century-gothic text-xs font-semibold rounded-full uppercase tracking-wider">
                    {news.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-secondary-text font-century-gothic text-sm">
                    <Calendar01Icon size={16} />
                    <span>{news.date}</span>
                  </div>
                </div>

                <h3 className="font-century-gothic font-bold text-2xl text-primary-text mb-3 leading-tight">
                  {news.title}
                </h3>

                <p className="font-century-gothic text-secondary-text leading-relaxed mb-6">
                  {news.content}
                </p>

                <button className="flex items-center gap-2 text-evergreen-forest font-century-gothic font-medium text-sm hover:text-evergreen-hover transition-colors w-fit">
                  Читать полностью
                  <ArrowRight01Icon size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 border border-gray-200 bg-white text-primary-text font-century-gothic font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            Загрузить еще новости
          </button>
        </div>
      </div>
    </section>
  );
}
