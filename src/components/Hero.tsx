import { Printer, Download, Star, ShieldCheck, Sparkles, Headphones, BookOpen, Layers, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-amber-50/80 via-rose-50/40 to-white">
      {/* Decorative Warm Blobs */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Social Proof Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-white/90 border border-amber-200 shadow-xs text-xs font-semibold text-slate-700 mb-6 backdrop-blur-sm">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="text-slate-800">
            Loved by 6,500+ Parents, Educators & Curious Kids Worldwide
          </span>
        </div>

        {/* Catchy Headline - Exactly as requested */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
          Welcome to Tagline: <br />
          <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 bg-clip-text text-transparent">
            Your Cozy Hub for Digital Crafts & Stories ✨
          </span>
        </h1>

        {/* Subtitle - Exactly as requested */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Discover downloadable eBooks, creative paper crafts, bedtime audiobooks, and fun learning activities for the whole family.
        </p>

        {/* CTAs - Exactly as requested */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#catalog"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base shadow-playful hover:shadow-playful-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore All Products</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a
            href="#freebie"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border-2 border-amber-300 hover:border-amber-400 text-slate-900 font-bold text-base shadow-sm hover:bg-amber-50/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Get Free Activity Pack</span>
          </a>
        </div>

        {/* Value Prop Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/80 shadow-xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Instant Download</h3>
              <p className="text-xs text-slate-500 mt-0.5">Files ready in 2 seconds right after checkout.</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-rose-200/80 shadow-xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Screen-Free Audio</h3>
              <p className="text-xs text-slate-500 mt-0.5">Soothing bedtime stories for peaceful sleep.</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-indigo-200/80 shadow-xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-800 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Printable Crafts</h3>
              <p className="text-xs text-slate-500 mt-0.5">3D models, DIY cutouts & coloring books.</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-emerald-200/80 shadow-xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Lifetime Re-Use</h3>
              <p className="text-xs text-slate-500 mt-0.5">Print unlimited copies for siblings & school.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
