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
      <body className="min-h-screen flex flex-col bg-transparent text-slate-800 antialiased relative">
        {/* 1. Global 3D Fixed Background Video / Poster (Fixe au Scroll sur toute la page) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-banner.jpg"
          className="global-3d-background fixed top-0 left-0 w-screen h-screen object-cover -z-20 pointer-events-none"
        >
          <source src="/hero-background.webm" type="video/webm" />
          <source src="/hero-background.mp4" type="video/mp4" />
          <source src="/hero-banner.webm" type="video/webm" />
          <source src="/hero-banner.mp4" type="video/mp4" />
          <img
            src="/hero-banner.jpg"
            alt="3D Pixar Scene"
            className="w-full h-full object-cover"
          />
        </video>

        {/* 2. Global Overlay Fixe pour la lisibilité du texte */}
        <div className="global-overlay fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none" />

        {/* 3. Floating Ambient Golden Dust Particles across the viewport */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="ambient-dust-particle w-2.5 h-2.5 top-1/4 left-1/3" style={{ animationDelay: '0s' }} />
          <div className="ambient-dust-particle w-3 h-3 top-1/3 right-1/4" style={{ animationDelay: '2.5s' }} />
          <div className="ambient-dust-particle w-2 h-2 top-1/2 left-1/2" style={{ animationDelay: '4s' }} />
          <div className="ambient-dust-particle w-3.5 h-3.5 top-1/5 right-1/3" style={{ animationDelay: '1.2s' }} />
          <div className="ambient-dust-particle w-2 h-2 top-2/3 left-1/4" style={{ animationDelay: '3.3s' }} />
          <div className="ambient-dust-particle w-2.5 h-2.5 top-3/4 right-1/5" style={{ animationDelay: '5s' }} />
        </div>

        {/* 4. Page Content with Cart Context */}
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
