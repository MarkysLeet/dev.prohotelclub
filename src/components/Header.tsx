"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    UserIcon,
  Menu01Icon,
  Cancel01Icon,
  Building04Icon, InformationCircleIcon,
  Home03Icon,
  FavouriteIcon,
  Login03Icon,
  Logout01Icon
} from "hugeicons-react";
import { useAuth } from "@/lib/AuthContext";
import { api, Notification } from "@/lib/api";
import { Notification01Icon } from "hugeicons-react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { useHeaderStore } from "@/lib/useHeaderStore";
import { ArrowLeft01Icon } from "hugeicons-react";

const PAGE_INFO: Record<string, { title: string; icon: React.ElementType }> = {
  "/": { title: "Главная", icon: Home03Icon },
  "/hotels": { title: "Коллекция", icon: Building04Icon },
  "/dashboard": { title: "Кабинет", icon: UserIcon },
  "/dashboard/favorites": { title: "Избранное", icon: FavouriteIcon },
  "/auth": { title: "Вход", icon: Login03Icon },
};

export default function Header() {
  const { isAuth, isLoading, logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    let mounted = true;
    if (isAuth && user) {
      api.getNotifications(user.id).then(data => {
        if (mounted) setNotifications(data);
      });
    }
    return () => { mounted = false; };
  }, [isAuth, user]);

  const handleNotifClick = async () => {
    if (!isNotifOpen && unreadCount > 0 && user) {
      await api.markNotificationsAsRead(user.id);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    }
    setIsNotifOpen(!isNotifOpen);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutsideNotif(event: MouseEvent) {
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideNotif);
    return () => document.removeEventListener("mousedown", handleClickOutsideNotif);
  }, []);

  const currentPageInfo = React.useMemo(() => {
    return PAGE_INFO[pathname] || { title: "ProHotelClub", icon: Home03Icon };
  }, [pathname]);

  const CurrentIcon = currentPageInfo.icon;
  const { title: customTitle, showBack } = useHeaderStore();

  const handleUserIconClick = () => {
    if (!isAuth) {
      router.push("/auth");
    } else {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
    <header className="w-full h-[56px] lg:h-[64px] bg-evergreen-forest flex justify-center fixed top-0 left-0 z-[100] px-6 lg:px-[35px]">
      <div className="w-full max-w-[1920px] h-full flex items-center justify-between relative">
        {/* Left: Burger Menu & Current Page Indicator */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -ml-2 z-[100] relative"
          >
            {isMenuOpen ? (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}><Cancel01Icon size={28} strokeWidth={1.5} /></motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}><Menu01Icon size={28} strokeWidth={1.5} /></motion.div>
            )}
          </button>

          <div
            className="hidden md:flex items-center gap-2 text-soft-sand p-2 font-medium opacity-80"
          >
            {showBack ? (
              <button
                onClick={() => pathname.startsWith('/hotels/') ? router.push('/hotels') : router.back()}
                className="flex items-center gap-2 hover:text-white transition-colors duration-200"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}><ArrowLeft01Icon size={22} strokeWidth={1.5} /></motion.div>
                <span className="text-sm font-century-gothic tracking-wide uppercase mt-[2px] max-w-[200px] truncate" title={customTitle || "Назад"}>
                  {customTitle || "Назад"}
                </span>
              </button>
            ) : (
              <>
                <CurrentIcon size={22} strokeWidth={1.5} />
                <span className="text-sm font-century-gothic tracking-wide uppercase mt-[2px]">
                  {currentPageInfo.title}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 mt-1 flex items-center justify-center text-center">
          <Link href="/">
            <span className="font-moniqa text-[clamp(24px,4vw,40px)] text-white tracking-wide leading-none select-none hover:opacity-80 transition-opacity cursor-pointer">
              ProHotelClub
            </span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 lg:gap-8">
          <div
            className="md:hidden text-soft-sand flex items-center justify-center p-2 opacity-80"
            aria-label={currentPageInfo.title}
          >
            <CurrentIcon size={26} strokeWidth={1.5} />
          </div>

          <GlobalSearch />

          {/* Notifications */}
          {isAuth && (
            <div className="relative" ref={notifDropdownRef}>
              <button
                aria-label="Уведомления"
                onClick={handleNotifClick}
                className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 relative"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}><Notification01Icon size={26} strokeWidth={1.5} /></motion.div>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute right-0 top-[calc(100%+8px)] w-80 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden py-2 z-[100] flex flex-col font-century-gothic max-h-96"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <span className="font-bold text-primary-text text-sm">Уведомления</span>
                    </div>
                    <div className="overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-secondary-text">
                          Уведомлений пока нет
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div key={notif.id} className={`px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${!notif.isRead ? 'bg-evergreen-forest/5' : ''}`}>
                            <p className="text-sm text-primary-text">
                              <span className="font-bold">{notif.actorName}</span>{' '}
                              {notif.type === 'like' ? 'оценил(а) ваш комментарий' : 'ответил(а) на ваш комментарий'}
                            </p>
                            <span className="text-xs text-secondary-text mt-1 block">
                              {new Date(notif.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {notif.hotelSlug && (
                               <Link href={`/hotels/${notif.hotelSlug}`} onClick={() => setIsNotifOpen(false)} className="text-xs text-evergreen-forest hover:underline mt-1 inline-block">
                                  К отелю
                               </Link>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="relative" ref={dropdownRef}>
            {isLoading ? (
               <div className="w-6 h-6 border-2 border-soft-sand/30 border-t-soft-sand rounded-full animate-spin p-2 -mr-2 flex items-center justify-center"></div>
            ) : isAuth ? (
              <>
                <button
                  aria-label="Profile"
                  onClick={handleUserIconClick}
                  aria-expanded={isDropdownOpen}
                  className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -mr-2"
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}><UserIcon size={26} strokeWidth={1.5} /></motion.div>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute right-0 top-[calc(100%+8px)] w-48 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden py-2 z-[100] flex flex-col font-century-gothic"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-4 py-2 text-sm text-primary-text hover:bg-soft-sand hover:text-evergreen-forest transition-colors text-left"
                      >
                        Личный кабинет
                      </Link>
                      <Link
                        href="/dashboard/favorites"
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-4 py-2 text-sm text-primary-text hover:bg-soft-sand hover:text-evergreen-forest transition-colors text-left"
                      >
                        Избранное
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-4 py-2 text-sm text-primary-text hover:bg-soft-sand hover:text-evergreen-forest transition-colors text-left"
                      >
                        Настройки
                      </Link>
                      <div className="h-px bg-gray-200 my-1 mx-2" />
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logout();
                        }}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left w-full"
                      >
                        Выйти
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <>
                <button
                  aria-label="Profile"
                  onClick={handleUserIconClick}
                  aria-expanded={isDropdownOpen}
                  className="lg:hidden text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -mr-2"
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}><UserIcon size={26} strokeWidth={1.5} /></motion.div>
                </button>
                <Link href="/auth" className="hidden lg:flex">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2 rounded-xl text-sm font-medium transition-colors"
                  >
                    Войти
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>

    {/* Mobile menu backdrop */}
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] mt-[56px] lg:mt-[64px]"
        />
      )}
    </AnimatePresence>

    {/* Sidebar Menu */}
    <aside
      className={`fixed top-[56px] lg:top-[64px] h-[calc(100vh-56px)] lg:h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-100 flex flex-col z-[100] transition-transform duration-300 ease-in-out left-0 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 flex-1 overflow-y-auto">
        <nav className="space-y-1 font-century-gothic">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
              pathname === "/"
                ? "bg-evergreen-forest/10 text-evergreen-forest"
                : "text-secondary-text hover:bg-soft-sand hover:text-primary-text"
            }`}
          >
            <Home03Icon size={20} strokeWidth={1.5} />
            Главная
          </Link>

          <Link
            href="/hotels"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
              pathname === "/hotels"
                ? "bg-evergreen-forest/10 text-evergreen-forest"
                : "text-secondary-text hover:bg-soft-sand hover:text-primary-text"
            }`}
          >
            <Building04Icon size={20} strokeWidth={1.5} />
            Коллекция
          </Link>

          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
              pathname === "/about"
                ? "bg-evergreen-forest/10 text-evergreen-forest"
                : "text-secondary-text hover:bg-soft-sand hover:text-primary-text"
            }`}
          >
            <InformationCircleIcon size={20} strokeWidth={1.5} />
            О проекте
          </Link>

          {isAuth && (
            <>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                  pathname === "/dashboard"
                    ? "bg-evergreen-forest/10 text-evergreen-forest"
                    : "text-secondary-text hover:bg-soft-sand hover:text-primary-text"
                }`}
              >
                <UserIcon size={20} strokeWidth={1.5} />
                Личный кабинет
              </Link>

              <Link
                href="/dashboard/favorites"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                  pathname === "/dashboard/favorites"
                    ? "bg-evergreen-forest/10 text-evergreen-forest"
                    : "text-secondary-text hover:bg-soft-sand hover:text-primary-text"
                }`}
              >
                <FavouriteIcon size={20} strokeWidth={1.5} />
                Избранное
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Bottom section: User Info & Auth Actions */}
      <div className="p-6 border-t border-gray-100 font-century-gothic">
        {isAuth ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-soft-sand flex items-center justify-center text-evergreen-forest font-bold text-lg">
                ВГ
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary-text leading-tight">Виктор Грозан</span>
                <span className="text-xs text-secondary-text">Турагент</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
            >
              <Logout01Icon size={20} strokeWidth={1.5} />
              Выйти
            </button>
          </div>
        ) : (
          <Link
            href="/auth"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-colors font-medium text-sm ${
              pathname === "/auth"
                ? "bg-evergreen-forest/10 text-evergreen-forest"
                : "text-secondary-text hover:bg-soft-sand hover:text-primary-text"
            }`}
          >
            <Login03Icon size={20} strokeWidth={1.5} />
            Вход
          </Link>
        )}
      </div>
    </aside>
    </>
  );
}
