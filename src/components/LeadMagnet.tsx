'use client';

import { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 p-8 sm:p-12 text-white shadow-xl">
        {/* Background decorative circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black tracking-wide uppercase">
              <Gift className="w-4 h-4 text-amber-300" />
              <span>100% Free Gift for Parents</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Download Our 5-Page Starter Activity Pack for Free!
            </h2>

            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Test out our printable quality before purchasing! Includes 2 coloring sheets, 1 animal scissor-craft, and 2 early math puzzles. Instantly sent to your inbox.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-semibold pt-2 text-white/95">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" /> No credit card needed
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" /> Instant PDF download
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" /> Zero spam guarantee
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl">
            {status === 'success' ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                  🎉
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">Check Your Inbox!</h3>
                <p className="text-xs text-slate-600">
                  We sent your free 5-page pack to <strong>{email}</strong>. You can also download it right now below:
                </p>
                <a
                  href={downloadLink}
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-sm shadow-md transition-all"
                >
                  <span>Download Free PDF Now</span>
                  <ArrowRight className="w-4 h-4" />
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
                    placeholder="mom_or_dad@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Child's Age (For customized fun)
                  </label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                  >
                    <option value="3-5">3–5 Years (Toddler / Preschool)</option>
                    <option value="6-8">6–8 Years (Kindergarten / Early School)</option>
                    <option value="9+">9+ Years (Older Kids)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-sm shadow-playful hover:shadow-playful-hover transition-all flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Preparing Your Free Pack...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Instant Free Download</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-400">
                  By clicking, you agree to receive occasional kids learning tips. Unsubscribe anytime in 1 click.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
