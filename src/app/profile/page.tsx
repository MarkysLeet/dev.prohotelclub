"use client";

import Header from "@/components/Header";
import { UserIcon, Mail01Icon } from "hugeicons-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen flex flex-col bg-soft-sand overflow-hidden font-century-gothic">
      <Header />
      <div className="pt-[80px] lg:pt-[100px] w-full max-w-5xl mx-auto px-6 pb-24">
        <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none mb-8">
          Мой профиль
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-10 border border-gray-100 transition-shadow hover:shadow-md">
          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <div className="w-32 h-32 rounded-full bg-soft-sand flex items-center justify-center border-2 border-evergreen-forest/20 text-evergreen-forest">
                <UserIcon size={48} strokeWidth={1.5} />
              </div>
              <button className="text-sm text-evergreen-forest hover:text-evergreen-hover font-medium">
                Изменить фото
              </button>
            </div>

            {/* User Details Form */}
            <div className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-secondary-text mb-2 ml-1">Имя</label>
                  <input
                    type="text"
                    defaultValue="Иван Иванов"
                    className="w-full px-4 py-3 bg-soft-sand/30 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-evergreen-forest text-primary-text"
                  />
                </div>
                <div>
                  <label className="block text-sm text-secondary-text mb-2 ml-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-text">
                      <Mail01Icon size={20} strokeWidth={1.5} />
                    </div>
                    <input
                      type="email"
                      defaultValue="ivan@example.com"
                      readOnly
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-secondary-text cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-secondary-text mb-2 ml-1">Компания / Агентство</label>
                <input
                  type="text"
                  defaultValue="Elite Travel Services"
                  className="w-full px-4 py-3 bg-soft-sand/30 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-evergreen-forest text-primary-text"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button className="px-8 py-3 bg-evergreen-forest text-soft-sand rounded-xl hover:bg-evergreen-hover transition-colors font-medium">
                  Сохранить изменения
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
