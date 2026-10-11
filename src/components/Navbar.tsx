'use client';

import Link from 'next/link';
import { Sparkles, Download, Heart } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100">
      <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-sky-400 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide">
        🎉 <span>Instant Digital Download • Print as many times as you want! 🖨️</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-amber-200 flex items-center justify-center text-xl shadow-playful group-hover:scale-105 transition-transform">
            🎨
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-800 flex items-center gap-1">
              LittleNest <span className="text-pink-500 text-xs px-2 py-0.5 bg-pink-100 rounded-full">Printables</span>
            </span>
            <span className="text-[10px] text-slate-400 block -mt-1 font-medium">Digital Activities For Happy Kids</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#catalog" className="hover:text-pink-500 transition-colors">Activity Packs</a>
          <a href="#freebie" className="hover:text-amber-500 transition-colors font-bold text-amber-600 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-500" /> Free 5-Page Sample
          </a>
          <a href="#why-us" className="hover:text-pink-500 transition-colors">Why Parents Love Us</a>
          <a href="#faq" className="hover:text-pink-500 transition-colors">Printing FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#freebie"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500 text-white font-semibold text-xs shadow-playful hover:bg-pink-600 hover:shadow-playful-hover transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get Freebies</span>
          </a>
        </div>
      </div>
    </header>
  );
}
