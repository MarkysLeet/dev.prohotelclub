import re

with open('src/lib/AuthContext.tsx', 'r') as f:
    content = f.read()

user_type_old = """export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  hasActiveSubscription: boolean;
}"""

user_type_new = """export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  hasActiveSubscription: boolean;
  notifyLikes: boolean;
  notifyReplies: boolean;
}"""

content = content.replace(user_type_old, user_type_new)

fetch_profile_old = """        setUser({
          id: data.id,
          name: data.name || 'Агент',
          email: data.email || email,
          isAdmin: data.is_admin,
          hasActiveSubscription: data.has_active_subscription
        });"""

fetch_profile_new = """        setUser({
          id: data.id,
          name: data.name || 'Агент',
          email: data.email || email,
          isAdmin: data.is_admin,
          hasActiveSubscription: data.has_active_subscription,
          notifyLikes: data.notify_likes ?? true,
          notifyReplies: data.notify_replies ?? true
        });"""

content = content.replace(fetch_profile_old, fetch_profile_new)

with open('src/lib/AuthContext.tsx', 'w') as f:
    f.write(content)
