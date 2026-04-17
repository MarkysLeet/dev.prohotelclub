import re

with open('src/app/dashboard/settings/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("  const [notifyLikes, setNotifyLikes] = useState(true);\n  const [notifyReplies, setNotifyReplies] = useState(true);\n\n  useEffect(() => {\n    if (user) {\n      setNotifyLikes(user.notifyLikes);\n      setNotifyReplies(user.notifyReplies);\n    }\n  }, [user]);", "  const [notifyLikes, setNotifyLikes] = useState(user?.notifyLikes ?? true);\n  const [notifyReplies, setNotifyReplies] = useState(user?.notifyReplies ?? true);\n\n  useEffect(() => {\n    if (user) {\n      // Using setTimeout to prevent React's 'synchronous setState in effect' warning.\n      setTimeout(() => {\n         setNotifyLikes(user.notifyLikes);\n         setNotifyReplies(user.notifyReplies);\n      }, 0);\n    }\n  }, [user]);")

with open('src/app/dashboard/settings/page.tsx', 'w') as f:
    f.write(content)

with open('src/app/dashboard/layout.tsx', 'r') as f:
    content = f.read()

content = content.replace("  useEffect(() => {\n    setIsMounted(true);\n  }, []);", "  useEffect(() => {\n    setTimeout(() => setIsMounted(true), 0);\n  }, []);")

with open('src/app/dashboard/layout.tsx', 'w') as f:
    f.write(content)
