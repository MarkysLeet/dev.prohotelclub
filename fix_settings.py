import re

with open('src/app/dashboard/settings/page.tsx', 'r') as f:
    content = f.read()

# Add auth and api
import_old = 'import { Button, useToast } from "@/components/ui";'
import_new = """import { Button, useToast } from "@/components/ui";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/lib/api";
import { useEffect } from "react";"""
content = content.replace(import_old, import_new)

# Update states
state_old = """export default function SettingsPage() {
  const { success } = useToast();
  const [emailNotif, setEmailNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);

  const toggleNotif = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    setter(!value);
    success('Настройки уведомлений обновлены');
  };"""

state_new = """export default function SettingsPage() {
  const { success } = useToast();
  const { user, refreshUser } = useAuth();
  const [emailNotif, setEmailNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);

  const [notifyLikes, setNotifyLikes] = useState(true);
  const [notifyReplies, setNotifyReplies] = useState(true);

  useEffect(() => {
    if (user) {
      setNotifyLikes(user.notifyLikes);
      setNotifyReplies(user.notifyReplies);
    }
  }, [user]);

  const toggleNotif = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    setter(!value);
    success('Настройки уведомлений обновлены');
  };

  const updateInteractionSettings = async (type: 'likes' | 'replies', value: boolean) => {
    if (!user) return;

    const newLikes = type === 'likes' ? !value : notifyLikes;
    const newReplies = type === 'replies' ? !value : notifyReplies;

    if (type === 'likes') setNotifyLikes(!value);
    if (type === 'replies') setNotifyReplies(!value);

    await api.updateProfileSettings(user.id, newLikes, newReplies);
    await refreshUser();
    success('Настройки уведомлений обновлены');
  };"""

content = content.replace(state_old, state_new)

# Add interactions UI
ui_old = """          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-primary-text font-medium">Важные обновления</h3>"""

ui_new = """          <div className="space-y-6">
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
                <h3 className="text-lg text-primary-text font-medium">Важные обновления</h3>"""

content = content.replace(ui_old, ui_new)

with open('src/app/dashboard/settings/page.tsx', 'w') as f:
    f.write(content)
