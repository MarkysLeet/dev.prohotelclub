import { Search01Icon, UserIcon, Menu01Icon } from 'hugeicons-react';

export default function Header() {
  return (
    <header className="w-full h-[85px] bg-evergreen-forest fixed top-0 left-0 z-40 px-[4vw] flex justify-center items-center">
      <div className="w-full max-w-[1440px] grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Left: Burger Menu */}
        <div className="flex justify-start">
          <button
            aria-label="Menu"
            className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -ml-2"
          >
            <Menu01Icon size={32} strokeWidth={1.5} />
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center mt-1">
          <span className="font-moniqa text-[clamp(2rem,3vw,3.125rem)] text-white tracking-wide leading-none select-none">
            ProHotelClub
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex justify-end items-center gap-4 lg:gap-8">
          <button
            aria-label="Search"
            className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2"
          >
            <Search01Icon size={30} strokeWidth={1.5} />
          </button>

          <button
            aria-label="Profile"
            className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -mr-2"
          >
            <UserIcon size={30} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
