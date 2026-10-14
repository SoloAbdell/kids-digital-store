'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { 
  FileText, 
  Headphones, 
  Archive, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Star,
  CheckCircle,
  Clock
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Format badge icon and color selector
  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'MP3 Audio':
        return {
          icon: <Headphones className="w-3.5 h-3.5 text-violet-600" />,
          bg: 'bg-violet-50 text-violet-700 border-violet-200',
        };
      case 'ZIP Pack':
        return {
          icon: <Archive className="w-3.5 h-3.5 text-amber-600" />,
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'EPUB / PDF':
        return {
          icon: <BookOpen className="w-3.5 h-3.5 text-sky-600" />,
          bg: 'bg-sky-50 text-sky-700 border-sky-200',
        };
      case 'Printable Sheet':
        return {
          icon: <Calendar className="w-3.5 h-3.5 text-rose-600" />,
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
        };
      case 'Instant PDF':
      default:
        return {
          icon: <FileText className="w-3.5 h-3.5 text-emerald-600" />,
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
    }
  };

  // Category labels helper
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'ebooks': return 'eBook & Guide';
      case 'printables': return 'Printable & Craft';
      case 'audio': return 'Audiobook';
      case 'educational': return 'Workbook';
      case 'planners': return 'Planner & Tracker';
      case 'bundles': return 'Bundle';
      default: return cat;
    }
  };

  const formatStyle = getFormatBadge(product.format);
  const isFree = product.price === 0 || product.is_freebie;

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between">
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
          <div className={`absolute top-3 right-3 backdrop-blur-md text-[11px] font-black px-2.5 py-1 rounded-full border shadow-sm flex items-center gap-1.5 ${formatStyle.bg}`}>
            {formatStyle.icon}
            <span>{product.format}</span>
          </div>

          {/* Price Tag Overlay on Image */}
          <div className="absolute bottom-3 left-3">
            {isFree ? (
              <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>FREE DOWNLOAD</span>
              </span>
            ) : (
              <span className="bg-slate-950/90 text-white text-sm font-black px-3 py-1 rounded-full shadow-md backdrop-blur-sm border border-slate-700/60">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Pages or Duration Pill */}
          {product.pages_or_duration && (
            <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{product.pages_or_duration}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category Pill and Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
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

          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-pink-600 transition-colors line-clamp-2">
            {product.title}
          </h3>

          <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
            {product.subtitle || product.description}
          </p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {product.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Buy or Download Action */}
      <div className="p-5 pt-0 mt-2">
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">
              {isFree ? 'Zero Cost' : 'Instant License'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">
              {isFree ? 'FREE' : `$${product.price.toFixed(2)}`}
            </span>
          </div>

          <Link
            href={`/product/${product.slug}`}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs shadow-playful hover:shadow-playful-hover transition-all flex items-center gap-1.5 ${
              isFree
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-amber-300 hover:bg-amber-400 text-slate-950'
            }`}
          >
            <span>{isFree ? 'Get Freebie' : 'Preview & Get'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
