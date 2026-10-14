'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Headphones, Palette, Scissors, Gift, Play, Pause, Volume2, ArrowRight, Star, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface DuloToonsBannerProps {
  products: Product[];
  onSelectDuloFilter?: () => void;
}

export default function DuloToonsBanner({ products, onSelectDuloFilter }: DuloToonsBannerProps) {
  const duloProducts = products.filter((p) => p.is_dulo_toons);
  const { setQuickViewProduct } = useCart();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
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

  const handleBrowseDulo = () => {
    if (onSelectDuloFilter) {
      onSelectDuloFilter();
    }
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="dulo-toons" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-950 to-purple-950 text-white shadow-2xl border border-emerald-500/30">
        {/* Decorative glowing backdrops with Dragon Green, Purple, and Gold */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-emerald-800/60">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wide uppercase">
                <span>🐉 Featured Universe Spotlight</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-amber-300 font-bold">DULO TOONS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Meet <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">Dulo The Baby Dragon</span> & Friends
              </h2>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                Step into the enchanting world of Dulo—the adorable baby dragon who sneezes warm starlight sparks instead of fire! Explore our exclusive collection of bedtime audio stories, 3D dragon crafts, and printable coloring sheets.
              </p>
            </div>

            {/* Quick Audio Sample Pill */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-emerald-400/30 shrink-0 w-full sm:w-auto">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  aria-label="Toggle Dulo bedtime sound preview"
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 block flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> Bedtime Audio Sample
                  </span>
                  <span className="text-xs text-white font-semibold">
                    {isPlayingAudio ? "Playing: Whispering Woods Story" : "Listen to Dulo's Calming Tale"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dulo Toons Featured Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-8">
            {duloProducts.map((item) => (
              <div
                key={item.id}
                className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-emerald-500/20 hover:border-emerald-400/50 p-4 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 mb-3">
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-sm text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {item.format}
                    </div>
                    {item.price === 0 ? (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full">
                        FREE
                      </div>
                    ) : (
                      <div className="absolute top-2 right-2 bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full">
                        ${item.price.toFixed(2)}
                      </div>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-emerald-200/80 mt-1 line-clamp-2">
                    {item.subtitle || item.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-emerald-800/60 flex items-center justify-between">
                  <button
                    onClick={() => setQuickViewProduct(item)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </button>

                  <Link
                    href={`/product/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-white transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div className="mt-8 pt-6 border-t border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <span>All DULO TOONS digital assets include instant DRM-free download & unlimited family print license.</span>
            </div>

            <button
              onClick={handleBrowseDulo}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Browse All DULO TOONS Packs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
