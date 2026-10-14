'use client';

import { useState } from 'react';
import { 
  Search, 
  Calendar, 
  FileText, 
  Lightbulb, 
  BookOpen, 
  Palette, 
  Image as ImageIcon, 
  Gift, 
  Heart,
  Zap, 
  ShieldCheck, 
  Leaf 
} from 'lucide-react';
import DuloToonsLogo from './DuloToonsLogo';

interface CategoryPill {
  id: string;
  name: string;
  icon: any;
  href: string;
}

const CATEGORIES: CategoryPill[] = [
  { id: 'planners', name: 'Planners', icon: Calendar, href: '#catalog' },
  { id: 'templates', name: 'Templates', icon: FileText, href: '#catalog' },
  { id: 'printables', name: 'Printables', icon: Lightbulb, href: '#catalog' },
  { id: 'workbooks', name: 'Workbooks', icon: BookOpen, href: '#catalog' },
  { id: 'coloring', name: 'Coloring Books', icon: Palette, href: '#catalog' },
  { id: 'wallart', name: 'Wall Art', icon: ImageIcon, href: '#catalog' },
  { id: 'bundles', name: 'Bundles', icon: Gift, href: '#catalog' },
  { id: 'more', name: 'And More!', icon: Heart, href: '#catalog' },
];

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `#catalog`;
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* 1. Main 3D Scene Banner Background Container */}
      <div className="relative min-h-[520px] md:min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
        {/* Full-bleed 3D Pixar Illustration Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/hero-banner.jpg')` }}
        >
          {/* Subtle warm center vignette to ensure maximum text readability without hiding characters */}
          <div className="absolute inset-0 bg-radial-gradient from-white/70 via-white/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white pointer-events-none" />
        </div>

        {/* Center Content Overlay */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center pt-8 pb-16 space-y-4">
          {/* DULO TOONS Logo with Crown */}
          <div className="inline-block transform hover:scale-105 transition-transform duration-300">
            <DuloToonsLogo size="lg" />
          </div>

          {/* Slogan */}
          <div className="space-y-1">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textShadow: '0 2px 10px rgba(255,255,255,0.8)',
              }}
            >
              Digital Products for Every Dream
            </h1>
            <div className="flex items-center justify-center gap-1 text-slate-900 pt-1">
              <span className="w-12 h-0.5 bg-amber-400 rounded-full" />
              <Heart className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
              <span className="w-12 h-0.5 bg-amber-400 rounded-full" />
            </div>
          </div>

          {/* Centered Pill Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="pt-2 max-w-xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-full p-2 pl-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-200/90 flex items-center gap-3 transition-shadow hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)]">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for digital products..."
                className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 font-black text-xs shadow-xs transition-all cursor-pointer shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. Wave Bottom Section: Category Circles & Trust Bar */}
      <div className="relative -mt-10 sm:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5]/95 backdrop-blur-md rounded-[2.5rem] border border-amber-200/50 shadow-xl p-6 sm:p-8 space-y-8">
          
          {/* Circular Category Buttons */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 text-center">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.id}
                  href={cat.href}
                  className="group flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white transition-all cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-amber-100/70 border border-amber-200 flex items-center justify-center text-slate-800 group-hover:bg-amber-400 group-hover:scale-110 group-hover:shadow-md transition-all">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                    {cat.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Decorative Divider */}
          <div className="border-t border-amber-200/60 pt-6">
            {/* 4 Trust Features Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-800">
              {/* Feature 1 */}
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">Instant Download</h4>
                  <p className="text-[11px] text-slate-500">Get your files right away</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">Secure Payment</h4>
                  <p className="text-[11px] text-slate-500">Shop with confidence</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">Lifetime Access</h4>
                  <p className="text-[11px] text-slate-500">Download anytime, forever</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">Eco-Friendly</h4>
                  <p className="text-[11px] text-slate-500">Good for you & the planet</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
