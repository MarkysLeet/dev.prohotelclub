"use client";

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api, UserProfile } from '@/lib/api';
import { Badge, Button } from '@/components/ui';
import Link from 'next/link';
import { ArrowLeft01Icon } from 'hugeicons-react';

export default function AdminUsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/dashboard');
    } else {
      let mounted = true;
      async function loadUsers() {
        const data = await api.getAllProfiles();
        if (mounted) setUsers(data);
      }
      loadUsers();
      return () => { mounted = false; };
    }
  }, [user, router]);

  const toggleAdmin = async (u: UserProfile) => {
    await api.updateUserProfileAsAdmin(u.id, { isAdmin: !u.isAdmin });
    const updated = await api.getAllProfiles();
    setUsers(updated);
  };

  const deleteUser = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этого пользователя? Это действие необратимо.')) {
      await api.deleteUserAsAdmin(id);
      const updated = await api.getAllProfiles();
      setUsers(updated);
    }
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="space-y-10">
      <Link href="/dashboard/admin" className="inline-flex items-center gap-2 text-secondary-text hover:text-primary-text transition-colors text-sm font-medium">
        <ArrowLeft01Icon size={16} /> Назад в панель
      </Link>

      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
        Управление пользователями
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {users.length === 0 ? (
          <div className="p-10 text-center text-secondary-text">
            Пользователей пока нет.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-soft-sand/50 border-b border-gray-100">
                  <th className="p-4 font-medium text-sm text-secondary-text">Имя</th>
                  <th className="p-4 font-medium text-sm text-secondary-text">Email</th>
                  <th className="p-4 font-medium text-sm text-secondary-text">Компания</th>
                  <th className="p-4 font-medium text-sm text-secondary-text">Роль</th>
                  <th className="p-4 font-medium text-sm text-secondary-text">Подписка</th>
                  <th className="p-4 font-medium text-sm text-secondary-text text-right">Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-primary-text">{u.name || 'Не указано'}</td>
                    <td className="p-4 text-sm text-secondary-text">{u.email}</td>
                    <td className="p-4 text-sm text-secondary-text">{u.company || '-'}</td>
                    <td className="p-4">
                      <Badge variant={u.isAdmin ? 'success' : 'default'}>
                        {u.isAdmin ? 'Администратор' : 'Агент'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {u.hasActiveSubscription ? (
                        <span className="text-evergreen-forest text-sm font-medium">
                          До {u.subscriptionEndsAt ? new Date(u.subscriptionEndsAt).toLocaleDateString() : 'Бессрочно'}
                        </span>
                      ) : (
                        <span className="text-secondary-text text-sm">Нет</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => toggleAdmin(u)}
                          disabled={u.id === user.id}
                        >
                          {u.isAdmin ? 'Забрать права' : 'Сделать админом'}
                        </Button>
                        <Button
                          size="sm"
                          variant="dangerOutline"
                          onClick={() => deleteUser(u.id)}
                          disabled={u.id === user.id}
                        >
                          Удалить
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}