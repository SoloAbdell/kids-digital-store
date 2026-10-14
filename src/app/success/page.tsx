'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Download, CheckCircle, Printer, ArrowRight, Sparkles, Mail } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/lib/products';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const productId = searchParams.get('productId');
  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId) || SAMPLE_PRODUCTS[0];

  const downloadToken = sessionId ? `token_${sessionId.slice(0, 12)}` : 'sample-download-pack';

  return (
    <div className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
          🎉
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Payment Confirmed & Verified
          </span>
          <h1 className="text-3xl font-black text-slate-900">
            Your Printables Are Ready!
          </h1>
          <p className="text-sm text-slate-500">
            Thank you for your order! You can start printing right now.
          </p>
        </div>

        {/* Product Box */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4 text-left">
          <img
            src={product.thumbnail_url}
            alt={product.title}
            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
          />
          <div className="flex-1">
            <h3 className="font-extrabold text-sm text-slate-900">{product.title}</h3>
            <p className="text-xs text-slate-500">{product.pages_count} Pages • PDF Printable</p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
            Paid
          </span>
        </div>

        {/* Primary Download Button */}
        <div className="space-y-3 pt-2">
          <a
            href={`/api/download/${downloadToken}`}
            className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base shadow-playful hover:shadow-playful-hover transition-all flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            <span>Download High-Resolution Files Now</span>
          </a>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Mail className="w-4 h-4 text-slate-400" />
            <span>A backup link was also emailed to your address.</span>
          </div>
        </div>

        {/* Quick Printing Tips */}
        <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-5 text-left text-xs text-slate-700 space-y-2">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <Printer className="w-4 h-4 text-amber-600" /> 3 Steps to Print:
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-slate-600">
            <li>Click the button above to download the PDF to your phone or computer.</li>
            <li>Open the file in Adobe Acrobat, Preview, or your web browser.</li>
            <li>In your printer settings, choose <strong>"Fit to Printable Area"</strong> on A4 or US Letter.</li>
          </ol>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-amber-700 transition-colors"
          >
            <span>Return to Tagline Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading order details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
