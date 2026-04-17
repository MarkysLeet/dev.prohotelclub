"use client";

import React, { useState } from 'react';
import { UserCircleIcon, SentIcon } from 'hugeicons-react';

export function HotelComments() {
  const [comment, setComment] = useState('');

  const mockComments = [
    {
      id: 1,
      author: 'Елена Смирнова',
      role: 'Турагент',
      date: '12 апреля 2024',
      text: 'Отличный отель для семейного отдыха. Пляж чистый, заход в воду пологий. Питание разнообразное, есть отдельный детский буфет. Рекомендую бронировать номера категории Family Room.',
    },
    {
      id: 2,
      author: 'Михаил Иванов',
      role: 'Турагент',
      date: '5 мая 2024',
      text: 'Обратите внимание, что в высокий сезон рестораны a-la carte нужно бронировать заранее через приложение отеля, иначе мест не будет. В остальном сервис на уровне.',
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // Здесь будет логика отправки комментария
      setComment('');
      // Для демо можно показать тост или просто очистить поле
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 border-t border-gray-200/50 pt-16 mb-16">
      <h3 className="font-moniqa text-4xl text-primary-text mb-8">Комментарии коллег</h3>

      {/* Форма добавления комментария */}
      <form onSubmit={handleSubmit} className="mb-12 flex gap-4 items-start">
        <div className="w-12 h-12 rounded-full bg-evergreen-forest/10 flex items-center justify-center shrink-0">
          <UserCircleIcon size={24} className="text-evergreen-forest" />
        </div>
        <div className="flex-1 relative">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Оставьте свой комментарий или заметку об отеле..."
            className="w-full bg-white border border-gray-200 rounded-2xl p-4 pr-14 text-primary-text font-century-gothic text-base min-h-[100px] resize-none focus:outline-none focus:border-evergreen-forest focus:ring-1 focus:ring-evergreen-forest transition-all"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="absolute bottom-4 right-4 w-10 h-10 bg-evergreen-forest text-soft-sand rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-evergreen-hover transition-colors"
          >
            <SentIcon size={20} />
          </button>
        </div>
      </form>

      {/* Список комментариев */}
      <div className="space-y-8">
        {mockComments.map((item) => (
          <div key={item.id} className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
              <UserCircleIcon size={24} className="text-secondary-text" />
            </div>
            <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-century-gothic font-bold text-primary-text">{item.author}</h4>
                  <p className="font-century-gothic text-xs text-evergreen-forest mt-0.5">{item.role}</p>
                </div>
                <span className="font-century-gothic text-xs text-secondary-text">{item.date}</span>
              </div>
              <p className="font-century-gothic text-sm leading-relaxed text-secondary-text">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
