'use client';

import { useCart } from '@/context/CartContext';
import { X, Trash2, ArrowRight, Download, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, totalPrice, totalCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Instant simulation/redirect to checkout
    const firstProduct = cart[0]?.product;
    if (firstProduct) {
      setTimeout(() => {
        window.location.href = `/product/${firstProduct.slug}`;
      }, 400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between rounded-l-3xl overflow-hidden border-l border-slate-100">
          {/* Header */}
          <div className="p-6 bg-gradient-to-b from-amber-50/60 to-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Your Download Cart</h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  {totalCount} {totalCount === 1 ? 'digital item' : 'digital items'} ready for download
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto text-3xl">
                  🛒
                </div>
                <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore Tagline's cozy digital stories, bedtime audiobooks, and 3D paper crafts!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Browse Store Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(({ product }) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 group hover:border-amber-200 transition-colors"
                  >
                    <img
                      src={product.thumbnail_url}
                      alt={product.title}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                          {product.format}
                        </span>
                        {product.is_dulo_toons && (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                            🐉 Dulo
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {product.title}
                      </h4>

                      <div className="flex items-center justify-between mt-1">
                        <span className="font-black text-xs text-slate-900">
                          {product.price === 0 ? 'FREE' : `$${product.price.toFixed(2)}`}
                        </span>
                        <span className="text-[10px] text-slate-400">Instant PDF/MP3</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200/80 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Digital Items:</span>
                  <span className="font-bold text-slate-700">{totalCount} files</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Shipping & Delivery:</span>
                  <span className="font-bold text-emerald-600">FREE Instant Download</span>
                </div>
                <div className="flex items-center justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-lg font-black text-slate-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-playful hover:shadow-playful-hover transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isCheckingOut ? 'Loading Secure Checkout...' : 'Proceed to Instant Download'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSL Encrypted • 30-Day Happiness Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
