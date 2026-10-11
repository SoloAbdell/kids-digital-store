import Hero from '@/components/Hero';
import ProductCatalog from '@/components/ProductCatalog';
import LeadMagnet from '@/components/LeadMagnet';
import FAQ from '@/components/FAQ';
import { SAMPLE_PRODUCTS } from '@/lib/products';
import { Sparkles, Heart, Check, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Product Catalog */}
      <ProductCatalog products={SAMPLE_PRODUCTS} />

      {/* Why Screen-Free Section */}
      <section id="why-us" className="py-16 bg-amber-50/50 border-y border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-200/60 px-3 py-1 rounded-full">
              Screen-Free Benefits
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              Why Parents Are Swapping Tablets for Printables
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Simple sheets of paper spark more genuine creativity, patience, and motor control than hours of passive video watching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-3">
              <div className="text-3xl">✂️</div>
              <h3 className="font-extrabold text-base text-slate-900">Fine Motor & Hand Dexterity</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Coloring inside lines and cutting along dotted edges prepares little hands for writing, knife-and-fork holding, and independent coordination.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-3">
              <div className="text-3xl">🧠</div>
              <h3 className="font-extrabold text-base text-slate-900">Deep Focus & Problem Solving</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mazes, logic puzzles, and number games build critical concentration spans without dopamine spikes or sudden pop-up ads.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm space-y-3">
              <div className="text-3xl">⏳</div>
              <h3 className="font-extrabold text-base text-slate-900">Peaceful Weekends & Rainy Days</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Instant relief when kids are bored at home or during restaurant outings and airplane travels. Just pull out a freshly printed pack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Freebie Lead Magnet */}
      <LeadMagnet />

      {/* Parent Reviews */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
            <Users className="w-3.5 h-3.5" />
            <span>Community Love</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mt-2">What Real Parents Are Saying</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              "My 4-year-old was glued to YouTube shorts. I printed the Safari pack on a whim, and he spent two full hours coloring! Being able to reprint his favorites when he messes up is a lifesaver."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-xs">
                SM
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Sara M. (Mom of 2)</h4>
                <p className="text-[10px] text-slate-400">Verified Parent Buyer</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              "As a preschool teacher, having high-res PDFs that I can print for all 18 kids in my morning class without copyright headache is incredible value. Highly recommend the mega bundle."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                KB
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Karim B. (Educator)</h4>
                <p className="text-[10px] text-slate-400">Kindergarten Teacher</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              "Instant download was effortless. As soon as I clicked pay with Apple Pay / Stripe, the PDF opened and arrived in my inbox. Printing took 30 seconds."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">
                LT
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Leila T. (Mom of 3)</h4>
                <p className="text-[10px] text-slate-400">Verified Parent Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </div>
  );
}
