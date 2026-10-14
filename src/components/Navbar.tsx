'use client';

import Link from 'next/link';
import { Sparkles, Download, Search, Headphones, BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-600 text-white text-xs font-bold py-1.5 px-4 text-center tracking-wide">
        🚀 <span>Instant Digital Downloads • eBooks, Audiobooks, 3D Crafts & Family Planners</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-300 to-pink-400 flex items-center justify-center text-xl shadow-playful group-hover:scale-105 transition-transform">
            ✨
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              LittleNest <span className="text-pink-600 text-xs px-2 py-0.5 bg-pink-50 border border-pink-200 rounded-full font-black">Digital Store</span>
            </span>
            <span className="text-[10px] text-slate-400 block -mt-1 font-medium">Downloadable Kids & Family Assets</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-600">
          <a href="#catalog" className="hover:text-pink-600 transition-colors flex items-center gap-1">
            <span>Marketplace</span>
          </a>

          <a 
            href="#dulo-toons" 
            className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 transition-all flex items-center gap-1.5 font-black"
          >
            <span>🐉 DULO TOONS Universe</span>
          </a>

          <a href="#freebie" className="hover:text-amber-600 transition-colors font-bold text-amber-600 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-500" /> Free Starter Pack
          </a>

          <a href="#why-us" className="hover:text-pink-600 transition-colors">
            Benefits
          </a>

          <a href="#faq" className="hover:text-pink-600 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#catalog"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </a>

          <a
            href="#freebie"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500 text-white font-extrabold text-xs shadow-playful hover:bg-pink-600 hover:shadow-playful-hover transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Free Downloads</span>
          </a>
        </div>
      </div>
    </header>
  );
}
