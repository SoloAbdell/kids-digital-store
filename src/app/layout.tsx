import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
export const metadata: Metadata = {
  title: 'Tagline | Your Cozy Hub for Digital Crafts, Stories & Learning',
  description: 'Discover downloadable eBooks, creative paper crafts, bedtime audiobooks, and fun learning activities for the whole family at Tagline.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800 antialiased relative selection:bg-emerald-100 selection:text-emerald-800">
        {/* Storybook Whimsical Canvas with Soft Pastel Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Soft Warm Pastel Ambient Glows */}
          <div className="absolute -top-24 -left-20 w-[38rem] h-[38rem] bg-amber-100/60 rounded-full blur-[100px]" />
          <div className="absolute top-1/4 -right-24 w-[36rem] h-[36rem] bg-teal-100/50 rounded-full blur-[100px]" />
          <div className="absolute top-2/3 -left-20 w-[32rem] h-[32rem] bg-indigo-100/40 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 right-1/4 w-[34rem] h-[34rem] bg-rose-100/40 rounded-full blur-[100px]" />

          {/* Whimsical Storybook Sparkles (Floating softly in the margins) */}
          <div className="absolute top-28 left-[6%] text-amber-400/40 text-2xl select-none">✦</div>
          <div className="absolute top-64 right-[8%] text-teal-400/40 text-xl select-none">★</div>
          <div className="absolute top-[45%] left-[3%] text-indigo-400/35 text-2xl select-none">✨</div>
          <div className="absolute top-[68%] right-[5%] text-rose-400/40 text-2xl select-none">✦</div>
          <div className="absolute top-[85%] left-[7%] text-amber-400/35 text-xl select-none">★</div>
        </div>

        {/* Page Content with Cart Context */}
        <CartProvider>
          <Navbar />
          <main className="page-content flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
        </CartProvider>
      </body>
    </html>
  );
}
