'use client';

import Link from 'next/link';
import { Sparkles, Download, Search, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#090b14]/90 backdrop-blur-xl border-b border-cyan-500/25 shadow-lg shadow-black/40">
      {/* Top Notification Bar with Logo's Signature Neon Cyan -> Magenta -> Violet Gradient */}
      <div className="bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-600 text-white text-xs font-black py-1.5 px-4 text-center tracking-wide shadow-xs flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
        <span>Tagline — Your Cozy Hub for Digital Crafts, Stories & Learning • Instant Downloads</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Name: Tagline with Futuristic Chrome & Neon Styling */}
        <Link href="/" className="flex items-center gap-3 group">
          <BrandLogo className="w-11 h-11 border border-cyan-400/50 shadow-md shadow-cyan-500/30" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Tagline
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-xs shadow-cyan-500/20">
                Digital Hub
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5 font-medium hidden sm:block">
              Your Cozy Hub for Digital Crafts, Stories & Learning
            </span>
          </div>
        </Link>

        {/* Navigation Links: Catalog, DULO Universe, Freebies, About */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
          <a 
            href="#catalog" 
            className="hover:text-cyan-400 transition-colors"
          >
            Catalog
          </a>

          <a 
            href="#dulo-toons" 
            className="text-fuchsia-300 bg-fuchsia-950/70 hover:bg-fuchsia-900/80 px-3 py-1 rounded-2xl border border-fuchsia-500/40 shadow-xs shadow-fuchsia-500/20 transition-all flex items-center gap-1.5 font-black text-xs"
          >
            <span>🐉 DULO Universe</span>
          </a>

          <a 
            href="#freebie" 
            className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-cyan-400 font-extrabold"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Freebies
          </a>

          <a 
            href="#why-us" 
            className="hover:text-cyan-400 transition-colors"
          >
            About
          </a>
        </nav>

        {/* Search, Cart Drawer Button & Freebie CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#catalog"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-300 hover:text-cyan-300 bg-slate-900/90 hover:bg-slate-800 rounded-2xl border border-slate-700/80 transition-all"
            title="Search products"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search</span>
          </a>

          {/* Cart Drawer Toggle Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-2xl bg-fuchsia-950/70 hover:bg-fuchsia-900/80 text-fuchsia-200 border border-fuchsia-500/40 shadow-xs shadow-fuchsia-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Open cart drawer"
          >
            <ShoppingBag className="w-4 h-4 text-fuchsia-400" />
            <span className="text-xs font-bold hidden sm:inline text-fuchsia-200">Cart</span>
            {totalCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-[10px] font-black flex items-center justify-center -ml-0.5 shadow-xs">
                {totalCount}
              </span>
            )}
          </button>

          {/* Primary CTA Button with Neon Gradient from Logo */}
          <a
            href="#freebie"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-600 hover:from-cyan-400 hover:via-fuchsia-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-200" />
            <span className="hidden sm:inline">Free Starter Pack</span>
          </a>
        </div>
      </div>
    </header>
  );
}
