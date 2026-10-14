import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';

export const metadata: Metadata = {
  title: 'DULO TOONS | Digital Products for Every Dream',
  description: 'Digital Products for Every Dream: Planners, Templates, Printables, Workbooks, Coloring Books, Wall Art, and Bundles for children & parents.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FFFDF9] text-slate-800 antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
        </CartProvider>
      </body>
    </html>
  );
}
