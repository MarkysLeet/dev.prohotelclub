"use client";

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api, ReviewRequest } from '@/lib/api';
import { Badge, Button } from '@/components/ui';
import Link from 'next/link';
import { PageErrorState } from '@/components/ui';
import { ArrowLeft01Icon } from 'hugeicons-react';

import { ReviewRequestResponseModal } from './ReviewRequestResponseModal';

export default function AdminRequestsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<{ id: string, type: 'approve' | 'reject' } | null>(null);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/dashboard');
    } else {
      let mounted = true;
      async function loadRequests() {
        setIsLoading(true);
        setIsError(false);
        try {
          const data = await api.getReviewRequests();
          if (mounted) setRequests(data);
        } catch (err) {
          console.error("Failed to load", err);
          if (mounted) setIsError(true);
        } finally {
          if (mounted) setIsLoading(false);
        }
      }
      loadRequests();
      return () => { mounted = false; };
    }
  }, [user, router]);

  const handleStatusChange = async (id: string, newStatus: ReviewRequest['status'], adminReply?: string, scheduledDate?: string) => {
    await api.updateReviewRequestStatus(id, newStatus, adminReply, scheduledDate);
    const updated = await api.getReviewRequests();
    setRequests(updated);
    setSelectedRequest(null);
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
                  <th className="p-4 font-medium text-sm text-secondary-text">Причина</th>
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
                    <td className="p-4 text-sm text-primary-text max-w-xs truncate" title={req.reason || 'Не указана'}>
                      {req.reason || '-'}
                    </td>
                    <td className="p-4 text-sm text-secondary-text">{req.date}</td>
                    <td className="p-4">
                      <Badge variant={
                        req.status === 'pending' ? 'warning' : 
                        req.status === 'reviewed' ? 'success' : 'danger'
                      }>
                        {req.status === 'pending' ? 'В ожидании' : 
                         req.status === 'reviewed' ? 'Запланирован/Сделан' : 'Отклонен'}
                        {req.scheduledDate && <div className="text-xs mt-1 font-century-gothic font-normal">На: {req.scheduledDate}</div>}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {req.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => setSelectedRequest({ id: req.id, type: 'approve' })}>
                            Одобрить
                          </Button>
                          <Button size="sm" variant="dangerOutline" onClick={() => setSelectedRequest({ id: req.id, type: 'reject' })}>
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

      {selectedRequest && (
        <ReviewRequestResponseModal
          isOpen={!!selectedRequest}
          type={selectedRequest.type}
          onClose={() => setSelectedRequest(null)}
          onSubmit={(reply, date) => handleStatusChange(selectedRequest.id, selectedRequest.type === 'approve' ? 'reviewed' : 'rejected', reply, date)}
        />
      )}
    </div>
  );
}
