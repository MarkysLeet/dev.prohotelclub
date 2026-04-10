"use client";

import { useState } from "react";
import { Button, useToast } from "@/components/ui";

export default function SettingsPage() {
  const { success } = useToast();
  const [emailNotif, setEmailNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);

  const toggleNotif = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    setter(!value);
    success('Настройки уведомлений обновлены');
  };

  return (
    <div className="space-y-10">
      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
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
                onClick={() => toggleNotif(setEmailNotif, emailNotif)}
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
                onClick={() => toggleNotif(setMarketingNotif, marketingNotif)}
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
          <div className="flex flex-col sm:flex-row gap-4">
             <Button variant="secondary">
               Сменить пароль
             </Button>
             <Button variant="dangerOutline">
               Двухфакторная аутентификация
             </Button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="pt-6 border-t border-red-100">
          <h2 className="font-moniqa text-3xl text-red-600 mb-4">Опасная зона</h2>
          <p className="text-sm text-secondary-text mb-6 max-w-xl">
            Удаление аккаунта приведет к безвозвратной потере всех данных, сохраненных материалов и активной подписки.
          </p>
          <Button variant="danger">
            Удалить аккаунт
          </Button>
        </section>

      </div>
    </div>
  );
}
