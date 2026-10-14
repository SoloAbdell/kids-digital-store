import { Printer, Download, Star, ShieldCheck, Sparkles, Headphones, BookOpen, Layers } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-amber-50/70 via-rose-50/30 to-white">
      {/* Decorative Pastel Blobs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Social Proof Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-amber-200/80 shadow-sm text-xs font-semibold text-slate-700 mb-6 animate-pulse">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="text-slate-800">Trusted by 6,200+ Parents, Educators & Young Learners</span>
        </div>

        {/* Catchy Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
          Premium Digital Downloads <br />
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 bg-clip-text text-transparent">
            eBooks, Audiobooks, Crafts & Planners.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Instant access to high-quality printable learning packs, soothing bedtime audio stories, hands-on 3D paper crafts, and family organization planners.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#catalog"
            className="w-full sm:w-auto px-8 py-4 rounded-3xl bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-base shadow-playful hover:shadow-playful-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Explore All Digital Products</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a
            href="#dulo-toons"
            className="w-full sm:w-auto px-8 py-4 rounded-3xl bg-emerald-900 hover:bg-emerald-800 text-emerald-200 font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 border border-emerald-500/40"
          >
            <span>🐉 DULO TOONS Collection</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </a>

          <a
            href="#freebie"
            className="w-full sm:w-auto px-6 py-4 rounded-3xl bg-white border-2 border-amber-300 hover:border-amber-400 text-amber-900 font-bold text-base shadow-sm hover:bg-amber-50/50 transition-all flex items-center justify-center gap-2"
          >
            <span>Free Starter Pack</span>
          </a>
        </div>

        {/* Multi-Format Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-amber-100 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">Instant Digital Delivery</h3>
              <p className="text-xs text-slate-500 mt-0.5">Automated download on screen + backup email.</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-violet-100 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-700 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">Soothing Audiobooks</h3>
              <p className="text-xs text-slate-500 mt-0.5">High-bitrate MP3 tracks for calm bedtimes.</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-sky-100 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">eBooks & Printables</h3>
              <p className="text-xs text-slate-500 mt-0.5">Tablet-ready ePub & crisp vector 300 DPI PDFs.</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">Lifetime Re-Print</h3>
              <p className="text-xs text-slate-500 mt-0.5">Print unlimited copies for siblings & class.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
