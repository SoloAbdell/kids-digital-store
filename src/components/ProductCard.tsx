'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { 
  FileText, 
  Headphones, 
  Archive, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Star,
  Clock,
  Play,
  Pause,
  Eye,
  ShoppingBag,
  Download
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setQuickViewProduct, addToCart } = useCart();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Format badge icon and color selector according to requirements
  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'Audio MP3':
        return {
          label: 'Audio MP3',
          icon: <Headphones className="w-3.5 h-3.5 text-violet-600" />,
          bg: 'bg-violet-50 text-violet-700 border-violet-200',
        };
      case 'Craft Pack':
      case 'Printable Kit':
        return {
          label: format,
          icon: <Archive className="w-3.5 h-3.5 text-amber-700" />,
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'EPUB / eBook':
        return {
          label: 'EPUB / eBook',
          icon: <BookOpen className="w-3.5 h-3.5 text-sky-600" />,
          bg: 'bg-sky-50 text-sky-700 border-sky-200',
        };
      case 'PDF Download':
      default:
        return {
          label: 'PDF Download',
          icon: <FileText className="w-3.5 h-3.5 text-emerald-600" />,
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'ebooks': return 'eBook & Story';
      case 'printables': return 'Printable Craft';
      case 'audio': return 'Audiobook';
      case 'educational': return 'Workbook';
      case 'planners': return 'Planner';
      default: return cat;
    }
  };

  const toggleMiniAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
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

  const formatStyle = getFormatBadge(product.format);
  const isFree = product.price === 0 || product.is_freebie;

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between">
      <div>
        {/* Thumbnail Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.thumbnail_url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* DULO TOONS Badge */}
          {product.is_dulo_toons && (
            <div className="absolute top-3 left-3 bg-emerald-950/90 backdrop-blur-sm text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-emerald-500/40">
              <span>🐉 DULO TOONS</span>
            </div>
          )}

          {/* Format Badge (Top Right) */}
          <div className={`absolute top-3 right-3 backdrop-blur-md text-[10px] sm:text-[11px] font-black px-2.5 py-1 rounded-full border shadow-xs flex items-center gap-1.5 ${formatStyle.bg}`}>
            {formatStyle.icon}
            <span>{formatStyle.label}</span>
          </div>

          {/* Audiobook Mini Player Button (Overlay for Audio) */}
          {product.category === 'audio' && (
            <button
              onClick={toggleMiniAudio}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-950/80 hover:bg-amber-400 hover:text-slate-950 text-white flex items-center justify-center transition-all shadow-lg scale-90 group-hover:scale-100 cursor-pointer"
              title="Play audiobook audio preview"
            >
              {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          )}

          {/* Quick Preview Hover Button */}
          <button
            onClick={() => setQuickViewProduct(product)}
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs cursor-pointer"
            title="Quick Preview"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>Quick View</span>
          </button>

          {/* Price Tag Overlay on Image */}
          <div className="absolute bottom-3 left-3">
            {isFree ? (
              <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>FREE</span>
              </span>
            ) : (
              <span className="bg-slate-950/90 text-white text-xs sm:text-sm font-black px-3 py-1 rounded-full shadow-md backdrop-blur-xs border border-slate-700/60">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category Pill and Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {getCategoryLabel(product.category)}
            </span>

            {product.rating && (
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 text-[10px]">({product.reviews_count || 45})</span>
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
            {product.title}
          </h3>

          <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {product.subtitle || product.description}
          </p>

          {/* Duration or Page Count */}
          {product.pages_or_duration && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold mt-2.5">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>{product.pages_or_duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 mt-2">
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 gap-2">
          {/* Quick Preview modal button */}
          <button
            onClick={() => setQuickViewProduct(product)}
            className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          {/* Add to Cart or Download button */}
          {isFree ? (
            <a
              href={`/api/download/sample-${product.slug}`}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-playful hover:shadow-playful-hover transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
