import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search01Icon, Cancel01Icon, Time02Icon, Building04Icon, ArrowRight01Icon, Link01Icon } from 'hugeicons-react';
import { useRouter } from 'next/navigation';
import { hotels } from '@/lib/mock-data';
import { useSearchHistory } from '@/hooks/useSearchHistory';

const SITE_PAGES = [
  { id: 'page-home', name: 'Главная страница', type: 'page', link: '/' },
  { id: 'page-hotels', name: 'Коллекция отелей', type: 'page', link: '/hotels' },
  { id: 'page-dashboard', name: 'Личный кабинет', type: 'page', link: '/dashboard' },
  { id: 'page-favorites', name: 'Избранное', type: 'page', link: '/dashboard/favorites' },
  { id: 'page-settings', name: 'Настройки', type: 'page', link: '/dashboard' },
];

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { history, addSearch, removeSearch } = useSearchHistory();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleItemClick = (link: string, itemName: string) => {
    addSearch(itemName);
    setIsOpen(false);
    setQuery('');
    router.push(link);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addSearch(query);
      // If there's an exact match or just redirect to hotels with query (though we don't have search param on hotels yet)
      // Let's just go to hotels page and let user type there, or if we have a top match, go to it.
      setIsOpen(false);
      setQuery('');
      router.push('/hotels');
    }
  };

  const searchResults = useMemo(() => {
    if (!query.trim()) return { hotels: [], pages: [] };

    const q = query.toLowerCase();
    const matchedHotels = hotels.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.location.toLowerCase().includes(q) ||
      h.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 5);

    const matchedPages = SITE_PAGES.filter(p => p.name.toLowerCase().includes(q));

    return { hotels: matchedHotels, pages: matchedPages };
  }, [query]);

  const suggestedHotels = useMemo(() => hotels.slice(0, 3), []);

  return (
    <div className="relative flex items-center justify-end" ref={containerRef}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="search-button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            aria-label="Search"
            className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2"
          >
            <Search01Icon size={26} strokeWidth={1.5} />
          </motion.button>
        ) : (
          <motion.div
            key="search-input-container"
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: "min(300px, 40vw)", opacity: 1 }}
            exit={{ width: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center bg-white/10 rounded-full border border-white/20 px-3 h-10 overflow-hidden"
          >
            <Search01Icon size={20} strokeWidth={1.5} className="text-soft-sand shrink-0" />
            <form onSubmit={handleSearchSubmit} className="flex-1 ml-2">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-full bg-transparent text-white placeholder-soft-sand/70 focus:outline-none text-sm font-century-gothic"
              />
            </form>
            <button
              onClick={handleClose}
              className="text-soft-sand hover:text-white p-1 shrink-0 transition-colors"
            >
              <Cancel01Icon size={18} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+16px)] right-0 w-[350px] md:w-[450px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col z-50 font-century-gothic"
          >
            <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
              {!query.trim() ? (
                <div className="p-4 space-y-6">
                  {history.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-secondary-text uppercase tracking-wider mb-3 px-2">Недавние запросы</h4>
                      <ul className="space-y-1">
                        {history.map((item, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => {
                                setQuery(item);
                                inputRef.current?.focus();
                              }}
                              className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-soft-sand transition-colors text-left group"
                            >
                              <div className="flex items-center gap-3 text-primary-text text-sm">
                                <Time02Icon size={18} className="text-secondary-text" strokeWidth={1.5} />
                                <span>{item}</span>
                              </div>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSearch(item);
                                }}
                                className="p-1 text-secondary-text hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Cancel01Icon size={16} strokeWidth={1.5} />
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-semibold text-secondary-text uppercase tracking-wider mb-3 px-2">Популярные отели</h4>
                    <div className="space-y-1">
                      {suggestedHotels.map(hotel => (
                        <button
                          key={hotel.id}
                          onClick={() => handleItemClick('/hotels', hotel.name)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-soft-sand transition-colors text-left group"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                            <Image src={hotel.imageUrl} width={40} height={40} alt={hotel.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-primary-text truncate">{hotel.name}</div>
                            <div className="text-xs text-secondary-text truncate">{hotel.location}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  {searchResults.pages.length === 0 && searchResults.hotels.length === 0 ? (
                    <div className="p-8 text-center text-secondary-text text-sm">
                      Ничего не найдено по запросу «{query}»
                    </div>
                  ) : (
                    <>
                      {searchResults.pages.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-xs font-semibold text-secondary-text uppercase tracking-wider mb-2 px-3 pt-2">Страницы</h4>
                          <div className="space-y-1">
                            {searchResults.pages.map(page => (
                              <button
                                key={page.id}
                                onClick={() => handleItemClick(page.link, page.name)}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-soft-sand transition-colors text-left"
                              >
                                <Link01Icon size={18} className="text-secondary-text shrink-0" strokeWidth={1.5} />
                                <span className="text-sm font-medium text-primary-text flex-1">{page.name}</span>
                                <ArrowRight01Icon size={16} className="text-secondary-text" strokeWidth={1.5} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {searchResults.hotels.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-secondary-text uppercase tracking-wider mb-2 px-3 pt-2">Отели</h4>
                          <div className="space-y-1">
                            {searchResults.hotels.map(hotel => (
                              <button
                                key={hotel.id}
                                onClick={() => handleItemClick('/hotels', hotel.name)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-soft-sand transition-colors text-left"
                              >
                                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                  <Image src={hotel.imageUrl} width={40} height={40} alt={hotel.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-primary-text truncate">{hotel.name}</div>
                                  <div className="text-xs text-secondary-text truncate">{hotel.location}</div>
                                </div>
                                <Building04Icon size={16} className="text-secondary-text shrink-0" strokeWidth={1.5} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {query.trim() && (
               <div className="p-3 bg-soft-sand/50 border-t border-gray-100 mt-auto">
                 <button
                  onClick={handleSearchSubmit}
                  className="w-full py-2.5 text-sm font-medium text-evergreen-forest hover:bg-evergreen-forest/10 rounded-xl transition-colors"
                 >
                   Смотреть все результаты
                 </button>
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
