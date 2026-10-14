import { ShieldCheck, Heart, Printer, Clock, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo className="w-9 h-9" />
              <span className="text-2xl font-black text-white tracking-tight">Tagline</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Your Cozy Hub for Digital Crafts, Stories & Learning. Downloadable assets, bedtime audiobooks, and screen-free educational crafts for the whole family.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 bg-slate-900/90 p-2.5 rounded-2xl border border-emerald-900/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant Downloads • DRM-Free • Lifetime Print License</span>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Marketplace Departments</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#dulo-toons" className="hover:text-emerald-400 transition-colors flex items-center gap-1">🐉 DULO TOONS Universe</a></li>
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">eBooks & Digital Stories</a></li>
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Printable Crafts & Activities</a></li>
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Audiobooks & Bedtime Audio</a></li>
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Educational Workbooks</a></li>
              <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Planners & Creative Trackers</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Customer Support</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Digital Download & Audio FAQ</a></li>
              <li><a href="#freebie" className="hover:text-emerald-400 transition-colors">Free 5-Page Starter Pack</a></li>
              <li><a href="#why-us" className="hover:text-emerald-400 transition-colors">Device & Printing Recommendations</a></li>
              <li><a href="mailto:support@taglinestore.com" className="hover:text-emerald-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Guaranteed Delivery Notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Automated Delivery</h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Clock className="w-4 h-4" /> Instant 2-Second Access
              </div>
              <p className="text-slate-400">Direct download link unlocks immediately on screen + backup link sent to your email.</p>
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              Secured by Stripe SSL. No recurring subscriptions, pay once, keep forever.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Tagline. All rights reserved. Your Cozy Hub for Digital Crafts, Stories & Learning.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Refund Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
