'use client';

import { Star, Download, Sparkles, Headphones, BookOpen, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[620px] lg:min-h-[680px] flex items-center justify-center py-16">
      {/* 1. Full 3D Pixar Background (L-Khalfiya) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-banner.jpg')` }}
      >
        {/* Soft frosted overlay to make the text pop while keeping the 3D room, characters, and sunny window visible */}
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-[#FDFCF8]" />
      </div>

      {/* 2. Original Tagline Content & Text (L-Katba dyalna) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Social Proof Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-white/95 border border-emerald-100 shadow-md text-xs font-bold text-slate-800 backdrop-blur-md">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span>
            Loved by 6,500+ Parents, Educators & Curious Kids Worldwide
          </span>
        </div>

        {/* Original Catchy Headline: Welcome to Tagline */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/80 shadow-xl space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Welcome to Tagline: <br />
            <span className="bg-gradient-to-r from-emerald-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
              Your Cozy Hub for Digital Crafts & Stories ✨
            </span>
          </h1>

          {/* Original Subtitle */}
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover downloadable eBooks, creative paper crafts, bedtime audiobooks, and fun learning activities for the whole family.
          </p>

          {/* Core Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Primary CTA: Dragon Green */}
            <a
              href="#catalog"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-playful hover:shadow-playful-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore All Products</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* Special / Freebie CTA: Warm Gold */}
            <a
              href="#freebie"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base shadow-playful-gold hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
            >
              <Sparkles className="w-5 h-5 text-amber-900" />
              <span>Get Free Activity Pack</span>
            </a>
          </div>
        </div>

        {/* 3. Core Logo-Color Value Prop Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left pt-2">
          {/* Green Badge */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 shadow-md flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Instant Download</h3>
              <p className="text-xs text-slate-500 mt-0.5">Files ready in 2 seconds right after checkout.</p>
            </div>
          </div>

          {/* Purple / Violet Badge */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-purple-100 shadow-md flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Screen-Free Audio</h3>
              <p className="text-xs text-slate-500 mt-0.5">Soothing bedtime stories for peaceful sleep.</p>
            </div>
          </div>

          {/* Gold / Amber Badge */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-100 shadow-md flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Printable Crafts</h3>
              <p className="text-xs text-slate-500 mt-0.5">3D models, DIY cutouts & coloring books.</p>
            </div>
          </div>

          {/* Green Re-Use Badge */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 shadow-md flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Lifetime Re-Use</h3>
              <p className="text-xs text-slate-500 mt-0.5">Print unlimited copies for siblings & school.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
