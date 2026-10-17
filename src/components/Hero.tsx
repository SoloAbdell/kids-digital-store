'use client';

import { useState } from 'react';
import { Download, Headphones, BookOpen, ShieldCheck, Play, Pause, Volume2, Sparkles, Star, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const toggleHeroAudio = () => {
    if (!audioElement) {
      const audio = new Audio('https://actions.google.com/sounds/v1/ambiences/forest_day.ogg');
      audio.loop = true;
      audio.play();
      setAudioElement(audio);
      setIsPlayingAudio(true);
    } else {
      if (isPlayingAudio) {
        audioElement.pause();
        setIsPlayingAudio(false);
      } else {
        audioElement.play();
        setIsPlayingAudio(true);
      }
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Value Proposition & High-Converting Copy */}
        <div className="lg:col-span-7 text-left space-y-6">
          
          {/* Social Proof Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200/90 shadow-xs">
            <span className="flex text-amber-400 text-xs">
              {'★'.repeat(5)}
            </span>
            <span className="text-xs font-bold text-slate-800">
              Loved by 6,500+ Parents &amp; Educators
            </span>
          </div>

          {/* Main Headline (Bold, Emotional, 100% Readable) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Where Bedtime Stories &amp; Crafts <br />
            <span className="text-emerald-600">Come To Life</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
            Downloadable eBooks, creative 3D paper crafts, and screen-free bedtime audiobooks crafted for curious kids aged 3–10. Wholesome, joyful, and ready in seconds.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#catalog"
              className="px-7 py-4 rounded-2xl font-extrabold text-sm sm:text-base text-white bg-emerald-600 hover:bg-emerald-700 shadow-playful hover:shadow-playful-hover hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Products</span>
              <span>→</span>
            </a>
            
            <a
              href="#freebie"
              className="px-7 py-4 rounded-2xl font-extrabold text-sm sm:text-base text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-playful-gold hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Get Free Activity Pack</span>
            </a>
          </div>

          {/* 3-Point Confidence Indicators */}
          <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant 2-Sec Download</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Unlimited Family Prints</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Works on All Devices</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Pixar Centerpiece Showcase Card */}
        <div className="lg:col-span-5 relative">
          
          {/* Main Framed Card */}
          <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl group">
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              <img
                src="/hero-banner.jpg"
                alt="3D Pixar Scene with Dulo, Panda, Fox and Kids"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />

              {/* Gradient Bottom Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Top Audio Player Badge */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={toggleHeroAudio}
                  aria-label="Play calming bedtime story sample"
                  className="bg-white/95 hover:bg-white text-slate-900 px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-black tracking-wider text-amber-700 block">
                      {isPlayingAudio ? 'Playing Sample' : 'Audio Preview'}
                    </span>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      Bedtime Story
                    </span>
                  </div>
                </button>
              </div>

              {/* Floating Universe Badge Bottom Left */}
              <div className="absolute bottom-4 left-4 z-10 text-left text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-[11px] uppercase tracking-wider mb-1 shadow-xs">
                  🐉 DULO TOONS™ UNIVERSE
                </span>
                <p className="text-xs sm:text-sm font-extrabold text-white/95 drop-shadow-sm">
                  Dulo the Dragon, Pip the Panda &amp; Friends
                </p>
              </div>

              {/* Floating Rating Pill Bottom Right */}
              <div className="absolute bottom-4 right-4 z-10 bg-slate-950/85 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-700/60 text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Decorative Floating Accent Badges around Hero Card */}
          <div className="hidden sm:flex items-center gap-2 absolute -bottom-5 -left-5 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 text-xs font-black text-slate-900 z-30 animate-bounce duration-1000">
            <span className="text-base">✂️</span>
            <span>3D Cutouts &amp; Activities</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 absolute -top-4 -left-4 bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs font-black text-emerald-800 z-30">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Instant PDF + MP3</span>
          </div>
        </div>

      </div>

      {/* 4 Bottom Feature Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-7xl mx-auto text-left mt-14">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-800 shrink-0 font-bold text-lg">
            ⚡
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-900">Instant Download</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Ready in 2 seconds.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-800 shrink-0 font-bold text-lg">
            🎧
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-900">Bedtime Audio</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Gentle rain &amp; stories.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 shrink-0 font-bold text-lg">
            ✂️
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-900">Printable Crafts</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">3D models &amp; tracing.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 shrink-0 font-bold text-lg">
            🖨️
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-900">Lifetime Re-Use</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Print unlimited times.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
