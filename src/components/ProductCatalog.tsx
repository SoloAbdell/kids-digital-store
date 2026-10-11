'use client';

import { useState } from 'react';
import { Product, AgeGroup, Category } from '@/lib/types';
import ProductCard from './ProductCard';
import { Sparkles, Layers, SlidersHorizontal } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const ageFilters = [
    { label: '🌟 All Ages', value: 'all' },
    { label: '🐣 Ages 3–5 (Toddlers & Preschool)', value: '3-5' },
    { label: '🚀 Ages 6–8 (Kindergarten & Elementary)', value: '6-8' },
    { label: '🧩 Ages 9+ (Older Kids & STEM)', value: '9+' },
  ];

  const categoryFilters = [
    { label: 'All Activities', value: 'all' },
    { label: '🎨 Coloring', value: 'coloring' },
    { label: '✂️ Cut & Paste Crafts', value: 'crafts' },
    { label: '🔢 Math & Letters', value: 'math-letters' },
    { label: '🔬 STEM Mazes', value: 'stem' },
    { label: '🎁 Value Bundles', value: 'bundles' },
  ];

  const filteredProducts = products.filter((item) => {
    const matchesAge = selectedAge === 'all' || item.age_group === selectedAge || item.age_group === 'all';
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesAge && matchesCategory;
  });

  return (
    <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Educational Catalog</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Find The Perfect Activity Sheet
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto mt-2 text-sm">
          Browse by child age or learning topic. Download straight away and print anytime.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 mb-10 space-y-4">
        {/* Age Groups Tabs */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter By Age Group:
          </span>
          <div className="flex flex-wrap gap-2">
            {ageFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setSelectedAge(f.value)}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                  selectedAge === f.value
                    ? 'bg-slate-900 text-white shadow-sm scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Filter By Activity Type:
          </span>
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedCategory(c.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === c.value
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-4xl mb-3">🔍</p>
          <h3 className="text-lg font-bold text-slate-800">No activity packs found in this category</h3>
          <p className="text-xs text-slate-400 mt-1">Try switching to all ages or a different activity type.</p>
          <button
            onClick={() => { setSelectedAge('all'); setSelectedCategory('all'); }}
            className="mt-4 px-4 py-2 bg-amber-300 text-slate-800 font-bold text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
