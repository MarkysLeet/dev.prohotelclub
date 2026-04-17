import re

with open('src/lib/api.ts', 'r') as f:
    content = f.read()

content = content.replace("data.map((n: { id: string; user_id: string; actor_id: string; profiles?: { name?: string }; type: string; comment_id: string; is_read: boolean; created_at: string; comments?: { hotel_slug?: string } }) => ({", "data.map((n: any) => ({")

with open('src/lib/api.ts', 'w') as f:
    f.write(content)
