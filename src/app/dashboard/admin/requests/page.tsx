"use client";

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { storage, ReviewRequest } from '@/lib/storage';
import { Badge, Button } from '@/components/ui';
import Link from 'next/link';
import { ArrowLeft01Icon } from 'hugeicons-react';

export default function AdminRequestsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<ReviewRequest[]>([]);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/dashboard');
    } else {
      const timer = setTimeout(() => {
        setRequests(storage.getReviewRequests().reverse()); // Последние сверху
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  const handleStatusChange = (id: string, newStatus: ReviewRequest['status']) => {
    storage.updateReviewRequestStatus(id, newStatus);
    setRequests(storage.getReviewRequests().reverse());
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="space-y-10">
      <Link href="/dashboard/admin" className="inline-flex items-center gap-2 text-secondary-text hover:text-primary-text transition-colors text-sm font-medium">
        <ArrowLeft01Icon size={16} /> Назад в панель
      </Link>

      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
        Запросы на обзоры
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-10 text-center text-secondary-text">
            Пока нет ни одного запроса.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-soft-sand/50 border-b border-gray-100">
                  <th className="p-4 font-medium text-sm text-secondary-text">Отель</th>
                  <th className="p-4 font-medium text-sm text-secondary-text">Пользователь</th>
                  <th className="p-4 font-medium text-sm text-secondary-text">Дата</th>
                  <th className="p-4 font-medium text-sm text-secondary-text">Статус</th>
                  <th className="p-4 font-medium text-sm text-secondary-text">Действия</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-primary-text">{req.hotelName}</td>
                    <td className="p-4 text-sm text-secondary-text">{req.userName}</td>
                    <td className="p-4 text-sm text-secondary-text">{req.date}</td>
                    <td className="p-4">
                      <Badge variant={
                        req.status === 'pending' ? 'warning' : 
                        req.status === 'reviewed' ? 'success' : 'danger'
                      }>
                        {req.status === 'pending' ? 'В ожидании' : 
                         req.status === 'reviewed' ? 'Сделан обзор' : 'Отклонен'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {req.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleStatusChange(req.id, 'reviewed')}>
                            Выполнено
                          </Button>
                          <Button size="sm" variant="dangerOutline" onClick={() => handleStatusChange(req.id, 'rejected')}>
                            Отклонить
                          </Button>
                        </div>
                      )}
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
