"use client";

import { useState, useEffect } from "react";
import { Button, Input, useToast, Skeleton } from "@/components/ui";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/lib/api";
import { ChangePasswordModal } from "@/components/ChangePasswordModal";
import { DeleteAccountModal } from "@/components/DeleteAccountModal";

export default function SettingsPage() {
  const { success, error } = useToast();
  const { user, refreshUser, isLoading } = useAuth();

  // Modals state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Profile data state
  const [name, setName] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);

  // Notification state
  const [notifyLikes, setNotifyLikes] = useState(true);
  const [notifyReplies, setNotifyReplies] = useState(true);
  const [notifyEmailUpdates, setNotifyEmailUpdates] = useState(true);
  const [notifyMarketing, setNotifyMarketing] = useState(false);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
         setName(user.name || "");
         setNotifyLikes(user.notifyLikes ?? true);
         setNotifyReplies(user.notifyReplies ?? true);
                  setNotifyEmailUpdates(user.notifyEmailUpdates ?? true);
                  setNotifyMarketing(user.notifyMarketing ?? false);
      }, 0);
    }
  }, [user]);

  const handleSaveName = async () => {
    if (!user) return;
    if (!name.trim()) {
      error("Имя не может быть пустым");
      return;
    }

    setIsSavingName(true);
    try {
      await api.updateProfileName(user.id, name);
      await refreshUser();
      success('Имя профиля обновлено');
    } catch {
      error("Ошибка при обновлении имени");
    } finally {
      setIsSavingName(false);
    }
  };

  const updateInteractionSettings = async (type: 'likes' | 'replies' | 'email' | 'marketing', value: boolean) => {
    if (!user) return;

    const newLikes = type === 'likes' ? !value : notifyLikes;
    const newReplies = type === 'replies' ? !value : notifyReplies;
    const newEmailUpdates = type === 'email' ? !value : notifyEmailUpdates;
    const newMarketing = type === 'marketing' ? !value : notifyMarketing;

    if (type === 'likes') setNotifyLikes(!value);
    if (type === 'replies') setNotifyReplies(!value);
    if (type === 'email') setNotifyEmailUpdates(!value);
    if (type === 'marketing') setNotifyMarketing(!value);

    try {

      await api.updateProfileSettings(user.id, newLikes, newReplies, newEmailUpdates, newMarketing);
      await refreshUser();
      success('Настройки уведомлений обновлены');
    } catch {
      error("Ошибка при сохранении настроек");
      // Revert optimistic update on failure (could be improved)
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-10">
        <Skeleton className="h-16 w-64 rounded-lg" />
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-10 border border-gray-100 space-y-10">
          <div className="space-y-4">
             <Skeleton className="h-8 w-40" />
             <Skeleton className="h-12 w-full max-w-md" />
          </div>
          <div className="space-y-6">
             <Skeleton className="h-8 w-40" />
             <Skeleton className="h-16 w-full" />
             <Skeleton className="h-16 w-full" />
             <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
        Настройки
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 lg:p-10 border border-gray-100 space-y-10">

        {/* Profile Info */}
        <section>
          <h2 className="font-moniqa text-3xl text-primary-text mb-6">Профиль</h2>
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-text mb-2">
                Ваше имя
              </label>
              <div className="flex gap-3">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя Фамилия"
                />
                <Button
                  onClick={handleSaveName}
                  disabled={isSavingName || name === user?.name}
                  variant="secondary"
                >
                  {isSavingName ? "..." : "Сохранить"}
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-text mb-2">
                Email
              </label>
              <Input
                value={user?.email || ""}
                disabled
                className="bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-secondary-text mt-1">Email используется для входа и не может быть изменен</p>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-gray-100" />

        {/* Notifications */}
        <section>
          <h2 className="font-moniqa text-3xl text-primary-text mb-6">Уведомления</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-primary-text font-medium">Лайки к комментариям</h3>
                <p className="text-sm text-secondary-text mt-1">Уведомлять, когда кто-то оценивает ваш комментарий</p>
              </div>
              <button
                onClick={() => updateInteractionSettings('likes', notifyLikes)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifyLikes ? 'bg-evergreen-forest' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifyLikes ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="w-full h-px bg-gray-100" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-primary-text font-medium">Ответы на комментарии</h3>
                <p className="text-sm text-secondary-text mt-1">Уведомлять, когда кто-то отвечает на ваш комментарий</p>
              </div>
              <button
                onClick={() => updateInteractionSettings('replies', notifyReplies)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifyReplies ? 'bg-evergreen-forest' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifyReplies ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="w-full h-px bg-gray-100" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-primary-text font-medium">Важные обновления</h3>
                <p className="text-sm text-secondary-text mt-1">Оповещения о новых отелях и изменениях на платформе</p>
              </div>
              <button
                onClick={() => updateInteractionSettings('email', notifyEmailUpdates)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifyEmailUpdates ? 'bg-evergreen-forest' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifyEmailUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="w-full h-px bg-gray-100" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-primary-text font-medium">Маркетинговые рассылки</h3>
                <p className="text-sm text-secondary-text mt-1">Новости, акции и специальные предложения</p>
              </div>
              <button
                onClick={() => updateInteractionSettings('marketing', notifyMarketing)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifyMarketing ? 'bg-evergreen-forest' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifyMarketing ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Security */}
        <section>
          <h2 className="font-moniqa text-3xl text-primary-text mb-6">Безопасность</h2>
          <div className="flex flex-col sm:flex-row gap-4">
             <Button variant="secondary" onClick={() => setIsPasswordModalOpen(true)}>
               Сменить пароль
             </Button>
             <Button variant="dangerOutline" disabled className="opacity-50 cursor-not-allowed">
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
          <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
            Удалить аккаунт
          </Button>
        </section>

      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
