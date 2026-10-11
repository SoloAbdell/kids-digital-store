# 🎈 LittleNest Printables - Kids Digital Products Store

A high-converting, mobile-first e-commerce web application built for selling digital download printable activities (coloring books, cut-and-paste crafts, and early learning workbooks) directly to parents and educators.

---

## 🚀 Key Features Built-In

1. **Storefront & Catalog:**
   - Filter by Age Group (`3-5`, `6-8`, `9+`, `All Ages`).
   - Filter by Activity Category (`Coloring`, `Crafts`, `Math & Letters`, `STEM`, `Bundles`).
   - Child-friendly pastel aesthetic with playful typography & soft shadows.

2. **Product Detail Page (PDP):**
   - High-resolution preview image galleries.
   - Watermarked sample preview viewer to protect digital intellectual property.
   - Paper size & printing specifications guide.
   - Instant guest checkout form (No forced registration).

3. **Digital Delivery & Security System:**
   - Post-purchase automated delivery page (`/success`) with direct download.
   - Secure tokenized download route (`/api/download/[token]`) with 48h expiration and 5 download limits.
   - Private Supabase Storage bucket integration with time-limited signed URLs (prevents hotlinking).
   - Automated delivery email sent via Resend API.

4. **Lead Magnet Opt-In:**
   - Free 5-page sample starter pack lead capture form to build an email newsletter list.

5. **Admin Dashboard (`/admin`):**
   - Manage and add new PDF activity products, set pricing, and inspect stats.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) & React 18
- **Styling:** Tailwind CSS (Custom Pastel Palette) & Lucide React
- **Database & Storage:** Supabase (PostgreSQL + Private Storage Bucket)
- **Payments:** Stripe Checkout
- **Transactional Emails:** Resend

---

## 💻 Quick Start Guide

### 1. Install Node.js (If not already installed)
Open PowerShell and run:
```powershell
winget install OpenJS.NodeJS.LTS
```
Then restart your terminal.

### 2. Install Dependencies
```powershell
cd C:\Users\pc\.gemini\antigravity\scratch\kids-digital-store
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env.local` and add your keys:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=re_...
```

### 4. Setup Database Schema
Execute the SQL script in `supabase/schema.sql` in your Supabase SQL editor.

### 5. Run Development Server
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
