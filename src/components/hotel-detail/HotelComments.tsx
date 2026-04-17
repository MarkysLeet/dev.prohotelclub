"use client";

import React, { useState, useEffect } from 'react';
import { UserCircleIcon, SentIcon, FavouriteIcon } from 'hugeicons-react';
import { api, Comment } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/Toast';

interface HotelCommentsProps {
  hotelSlug: string;
}

export function HotelComments({ hotelSlug }: HotelCommentsProps) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    async function fetchComments() {
      const data = await api.getComments(hotelSlug);
      if (mounted) setComments(data);
    }
    fetchComments();
    return () => { mounted = false; };
  }, [hotelSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast('Необходимо авторизоваться для добавления комментариев', { type: 'error' });
      return;
    }

    if (commentText.trim()) {
      await api.addComment(hotelSlug, commentText.trim(), user.id);
      const updatedComments = await api.getComments(hotelSlug);
      setComments(updatedComments);
      setCommentText('');
      toast('Комментарий успешно добавлен', { type: 'success' });
    }
  };

  const handleLike = async (commentId: string) => {
    if (!user) {
      toast('Необходимо авторизоваться для оценки комментариев', { type: 'error' });
      return;
    }
    await api.toggleLike(commentId, user.id);
    const updatedComments = await api.getComments(hotelSlug);
    setComments(updatedComments);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 border-t border-gray-200/50 pt-16 mb-16">
      <h3 className="font-moniqa text-4xl text-primary-text mb-8">Комментарии коллег</h3>

      {/* Форма добавления комментария */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-12 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-evergreen-forest/10 flex items-center justify-center shrink-0">
            <UserCircleIcon size={24} className="text-evergreen-forest" />
          </div>
          <div className="flex-1 relative">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Оставьте свой комментарий или заметку об отеле..."
              className="w-full bg-white border border-gray-200 rounded-2xl p-4 pr-14 text-primary-text font-century-gothic text-base min-h-[100px] resize-none focus:outline-none focus:border-evergreen-forest focus:ring-1 focus:ring-evergreen-forest transition-all"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="absolute bottom-4 right-4 w-10 h-10 bg-evergreen-forest text-soft-sand rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-evergreen-hover transition-colors"
            >
              <SentIcon size={20} />
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-12 p-6 bg-white border border-gray-100 rounded-2xl text-center">
          <p className="font-century-gothic text-secondary-text mb-4">
            Пожалуйста, авторизуйтесь, чтобы оставлять комментарии
          </p>
        </div>
      )}

      {/* Список комментариев */}
      <div className="space-y-8">
        {comments.length === 0 ? (
          <p className="text-secondary-text text-center italic">Пока нет комментариев. Будьте первым!</p>
        ) : (
          comments.map((item) => {
            const hasLiked = user ? item.likedBy.includes(user.id) : false;

            return (
              <div key={item.id} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                  <UserCircleIcon size={24} className="text-secondary-text" />
                </div>
                <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-century-gothic font-bold text-primary-text">{item.authorName}</h4>
                      <p className="font-century-gothic text-xs text-evergreen-forest mt-0.5">{item.role}</p>
                    </div>
                    <span className="font-century-gothic text-xs text-secondary-text">{item.date}</span>
                  </div>
                  <p className="font-century-gothic text-sm leading-relaxed text-secondary-text mb-4">
                    {item.text}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(item.id)}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${hasLiked ? 'text-red-500' : 'text-secondary-text hover:text-red-500'}`}
                    >
                      <FavouriteIcon 
                        size={16} 
                        className={hasLiked ? "fill-red-500 text-red-500" : ""} 
                      />
                      <span>{item.likesCount > 0 ? item.likesCount : 'Нравится'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
