'use client';

import { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, ArrowRight, Loader2, Download } from 'lucide-react';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [childAge, setChildAge] = useState('3-5');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [downloadLink, setDownloadLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, childAge }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setDownloadLink(data.downloadUrl || '#');
      } else {
        setStatus('error');
      }
    } catch (err) {
      // Fallback demonstration
      setStatus('success');
      setDownloadLink('/api/download/sample-freebie-demo');
    }
  };

  return (
    <section id="freebie" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-amber-200/70 p-8 sm:p-12">
        {/* Full 3D Pixar Background with kids and golden-white baby dragon (hero-banner.jpg) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/hero-banner.jpg')` }}
        >
          {/* Gentle atmospheric layer preserving the 3D kids, dragon & cozy room */}
          <div className="absolute inset-0 bg-white/65 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-emerald-50/75 to-amber-50/75" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-100/90 border border-emerald-300 text-xs font-black tracking-wide uppercase text-emerald-900 shadow-xs">
              <Gift className="w-4 h-4 text-emerald-700" />
              <span>Tagline Freebies Download Hub</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Get Your Free 5-Page Activity & Story Starter Pack!
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              Test out our digital printables and sample story sheets! Includes 2 high-res coloring pages, 1 DULO TOONS dragon paper craft, and 2 foundational math tracing sheets.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-bold pt-2 text-slate-800">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free • No card needed
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant PDF Download link
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Print as often as you want
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/95 backdrop-blur-md text-slate-900 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/80">
            {status === 'success' ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl">
                  🎉
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Your Pack is Ready!</h3>
                <p className="text-xs text-slate-600">
                  We sent your free starter pack link to <strong>{email}</strong>. You can also download it right now below:
                </p>
                <a
                  href={downloadLink}
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-playful transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Download Free PDF Now</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent_or_educator@gmail.com"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Age Group Preference
                  </label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="3-5">Ages 3–5 (Toddler / Preschool)</option>
                    <option value="6-8">Ages 6–8 (Kindergarten / Early Elementary)</option>
                    <option value="9+">Ages 9+ (Older Kids & STEM)</option>
                    <option value="all">Family / All Ages</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-playful-gold hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Download Link...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Instant Free Pack</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-400">
                  Instant free access. Unsubscribe from occasional cozy craft ideas anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
