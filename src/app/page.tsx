import Hero from '@/components/Hero';
import DuloToonsBanner from '@/components/DuloToonsBanner';
import ProductCatalog from '@/components/ProductCatalog';
import LeadMagnet from '@/components/LeadMagnet';
import FAQ from '@/components/FAQ';
import { SAMPLE_PRODUCTS } from '@/lib/products';
import { Sparkles, Heart, Check, Users, Headphones, BookOpen, Scissors, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero Marketplace Section */}
      <Hero />

      {/* 2. Dedicated Featured Collection: DULO TOONS Universe */}
      <DuloToonsBanner products={SAMPLE_PRODUCTS} />

      {/* 3. Main Product Catalog & Filter / Search System */}
      <ProductCatalog products={SAMPLE_PRODUCTS} />

      {/* 4. Why Digital & Screen-Free Assets */}
      <section id="why-us" className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
              Why Choose Digital Downloads?
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              Better Value, Zero Shipping, Reusable Forever
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Whether soothing bedtime audiobooks, tactile papercrafts, or educational workbooks, digital files give families complete freedom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                ⚡
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Instant Access</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Download files right on your screen in 2 seconds. No waiting days for shipping or paying delivery fees.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
                🖨️
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Print as Many Times as Needed</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kids can re-color, redo mazes, or share with brothers, sisters, and classroom students without buying twice.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-2xl">
                🎧
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Screen-Free Audio Stories</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bedtime audiobooks and meditation tracks let children relax and imagine without glowing screen eye strain.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-2xl">
                ✨
              </div>
              <h3 className="font-extrabold text-base text-slate-900">DULO TOONS Exclusives</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Wholesome, heartwarming stories and crafts featuring Dulo the Baby Dragon and enchanting forest friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Freebie Starter Pack Opt-In (Lead Magnet) */}
      <LeadMagnet />

      {/* 6. Reviews & Social Proof */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
            <Users className="w-3.5 h-3.5" />
            <span>Parent & Educator Feedback</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mt-2">Loved by Families Worldwide</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              "The Dulo Toons bedtime audiobook was magic for my 4-year-old. The sound of rain and gentle music had him asleep in 15 minutes without any tablet tantrum!"
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                AM
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Amina M.</h4>
                <p className="text-[10px] text-slate-400">Verified Parent • London, UK</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              "The 3D Dulo papercraft dragon gliders kept my second-graders captivated on a rainy afternoon. Incredible print resolution and easy-to-follow fold guides."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                MR
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Marc R.</h4>
                <p className="text-[10px] text-slate-400">Preschool & Kindergarten Teacher</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              "The family homeschool planner helped me organize our weekly rhythm, meal plans, and kids chores. Being able to re-print clean sheets every Monday is unbeatable."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">
                SL
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Sophia L.</h4>
                <p className="text-[10px] text-slate-400">Homeschooling Mom of 3</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <FAQ />
    </div>
  );
}
