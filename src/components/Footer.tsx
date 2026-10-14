import { ShieldCheck, Heart, Printer, Clock, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="text-xl font-bold text-white">LittleNest Digital Store</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Curated digital downloads marketplace for families, educators, and children. eBooks, bedtime audiobooks, 3D crafts, and home organization planners.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/40">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>100% Secure Checkout • DRM-Free Instant Downloads</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Marketplace Departments</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#dulo-toons" className="hover:text-emerald-300 transition-colors flex items-center gap-1">🐉 DULO TOONS Collection</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">eBooks & Guides</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Printables & 3D Crafts</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Audiobooks & Audio Tracks</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Educational Workbooks</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Planners & Trackers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Customer Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#faq" className="hover:text-white transition-colors">Downloading & Audio FAQ</a></li>
              <li><a href="#freebie" className="hover:text-white transition-colors">Download Free Starter Pack</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Printing & Device Guide</a></li>
              <li><a href="mailto:support@littleneststore.com" className="hover:text-white transition-colors">Email Customer Care</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Instant Digital Delivery</h4>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Clock className="w-4 h-4" /> 2-Second Automated Delivery
              </div>
              <p>Direct download link unlocks immediately on screen + permanent backup sent to your email.</p>
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              Payment secured by Stripe. No recurring subscriptions, pay once, keep forever.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LittleNest Digital Store. Featuring the DULO TOONS universe. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Download License</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
