'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { FileText, Sparkles, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between">
      <div>
        {/* Thumbnail Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <img
            src={product.thumbnail_url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Age Tag */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-black px-3 py-1 rounded-full shadow-sm flex items-center gap-1 border border-amber-100">
            <span>🎂 Ages:</span>
            <span className="text-pink-600 font-extrabold">{product.age_group === 'all' ? 'All Ages' : `${product.age_group} yrs`}</span>
          </div>

          {/* Page Count */}
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <FileText className="w-3 h-3 text-amber-300" />
            <span>{product.pages_count} Pages</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
              {product.category}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Instant PDF</span>
          </div>

          <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-pink-600 transition-colors line-clamp-2">
            {product.title}
          </h3>

          <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer / Buy Action */}
      <div className="p-5 pt-0 mt-2">
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Instant Download</span>
            <span className="text-2xl font-black text-slate-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="px-4 py-2.5 rounded-2xl bg-amber-300 hover:bg-amber-400 text-slate-900 font-extrabold text-xs shadow-playful hover:shadow-playful-hover transition-all flex items-center gap-1.5"
          >
            <span>Preview & Get</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
