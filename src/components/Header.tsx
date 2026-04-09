import { Search01Icon, UserIcon, Menu01Icon } from 'hugeicons-react';

export default function Header() {
  return (
    <header className="w-full h-[85px] bg-evergreen-forest flex justify-center fixed top-0 left-0 z-40">
      <div className="w-[1920px] min-w-[1920px] h-full relative">
        {/* Бургер - X: 35 relative to header. Width: 35. Height: 32 */}
        <button
          aria-label="Menu"
          className="absolute text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center"
          style={{ top: '27px', left: '35px', width: '35px', height: '32px' }}
        >
          <Menu01Icon size={32} strokeWidth={1.5} />
        </button>

        {/* Логотип - X: 872, Y: 17 */}
        <div
          className="absolute font-moniqa text-[50px] text-white tracking-wide leading-none select-none text-left"
          style={{ top: '17px', left: '872px', width: '177px' }}
        >
          ProHotelClub
        </div>

        {/* Поиск - X: 1782, Y: 26. W: 34 */}
        <button
          aria-label="Search"
          className="absolute text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center"
          style={{ top: '26px', left: '1782px', width: '34px', height: '34px' }}
        >
          <Search01Icon size={30} strokeWidth={1.5} />
        </button>

        {/* Кабинет - X: 1859, Y: 27. W: 32 */}
        <button
          aria-label="Profile"
          className="absolute text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center"
          style={{ top: '27px', left: '1859px', width: '32px', height: '32px' }}
        >
          <UserIcon size={30} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
