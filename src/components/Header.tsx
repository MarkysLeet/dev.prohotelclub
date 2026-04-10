import { Search01Icon, UserIcon, Menu01Icon } from 'hugeicons-react';

export default function Header() {
  return (
    <header className="w-full h-[56px] lg:h-[64px] bg-evergreen-forest flex justify-center fixed top-0 left-0 z-40 px-6 lg:px-[35px]">
      <div className="w-full max-w-[1920px] h-full flex items-center justify-between relative">

        {/* Left: Burger Menu */}
        <button
          aria-label="Menu"
          className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -ml-2"
        >
          <Menu01Icon size={28} strokeWidth={1.5} />
        </button>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 mt-1">
          <span className="font-moniqa text-[clamp(24px,4vw,40px)] text-white tracking-wide leading-none select-none">
            ProHotelClub
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 lg:gap-8">
          <button
            aria-label="Search"
            className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2"
          >
            <Search01Icon size={26} strokeWidth={1.5} />
          </button>

          <button
            aria-label="Profile"
            className="text-soft-sand hover:text-white transition-colors duration-200 flex items-center justify-center p-2 -mr-2"
          >
            <UserIcon size={26} strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </header>
  );
}
