import { useState } from "react";
import { Button, useToast } from "@/components/ui";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/lib/api";
import { X } from "lucide-react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const { error } = useToast();

  if (!isOpen) return null;

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const { error: deleteError } = await api.deleteAccount();
      if (deleteError) {
        throw deleteError;
      }

      await logout();
    } catch (err) {
      console.error('Error deleting account:', err);
      error("Не удалось удалить аккаунт. Пожалуйста, обратитесь в поддержку.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 pr-6">
            <h2 className="font-moniqa text-4xl text-red-600 leading-none">Удаление аккаунта</h2>
            <p className="text-secondary-text">
              Вы уверены? Это действие необратимо. Все ваши данные, сохраненные материалы и подписки будут удалены навсегда.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Удаление..." : "Удалить навсегда"}
          </Button>
        </div>
      </div>
    </div>
  );
}
