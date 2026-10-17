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
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 antialiased relative">
        {/* Subtle, soft ambient warm glow in background */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-indigo-50/50 rounded-full blur-3xl" />
          <div className="absolute bottom-10 -left-32 w-96 h-96 bg-teal-50/40 rounded-full blur-3xl" />
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
