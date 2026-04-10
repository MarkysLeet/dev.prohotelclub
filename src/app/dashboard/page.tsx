"use client";

import { userProfile, transactions } from '@/lib/mock-data';
import { Badge, Button } from '@/components/ui';
import { ArrowRight01Icon, TimeQuarterIcon, Download01Icon } from 'hugeicons-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const recentTransactions = transactions.slice(0, 3);


  return (
    <div className="space-y-10">
      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
        Обзор
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-medium text-primary-text mb-1">{userProfile.name}</h2>
            <p className="text-secondary-text mb-6">{userProfile.company}</p>
            <Badge variant="primary" className="mb-4">Тариф {userProfile.plan}</Badge>
          </div>
          <Link href="/dashboard/profile">
            <Button variant="ghost" className="w-full justify-start px-0 text-evergreen-forest">
              Настроить профиль <ArrowRight01Icon size={16} className="ml-2" />
            </Button>
          </Link>
        </div>

        {/* Quick Actions / Stats */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium text-primary-text mb-4 flex items-center gap-2">
              <Download01Icon size={20} className="text-evergreen-forest" /> Доступно скачиваний
            </h3>
            <div className="text-4xl font-moniqa text-primary-text">Неограниченно</div>
            <p className="text-sm text-secondary-text mt-2">В рамках тарифа {userProfile.plan}</p>
          </div>
          <Link href="/dashboard/subscription">
            <Button variant="secondary" size="sm" className="w-fit mt-6">
              Управление подпиской
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-primary-text flex items-center gap-2">
            <TimeQuarterIcon size={20} className="text-evergreen-forest" /> Последние операции
          </h2>
          <Link href="/dashboard/history" className="text-sm text-secondary-text hover:text-evergreen-forest transition-colors">
            Смотреть все
          </Link>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((trx) => (
            <div key={trx.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="font-medium text-primary-text text-sm">{trx.description}</p>
                <p className="text-xs text-secondary-text mt-1">{trx.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-primary-text">${trx.amount}</p>
                <Badge variant={trx.status === 'completed' ? 'success' : 'warning'} className="mt-1 text-[10px] px-2 py-0.5">
                  {trx.status === 'completed' ? 'Оплачено' : 'В обработке'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
