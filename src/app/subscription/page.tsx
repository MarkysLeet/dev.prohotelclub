"use client";

import Header from "@/components/Header";
import { CheckmarkBadge01Icon } from "hugeicons-react";

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen flex flex-col bg-soft-sand overflow-hidden font-century-gothic">
      <Header />
      <div className="pt-[80px] lg:pt-[100px] w-full max-w-5xl mx-auto px-6 pb-24">
        <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none mb-8">
          Моя подписка
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Plan Card */}
          <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-evergreen-forest relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-evergreen-forest text-soft-sand px-4 py-1 rounded-bl-xl text-sm font-medium">
              Текущий тариф
            </div>
            <h2 className="font-moniqa text-4xl text-primary-text mb-2 mt-4">Professional</h2>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-medium text-primary-text">$99</span>
              <span className="text-secondary-text pb-1">/ месяц</span>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Доступ ко всем премиум отелям",
                "Скачивание медиа в высоком качестве",
                "Приоритетная поддержка",
                "Аналитика бронирований"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-primary-text">
                  <CheckmarkBadge01Icon size={20} className="text-evergreen-forest shrink-0" strokeWidth={1.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 bg-white text-evergreen-forest border-2 border-evergreen-forest rounded-xl hover:bg-soft-sand transition-colors font-medium">
              Управление подпиской
            </button>
          </div>

          {/* Upgrade Card */}
          <div className="bg-white/50 rounded-xl p-8 border border-gray-200 flex flex-col justify-center items-center text-center">
            <h3 className="font-moniqa text-3xl text-primary-text mb-4">Нужно больше возможностей?</h3>
            <p className="text-secondary-text mb-8 max-w-sm">
              Свяжитесь с нами для перехода на тариф Enterprise с индивидуальными условиями и API доступом.
            </p>
            <button className="px-8 py-3 bg-evergreen-forest text-soft-sand rounded-xl hover:bg-evergreen-hover transition-colors font-medium">
              Связаться с отделом продаж
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
