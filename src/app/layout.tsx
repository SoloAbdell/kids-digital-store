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
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased relative selection:bg-emerald-100 selection:text-emerald-800">
        {/* Modern luminous ambient glows & subtle grid */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60" />
          {/* Soft ambient luminous lights */}
          <div className="absolute -top-24 left-1/4 w-[36rem] h-[36rem] bg-teal-200/25 rounded-full blur-[110px]" />
          <div className="absolute top-1/4 -right-24 w-[32rem] h-[32rem] bg-indigo-200/25 rounded-full blur-[110px]" />
          <div className="absolute top-2/3 -left-24 w-[28rem] h-[28rem] bg-amber-200/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 right-1/4 w-[32rem] h-[32rem] bg-teal-200/20 rounded-full blur-[110px]" />
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
