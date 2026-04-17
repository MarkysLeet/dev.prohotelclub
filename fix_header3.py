import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# Add Notification icon import
import_old = "import { UserIcon, Menu01Icon, Home03Icon, Building04Icon, FavouriteIcon, Logout01Icon, Login03Icon, Search01Icon } from 'hugeicons-react';"
import_new = "import { UserIcon, Menu01Icon, Home03Icon, Building04Icon, FavouriteIcon, Logout01Icon, Login03Icon, Search01Icon, Notification01Icon } from 'hugeicons-react';"
content = content.replace(import_old, import_new)

# Add Notification type and hooks import
if "import { api, Notification } from '@/lib/api';" not in content:
    content = content.replace("import { useAuth } from '@/lib/AuthContext';", "import { useAuth } from '@/lib/AuthContext';\nimport { api, Notification } from '@/lib/api';")

# Add state for notifications
state_old = """  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {"""
state_new = """  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter(n => !n.isRead).length;

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
      // Mark as read in DB
      await api.markNotificationsAsRead(user.id);
      // Update locally
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    }
    setIsNotifOpen(!isNotifOpen);
    setIsDropdownOpen(false);
  };

  // Custom click outside for notifications
  useEffect(() => {
    function handleClickOutsideNotif(event: MouseEvent) {
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideNotif);
    return () => document.removeEventListener("mousedown", handleClickOutsideNotif);
  }, []);

  useEffect(() => {"""
content = content.replace(state_old, state_new)

# Add UI in Header
ui_old = """          <GlobalSearch />

          <div className="relative" ref={dropdownRef}>"""
ui_new = """          <GlobalSearch />

          {/* Notifications */}
          {isAuth && (
            <div className="relative" ref={notifDropdownRef}>
              <button
                aria-label="Уведомления"
                onClick={handleNotifClick}
                className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 relative"
              >
                <Notification01Icon size={26} strokeWidth={1.5} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute right-0 top-[calc(100%+8px)] w-80 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden py-2 z-[100] flex flex-col font-century-gothic max-h-96"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <span className="font-bold text-primary-text text-sm">Уведомления</span>
                    </div>
                    <div className="overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-secondary-text">
                          Уведомлений пока нет
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div key={notif.id} className={`px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${!notif.isRead ? 'bg-evergreen-forest/5' : ''}`}>
                            <p className="text-sm text-primary-text">
                              <span className="font-bold">{notif.actorName}</span>{' '}
                              {notif.type === 'like' ? 'оценил(а) ваш комментарий' : 'ответил(а) на ваш комментарий'}
                            </p>
                            <span className="text-xs text-secondary-text mt-1 block">
                              {new Date(notif.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {notif.hotelSlug && (
                               <Link href={`/hotels/${notif.hotelSlug}`} onClick={() => setIsNotifOpen(false)} className="text-xs text-evergreen-forest hover:underline mt-1 inline-block">
                                  К отелю
                               </Link>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="relative" ref={dropdownRef}>"""
content = content.replace(ui_old, ui_new)

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
