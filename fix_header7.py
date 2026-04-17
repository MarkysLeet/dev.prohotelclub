import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# Add missing imports for Header
import_add = """import { useAuth } from "@/lib/AuthContext";
import { api, Notification } from "@/lib/api";
import { Notification01Icon } from "hugeicons-react";"""

content = content.replace('import { useAuth } from "@/lib/AuthContext";', import_add)

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
