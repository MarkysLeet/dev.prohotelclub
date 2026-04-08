import { Menu, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full h-[85px] bg-[#2E4B2F] flex items-center justify-between px-6 lg:px-12 animate-in fade-in duration-700 ease-cinematic">
      {/* Left: Menu/Logo Area */}
      <div className="flex items-center gap-6">
        {/* Placeholder for vector2.svg (Burger/Menu alternative from user's code, or standard Lucide Menu) */}
        <button aria-label="Open menu" className="p-2 -ml-2 text-white hover:opacity-80 transition-opacity">
          <Menu strokeWidth={1.5} size={28} />
        </button>
      </div>

      {/* Center: Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        {/* Logo text from index.tsx: left-[872px] top-[17px] text-[50px] whitespace-nowrap Moniqa */}
        <span className="font-moniqa text-white text-[50px] tracking-wide font-normal leading-normal whitespace-nowrap">
          ProHotelClub
        </span>
      </div>

      {/* Right: Icons and Decor vectors */}
      <div className="flex items-center gap-6 relative">
        <button aria-label="Search" className="text-white hover:opacity-80 transition-opacity">
          <Search strokeWidth={1.5} size={24} />
        </button>
        <button aria-label="User Profile" className="text-white hover:opacity-80 transition-opacity">
          <User strokeWidth={1.5} size={24} />
        </button>

        {/* Vector 3 equivalent - right edge decor if needed.
            User's code: <img className="absolute w-[7.24%] h-[97.70%] top-[2.30%] left-[92.76%]" alt="Vector" src={vector3} />
            We will skip the absolute positioning decor to keep it responsive, or add it gracefully.
        */}
      </div>
    </header>
  );
}
