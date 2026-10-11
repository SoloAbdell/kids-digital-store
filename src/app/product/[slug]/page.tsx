'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { 
  FileText, 
  Printer, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Eye, 
  Lock, 
  ArrowLeft,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const [selectedPreview, setSelectedPreview] = useState<number>(0);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  if (!product) {
    return notFound();
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerEmail: email,
          customerName: name,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Fallback for simulation / direct demo
        window.location.href = `/success?session_id=demo_session_${product.id}&productId=${product.id}`;
      }
    } catch (err) {
      window.location.href = `/success?session_id=demo_session_${product.id}&productId=${product.id}`;
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <Link
        href="/#catalog"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Activity Packs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Image Previews & Watermarked Sample Viewer */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Preview with Watermark overlay */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
            <img
              src={product.preview_images[selectedPreview] || product.thumbnail_url}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {/* Watermark Protection Overlay */}
            <div className="absolute inset-0 watermark-overlay flex items-center justify-center pointer-events-none select-none">
              <span className="text-white/40 font-black text-3xl sm:text-4xl tracking-widest uppercase rotate-[-25deg] drop-shadow-md">
                SAMPLE PREVIEW • WATERMARKED
              </span>
            </div>

            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>Watermarked Preview (Purchased PDF is clean & crisp 300 DPI)</span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {product.preview_images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.preview_images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPreview(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedPreview === idx ? 'border-pink-500 scale-105 shadow-md' : 'border-slate-200 opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Printing Specifications Box */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-3 text-slate-800 text-xs sm:text-sm">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
              <Printer className="w-4 h-4 text-amber-600" /> Printing & Paper Recommendations:
            </h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>• <strong>Format:</strong> High-resolution vector-rendered PDF (300 DPI).</li>
              <li>• <strong>Paper Size:</strong> Optimized for standard A4 and US Letter without cutting off margins.</li>
              <li>• <strong>Paper Weight:</strong> Standard printer paper (80gsm) for coloring; 120-160gsm cardstock recommended for cut-and-paste crafts.</li>
              <li>• <strong>Print Limits:</strong> Zero restrictions! Print as many times as you like for your family.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Details & Guest Checkout Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
                Ages {product.age_group}
              </span>
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {product.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase">One-time payment • No subscription</span>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Quick Perks list */}
          <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>{product.pages_count} Ready-to-Print Pages</strong> in 1 organized PDF file</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Instant Download</strong> on confirmation page + email link</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Reusable Forever:</strong> Print unlimited times</span>
            </div>
          </div>

          {/* Guest Checkout Card */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900">Quick Guest Checkout</h3>
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-500" /> SSL Encrypted
              </span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Youssef Bennani"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Email Address (Where your download link is sent)
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                type="submit"
                disabled={isCheckingOut}
                className="w-full py-3.5 px-4 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-sm shadow-playful hover:shadow-playful-hover transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Instant Checkout...</span>
                  </>
                ) : (
                  <>
                    <span>Buy Now & Download (${product.price.toFixed(2)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 pt-2">
                <span>🔒 Powered by Stripe</span>
                <span>•</span>
                <span>⚡ 30-Day Happiness Guarantee</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
