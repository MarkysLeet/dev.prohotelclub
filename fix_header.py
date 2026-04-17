import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# We need to replace the entire conflict block with our changes integrated into origin/main's new code
# origin/main added new links: "Избранное", "Настройки" and changed z-indexes from z-50 to z-[100]

# Find the conflict block
match = re.search(r'<<<<<<< HEAD(.*?)=======(.*?)>>>>>>> origin/main', content, re.DOTALL)
if match:
    # Build the correct replacement
    replacement = """
            {isLoading ? (
               <div className="w-6 h-6 border-2 border-soft-sand/30 border-t-soft-sand rounded-full animate-spin p-2 -mr-2 flex items-center justify-center"></div>
            ) : isAuth ? (
              <>
                <button
                  aria-label="Profile"
                  onClick={handleUserIconClick}
                  aria-expanded={isDropdownOpen}
                  className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -mr-2"
                >
                  <UserIcon size={26} strokeWidth={1.5} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute right-0 top-[calc(100%+8px)] w-48 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden py-2 z-[100] flex flex-col font-century-gothic"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-4 py-2 text-sm text-primary-text hover:bg-soft-sand hover:text-evergreen-forest transition-colors text-left"
                      >
                        Личный кабинет
                      </Link>
                      <Link
                        href="/dashboard/favorites"
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-4 py-2 text-sm text-primary-text hover:bg-soft-sand hover:text-evergreen-forest transition-colors text-left"
                      >
                        Избранное
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="px-4 py-2 text-sm text-primary-text hover:bg-soft-sand hover:text-evergreen-forest transition-colors text-left"
                      >
                        Настройки
                      </Link>
                      <div className="h-px bg-gray-200 my-1 mx-2" />
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logout();
                        }}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left w-full"
                      >
                        Выйти
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <>
                <button
                  aria-label="Profile"
                  onClick={handleUserIconClick}
                  aria-expanded={isDropdownOpen}
                  className="lg:hidden text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -mr-2"
                >
                  <UserIcon size={26} strokeWidth={1.5} />
                </button>
                <Link href="/auth" className="hidden lg:flex">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2 rounded-xl text-sm font-medium transition-colors"
                  >
                    Войти
                  </motion.button>
                </Link>
              </>
            )}
"""
    new_content = content[:match.start()] + replacement.strip('\n') + content[match.end():]
    with open('src/components/Header.tsx', 'w') as f:
        f.write(new_content)
    print("Header fixed!")
else:
    print("Conflict markers not found in Header.")
