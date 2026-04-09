import { Search01Icon, UserIcon, Menu01Icon } from 'hugeicons-react';

export default function Header() {
  return (
    <header className="w-full h-[85px] bg-evergreen-forest flex items-center fixed top-0 left-0 z-40">
      <div className="w-full max-w-[1920px] h-full mx-auto relative flex items-center">
        {/* Бургер - X: 35 relative to header */}
        <button
          aria-label="Menu"
          className="absolute text-soft-sand hover:text-white transition-colors duration-200"
          style={{ left: '35px' }}
        >
          <Menu01Icon size={24} strokeWidth={1.5} />
        </button>

        {/* Логотип - X: 872 (which is exactly centered in 1920 since 1920/2 - textwidth/2 = approx 872) */}
        <div
          className="absolute font-moniqa text-[50px] text-white tracking-wide leading-none select-none w-full text-center"
        >
          ProHotelClub
        </div>

        {/* Поиск - X: 1782 */}
        <button
          aria-label="Search"
          className="absolute text-soft-sand hover:text-white transition-colors duration-200"
          style={{ left: '1782px' }}
        >
          <Search01Icon size={24} strokeWidth={1.5} />
        </button>

        {/* Кабинет - X: 1859 */}
        <button
          aria-label="Profile"
          className="absolute text-soft-sand hover:text-white transition-colors duration-200"
          style={{ left: '1859px' }}
        >
          <UserIcon size={24} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
