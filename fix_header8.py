import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# Add missing handlers
methods_to_add = """  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    let mounted = true;
    if (isAuth && user) {
      api.getNotifications(user.id).then(data => {
        if (mounted) setNotifications(data);
      });
    }
    return () => { mounted = false; };
  }, [isAuth, user]);

  const handleNotifClick = async () => {
    if (!isNotifOpen && unreadCount > 0 && user) {
      await api.markNotificationsAsRead(user.id);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    }
    setIsNotifOpen(!isNotifOpen);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutsideNotif(event: MouseEvent) {
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideNotif);
    return () => document.removeEventListener("mousedown", handleClickOutsideNotif);
  }, []);

  const currentPageInfo = React.useMemo(() => {"""

content = content.replace("  const unreadCount = notifications.filter(n => !n.isRead).length;\n\n  const currentPageInfo = React.useMemo(() => {", methods_to_add)

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
