'use client';

import Link from 'next/link';
import { Sparkles, Download, Search, ShoppingBag, BookOpen } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
      {/* Top Notification Bar with Tagline Slogan */}
      <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 text-white text-xs font-bold py-1.5 px-4 text-center tracking-wide">
        ✨ <span>Tagline — Your Cozy Hub for Digital Crafts, Stories & Learning • Instant Downloads</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-300 via-rose-300 to-amber-200 flex items-center justify-center text-xl shadow-playful group-hover:scale-105 transition-transform">
            🌟
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-2xl tracking-tight text-slate-900">
                Tagline
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Digital Hub
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block -mt-1 font-medium hidden sm:block">
              Your Cozy Hub for Digital Crafts, Stories & Learning
            </span>
          </div>
        </Link>

        {/* Navigation Links: Catalog, DULO Universe, Freebies, About */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
          <a href="#catalog" className="hover:text-amber-700 transition-colors">
            Catalog
          </a>

          <a 
            href="#dulo-toons" 
            className="text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-2xl border border-emerald-200 transition-all flex items-center gap-1.5 font-black text-xs"
          >
            <span>🐉 DULO Universe</span>
          </a>

          <a href="#freebie" className="hover:text-amber-700 transition-colors flex items-center gap-1 text-amber-600 font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Freebies
          </a>

          <a href="#why-us" className="hover:text-amber-700 transition-colors">
            About
          </a>
        </nav>

        {/* Search, Cart Drawer Button & Freebie CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#catalog"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all"
            title="Search products"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Search</span>
          </a>

          {/* Cart Drawer Toggle Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-slate-800 border border-amber-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Open cart drawer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-700" />
            <span className="text-xs font-bold hidden sm:inline text-slate-800">Cart</span>
            {totalCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center -ml-0.5">
                {totalCount}
              </span>
            )}
          </button>

          <a
            href="#freebie"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-sm hover:shadow-md transition-all"
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
