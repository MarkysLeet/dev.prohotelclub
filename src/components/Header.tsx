"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search01Icon, UserIcon, Menu01Icon } from "hugeicons-react";
import { useAuth } from "@/lib/AuthContext";

export default function Header() {
  const { isAuth, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="w-full h-[56px] lg:h-[64px] bg-evergreen-forest flex justify-center fixed top-0 left-0 z-50 px-6 lg:px-[35px]">
      <div className="w-full max-w-[1920px] h-full flex items-center justify-between relative">
        {/* Left: Burger Menu */}
        <button
          aria-label="Menu"
          className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -ml-2"
        >
          <Menu01Icon size={28} strokeWidth={1.5} />
        </button>

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
  );
}
