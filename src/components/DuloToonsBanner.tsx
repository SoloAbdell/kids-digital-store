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
    <section id="dulo-toons" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-6">
      <div className="relative z-10">
        {/* Header Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-emerald-200/40">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/85 backdrop-blur-md border border-emerald-300 text-emerald-900 text-xs font-black tracking-wide uppercase shadow-xs">
                <span>🐉 Featured Universe Spotlight</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                <span className="text-amber-700 font-bold">DULO TOONS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight text-contrast-title">
                Meet <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 bg-clip-text text-transparent">Dulo The Baby Dragon</span> & Friends
              </h2>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                Step into the enchanting world of Dulo—the adorable baby dragon who sneezes warm starlight sparks instead of fire! Explore our exclusive collection of bedtime audio stories, 3D dragon crafts, and printable coloring sheets.
              </p>
            </div>

            {/* Quick Audio Sample Pill */}
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 shadow-md shrink-0 w-full sm:w-auto">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  aria-label="Toggle Dulo bedtime sound preview"
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 block flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> Bedtime Audio Sample
                  </span>
                  <span className="text-xs text-slate-800 font-bold">
                    {isPlayingAudio ? "Playing: Whispering Woods Story" : "Listen to Dulo's Calming Tale"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dulo Toons Featured Showcase Cards with Clean Frosted Glass */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-8">
            {duloProducts.map((item) => (
              <div
                key={item.id}
                className="group bg-white/80 hover:bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/80 hover:border-emerald-300 p-4 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-200/60">
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-sm text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {item.format}
                    </div>
                    {item.price === 0 ? (
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-xs">
                        FREE
                      </div>
                    ) : (
                      <div className="absolute top-2 right-2 bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                        ${item.price.toFixed(2)}
                      </div>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                    {item.subtitle || item.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100/60 flex items-center justify-between">
                  <button
                    onClick={() => setQuickViewProduct(item)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </button>

                  <Link
                    href={`/product/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/70 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-800 font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <span>All DULO TOONS digital assets include instant DRM-free download & unlimited family print license.</span>
            </div>

            <button
              onClick={handleBrowseDulo}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Browse All DULO TOONS Packs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
    </section>
  );
}
