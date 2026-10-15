# Fixed Global 3D Video Background & Glassmorphism System

This reference document outlines the exact architecture used in Tagline to create an uninterrupted, full-viewport 3D animated video background where all page sections and cards glide seamlessly over the animation upon scrolling, without solid white boxes blocking the view.

---

## 1. Core Architecture Overview

```
Viewport (Screen)
│
├── Layer -2: <video class="global-3d-background"> (Fixed 100vw x 100vh)
│             ├── Autoplay, loop, muted, playsInline
│             └── Fallback poster image
│
├── Layer -1: <div class="global-overlay"> (Fixed 100vw x 100vh)
│             └── Ultra-light radial gradient (preserves 100% video vibrancy)
│
├── Layer -1: Ambient Floating Golden Dust Particles (Fixed 100vw x 100vh)
│             └── Animated with floatDust keyframes
│
└── Layer 1:  <main class="page-content"> (Relative, scrolls naturally)
              ├── Section 1: Hero (Text floats directly on background)
              ├── Section 2: Category Explorer (Transparent container, frosted cards)
              ├── Section 3: DULO TOONS Spotlight (Transparent container, frosted cards)
              ├── Section 4: Product Catalog (Transparent container, frosted cards)
              ├── Section 5: Why Us / About (Transparent container, frosted cards)
              ├── Section 6: Lead Magnet Hub (Transparent container, frosted form)
              ├── Section 7: Reviews (Transparent container, frosted cards)
              └── Section 8: FAQ (Transparent container, frosted accordion)
```

---

## 2. Root Layout Implementation (`src/app/layout.tsx`)

In Next.js App Router, the video and overlay MUST reside in `RootLayout` so they do not reload or flicker during client-side navigation or scrolling.

```tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-transparent text-slate-800 antialiased relative">
        {/* 1. Global 3D Fixed Background Video */}
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
          <img src="/hero-banner.jpg" alt="3D Pixar Scene" className="w-full h-full object-cover" />
        </video>

        {/* 2. Global Overlay: Preserves contrast without dimming animation */}
        <div className="global-overlay fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none" />

        {/* 3. Floating Ambient Golden Dust Particles in sunlight */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="ambient-dust-particle w-2.5 h-2.5 top-1/4 left-1/3" style={{ animationDelay: '0s' }} />
          <div className="ambient-dust-particle w-3 h-3 top-1/3 right-1/4" style={{ animationDelay: '2.5s' }} />
          <div className="ambient-dust-particle w-2 h-2 top-1/2 left-1/2" style={{ animationDelay: '4s' }} />
          <div className="ambient-dust-particle w-3.5 h-3.5 top-1/5 right-1/3" style={{ animationDelay: '1.2s' }} />
          <div className="ambient-dust-particle w-2 h-2 top-2/3 left-1/4" style={{ animationDelay: '3.3s' }} />
          <div className="ambient-dust-particle w-2.5 h-2.5 top-3/4 right-1/5" style={{ animationDelay: '5s' }} />
        </div>

        {/* 4. Page Content */}
        <Navbar />
        <main className="page-content flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 3. Global CSS Definitions (`src/app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 1. RESET: Must ensure body background is transparent */
body {
  margin: 0;
  padding: 0;
  background-color: transparent;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
}

/* 2. FIXED 3D BACKGROUND */
.global-3d-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
  pointer-events: none;
}

/* 3. ULTRA-LIGHT OVERLAY: 8% to 22% white radial vignette */
.global-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(245, 243, 255, 0.22) 100%);
  z-index: -1;
  pointer-events: none;
}

/* 4. NATURAL SCROLLING CONTENT */
.page-content {
  position: relative;
  z-index: 1;
}

/* 5. TRANSPARENT SECTION CONTAINERS (Prevents opaque white blocks) */
.glass-section {
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: none;
  box-shadow: none;
}

/* 6. INDIVIDUAL FROSTED GLASS CARDS */
.cozy-glass-card {
  background: rgba(255, 255, 255, 0.80);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.70);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

/* 7. HIGH-CONTRAST TEXT SHADOW UTILITY */
.text-contrast-title {
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9), 0 2px 10px rgba(0, 0, 0, 0.08);
}

/* 8. AMBIENT GOLDEN DUST PARTICLES */
@keyframes floatDust {
  0% {
    transform: translateY(0) translateX(0) scale(0.8);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-30px) translateX(15px) scale(1.1);
    opacity: 0.85;
  }
  100% {
    transform: translateY(-60px) translateX(-10px) scale(0.8);
    opacity: 0;
  }
}

.ambient-dust-particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(253, 224, 71, 0.9) 0%, rgba(245, 158, 11, 0) 75%);
  animation: floatDust 7s ease-in-out infinite;
}
```

---

## 4. Section & Card Styling Rules

1. **Outer Sections**:
   - MUST have `background: transparent;` (never `bg-white` or `bg-slate-50`).
   - Use standard horizontal padding (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-6`).

2. **Section Headings & Badges**:
   - Badges: `bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs`.
   - Titles: Apply `text-contrast-title` and bold dark colors (`#1e1b4b` or `text-slate-900`) so they stand out crisply against the bright parts of the video (sunlight/window).
   - Subtitles: `text-slate-700 font-semibold`.

3. **Individual Cards (Product Cards, Reviews, Categories)**:
   - Use `bg-white/80` or `bg-white/85` with `backdrop-blur-md` and `border border-white/80 shadow-xs`.
   - On hover: `hover:bg-white/95 hover:shadow-xl hover:-translate-y-1 transition-all`.
   - This keeps the cards readable and clickable without creating a giant white block across the screen.
