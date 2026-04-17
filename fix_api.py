import re

with open('src/lib/api.ts', 'r') as f:
    content = f.read()

# Add Notification type and update Comment type
comment_type = """export interface Comment {
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

export type NotificationType = 'like' | 'reply';

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
}"""

content = re.sub(r'export interface Comment \{[^\}]+\}', comment_type, content, count=1)

# Modify getComments
get_comments_old = """  getComments: async (hotelSlug: string): Promise<Comment[]> => {
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
  },"""

get_comments_new = """  getComments: async (hotelSlug: string): Promise<Comment[]> => {
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

    const allComments = comments.map(c => ({
      id: c.id,
      hotelSlug: c.hotel_slug,
      authorId: c.author_id,
      authorName: c.profiles?.name || 'Unknown',
      role: c.profiles?.is_admin ? 'Администратор' : 'Турагент',
      date: new Date(c.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      text: c.text,
      likesCount: c.comment_likes?.length || 0,
      likedBy: c.comment_likes?.map((l: { user_id: string }) => l.user_id) || [],
      parentId: c.parent_id,
      replies: []
    }));

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
  },"""

content = content.replace(get_comments_old, get_comments_new)

# Modify addComment
add_comment_old = """  addComment: async (hotelSlug: string, text: string, userId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('comments').insert({
      hotel_slug: hotelSlug,
      author_id: userId,
      text: text,
    });
    if (error) console.error('Error adding comment:', error);
  },"""

add_comment_new = """  addComment: async (hotelSlug: string, text: string, userId: string, parentId?: string): Promise<void> => {
    const supabase = createClient();

    // Insert comment
    const { data: newComment, error } = await supabase.from('comments').insert({
      hotel_slug: hotelSlug,
      author_id: userId,
      text: text,
      parent_id: parentId || null
    }).select().single();

    if (error) {
      console.error('Error adding comment:', error);
      return;
    }

    // If it's a reply, create notification
    if (parentId && newComment) {
      // Get parent comment author
      const { data: parentComment } = await supabase.from('comments').select('author_id').eq('id', parentId).single();

      if (parentComment && parentComment.author_id !== userId) {
        // Check if parent author wants reply notifications
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
    }
  },"""

content = content.replace(add_comment_old, add_comment_new)

# Modify toggleLike
toggle_like_old = """  toggleLike: async (commentId: string, userId: string): Promise<void> => {
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
  },"""

toggle_like_new = """  toggleLike: async (commentId: string, userId: string): Promise<void> => {
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
  },"""

content = content.replace(toggle_like_old, toggle_like_new)

notifications_api = """
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

  updateProfileSettings: async (userId: string, notifyLikes: boolean, notifyReplies: boolean): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update({
        notify_likes: notifyLikes,
        notify_replies: notifyReplies
      })
      .eq('id', userId);

    if (error) console.error('Error updating profile settings:', error);
  },
"""

content = content.replace('// --- Запросы на обзор ---', notifications_api + '\n  // --- Запросы на обзор ---')

with open('src/lib/api.ts', 'w') as f:
    f.write(content)
