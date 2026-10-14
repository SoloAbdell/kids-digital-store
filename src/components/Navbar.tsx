'use client';

import Link from 'next/link';
import { Home, Search, User, ShoppingCart, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import DuloToonsLogo from './DuloToonsLogo';

export default function Navbar() {
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: DULO TOONS Logo */}
        <Link href="/" className="flex items-center gap-2 group hover:opacity-95 transition-opacity">
          <DuloToonsLogo size="sm" />
        </Link>

        {/* Center: Clean Nav Links matching the Mockup */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-700">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 text-slate-950 font-black shadow-xs hover:bg-amber-500 transition-colors"
          >
            <Home className="w-4 h-4 fill-current" />
            <span>Home</span>
          </Link>

          <a
            href="#catalog"
            className="hover:text-amber-600 transition-colors py-2 px-1"
          >
            Shop
          </a>

          <a
            href="#categories"
            className="hover:text-amber-600 transition-colors flex items-center gap-1 py-2 px-1"
          >
            <span>Categories</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <a
            href="#why-us"
            className="hover:text-amber-600 transition-colors py-2 px-1"
          >
            About Us
          </a>

          <a
            href="#dulo-toons"
            className="hover:text-amber-600 transition-colors py-2 px-1"
          >
            Blog
          </a>

          <a
            href="#footer"
            className="hover:text-amber-600 transition-colors py-2 px-1"
          >
            Contact
          </a>
        </nav>

        {/* Right: Search, Account & Cart Drawer Icons */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <a
            href="#catalog"
            className="p-2.5 rounded-full text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </a>

          {/* Admin / Account Button */}
          <Link
            href="/admin"
            className="p-2.5 rounded-full text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
            title="Admin & Account"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Cart Drawer Button with Yellow Count Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Cart Drawer"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black flex items-center justify-center border-2 border-white shadow-xs">
              {totalCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
