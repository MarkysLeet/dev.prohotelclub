import { Menu, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full h-[80px] bg-evergreen-forest flex items-center justify-between px-6 lg:px-12 animate-in fade-in duration-700 ease-cinematic">
      {/* Left: Burger Menu */}
      <button aria-label="Open menu" className="p-2 -ml-2 text-white hover:opacity-80 transition-opacity">
        <Menu strokeWidth={1.5} size={28} />
      </button>

      {/* Center: Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="font-moniqa text-white text-[32px] tracking-wide font-medium">
          ProHotelClub
        </span>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-6">
        <button aria-label="Search" className="text-white hover:opacity-80 transition-opacity">
          <Search strokeWidth={1.5} size={24} />
        </button>
        <button aria-label="User Profile" className="text-white hover:opacity-80 transition-opacity">
          <User strokeWidth={1.5} size={24} />
        </button>
      </div>
    </header>
  );
}
