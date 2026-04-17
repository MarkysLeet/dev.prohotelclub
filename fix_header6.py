import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# Make sure Notification is properly imported
if "import { api, Notification } from '@/lib/api';" not in content:
    content = content.replace("import { api } from '@/lib/api';", "import { api, Notification } from '@/lib/api';")

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
