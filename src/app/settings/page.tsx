"use client";

import Header from "@/components/Header";
import { useState } from "react";

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-soft-sand overflow-hidden font-century-gothic">
      <Header />
      <div className="pt-[80px] lg:pt-[100px] w-full max-w-4xl mx-auto px-6 pb-24">
        <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none mb-8">
          Настройки
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-10 border border-gray-100 space-y-10">

          {/* Notifications */}
          <section>
            <h2 className="font-moniqa text-3xl text-primary-text mb-6">Уведомления</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg text-primary-text font-medium">Важные обновления</h3>
                  <p className="text-sm text-secondary-text mt-1">Оповещения о новых отелях и изменениях на платформе</p>
                </div>
                <button
                  onClick={() => setEmailNotif(!emailNotif)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotif ? 'bg-evergreen-forest' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotif ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="w-full h-px bg-gray-100" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg text-primary-text font-medium">Маркетинговые рассылки</h3>
                  <p className="text-sm text-secondary-text mt-1">Новости, акции и специальные предложения</p>
                </div>
                <button
                  onClick={() => setMarketingNotif(!marketingNotif)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${marketingNotif ? 'bg-evergreen-forest' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${marketingNotif ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="font-moniqa text-3xl text-primary-text mb-6">Безопасность</h2>
            <div className="space-y-4">
               <button className="px-6 py-2 border border-gray-200 text-primary-text rounded-xl hover:bg-gray-50 transition-colors">
                 Сменить пароль
               </button>
               <br />
               <button className="px-6 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors">
                 Двухфакторная аутентификация
               </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="pt-6 border-t border-red-100">
            <h2 className="font-moniqa text-3xl text-red-600 mb-4">Опасная зона</h2>
            <p className="text-sm text-secondary-text mb-4">
              Удаление аккаунта приведет к безвозвратной потере всех данных и активной подписки.
            </p>
            <button className="px-6 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium">
              Удалить аккаунт
            </button>
          </section>

        </div>
      </div>
    </main>
  );
}
