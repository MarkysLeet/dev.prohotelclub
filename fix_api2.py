import re

with open('src/lib/api.ts', 'r') as f:
    content = f.read()

get_comments_old = """    const allComments = comments.map(c => ({
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
    }));"""

get_comments_new = """    const allComments: Comment[] = comments.map(c => ({
      id: c.id,
      hotelSlug: c.hotel_slug,
      authorId: c.author_id,
      authorName: c.profiles?.name || 'Unknown',
      role: c.profiles?.is_admin ? 'Администратор' : 'Турагент',
      date: new Date(c.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      text: c.text,
      likesCount: c.comment_likes?.length || 0,
      likedBy: c.comment_likes?.map((l: { user_id: string }) => l.user_id) || [],
      parentId: c.parent_id || undefined,
      replies: []
    }));"""

content = content.replace(get_comments_old, get_comments_new)

with open('src/lib/api.ts', 'w') as f:
    f.write(content)
