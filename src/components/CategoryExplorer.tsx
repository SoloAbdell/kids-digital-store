'use client';

import { CATEGORIES_LIST } from '@/lib/products';
import { ArrowRight, BookOpen, Scissors, Headphones, GraduationCap, Calendar, Sparkles } from 'lucide-react';

interface CategoryExplorerProps {
  onSelectCategory?: (categoryId: string) => void;
}

export default function CategoryExplorer({ onSelectCategory }: CategoryExplorerProps) {
  const categories = [
    {
      id: 'ebooks',
      name: 'eBooks & Digital Stories',
      desc: 'Illustrated picture books, moral tales & digital guides for thoughtful parents.',
      icon: '📚',
      badge: 'ePub & PDF',
      color: 'from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-900',
      iconBg: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'printables',
      name: 'Printable Crafts & Activities',
      desc: 'Ready-to-print coloring sheets, 3D dragon cutouts, paper models & scissor crafts.',
      icon: '✂️',
      badge: 'Vector 300 DPI',
      color: 'from-rose-500/10 to-pink-500/10 border-rose-200 text-rose-900',
      iconBg: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'audio',
      name: 'Audiobooks & Bedtime Audio',
      desc: 'Narrated stories, soothing rain soundscapes & guided bedtime meditation journeys.',
      icon: '🎧',
      badge: 'MP3 320kbps',
      color: 'from-violet-500/10 to-indigo-500/10 border-violet-200 text-violet-900',
      iconBg: 'bg-violet-100 text-violet-800',
    },
    {
      id: 'educational',
      name: 'Educational Workbooks',
      desc: 'Letter & number tracing, preschool math worksheets, STEM mazes & puzzles.',
      icon: '🧩',
      badge: 'Print Unlimited',
      color: 'from-sky-500/10 to-blue-500/10 border-sky-200 text-sky-900',
      iconBg: 'bg-sky-100 text-sky-800',
    },
    {
      id: 'planners',
      name: 'Planners & Creative Trackers',
      desc: 'Weekly homeschool curricula, kids daily habit charts & family meal planners.',
      icon: '📋',
      badge: 'Fillable & Printable',
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-900',
      iconBg: 'bg-emerald-100 text-emerald-800',
    },
  ];

  const handleCardClick = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Curated Collections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore Digital Goods by Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose what you'd like to discover today — instant downloads with lifetime access.
          </p>
        </div>

        <a
          href="#catalog"
          className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
        >
          <span>View All 15+ Products</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {categories.map((c) => (
          <div
            key={c.id}
            onClick={() => handleCardClick(c.id)}
            className={`p-5 rounded-2xl bg-gradient-to-b ${c.color} border hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center text-xl shadow-sm`}>
                  {c.icon}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-2xs">
                  {c.badge}
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                {c.name}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                {c.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/50 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500 text-[11px]">Instant Download</span>
              <span className="text-amber-700 flex items-center gap-1 group-hover:underline">
                Explore →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
