import Link from 'next/link';
import { Menu01Icon, Search01Icon, UserCircleIcon } from 'hugeicons-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex items-center justify-between">
      {/* Navigation Left */}
      <nav className="flex items-center gap-8 font-century-gothic text-sm tracking-wide text-primary-text">
        <Link href="#" className="hover:text-evergreen-forest transition-colors duration-200">Destinations</Link>
        <Link href="#" className="hover:text-evergreen-forest transition-colors duration-200">Collections</Link>
        <Link href="#" className="hover:text-evergreen-forest transition-colors duration-200">Journal</Link>
      </nav>

      {/* Logo Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link href="/" className="font-moniqa text-4xl tracking-widest text-primary-text uppercase">
          ProHotelClub
        </Link>
      </div>

      {/* Actions Right */}
      <div className="flex items-center gap-6 text-primary-text">
        <button className="hover:text-evergreen-forest transition-colors duration-200">
          <Search01Icon size={20} strokeWidth={1.5} />
        </button>
        <button className="hover:text-evergreen-forest transition-colors duration-200">
          <UserCircleIcon size={20} strokeWidth={1.5} />
        </button>
        <button className="hover:text-evergreen-forest transition-colors duration-200 ml-4">
          <Menu01Icon size={24} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
