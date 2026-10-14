'use client';

import { useState } from 'react';
import { SAMPLE_PRODUCTS } from '@/lib/products';
import { Product, Category, ProductFormat } from '@/lib/types';
import { PlusCircle, Package, DollarSign, Users, ShieldAlert, ArrowRight, Check, Sparkles, Headphones, BookOpen } from 'lucide-react';

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('');
  const [pagesOrDuration, setPagesOrDuration] = useState('');
  const [category, setCategory] = useState<Category>('ebooks');
  const [format, setFormat] = useState<ProductFormat>('Instant PDF');
  const [isDuloToons, setIsDuloToons] = useState(false);
  const [mockupUrl, setMockupUrl] = useState('');
  const [description, setDescription] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === (process.env.NEXT_PUBLIC_ADMIN_KEY || 'admin')) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid passcode. (Default demo pass: admin123)');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      subtitle: subtitle || undefined,
      price: parseFloat(price) || 0.00,
      currency: 'USD',
      category,
      format,
      age_group: 'all',
      pages_or_duration: pagesOrDuration || 'Instant Download',
      pages_count: 20,
      thumbnail_url: mockupUrl || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
      preview_images: [mockupUrl || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'],
      storage_file_path: `products/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${format === 'MP3 Audio' ? 'zip' : 'pdf'}`,
      is_featured: false,
      is_dulo_toons: isDuloToons,
      is_freebie: parseFloat(price) === 0,
      description,
      rating: 5.0,
      reviews_count: 1,
    };

    setProducts([newProduct, ...products]);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);

    // Reset form
    setTitle('');
    setSubtitle('');
    setPrice('');
    setPagesOrDuration('');
    setDescription('');
    setMockupUrl('');
    setIsDuloToons(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="py-24 max-w-md mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto text-xl">
            🔒
          </div>
          <h1 className="font-extrabold text-xl text-slate-900">Admin Marketplace Portal</h1>
          <p className="text-xs text-slate-500">Enter your store administrator passcode to manage digital downloads.</p>

          <form onSubmit={handleLogin} className="space-y-3 pt-2">
            <input
              type="password"
              placeholder="Enter passcode (demo: admin123)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  const duloCount = products.filter(p => p.is_dulo_toons).length;

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Digital Marketplace Catalog Manager</h1>
          <p className="text-xs text-slate-500">Manage eBooks, Audiobooks, 3D Crafts, DULO TOONS franchise, and Planners.</p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-xs font-bold text-slate-400 hover:text-slate-800"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Total Digital Assets</span>
            <h3 className="text-2xl font-black text-slate-900">{products.length} Items</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            🐉
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">DULO TOONS Items</span>
            <h3 className="text-2xl font-black text-slate-900">{duloCount} Assets</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Avg. Order Value</span>
            <h3 className="text-2xl font-black text-slate-900">$7.49</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Freebie Leads</span>
            <h3 className="text-2xl font-black text-slate-900">1,890 Leads</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upload / Add Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-pink-500" />
            <h2 className="font-extrabold text-base text-slate-900">Publish New Digital Download</h2>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" /> Item published live to the marketplace catalog!
            </div>
          )}

          <form onSubmit={handleAddProduct} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Product Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Dulo & Pippin's Starlight Adventure"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Subtitle / Key Hook</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. A 40-minute bedtime journey with calming audio"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Price ($ USD, 0 for Free)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="5.99"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Pages or Duration</label>
                <input
                  type="text"
                  value={pagesOrDuration}
                  onChange={(e) => setPagesOrDuration(e.target.value)}
                  placeholder="e.g. 45 Min Audio or 40 Pages"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="ebooks">eBooks & Guides</option>
                  <option value="printables">Printables & Crafts</option>
                  <option value="audio">Audiobooks & Audio Tracks</option>
                  <option value="educational">Educational Workbooks</option>
                  <option value="planners">Planners & Trackers</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="Instant PDF">Instant PDF</option>
                  <option value="MP3 Audio">MP3 Audio</option>
                  <option value="ZIP Pack">ZIP Pack</option>
                  <option value="EPUB / PDF">EPUB / PDF</option>
                  <option value="Printable Sheet">Printable Sheet</option>
                </select>
              </div>
            </div>

            {/* DULO TOONS Toggle */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-xs text-emerald-950 block">🐉 DULO TOONS Universe</span>
                <span className="text-[10px] text-emerald-700">Feature this in the Dulo Toons Universe collection</span>
              </div>
              <input
                type="checkbox"
                checked={isDuloToons}
                onChange={(e) => setIsDuloToons(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Cover Thumbnail URL</label>
              <input
                type="url"
                value={mockupUrl}
                onChange={(e) => setMockupUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Description</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed breakdown of what buyers receive in their digital download..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs rounded-xl shadow-playful hover:shadow-playful-hover transition-all"
            >
              Publish Digital Asset
            </button>
          </form>
        </div>

        {/* Existing Products List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-extrabold text-base text-slate-900">Current Marketplace Catalog ({products.length})</h2>

          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.thumbnail_url}
                    alt={p.title}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug flex items-center gap-1.5">
                      {p.title}
                      {p.is_dulo_toons && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.2 rounded">
                          🐉 DULO
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 mt-1">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">{p.category}</span>
                      <span className="bg-amber-100 px-2 py-0.5 rounded font-semibold text-amber-800">{p.format}</span>
                      {p.pages_or_duration && <span>{p.pages_or_duration}</span>}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-black text-sm text-slate-900">
                    {p.price === 0 ? 'FREE' : `$${p.price.toFixed(2)}`}
                  </span>
                  <a
                    href={`/product/${p.slug}`}
                    target="_blank"
                    className="block text-[11px] font-bold text-pink-500 hover:underline mt-1"
                  >
                    View PDP →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
