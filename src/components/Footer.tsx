import { ShieldCheck, Heart, Printer, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              <span className="text-xl font-bold text-white">LittleNest Printables</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Wholesome, screen-free educational activities that keep kids engaged, creative, and learning at home or in class.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/40">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>100% Secure Checkout with Instant Download</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">Coloring Books (Ages 3-5)</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Cut & Paste Crafts (Ages 6-8)</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Math & Alphabet Worksheets</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">STEM & Logic Mazes (9+)</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Value Activity Bundles</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Parent Guide</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#faq" className="hover:text-white transition-colors">Recommended Paper & Printing</a></li>
              <li><a href="#freebie" className="hover:text-white transition-colors">Download Free Sample Pack</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Screen-Free Activities?</a></li>
              <li><a href="mailto:support@littlenestprintables.com" className="hover:text-white transition-colors">Customer Support</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Guaranteed Delivery</h4>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Clock className="w-4 h-4" /> Instant 2-Second Access
              </div>
              <p>Download immediately on checkout screen + backup copy delivered directly to your email inbox.</p>
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              Payment secured by Stripe. No subscription, one-time payment only.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LittleNest Printables. Made with ❤️ for curious children and happy parents.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
