'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { 
  Sparkles, 
  Layers, 
  Search, 
  SlidersHorizontal, 
  Filter, 
  X, 
  BookOpen, 
  Scissors, 
  Headphones, 
  GraduationCap, 
  Calendar, 
  FileText
} from 'lucide-react';
import { CATEGORIES_LIST, FORMATS_LIST } from '@/lib/products';

interface ProductCatalogProps {
  products: Product[];
  initialCategory?: string;
  initialDuloFilter?: boolean;
}

export default function ProductCatalog({ 
  products, 
  initialCategory = 'all',
  initialDuloFilter = false
}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedFormat, setSelectedFormat] = useState<string>('All Formats');
  const [onlyDuloToons, setOnlyDuloToons] = useState<boolean>(initialDuloFilter);
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSubtitle = item.subtitle?.toLowerCase().includes(query) || false;
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(query)) || false;
        if (!matchesTitle && !matchesSubtitle && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Format filter
      if (selectedFormat !== 'All Formats' && item.format !== selectedFormat) {
        return false;
      }

      // 4. DULO TOONS filter
      if (onlyDuloToons && !item.is_dulo_toons) {
        return false;
      }

      // 5. Freebies only
      if (onlyFree && item.price > 0 && !item.is_freebie) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [products, searchQuery, selectedCategory, selectedFormat, onlyDuloToons, onlyFree, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFormat('All Formats');
    setOnlyDuloToons(false);
    setOnlyFree(false);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedCategory !== 'all' || 
    selectedFormat !== 'All Formats' || 
    onlyDuloToons || 
    onlyFree;

  return (
    <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Subtitle */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Tagline Digital Marketplace</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Featured Digital Products & Downloads
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
          Filter by category, search by format, or preview sample audio and printable worksheets before downloading.
        </p>
      </div>

      {/* Search Bar & Primary Category Nav */}
      <div className="space-y-6 mb-10">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search eBooks, audiobooks, 3D crafts, DULO TOONS, planners..."
            className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl border border-slate-200 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 5 Main Category Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (onlyDuloToons) setOnlyDuloToons(false);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Controls Bar */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Format Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-600" /> Format:
              </span>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {FORMATS_LIST.map((fmt) => (
                  <option key={fmt} value={fmt}>{fmt}</option>
                ))}
              </select>
            </div>

            {/* DULO TOONS Quick Filter Toggle */}
            <button
              onClick={() => setOnlyDuloToons(!onlyDuloToons)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                onlyDuloToons
                  ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-300'
                  : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <span>🐉 DULO TOONS Universe</span>
            </button>

            {/* Freebies Only Toggle */}
            <button
              onClick={() => setOnlyFree(!onlyFree)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                onlyFree
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>🎁 Freebies ($0.00)</span>
            </button>
          </div>

          {/* Sort By & Clear Filters */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* Results Counter and Active Badges */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-2">
          <span>
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'digital items'}
            {searchQuery && <span> for "<strong className="text-amber-700">{searchQuery}</strong>"</span>}
          </span>

          {onlyDuloToons && (
            <span className="text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Showing DULO TOONS Collection
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
          <p className="text-5xl mb-3">🔍</p>
          <h3 className="text-lg font-black text-slate-800">No items match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Try adjusting your search terms or clearing selected category filters.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-5 px-5 py-2.5 bg-slate-900 text-white font-extrabold text-xs rounded-2xl hover:bg-slate-800 transition-all shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
}
