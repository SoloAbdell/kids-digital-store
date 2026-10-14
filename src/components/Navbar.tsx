'use client';

import Link from 'next/link';
import { Sparkles, Download, Search, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-xs">
      {/* Top Notification Bar with Brand Logo 3-Color Gradient */}
      <div className="bg-gradient-to-r from-emerald-600 via-purple-600 to-amber-500 text-white text-xs font-bold py-1.5 px-4 text-center tracking-wide">
        ✨ <span>Tagline — Your Cozy Hub for Digital Crafts, Stories & Learning • Instant Downloads</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <BrandLogo className="w-10 h-10" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-2xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                Tagline
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Digital Hub
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block -mt-0.5 font-medium hidden sm:block">
              Your Cozy Hub for Digital Crafts, Stories & Learning
            </span>
          </div>
        </Link>

        {/* Navigation Links: Catalog, DULO Universe, Freebies, About */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-700">
          <a 
            href="#catalog" 
            className="hover:text-emerald-600 transition-colors"
          >
            Catalog
          </a>

          <a 
            href="#dulo-toons" 
            className="text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-2xl border border-emerald-200 transition-all flex items-center gap-1.5 font-black text-xs"
          >
            <span>🐉 DULO Universe</span>
          </a>

          <a 
            href="#freebie" 
            className="hover:text-amber-600 transition-colors flex items-center gap-1 text-amber-600 font-extrabold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Freebies
          </a>

          <a 
            href="#why-us" 
            className="hover:text-emerald-600 transition-colors"
          >
            About
          </a>
        </nav>

        {/* Search, Cart Drawer Button & Freebie CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#catalog"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-2xl transition-all"
            title="Search products"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Search</span>
          </a>

          {/* Cart Drawer Toggle Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Open cart drawer"
          >
            <ShoppingBag className="w-4 h-4 text-purple-700" />
            <span className="text-xs font-bold hidden sm:inline text-purple-900">Cart</span>
            {totalCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center -ml-0.5">
                {totalCount}
              </span>
            )}
          </button>

          {/* Primary CTA Button: Primary Green */}
          <a
            href="#freebie"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-playful hover:shadow-playful-hover transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Free Starter Pack</span>
            <span className="sm:hidden">Free</span>
          </a>
        </div>
      </div>
    </header>
  );
}
