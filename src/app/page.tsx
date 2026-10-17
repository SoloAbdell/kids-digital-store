import Hero from '@/components/Hero';
import CategoryExplorer from '@/components/CategoryExplorer';
import DuloToonsBanner from '@/components/DuloToonsBanner';
import ProductCatalog from '@/components/ProductCatalog';
import LeadMagnet from '@/components/LeadMagnet';
import FAQ from '@/components/FAQ';
import { SAMPLE_PRODUCTS } from '@/lib/products';
import { Sparkles, Heart, Check, Users, Headphones, BookOpen, Scissors, ShieldCheck, Download, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero Marketplace Section */}
      <Hero />

      {/* 2. Visual Category Explorer (eBooks, Printables, Audiobooks, Educational, Planners) */}
      <CategoryExplorer />

      {/* 3. Dedicated Featured Brand Spotlight: "DULO TOONS" Universe */}
      <DuloToonsBanner products={SAMPLE_PRODUCTS} />

      {/* 4. Featured Digital Products Catalog, Badges & Search Grid */}
      <ProductCatalog products={SAMPLE_PRODUCTS} />

      {/* 5. About Tagline: Cozy Digital Crafts, Stories & Learning */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-white px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
            About Tagline
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-3">
            Your Cozy Hub for Digital Crafts, Stories & Learning
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-semibold mt-2">
            We design wholesome digital goods that inspire hands-on creativity and peaceful bedtime routines away from addictive screen feeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl">
              ⚡
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Instant Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              No shipping delays or postal fees. Instant download link right on your screen plus permanent email delivery.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl">
              🎧
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Bedtime Audio Stories</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Soothing narrated audiobooks with gentle rain soundscapes to help kids drift off calmly without tablet light.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl">
              ✂️
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Creative Paper Crafts</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              3D dragon models, cut-and-paste dinosaurs, and scissor-skills projects that foster fine motor control.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl">
              🖨️
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Print Unlimited Times</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Unlimited home and classroom print rights. Siblings can each color their favorite sheet without buying twice.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Freebies Download Hub (Lead Magnet) */}
      <LeadMagnet />

      {/* 7. Parent & Educator Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-emerald-900 border border-emerald-300 font-extrabold text-xs shadow-xs">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Community Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2">What Families Say About Tagline</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              "The DULO TOONS bedtime audiobook was magic for my 4-year-old. The sound of rain and gentle music had him asleep in 15 minutes without any tablet tantrum!"
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                AM
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Amina M.</h4>
                <p className="text-[10px] text-slate-400">Verified Parent • London, UK</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              "The 3D Dulo papercraft dragon gliders kept my second-graders captivated on a rainy afternoon. Incredible print resolution and easy-to-follow fold guides."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-xs">
                MR
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Marc R.</h4>
                <p className="text-[10px] text-slate-400">Kindergarten Teacher</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
              "The family homeschool planner helped me organize our weekly rhythm, meal plans, and kids chores. Being able to re-print clean sheets every Monday is unbeatable."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
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

      {/* 8. FAQ Section */}
      <FAQ />
    </div>
  );
}
