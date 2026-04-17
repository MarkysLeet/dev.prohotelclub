import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# I messed up my state substitution. Let's fix it properly.
old_lines = """  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {"""

if "const notifDropdownRef" not in content:
   # it's missing, let's insert it right after dropdownRef
   content = content.replace("const dropdownRef = useRef<HTMLDivElement>(null);", "const dropdownRef = useRef<HTMLDivElement>(null);\n  const notifDropdownRef = useRef<HTMLDivElement>(null);\n  const [isNotifOpen, setIsNotifOpen] = useState(false);\n  const [notifications, setNotifications] = useState<Notification[]>([]);\n  const unreadCount = notifications.filter(n => !n.isRead).length;")

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
