
"use client";

import React, { useState, useEffect } from 'react';
import { UserCircleIcon, SentIcon, FavouriteIcon, MessageMultiple02Icon } from 'hugeicons-react';
import { api, Comment } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from '@/components/ui/Toast';

interface HotelCommentsProps {
  hotelSlug: string;
}

export function HotelComments({ hotelSlug }: HotelCommentsProps) {
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [visibleReplies, setVisibleReplies] = useState<{ [key: string]: number }>({});
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

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!user) {
      toast('Необходимо авторизоваться для добавления комментариев', { type: 'error' });
      return;
    }

    const text = parentId ? replyText.trim() : commentText.trim();

    if (text) {
      await api.addComment(hotelSlug, text, user.id, parentId);
      const updatedComments = await api.getComments(hotelSlug);
      setComments(updatedComments);

      if (parentId) {
        setReplyText('');
        setReplyingTo(null);
        toast('Ответ успешно добавлен', { type: 'success' });
      } else {
        setCommentText('');
        toast('Комментарий успешно добавлен', { type: 'success' });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, parentId?: string) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent, parentId);
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

  const renderComment = (item: Comment, isReply: boolean = false) => {
    const hasLiked = user ? item.likedBy.includes(user.id) : false;

    const repliesLimit = visibleReplies[item.id] || 1;
    const hasMoreReplies = item.replies && item.replies.length > repliesLimit;
    const visibleRepliesList = item.replies ? item.replies.slice(0, repliesLimit) : [];

    const handleLoadMoreReplies = () => {
      setVisibleReplies(prev => ({
        ...prev,
        [item.id]: (prev[item.id] || 1) + 5
      }));
    };

    return (
      <div key={item.id} className={`flex gap-3 items-start ${isReply ? 'mt-4 ml-6 sm:ml-8 border-l-2 border-gray-100 pl-3 sm:pl-4' : ''}`}>
        <div className={`rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm ${isReply ? 'w-8 h-8' : 'w-10 h-10'}`}>
          <UserCircleIcon size={isReply ? 18 : 20} className="text-secondary-text" />
        </div>
        <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-century-gothic font-bold text-primary-text">{item.authorName}</h4>
              <p className="font-century-gothic text-[10px] text-evergreen-forest mt-0.5">{item.role}</p>
            </div>
            <span className="font-century-gothic text-xs text-secondary-text">{item.date}</span>
          </div>
          <p className="font-century-gothic text-sm leading-relaxed text-secondary-text mb-3">
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

            {!isReply && user && (
              <button
                onClick={() => setReplyingTo(replyingTo === item.id ? null : item.id)}
                className="flex items-center gap-1.5 text-xs font-medium text-secondary-text hover:text-evergreen-forest transition-colors"
              >
                <MessageMultiple02Icon size={16} />
                <span>Ответить</span>
              </button>
            )}
          </div>

          {/* Reply Form */}
          {replyingTo === item.id && (
             <form onSubmit={(e) => handleSubmit(e, item.id)} className="mt-6 flex gap-3 items-start border-t border-gray-100 pt-6">
                <div className="w-8 h-8 rounded-full bg-evergreen-forest/10 flex items-center justify-center shrink-0">
                  <UserCircleIcon size={16} className="text-evergreen-forest" />
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    placeholder="Напишите ответ..."
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 pr-12 text-primary-text font-century-gothic text-sm min-h-[80px] resize-none focus:outline-none focus:border-evergreen-forest focus:ring-1 focus:ring-evergreen-forest transition-all"
                    autoFocus
                  />
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => { setReplyingTo(null); setReplyText(''); }}
                      className="text-xs text-secondary-text hover:text-primary-text px-2 py-1"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="w-8 h-8 bg-evergreen-forest text-soft-sand rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-evergreen-hover transition-colors"
                    >
                      <SentIcon size={16} />
                    </button>
                  </div>
                </div>
             </form>
          )}

          {/* Render Replies */}
          {visibleRepliesList.length > 0 && (
            <div className="mt-2 space-y-3">
              {visibleRepliesList.map(reply => renderComment(reply, true))}
            </div>
          )}

          {/* Load More Replies Button */}
          {hasMoreReplies && (
            <button
              onClick={handleLoadMoreReplies}
              className="mt-4 text-xs font-medium text-evergreen-forest hover:text-evergreen-hover transition-colors flex items-center gap-1"
            >
              Показать остальные ответы ({item.replies!.length - repliesLimit})
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 border-t border-gray-200/50 pt-16 mb-16">
      <h3 className="font-moniqa text-4xl text-primary-text mb-8">Комментарии коллег</h3>

      {/* Форма добавления комментария */}
      {user ? (
        <form onSubmit={(e) => handleSubmit(e)} className="mb-12 flex gap-3 items-start">
          <div className="w-10 h-10 rounded-full bg-evergreen-forest/10 flex items-center justify-center shrink-0">
            <UserCircleIcon size={24} className="text-evergreen-forest" />
          </div>
          <div className="flex-1 relative">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="Оставьте свой комментарий или заметку об отеле..."
              className="w-full bg-white border border-gray-200 rounded-xl p-4 pr-14 text-primary-text font-century-gothic text-base min-h-[100px] resize-none focus:outline-none focus:border-evergreen-forest focus:ring-1 focus:ring-evergreen-forest transition-all"
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
        <div className="mb-12 p-6 bg-white border border-gray-100 rounded-xl text-center">
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
          comments.map((item) => renderComment(item, false))
        )}
      </div>
    </div>
  );
}
