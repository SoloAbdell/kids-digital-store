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
  Loader2,
  Headphones,
  Play,
  Pause,
  Download,
  BookOpen,
  Archive,
  Volume2,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const [selectedPreview, setSelectedPreview] = useState<number>(0);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  
  // Audio preview state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  if (!product) {
    return notFound();
  }

  const isFree = product.price === 0 || product.is_freebie;

  const toggleAudio = () => {
    const url = product.audio_sample_url || 'https://actions.google.com/sounds/v1/ambiences/forest_day.ogg';
    if (!audioElement) {
      const audio = new Audio(url);
      audio.play();
      setAudioElement(audio);
      setIsPlayingAudio(true);
      audio.onended = () => setIsPlayingAudio(false);
    } else {
      if (isPlayingAudio) {
        audioElement.pause();
        setIsPlayingAudio(false);
      } else {
        audioElement.play();
        setIsPlayingAudio(true);
      }
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);

    if (isFree) {
      // Free download direct flow
      window.location.href = `/api/download/sample-${product.slug}`;
      return;
    }

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
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Digital Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Media Preview & Audio / Sample Viewer */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Visual Preview */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
            <img
              src={product.preview_images[selectedPreview] || product.thumbnail_url}
              alt={product.title}
              className="w-full h-full object-cover"
            />

            {/* Watermark Protection Overlay for Printables/eBooks */}
            {product.category !== 'audio' && (
              <div className="absolute inset-0 watermark-overlay flex items-center justify-center pointer-events-none select-none">
                <span className="text-white/40 font-black text-2xl sm:text-4xl tracking-widest uppercase rotate-[-25deg] drop-shadow-md text-center px-4">
                  SAMPLE PREVIEW • WATERMARKED
                </span>
              </div>
            )}

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.is_dulo_toons && (
                <span className="bg-emerald-950/90 text-emerald-300 text-xs font-black px-3 py-1 rounded-full shadow-md border border-emerald-500/40">
                  🐉 DULO TOONS Special
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.format}
            </div>

            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>Full clean DRM-free files unlocked immediately after download</span>
            </div>
          </div>

          {/* Interactive Audio Player Preview (If Audio item) */}
          {product.category === 'audio' && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950 to-indigo-950 text-white border border-violet-700/50 flex items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  className="w-12 h-12 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center font-bold shadow-md transition-transform hover:scale-105"
                >
                  {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> Audio Sample Preview
                  </span>
                  <span className="text-xs text-slate-200 font-medium">
                    {isPlayingAudio ? 'Playing soothing sample preview...' : 'Listen to 1-minute audio narrator preview'}
                  </span>
                </div>
              </div>
              <span className="text-xs text-violet-300 font-bold bg-violet-900/60 px-3 py-1 rounded-lg">
                320kbps MP3
              </span>
            </div>
          )}

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

          {/* Digital Delivery & Specifications Box */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 text-slate-800 text-xs sm:text-sm">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Digital Product Specifications:
            </h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>• <strong>Format:</strong> {product.format} ({product.pages_or_duration || 'Instant Download'})</li>
              <li>• <strong>Delivery:</strong> Direct instant browser download + backup link sent to your email.</li>
              <li>• <strong>Device Compatibility:</strong> Works on iOS, Android, Mac, Windows, Kindle, and home printers.</li>
              <li>• <strong>License:</strong> Lifetime personal and home educational use license.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Details & Instant Checkout */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {product.category}
              </span>
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {product.format}
              </span>
              {product.is_dulo_toons && (
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  DULO TOONS
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.title}
            </h1>

            {product.subtitle && (
              <p className="text-sm font-semibold text-slate-600">
                {product.subtitle}
              </p>
            )}

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {isFree ? 'FREE' : `$${product.price.toFixed(2)}`}
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase">
                {isFree ? 'Zero payment needed' : 'One-time payment • Lifetime access'}
              </span>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 pt-1">
                <Star className="w-4 h-4 fill-current text-amber-400" />
                <span>{product.rating} / 5.0</span>
                <span className="text-slate-400 font-normal">({product.reviews_count || 50} verified family downloads)</span>
              </div>
            )}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Quick Perks list */}
          <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>{product.pages_or_duration || 'Full Digital Package'}</strong> ready for instant use</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Instant Download</strong> on confirmation page + email link</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>DRM-Free:</strong> Transfer to phone, tablet, computer, or print anytime</span>
            </div>
          </div>

          {/* Guest Checkout or Free Download Box */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900">
                {isFree ? 'Instant Freebie Delivery' : 'Quick Guest Checkout'}
              </h3>
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-500" /> 256-bit SSL Secure
              </span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
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
                className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm shadow-playful hover:shadow-playful-hover transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 ${
                  isFree
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'bg-pink-500 hover:bg-pink-600 text-white'
                }`}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Your Download...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{isFree ? 'Download Free Activity Pack' : `Buy Now & Download ($${product.price.toFixed(2)})`}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 pt-2">
                <span>🔒 Powered by Stripe</span>
                <span>•</span>
                <span>⚡ Instant Download Guarantee</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
