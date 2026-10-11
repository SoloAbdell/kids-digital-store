'use client';

import { useState } from 'react';
import { SAMPLE_PRODUCTS } from '@/lib/products';
import { Product } from '@/lib/types';
import { PlusCircle, Package, DollarSign, Users, ShieldAlert, ArrowRight, Check } from 'lucide-react';

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);

  // Form states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [pagesCount, setPagesCount] = useState('');
  const [ageGroup, setAgeGroup] = useState<'3-5' | '6-8' | '9+' | 'all'>('3-5');
  const [category, setCategory] = useState<'coloring' | 'crafts' | 'math-letters' | 'stem' | 'bundles'>('coloring');
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
      price: parseFloat(price) || 4.99,
      currency: 'USD',
      age_group: ageGroup,
      category,
      pages_count: parseInt(pagesCount) || 20,
      format: 'PDF Printable (A4 & US Letter)',
      thumbnail_url: mockupUrl || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
      preview_images: [mockupUrl || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80'],
      storage_file_path: `products/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`,
      is_featured: false,
      description,
    };

    setProducts([newProduct, ...products]);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);

    // Reset form
    setTitle('');
    setPrice('');
    setPagesCount('');
    setDescription('');
    setMockupUrl('');
  };

  if (!isAuthenticated) {
    return (
      <div className="py-24 max-w-md mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto text-xl">
            🔒
          </div>
          <h1 className="font-extrabold text-xl text-slate-900">Admin Store Portal</h1>
          <p className="text-xs text-slate-500">Enter your store administrator passcode to manage products & downloads.</p>

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

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Admin Product & Sales Manager</h1>
          <p className="text-xs text-slate-500">Manage digital PDF downloads, pricing, and live catalog items.</p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-xs font-bold text-slate-400 hover:text-slate-800"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Active Products</span>
            <h3 className="text-2xl font-black text-slate-900">{products.length} Packs</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Avg. Order Value</span>
            <h3 className="text-2xl font-black text-slate-900">$8.49</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Freebie Leads Captured</span>
            <h3 className="text-2xl font-black text-slate-900">1,240 Parents</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upload / Add Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-pink-500" />
            <h2 className="font-extrabold text-base text-slate-900">Add New Printable Activity Pack</h2>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" /> Product published successfully to the store!
            </div>
          )}

          <form onSubmit={handleAddProduct} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Pack Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Space Odyssey Logic Mazes"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Price ($ USD)</label>
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
                <label className="block text-xs font-bold text-slate-600 mb-1">Page Count</label>
                <input
                  type="number"
                  required
                  value={pagesCount}
                  onChange={(e) => setPagesCount(e.target.value)}
                  placeholder="30"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Age Group</label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="3-5">3–5 yrs</option>
                  <option value="6-8">6–8 yrs</option>
                  <option value="9+">9+ yrs</option>
                  <option value="all">All Ages</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="coloring">Coloring</option>
                  <option value="crafts">Cut & Paste Crafts</option>
                  <option value="math-letters">Math & Letters</option>
                  <option value="stem">STEM Mazes</option>
                  <option value="bundles">Bundles</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Cover Mockup Image URL</label>
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
                placeholder="Describe what parents & kids will find inside..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs rounded-xl shadow-playful hover:shadow-playful-hover transition-all"
            >
              Publish Activity Pack
            </button>
          </form>
        </div>

        {/* Existing Products List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-extrabold text-base text-slate-900">Current Catalog ({products.length})</h2>

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
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">{p.title}</h3>
                    <div className="flex gap-2 text-[10px] text-slate-400 mt-1">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">Ages {p.age_group}</span>
                      <span className="bg-amber-100 px-2 py-0.5 rounded font-semibold text-amber-800">{p.category}</span>
                      <span>{p.pages_count} pages</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-black text-sm text-slate-900">${p.price.toFixed(2)}</span>
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
