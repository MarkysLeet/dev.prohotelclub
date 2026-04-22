"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api, NewsItem } from '@/lib/api';
import Image from 'next/image';
import { LoadingSpinner } from "@/components/ui";

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadNews() {
      const data = await api.getNews();
      if (mounted) {
        setNews(data);
        setIsLoading(false);
      }
    }
    loadNews();
    return () => { mounted = false; };
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-[35px]">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-[35px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="font-moniqa text-5xl md:text-7xl text-primary-text mb-4">
            Последние новости
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto">
            Будьте в курсе последних событий и обновлений в мире ProHotelClub
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-soft-sand rounded-2xl overflow-hidden shadow-sm flex flex-col"
            >
              {item.imageUrl && (
                <div className="relative aspect-video w-full bg-gray-200">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-xs text-secondary-text mb-2 block">{item.date}</span>
                <h3 className="font-century-gothic font-bold text-xl text-primary-text mb-3">{item.title}</h3>
                <p className="text-sm text-secondary-text line-clamp-4">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
