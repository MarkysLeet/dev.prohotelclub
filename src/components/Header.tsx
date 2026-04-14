"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search01Icon,
  UserIcon,
  Menu01Icon,
  Cancel01Icon,
  Building04Icon,
  Home03Icon,
  FavouriteIcon,
  Login03Icon
} from "hugeicons-react";
import { useAuth } from "@/lib/AuthContext";

const PAGE_INFO: Record<string, { title: string; icon: React.ElementType }> = {
  "/": { title: "Главная", icon: Home03Icon },
  "/hotels": { title: "Коллекция", icon: Building04Icon },
  "/dashboard": { title: "Кабинет", icon: UserIcon },
  "/dashboard/favorites": { title: "Избранное", icon: FavouriteIcon },
  "/auth": { title: "Вход", icon: Login03Icon },
};

export default function Header() {
  const { isAuth, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentPageInfo = React.useMemo(() => {
    return PAGE_INFO[pathname] || { title: "ProHotelClub", icon: Home03Icon };
  }, [pathname]);

  const CurrentIcon = currentPageInfo.icon;

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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
    <header className="w-full h-[56px] lg:h-[64px] bg-evergreen-forest flex justify-center fixed top-0 left-0 z-50 px-6 lg:px-[35px]">
      <div className="w-full max-w-[1920px] h-full flex items-center justify-between relative">
        {/* Left: Burger Menu & Current Page Indicator */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -ml-2 z-50 relative"
          >
            {isMenuOpen ? (
              <Cancel01Icon size={28} strokeWidth={1.5} />
            ) : (
              <Menu01Icon size={28} strokeWidth={1.5} />
            )}
          </button>

          <div
            className="hidden md:flex items-center gap-2 text-soft-sand p-2 font-medium opacity-80"
          >
            <CurrentIcon size={22} strokeWidth={1.5} />
            <span className="text-sm font-century-gothic tracking-wide uppercase">{currentPageInfo.title}</span>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 mt-1">
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

          <button
            aria-label="Search"
            className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2"
          >
            <Search01Icon size={26} strokeWidth={1.5} />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              aria-label="Profile"
              onClick={handleUserIconClick}
              aria-expanded={isDropdownOpen}
              className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -mr-2"
            >
              <UserIcon size={26} strokeWidth={1.5} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute right-0 top-[calc(100%+8px)] w-48 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden py-2 z-50 flex flex-col font-century-gothic"
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="px-4 py-2 text-sm text-primary-text hover:bg-soft-sand hover:text-evergreen-forest transition-colors text-left"
                  >
                    Личный кабинет
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
          </div>
        </div>
      </div>
    </header>

    {/* Full Screen Menu */}
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-soft-sand z-40 flex flex-col justify-center items-center font-moniqa px-6"
        >
          <div className="flex flex-col gap-8 text-center mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl md:text-7xl text-primary-text hover:text-evergreen-forest transition-colors tracking-wide"
              >
                Главная
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/hotels"
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl md:text-7xl text-primary-text hover:text-evergreen-forest transition-colors tracking-wide"
              >
                Коллекция
              </Link>
            </motion.div>

            {isAuth ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-5xl md:text-7xl text-primary-text hover:text-evergreen-forest transition-colors tracking-wide"
                  >
                    Личный кабинет
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href="/dashboard/favorites"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-5xl md:text-7xl text-primary-text hover:text-evergreen-forest transition-colors tracking-wide"
                  >
                    Избранное
                  </Link>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-5xl md:text-7xl text-primary-text hover:text-evergreen-forest transition-colors tracking-wide"
                >
                  Вход
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
