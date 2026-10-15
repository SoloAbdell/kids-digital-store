'use client';

import { Download, Headphones, BookOpen, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[660px] flex flex-col items-center justify-center overflow-hidden pt-12 pb-16">
      {/* 1. Video en Arrière-Plan (Autoplay, Loop, Muted, Playsinline) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-banner.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover z-1"
      >
        <source src="/hero-background.webm" type="video/webm" />
        <source src="/hero-background.mp4" type="video/mp4" />
        <source src="/hero-banner.webm" type="video/webm" />
        <source src="/hero-banner.mp4" type="video/mp4" />
        {/* Fallback image */}
        <img
          src="/hero-banner.jpg"
          alt="3D Pixar Scene"
          className="w-full h-full object-cover"
        />
      </video>

      {/* 2. Overlay / Filtre doux pour garantir la lisibilité du texte */}
      <div
        className="hero-overlay absolute top-0 left-0 w-full h-full z-2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.2) 75%)',
        }}
      />

      {/* Ambient Floating Golden Dust Particles in the Streaming Sunlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-2">
        <div className="ambient-dust-particle w-2 h-2 top-1/4 left-1/3" style={{ animationDelay: '0s' }} />
        <div className="ambient-dust-particle w-3 h-3 top-1/3 right-1/4" style={{ animationDelay: '2.5s' }} />
        <div className="ambient-dust-particle w-2 h-2 top-1/2 left-1/2" style={{ animationDelay: '4s' }} />
        <div className="ambient-dust-particle w-3.5 h-3.5 top-1/5 right-1/3" style={{ animationDelay: '1.2s' }} />
        <div className="ambient-dust-particle w-2 h-2 top-2/3 left-1/4" style={{ animationDelay: '3.3s' }} />
        <div className="ambient-dust-particle w-2.5 h-2.5 top-1/2 right-1/5" style={{ animationDelay: '5s' }} />
      </div>

      {/* 3. Le Contenu Texte & Boutons (Au-dessus de la vidéo) */}
      <div className="hero-content relative z-3 text-center max-w-[900px] px-5 py-10 mx-auto">
        {/* Étoiles / Badge avis */}
        <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm text-slate-800 mb-5 shadow-xs border border-white/60">
          ⭐⭐⭐⭐⭐ Loved by 6,500+ Parents, Educators & Curious Kids Worldwide
        </div>

        {/* Titre Principal */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1e1b4b] leading-[1.2] mb-4 tracking-tight">
          Welcome to Tagline:<br />
          <span style={{ color: '#0d9488' }}>Your Cozy Hub</span> for{' '}
          <span style={{ color: '#6366f1' }}>Digital</span>{' '}
          <span style={{ color: '#ea580c' }}>Crafts & Stories</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-[#334155] max-w-[700px] mx-auto mb-8 font-medium leading-relaxed">
          Discover downloadable eBooks, creative paper crafts, bedtime audiobooks, and fun learning activities for the whole family.
        </p>

        {/* Boutons d'Action (CTAs) */}
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          <a
            href="#catalog"
            className="text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base inline-block shadow-playful hover:shadow-playful-hover hover:-translate-y-0.5 transition-all cursor-pointer"
            style={{ background: '#0d9488' }}
          >
            Explore All Products →
          </a>
          <a
            href="#freebie"
            className="text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base inline-block shadow-playful-gold hover:-translate-y-0.5 transition-all cursor-pointer"
            style={{ background: '#f59e0b' }}
          >
            ✨ Get Free Activity Pack
          </a>
        </div>

        {/* Core Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left pt-2">
          <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-slate-900">Instant Download</h3>
              <p className="text-[11px] text-slate-500">Ready in 2 seconds.</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-800 shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-slate-900">Screen-Free Audio</h3>
              <p className="text-[11px] text-slate-500">Bedtime sleep tales.</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-slate-900">Printable Crafts</h3>
              <p className="text-[11px] text-slate-500">3D models & coloring.</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
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
