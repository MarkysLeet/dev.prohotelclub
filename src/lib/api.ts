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
}

export interface ReviewRequest {
  id: string;
  hotelId: string;
  hotelName: string;
  userId: string;
  userName: string;
  date: string;
  status: 'pending' | 'reviewed' | 'rejected';
}

export const api = {
  // --- Отели ---
  getHotels: async (): Promise<Hotel[]> => {
    const supabase = createClient();
    const { data, error } = await supabase.from('hotels').select('*');
    if (error) {
      console.error('Error fetching hotels:', error);
      return [];
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
  getHotelDetailBySlug: async (slug: string): Promise<HotelDetailData | null> => {
    const supabase = createClient();
    const { data: detailData, error: detailError } = await supabase
      .from('hotel_details')
      .select('*')
      .eq('slug', slug)
      .single();

    if (detailError) {
       if (detailError.code !== 'PGRST116') console.error('Error fetching hotel detail:', detailError);
       return null;
    }

    const { data: sectionsData, error: sectionsError } = await supabase
      .from('hotel_sections')
      .select('*')
      .eq('hotel_slug', slug)
      .order('order_index', { ascending: true });

    if (sectionsError) {
      console.error('Error fetching hotel sections:', sectionsError);
    }

    return {
      slug: detailData.slug,
      name: detailData.name,
      location: detailData.location,
      shootingDate: detailData.shooting_date,
      heroImage: detailData.hero_image,
      stars: detailData.stars,
      distanceToSea: detailData.distance_to_sea,
      distanceToCity: detailData.distance_to_city,
      googleRating: detailData.google_rating,
      buildYear: detailData.build_year,
      mealPlan: detailData.meal_plan,
      sections: (sectionsData || []).map(s => ({
        id: s.id,
        title: s.title,
        content: s.content,
        mediaCount: s.media_count,
        isPaywalled: s.is_paywalled
      }))
    };
  },

  saveHotelDetail: async (detail: HotelDetailData): Promise<void> => {
    const supabase = createClient();
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
        order_index: i
      });
      if (sectionError) console.error('Error saving section:', sectionError);
    }
  },

  // --- Комментарии ---
  getComments: async (hotelSlug: string): Promise<Comment[]> => {
    const supabase = createClient();
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select(`
        *,
        profiles (name, is_admin),
        comment_likes (user_id)
      `)
      .eq('hotel_slug', hotelSlug)
      .order('created_at', { ascending: false });

    if (commentsError) {
      console.error('Error fetching comments:', commentsError);
      return [];
    }

    return comments.map(c => ({
      id: c.id,
      hotelSlug: c.hotel_slug,
      authorId: c.author_id,
      authorName: c.profiles?.name || 'Unknown',
      role: c.profiles?.is_admin ? 'Администратор' : 'Турагент',
      date: new Date(c.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      text: c.text,
      likesCount: c.comment_likes?.length || 0,
      likedBy: c.comment_likes?.map((l: { user_id: string }) => l.user_id) || []
    }));
  },

  addComment: async (hotelSlug: string, text: string, userId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('comments').insert({
      hotel_slug: hotelSlug,
      author_id: userId,
      text: text,
    });
    if (error) console.error('Error adding comment:', error);
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
    }
  },

  // --- Запросы на обзор ---
  getReviewRequests: async (): Promise<ReviewRequest[]> => {
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
      return [];
    }

    return data.map(r => ({
      id: r.id,
      hotelId: r.hotel_id,
      hotelName: r.hotel_name,
      userId: r.user_id,
      userName: r.profiles?.name || 'Unknown',
      date: new Date(r.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: r.status as 'pending' | 'reviewed' | 'rejected'
    }));
  },

  addReviewRequest: async (hotelId: string, hotelName: string, userId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('review_requests').insert({
      hotel_id: hotelId,
      hotel_name: hotelName,
      user_id: userId,
      status: 'pending'
    });
    if (error) console.error('Error adding review request:', error);
  },

  updateReviewRequestStatus: async (requestId: string, status: 'pending' | 'reviewed' | 'rejected'): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase
      .from('review_requests')
      .update({ status })
      .eq('id', requestId);
    if (error) console.error('Error updating review request status:', error);
  }
};
