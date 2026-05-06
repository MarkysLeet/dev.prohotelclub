import { createClient } from './supabase-browser';
import { Hotel } from './mock-data';
import { HotelDetailData } from './hotel-mock-data';

export interface Comment {
  id: string;
  hotelSlug: string;
  authorId: string;
  authorName: string;
  role: string;
  date: string;
  text: string;
  likesCount: number;
  likedBy: string[];
  parentId?: string;
  replies?: Comment[];
}

export type NotificationType = 'like' | 'reply' | 'review_approved' | 'review_rejected' | 'new_comment' | 'hotel_update';

export interface Notification {
  id: string;
  userId: string;
  actorId: string;
  actorName: string;
  type: NotificationType;
  commentId: string;
  isRead: boolean;
  createdAt: string;
  hotelSlug?: string;
}


export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string | null;
  publishedAt: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  isAdmin: boolean;
  hasActiveSubscription: boolean;
  subscriptionEndsAt: string | null;
  createdAt: string;
}

export interface ReviewRequest {
  id: string;
  hotelId: string;
  hotelName: string;
  userId: string;
  userName: string;
  date: string;
  status: 'pending' | 'reviewed' | 'rejected';
  reason?: string;
  adminReply?: string;
  scheduledDate?: string;
}

export const api = {
  // Helper to retry failed async operations
  _fetchWithRetry: async <T>(operation: () => Promise<T>, retries = 3, delay = 500): Promise<T> => {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0) {
        console.warn(`Operation failed, retrying in ${delay}ms... (${retries} retries left)`, error);
        await new Promise(resolve => setTimeout(resolve, delay));
        return api._fetchWithRetry(operation, retries - 1, delay * 1.5);
      }
      throw error;
    }
  },


  // --- Отели ---

  // --- Новости ---
  getNews: async (): Promise<NewsItem[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((n: any) => ({
      id: n.id,
      title: n.title,
      content: n.content,
      category: n.category,
      imageUrl: n.image_url,
      publishedAt: n.published_at,
      createdAt: n.created_at
    }));
  },

  getAdminNews: async (): Promise<NewsItem[]> => {
    return api._fetchWithRetry(async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin news:', error);
        throw error;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.map((n: any) => ({
        id: n.id,
        title: n.title,
        content: n.content,
        category: n.category,
        imageUrl: n.image_url,
        publishedAt: n.published_at,
        createdAt: n.created_at
      }));
    });
  },

  saveNews: async (news: Partial<NewsItem>): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('news').upsert({
      id: news.id,
      title: news.title,
      content: news.content,
      category: news.category,
      image_url: news.imageUrl,
      published_at: news.publishedAt,
    });

    if (error) console.error('Error saving news:', error);
  },

  deleteNews: async (newsId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('news').delete().eq('id', newsId);
    if (error) console.error('Error deleting news:', error);
  },

  getHotels: async (): Promise<Hotel[]> => {
    return api._fetchWithRetry(async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('hotels').select('*');
      if (error) {
        console.error('Error fetching hotels:', error);
        throw error;
      }
      return data.map(h => ({
        id: h.id,
        name: h.name,
        location: h.location,
        tags: h.tags || [],
        description: h.description,
        imageUrl: h.image_url,
        link: h.link,
      }));
    });
  },

  saveHotel: async (hotel: Hotel): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('hotels').upsert({
      id: hotel.id,
      name: hotel.name,
      location: hotel.location,
      tags: hotel.tags,
      description: hotel.description,
      image_url: hotel.imageUrl,
      link: hotel.link,
    });
    if (error) console.error('Error saving hotel:', error);
  },

  // --- Детали Отеля ---

  deleteHotel: async (hotelId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('hotels').delete().eq('id', hotelId);
    if (error) console.error('Error deleting hotel:', error);
  },

  getHotelDetailBySlug: async (slug: string): Promise<HotelDetailData | null> => {
    return api._fetchWithRetry(async () => {
      const supabase = createClient();
      const { data: detailData, error: detailError } = await supabase
        .from('hotel_details')
        .select('*')
        .eq('slug', slug)
        .single();

      if (detailError) {
         if (detailError.code !== 'PGRST116') {
             console.error('Error fetching hotel detail:', detailError);
             throw detailError;
         }
         return null;
      }

      const { data: sectionsData, error: sectionsError } = await supabase
        .from('hotel_sections')
        .select('*')
        .eq('hotel_slug', slug)
        .order('order_index', { ascending: true });

      if (sectionsError) {
        console.error('Error fetching hotel sections:', sectionsError);
        throw sectionsError;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sections = sectionsData?.map((s: any) => ({
        id: s.id,
        title: s.title,
        content: s.content,
        mediaCount: s.media_count,
        isPaywalled: s.is_paywalled,
        icon: s.icon
      }));

      return {
        slug: detailData.slug,
        name: detailData.name,
        location: detailData.location,
        shootingDate: detailData.shooting_date,
        heroImage: detailData.hero_image,
        videoTourUrl: detailData.video_tour_url || undefined,
        description: detailData.description,
        distanceToAirport: detailData.distance_to_airport,
        distanceToCity: detailData.distance_to_city,
        googleRating: detailData.google_rating,
        buildYear: detailData.build_year,
        mealPlan: detailData.meal_plan,
        pdfReportUrl: detailData.pdf_report_url || undefined,
        videoReviewUrl: detailData.video_review_url || undefined,
        sections: sections || []
      };
    });
  },
  saveHotelDetail: async (detail: HotelDetailData): Promise<void> => {
    const supabase = createClient();

    // Delete sections that are no longer present
    if (detail.sections && detail.sections.length > 0) {
      const sectionIds = detail.sections.map(s => s.id);
      const { error: deleteError } = await supabase
        .from('hotel_sections')
        .delete()
        .eq('hotel_slug', detail.slug)
        .not('id', 'in', `(${sectionIds.join(',')})`);
      if (deleteError) {
        console.error('Error deleting removed sections:', deleteError);
      }
    } else {
      // If no sections, delete all for this hotel
      const { error: deleteError } = await supabase
        .from('hotel_sections')
        .delete()
        .eq('hotel_slug', detail.slug);
      if (deleteError) {
        console.error('Error deleting all sections:', deleteError);
      }
    }

    const { error: detailError } = await supabase.from('hotel_details').upsert({

      slug: detail.slug,
      name: detail.name,
      location: detail.location,
      shooting_date: detail.shootingDate,
      hero_image: detail.heroImage,
      stars: detail.stars,
      distance_to_sea: detail.distanceToSea,
      distance_to_city: detail.distanceToCity,
      google_rating: detail.googleRating,
      build_year: detail.buildYear,
      meal_plan: detail.mealPlan,
    });

    if (detailError) {
      console.error('Error saving hotel detail:', detailError);
      return;
    }

    // Save sections
    for (let i = 0; i < detail.sections.length; i++) {
      const section = detail.sections[i];
      const { error: sectionError } = await supabase.from('hotel_sections').upsert({
        id: section.id,
        hotel_slug: detail.slug,
        title: section.title,
        content: section.content,
        media_count: section.mediaCount,
        is_paywalled: section.isPaywalled || false,
        icon: section.icon,
        order_index: i
      });
      if (sectionError) console.error('Error saving section:', sectionError);
    }
  },

  // --- Комментарии ---
  getComments: async (hotelSlug: string): Promise<Comment[]> => {
    const supabase = createClient();

    // Получаем сами комментарии
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('hotel_slug', hotelSlug)
      .order('created_at', { ascending: false });

    if (commentsError) {
      console.error('Error fetching comments:', commentsError);
      return [];
    }

    if (!comments || comments.length === 0) return [];

    // Получаем авторов
    const authorIds = [...new Set(comments.map(c => c.author_id))];
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, name, is_admin')
      .in('id', authorIds);

    const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);

    // Получаем лайки
    const commentIds = comments.map(c => c.id);
    const { data: likesData } = await supabase
      .from('comment_likes')
      .select('*')
      .in('comment_id', commentIds);

    const likesMap = new Map();
    likesData?.forEach(like => {
      if (!likesMap.has(like.comment_id)) likesMap.set(like.comment_id, []);
      likesMap.get(like.comment_id).push(like.user_id);
    });

    const allComments: Comment[] = comments.map(c => {
      const profile = profilesMap.get(c.author_id);
      const likedBy = likesMap.get(c.id) || [];
      return {
        id: c.id,
        hotelSlug: c.hotel_slug,
        authorId: c.author_id,
        authorName: profile?.name || 'Unknown',
        role: profile?.is_admin ? 'Администратор' : 'Турагент',
        date: new Date(c.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        text: c.text,
        likesCount: likedBy.length,
        likedBy,
        parentId: c.parent_id || undefined,
        replies: []
      };
    });

    // Build tree
    const rootComments = allComments.filter(c => !c.parentId);
    const replies = allComments.filter(c => c.parentId);

    // Reverse root comments for older at the bottom (they were descending but we want newer at top)
    // Actually they are already descending

    replies.forEach(reply => {
      // Find parent
      const parent = rootComments.find(p => p.id === reply.parentId);
      if (parent) {
        parent.replies!.push(reply);
      }
    });

    // Sort replies from oldest to newest
    rootComments.forEach(root => {
       if (root.replies) {
           root.replies.reverse(); // Since it came descending, we reverse to get chronological
       }
    });

    return rootComments;
  },


  deleteComment: async (commentId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('comments').delete().eq('id', commentId);
    if (error) console.error('Error deleting comment:', error);
  },


  addComment: async (hotelSlug: string, text: string, userId: string, parentId?: string): Promise<void> => {
    const supabase = createClient();
    const { data: newComment, error } = await supabase.from('comments').insert({
      hotel_slug: hotelSlug,
      author_id: userId,
      text: text,
      parent_id: parentId
    }).select().single();

    if (error) {
      console.error('Error adding comment:', error);
      return;
    }

    if (newComment) {
      if (parentId) {
        // Notify parent comment author
        const { data: parentComment } = await supabase.from('comments').select('author_id').eq('id', parentId).single();
        if (parentComment && parentComment.author_id !== userId) {
          const { data: parentProfile } = await supabase.from('profiles').select('notify_replies').eq('id', parentComment.author_id).single();

          if (parentProfile?.notify_replies) {
            await supabase.from('notifications').insert({
              user_id: parentComment.author_id,
              actor_id: userId,
              type: 'reply',
              comment_id: newComment.id
            });
          }
        }
      } else {
        // Notify all subscribers of this hotel
        const { data: subscribers } = await supabase
          .from('hotel_subscriptions')
          .select('user_id')
          .eq('hotel_slug', hotelSlug)
          .neq('user_id', userId);

        if (subscribers && subscribers.length > 0) {
          const notifications = subscribers.map(sub => ({
            user_id: sub.user_id,
            actor_id: userId,
            type: 'new_comment',
            comment_id: newComment.id,
            hotel_slug: hotelSlug // this is important for linking
          }));

          await supabase.from('notifications').insert(notifications);
        }
      }
    }
  },

  toggleLike: async (commentId: string, userId: string): Promise<void> => {
    const supabase = createClient();

    // Check if liked
    const { data } = await supabase
      .from('comment_likes')
      .select('*')
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .single();

    if (data) {
      // Unlike
      await supabase
        .from('comment_likes')
        .delete()
        .eq('comment_id', commentId)
        .eq('user_id', userId);
    } else {
      // Like
      await supabase
        .from('comment_likes')
        .insert({
          comment_id: commentId,
          user_id: userId
        });

      // Notify author of comment
      const { data: comment } = await supabase.from('comments').select('author_id').eq('id', commentId).single();

      if (comment && comment.author_id !== userId) {
         const { data: authorProfile } = await supabase.from('profiles').select('notify_likes').eq('id', comment.author_id).single();

         if (authorProfile?.notify_likes) {
           await supabase.from('notifications').insert({
             user_id: comment.author_id,
             actor_id: userId,
             type: 'like',
             comment_id: commentId
           });
         }
      }
    }
  },


  // --- Уведомления ---
  getNotifications: async (userId: string): Promise<Notification[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        id,
        user_id,
        actor_id,
        type,
        comment_id,
        is_read,
        created_at,
        profiles!actor_id (name),
        comments (hotel_slug)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((n: any) => ({
      id: n.id,
      userId: n.user_id,
      actorId: n.actor_id,
      actorName: n.profiles?.name || 'Пользователь',
      type: n.type as NotificationType,
      commentId: n.comment_id,
      isRead: n.is_read,
      createdAt: n.created_at,
      hotelSlug: n.comments?.hotel_slug
    }));
  },

  markNotificationsAsRead: async (userId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) console.error('Error marking notifications as read:', error);
  },



  updateProfileData: async (userId: string, name: string, company: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update({ name, company })
      .eq('id', userId);

    if (error) console.error('Error updating profile data:', error);
  },

  updateProfileName: async (userId: string, name: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update({ name })
      .eq('id', userId);

    if (error) console.error('Error updating profile name:', error);
  },

  deleteAccount: async (): Promise<{error: unknown}> => {
    const supabase = createClient();
    const { error } = await supabase.rpc('delete_user');
    return { error };
  },

  updateProfileSettings: async (userId: string, notifyLikes: boolean, notifyReplies: boolean, notifyEmailUpdates: boolean, notifyMarketing: boolean): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update({
        notify_likes: notifyLikes,
        notify_replies: notifyReplies,
        notify_email_updates: notifyEmailUpdates,
        notify_marketing: notifyMarketing
      })
      .eq('id', userId);

    if (error) console.error('Error updating profile settings:', error);
  },


  // --- Подписки на отель ---
  subscribeToHotel: async (hotelSlug: string, userId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('hotel_subscriptions').insert({
      hotel_slug: hotelSlug,
      user_id: userId
    });
    if (error) console.error('Error subscribing to hotel:', error);
  },

  unsubscribeFromHotel: async (hotelSlug: string, userId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase
      .from('hotel_subscriptions')
      .delete()
      .eq('hotel_slug', hotelSlug)
      .eq('user_id', userId);
    if (error) console.error('Error unsubscribing from hotel:', error);
  },

  checkHotelSubscription: async (hotelSlug: string, userId: string): Promise<boolean> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('hotel_subscriptions')
      .select('id')
      .eq('hotel_slug', hotelSlug)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking hotel subscription:', error);
      return false;
    }
    return !!data;
  },

  // --- Запросы на обзор ---

  // --- Пользователи (Admin) ---
  getAllProfiles: async (): Promise<UserProfile[]> => {
    return api._fetchWithRetry(async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all profiles:', error);
        throw error;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.map((p: any) => ({
        id: p.id,
        name: p.name || '',
        email: p.email || '',
        company: p.company || '',
        isAdmin: p.is_admin,
        hasActiveSubscription: p.has_active_subscription,
        subscriptionEndsAt: p.subscription_ends_at,
        createdAt: p.created_at
      }));
    });
  },

  updateUserProfileAsAdmin: async (userId: string, data: Partial<UserProfile>): Promise<void> => {
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: any = {};
    if (data.name !== undefined) updates.name = data.name;
    if (data.company !== undefined) updates.company = data.company;
    if (data.isAdmin !== undefined) updates.is_admin = data.isAdmin;
    if (data.hasActiveSubscription !== undefined) updates.has_active_subscription = data.hasActiveSubscription;
    if (data.subscriptionEndsAt !== undefined) updates.subscription_ends_at = data.subscriptionEndsAt;

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) console.error('Error updating user profile:', error);
  },

  deleteUserAsAdmin: async (userId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.rpc('admin_delete_user', { target_user_id: userId });
    if (error) console.error('Error deleting user as admin:', error);
  },

  getReviewRequests: async (): Promise<ReviewRequest[]> => {
    return api._fetchWithRetry(async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('review_requests')
        .select(`
          *,
          profiles (name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching review requests:', error);
        throw error;
      }

      return data.map(r => ({
        id: r.id,
        hotelId: r.hotel_id,
        hotelName: r.hotel_name,
        userId: r.user_id,
        userName: r.profiles?.name || 'Unknown',
        date: new Date(r.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: r.status as 'pending' | 'reviewed' | 'rejected',
        reason: r.reason,
        adminReply: r.admin_reply,
        scheduledDate: r.scheduled_date ? new Date(r.scheduled_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : undefined
      }));
    });
  },

  addReviewRequest: async (hotelId: string, hotelName: string, userId: string, reason: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('review_requests').insert({
      hotel_id: hotelId,
      hotel_name: hotelName,
      user_id: userId,
      status: 'pending',
      reason: reason
    });
    if (error) console.error('Error adding review request:', error);
  },

  updateReviewRequestStatus: async (requestId: string, status: 'pending' | 'reviewed' | 'rejected', adminReply?: string, scheduledDate?: string): Promise<void> => {
    const supabase = createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: any = { status };
    if (adminReply !== undefined) updates.admin_reply = adminReply;
    if (scheduledDate !== undefined) updates.scheduled_date = scheduledDate;

    const { error, data } = await supabase
      .from('review_requests')
      .update(updates)
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      console.error('Error updating review request status:', error);
      return;
    }

    if (data && status !== 'pending') {
      const type = status === 'reviewed' ? 'review_approved' : 'review_rejected';
      const actorId = (await supabase.auth.getUser()).data.user?.id;

      if (actorId && actorId !== data.user_id) {
        await supabase.from('notifications').insert({
          user_id: data.user_id,
          actor_id: actorId,
          type: type,
          hotel_slug: data.hotel_id // We use hotel_id as slug in this context often
        });
      }
    }
  },


  // --- Подписки ---
  updateSubscription: async (userId: string, months: number): Promise<{success: boolean, error?: unknown}> => {
    const supabase = createClient();

    // Используем RPC функцию для обхода RLS ограничений
    const { error } = await supabase.rpc('update_user_subscription', {
      user_id: userId,
      months: months
    });

    if (error) {
      console.error('Error updating subscription from RPC:', error);

      // Fallback try to update table directly just in case RPC fails because of some permissions issue
      const { data: profile } = await supabase.from('profiles').select('subscription_ends_at').eq('id', userId).single();
      let newEndDate = new Date();
      if (profile?.subscription_ends_at) {
        const currentEnd = new Date(profile.subscription_ends_at);
        if (currentEnd > newEndDate) newEndDate = currentEnd;
      }
      newEndDate.setMonth(newEndDate.getMonth() + months);

      const { error: updateError } = await supabase.from('profiles').update({
        has_active_subscription: true,
        subscription_ends_at: newEndDate.toISOString()
      }).eq('id', userId);

      if (updateError) {
        console.error('Error updating subscription via table update:', updateError);
        return { success: false, error: updateError };
      }
    }

    return { success: true };
  },

  // --- Покупки отелей ---
  buyHotelAccess: async (hotelSlug: string, userId: string, amount: number = 250): Promise<{success: boolean, error?: unknown}> => {
    const supabase = createClient();
    const { error } = await supabase.from('hotel_purchases').insert({
      user_id: userId,
      hotel_slug: hotelSlug,
      amount: amount
    });

    if (error) {
      console.error('Error buying hotel access:', error);
      return { success: false, error };
    }
    return { success: true };
  },

  checkHotelAccess: async (hotelSlug: string, userId: string): Promise<boolean> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('hotel_purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('hotel_slug', hotelSlug)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking hotel access:', error);
      return false;
    }

    return !!data;
  }
};
