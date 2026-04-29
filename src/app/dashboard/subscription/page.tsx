"use client";

import { useState } from "react";
import { CheckmarkBadge01Icon } from "hugeicons-react";
import { Button, useToast } from "@/components/ui";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/lib/api";
import { PaymentModal } from "@/components/subscription/PaymentModal";

const PLANS = [
  { id: "1_month", title: "1 месяц", price: "1 299 ₽", period: "за 30 дней", months: 1 },
  { id: "3_months", title: "3 месяца", price: "3 599 ₽", period: "за 90 дней", popular: true, months: 3 },
  { id: "1_year", title: "1 год", price: "13 299 ₽", period: "за 365 дней", highlight: true, months: 12 },
];

export default function SubscriptionPage() {
  const { user, refreshUser } = useAuth();
  const { success, error } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>("1_year");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Check if user has an active subscription and when it ends
  const hasActiveSubscription = user?.hasActiveSubscription;
  const subscriptionEndsAt = user?.subscriptionEndsAt ? new Date(user.subscriptionEndsAt) : null;

  // Logic to allow renewing if less than 30 days left
  let canRenew = true;
  let daysLeft = 0;

  if (hasActiveSubscription && subscriptionEndsAt) {
    const now = new Date();
    const diffTime = subscriptionEndsAt.getTime() - now.getTime();
    daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Prevent renewal if more than 30 days left
    if (daysLeft > 30) {
      canRenew = false;
    }
  }

  const handleSubscribeClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async () => {
    setIsPaymentModalOpen(false);
    if (!user) {
      error("Необходимо авторизоваться");
      return;
    }

    const plan = PLANS.find(p => p.id === selectedPlan);
    if (!plan) return;

    setIsProcessing(true);
    try {
      const res = await api.updateSubscription(user.id, plan.months);
      if (res.success) {
        await refreshUser();
        success('Подписка успешно оформлена!');
      } else {
        error('Ошибка при оформлении подписки в базе данных');
      }
    } catch {
      error('Произошла ошибка при оформлении подписки');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
        Управление подпиской
      </h1>

      {hasActiveSubscription && subscriptionEndsAt && (
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-evergreen-forest/20 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium text-primary-text mb-1">Ваша подписка активна</h2>
            <p className="text-secondary-text">
              Действует до {subscriptionEndsAt.toLocaleDateString('ru-RU')} (осталось {daysLeft} дней)
            </p>
          </div>
          {!canRenew && (
            <div className="bg-amber-50 text-amber-800 px-4 py-2 rounded-lg text-sm border border-amber-200">
              Продление будет доступно за 30 дней до окончания
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col ${
              selectedPlan === plan.id
                ? "border-evergreen-forest shadow-md scale-[1.02]"
                : "border-gray-100 hover:border-evergreen-forest/50 hover:shadow-md"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-evergreen-forest/10 text-evergreen-forest px-4 py-1 rounded-bl-xl text-xs font-medium">
                Популярный
              </div>
            )}
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-[#D4AF37] text-white px-4 py-1 rounded-bl-xl text-xs font-medium">
                Выгодно
              </div>
            )}

            <h3 className="font-moniqa text-3xl text-primary-text mb-2 mt-2">{plan.title}</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-medium text-primary-text">{plan.price}</span>
            </div>
            <p className="text-secondary-text text-sm mb-6">{plan.period}</p>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Доступ ко всем премиум отелям",
                "Скачивание медиа в высоком качестве",
                "Безлимитный просмотр",
                plan.id === "1_year" ? "Приоритетная поддержка" : null
              ].filter(Boolean).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-primary-text">
                  <CheckmarkBadge01Icon size={18} className="text-evergreen-forest shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mx-auto mb-4 ${
              selectedPlan === plan.id ? "border-evergreen-forest" : "border-gray-300"
            }`}>
              {selectedPlan === plan.id && <div className="w-2.5 h-2.5 bg-evergreen-forest rounded-full" />}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          size="default"
          onClick={handleSubscribeClick}
          disabled={!canRenew || isProcessing}
          className="w-full sm:w-auto min-w-[200px]"
        >
          {isProcessing ? "Обработка..." : hasActiveSubscription ? "Продлить подписку" : "Оформить подписку"}
        </Button>
      </div>

      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onSuccess={handlePaymentSuccess}
          planTitle={PLANS.find(p => p.id === selectedPlan)?.title || ""}
          planPrice={PLANS.find(p => p.id === selectedPlan)?.price || ""}
        />
      )}
    </div>
  );
}
