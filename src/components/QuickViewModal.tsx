'use client';

import { useCart } from '@/context/CartContext';
import { 
  X, 
  Download, 
  ShoppingBag, 
  Star, 
  Check, 
  Play, 
  Pause, 
  Volume2, 
  Eye, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFree = product.price === 0 || product.is_freebie;

  const toggleAudio = () => {
    const url = product.audio_sample_url || 'https://actions.google.com/sounds/v1/ambiences/forest_day.ogg';
    if (!audioElement) {
      const audio = new Audio(url);
      audio.play();
      setAudioElement(audio);
      setIsPlayingAudio(true);
      audio.onended = () => setIsPlayingAudio(false);
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

  const handleClose = () => {
    if (audioElement) {
      audioElement.pause();
    }
    setIsPlayingAudio(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Visual Preview */}
          <div className="relative bg-slate-100 flex flex-col justify-between overflow-hidden">
            <div className="relative aspect-square w-full">
              <img
                src={product.thumbnail_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Watermark for non-audio */}
              {product.category !== 'audio' && (
                <div className="absolute inset-0 watermark-overlay flex items-center justify-center pointer-events-none select-none">
                  <span className="text-white/40 font-black text-xl tracking-widest uppercase rotate-[-25deg] drop-shadow-md text-center">
                    SAMPLE PREVIEW
                  </span>
                </div>
              )}

              {/* DULO TOONS Badge */}
              {product.is_dulo_toons && (
                <div className="absolute top-3 left-3 bg-emerald-950/90 backdrop-blur-sm text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/40">
                  🐉 DULO TOONS
                </div>
              )}

              {/* Format Badge */}
              <div className="absolute top-3 right-12 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {product.format}
              </div>
            </div>

            {/* Audio Sample Player if applicable */}
            {product.category === 'audio' && (
              <div className="p-4 bg-gradient-to-r from-violet-950 to-indigo-950 text-white flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={toggleAudio}
                    className="w-10 h-10 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center font-bold shadow-md transition-transform hover:scale-105"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-300 block uppercase">
                      Audiobook Preview
                    </span>
                    <span className="text-xs text-slate-200">
                      {isPlayingAudio ? 'Playing Sample...' : 'Click to preview audio'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-violet-300 font-bold bg-violet-900/60 px-2 py-0.5 rounded">
                  MP3 320kbps
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  {product.category}
                </span>
                {product.pages_or_duration && (
                  <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    {product.pages_or_duration}
                  </span>
                )}
              </div>

              <h3 className="font-black text-slate-900 text-xl leading-tight">
                {product.title}
              </h3>

              {product.subtitle && (
                <p className="text-xs font-medium text-slate-600">
                  {product.subtitle}
                </p>
              )}

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-black text-slate-900">
                  {isFree ? 'FREE' : `$${product.price.toFixed(2)}`}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">
                  {isFree ? 'No card required' : 'One-time instant download'}
                </span>
              </div>

              {product.rating && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviews_count || 45} reviews)</span>
                </div>
              )}

              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {isFree ? (
                <a
                  href={`/api/download/sample-${product.slug}`}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free Activity Pack</span>
                </a>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      addToCart(product);
                      handleClose();
                    }}
                    className="py-3 px-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-playful hover:shadow-playful-hover transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>

                  <Link
                    href={`/product/${product.slug}`}
                    onClick={handleClose}
                    className="py-3 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Instant delivery on confirmation screen + email copy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
