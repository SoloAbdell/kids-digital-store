'use client';

import { Download, Headphones, BookOpen, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-[850px] mx-auto">
        {/* Étoiles / Badge avis */}
        <div className="inline-block bg-white/90 backdrop-blur-md px-5 py-2 rounded-full font-bold text-xs sm:text-sm text-slate-800 mb-6 shadow-sm border border-white/60">
          ⭐⭐⭐⭐⭐ Loved by 6,500+ Parents Worldwide
        </div>

        {/* Titre Principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1e1b4b] leading-[1.18] mb-5 tracking-tight text-contrast-title">
          Welcome to Tagline:<br />
          <span className="text-[#0d9488]">Your Cozy Hub</span> for{' '}
          <span className="text-[#6366f1]">Digital</span>{' '}
          <span className="text-[#ea580c]">Crafts & Stories</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-800 max-w-[700px] mx-auto mb-8 font-bold leading-relaxed">
          Discover downloadable eBooks, creative paper crafts, and bedtime audiobooks.
        </p>

        {/* Boutons d'Action (CTAs) */}
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          <a
            href="#catalog"
            className="text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base inline-block shadow-playful hover:shadow-playful-hover hover:-translate-y-0.5 transition-all cursor-pointer"
            style={{ background: '#0d9488' }}
          >
            Explore All Products →
          </a>
          <a
            href="#freebie"
            className="text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base inline-block shadow-playful-gold hover:-translate-y-0.5 transition-all cursor-pointer"
            style={{ background: '#f59e0b' }}
          >
            ✨ Get Free Activity Pack
          </a>
        </div>

        {/* Core Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left pt-2">
          <div className="bg-white/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-slate-900">Instant Download</h3>
              <p className="text-[11px] text-slate-500">Ready in 2 seconds.</p>
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-800 shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-slate-900">Screen-Free Audio</h3>
              <p className="text-[11px] text-slate-500">Bedtime sleep tales.</p>
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-slate-900">Printable Crafts</h3>
              <p className="text-[11px] text-slate-500">3D models & coloring.</p>
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-slate-900">Lifetime Re-Use</h3>
              <p className="text-[11px] text-slate-500">Unlimited prints.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
