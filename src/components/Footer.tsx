"use client";

import React from "react";
import Link from "next/link";

import { InstagramIcon, TwitterIcon, Linkedin01Icon } from "hugeicons-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-evergreen-forest text-soft-sand relative z-10 font-century-gothic overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-[35px] py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-6 inline-block">
              <span className="font-moniqa text-[clamp(32px,5vw,48px)] text-white tracking-wide leading-none hover:opacity-80 transition-opacity">
                ProHotelClub
              </span>
            </Link>
            <p className="text-soft-sand/70 text-sm max-w-sm leading-relaxed mb-8">
              Закрытая B2B SaaS платформа для туристических агентов. Эксклюзивная база премиального медиаконтента и обзоров.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-soft-sand/20 flex items-center justify-center text-soft-sand hover:bg-soft-sand hover:text-evergreen-forest transition-colors duration-300">
                <InstagramIcon size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-soft-sand/20 flex items-center justify-center text-soft-sand hover:bg-soft-sand hover:text-evergreen-forest transition-colors duration-300">
                <TwitterIcon size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-soft-sand/20 flex items-center justify-center text-soft-sand hover:bg-soft-sand hover:text-evergreen-forest transition-colors duration-300">
                <Linkedin01Icon size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-white font-semibold text-lg mb-6 tracking-wide">Навигация</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/hotels" className="text-soft-sand/70 hover:text-white transition-colors text-sm">
                  Коллекция отелей
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-soft-sand/70 hover:text-white transition-colors text-sm">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-soft-sand/70 hover:text-white transition-colors text-sm">
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-6 tracking-wide">Правовая информация</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-soft-sand/70 hover:text-white transition-colors text-sm">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#" className="text-soft-sand/70 hover:text-white transition-colors text-sm">
                  Условия использования
                </a>
              </li>
              <li>
                <a href="#" className="text-soft-sand/70 hover:text-white transition-colors text-sm">
                  Оферта
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-6 tracking-wide">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@prohotelclub.com" className="text-soft-sand/70 hover:text-white transition-colors text-sm">
                  hello@prohotelclub.com
                </a>
              </li>
              <li className="text-soft-sand/70 text-sm">
                Москва, Россия
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-soft-sand/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-soft-sand/50 text-sm">
            &copy; {currentYear} ProHotelClub. Все права защищены.
          </p>

          {/* GRO-43 Requirement */}
          <div className="text-soft-sand/50 text-sm flex items-center gap-1">
            <span>Разработано в</span>
            <a
              href="https://www.grozan.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-soft-sand transition-colors font-medium relative group"
            >
              Grozan Studio
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-soft-sand transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
