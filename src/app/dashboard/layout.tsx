"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Header from '@/components/Header';
import {
  DashboardSquare01Icon,
  UserIcon,
  Wallet01Icon,
  TimeQuarterIcon,
  FavouriteIcon,
  Settings01Icon,
  Logout01Icon,
  Menu01Icon,
  Shield01Icon
} from 'hugeicons-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/dashboard', label: 'Обзор', icon: DashboardSquare01Icon },
  { href: '/dashboard/profile', label: 'Профиль', icon: UserIcon },
  { href: '/dashboard/subscription', label: 'Подписка', icon: Wallet01Icon },
  { href: '/dashboard/history', label: 'История покупок', icon: TimeQuarterIcon },
  { href: '/dashboard/favorites', label: 'Избранное', icon: FavouriteIcon },
  { href: '/dashboard/settings', label: 'Настройки', icon: Settings01Icon },
];

const adminNavItem = { href: '/dashboard/admin', label: 'Панель администратора', icon: Shield01Icon };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuth, user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuth) {
      router.push('/auth');
    }
  }, [isAuth, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-evergreen-forest/20 border-t-evergreen-forest rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuth) return null;

  return (
    <div className="min-h-screen bg-soft-sand font-century-gothic flex flex-col">
      <Header />

      <div className="flex flex-1 pt-[56px] lg:pt-[64px] max-w-[1920px] w-full mx-auto relative">
        {/* Mobile menu toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-14 h-14 bg-evergreen-forest text-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Menu01Icon size={24} />
          </button>
        </div>

        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:sticky top-[56px] lg:top-[64px] h-[calc(100vh-56px)] lg:h-[calc(100vh-64px)]",
          "w-64 bg-white border-r border-gray-100 flex flex-col z-40 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-6 flex-1 overflow-y-auto">
            <nav className="space-y-1">
              {user?.isAdmin && (
                <>
                  <Link
                    href={adminNavItem.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm mb-4",
                      pathname.startsWith(adminNavItem.href)
                        ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "text-secondary-text hover:bg-soft-sand hover:text-primary-text"
                    )}
                  >
                    <adminNavItem.icon size={20} strokeWidth={1.5} />
                    {adminNavItem.label}
                  </Link>
                  <div className="w-full h-px bg-gray-100 my-2" />
                </>
              )}
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm",
                      isActive
                        ? "bg-evergreen-forest/10 text-evergreen-forest"
                        : "text-secondary-text hover:bg-soft-sand hover:text-primary-text"
                    )}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-6 border-t border-gray-100">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
            >
              <Logout01Icon size={20} strokeWidth={1.5} />
              Выйти
            </button>
          </div>
        </aside>

        {/* Mobile menu backdrop */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="p-6 lg:p-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
