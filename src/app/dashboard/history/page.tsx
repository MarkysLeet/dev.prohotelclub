"use client";

import { transactions } from '@/lib/mock-data';
import { Badge, Button } from '@/components/ui';
import { Download01Icon } from 'hugeicons-react';

export default function HistoryPage() {
  return (
    <div className="space-y-10">
      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
        История покупок
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-soft-sand/50 text-secondary-text text-sm border-b border-gray-100">
                <th className="p-6 font-medium">Транзакция</th>
                <th className="p-6 font-medium">Дата</th>
                <th className="p-6 font-medium">Сумма</th>
                <th className="p-6 font-medium">Статус</th>
                <th className="p-6 font-medium text-right">Чек</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-6">
                    <p className="font-medium text-primary-text">{trx.description}</p>
                    <p className="text-sm text-secondary-text mt-1">{trx.id}</p>
                  </td>
                  <td className="p-6 text-primary-text">{trx.date}</td>
                  <td className="p-6 font-medium text-primary-text">{trx.amount} ₽</td>
                  <td className="p-6">
                    <Badge variant={trx.status === 'completed' ? 'success' : 'warning'}>
                      {trx.status === 'completed' ? 'Оплачено' : 'В обработке'}
                    </Badge>
                  </td>
                  <td className="p-6 text-right">
                    <Button variant="ghost" size="icon" className="text-evergreen-forest hover:text-evergreen-hover">
                      <Download01Icon size={20} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
