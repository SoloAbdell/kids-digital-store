---
name: tagline-store-architecture
description: >-
  Complete architecture, design patterns, payment security, and procedural runbooks
  for Tagline (kids digital marketplace) and interactive 3D video-backed e-commerce web applications.
  Use this skill when developing, refactoring, styling, or adding features to Tagline or any store with
  fixed 3D video backgrounds, glassmorphism cards, PCI-DSS payment gateways, and expiring digital downloads.
---

# Tagline Store Architecture & Development Blueprint

This skill encapsulates all architectural decisions, design implementations, security protocols, and operational workflows developed for the **Tagline** digital store.

---

## 1. Core Architecture Modules

### A. Fixed Global 3D Video Background & Glassmorphism
- **Purpose**: Creates an ultra-immersive Disney/Pixar atmosphere where an 8-second seamless looping 3D video (`/hero-background.mp4` / `/hero-banner.jpg`) stays fixed in the viewport while the entire marketplace scrolls naturally on top.
- **Rule of Transparency**: Outer section containers (`.glass-section`, `#catalog`, `#dulo-toons`, `#why-us`, `#freebie`, `#faq`) MUST have `background: transparent` and zero solid white blocks.
- **Vivid Overlay**: `.global-overlay` uses an ultra-light radial gradient (`rgba(255, 255, 255, 0.08)` to `0.22`) to avoid washing out the video.
- **Cards & Inputs**: Compact elements use frosted glass (`bg-white/80` or `bg-white/85` with `backdrop-blur-md` and `border-white/80`).
- **Text Legibility**: Dark text (`#1e1b4b`, `text-slate-900`) uses `.text-contrast-title` (`text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9), 0 2px 10px rgba(0, 0, 0, 0.08)`).
- **Reference**: [video-background-and-glassmorphism.md](./references/video-background-and-glassmorphism.md)

### B. Multi-Gateway Payment Security (PCI-DSS Level 1)
- **Supported Gateways**: Stripe Checkout, PayPal Orders v2, and Crypto (Coinbase Commerce / Web3).
- **Zero Cardholder Storage**: Hosted checkout flows only; card data never touches the server.
- **Webhook Verification**: Raw request body cryptographic signature validation (`stripe-signature`, PayPal Transmission Headers, HMAC-SHA256).
- **Idempotency**: Persistent ledger (`storage/transactions-ledger.json`) tracking event IDs to prevent replay attacks.
- **Private Asset Vault**: Digital assets stored in `storage/private-vault/` outside public web roots. Fulfillments generate random 32-byte tokens expiring in 48 hours with a 3-download quota limit.
- **Reference**: [multi-gateway-payment-security.md](./references/multi-gateway-payment-security.md)

### C. Branding & Universe Spotlight
- **Brand Name**: **Tagline** ("Your Cozy Hub for Digital Crafts, Stories & Learning").
- **Logo**: 3D metallic chrome neon emblem in `/public/logo.jpg`.
- **Exclusive Franchise**: **DULO TOONS** (starring Dulo the Baby Dragon, Bedtime Audio MP3s, 3D papercraft gliders, coloring sheets).
- **Color Palette**:
  - Dragon Green: `#0d9488` / `emerald-600`
  - Violet Magic: `#6366f1` / `purple-600`
  - Sunset Amber: `#ea580c` / `#f59e0b` / `amber-400`
  - Deep Navy Text: `#1e1b4b`

### D. Windows Development & Tooling
- **PowerShell PATH & Environment**: Prepend MinGit and system PATH for node/git.
- **Native curl**: Use `curl.exe` to avoid PowerShell's `Invoke-WebRequest` alias.
- **Command Chaining**: Use `;` in PowerShell instead of `&&`.
- **Reference**: [windows-and-tooling-cheatsheet.md](./references/windows-and-tooling-cheatsheet.md)

---

## 2. Standard Verification Checklist

When making any code or UI modifications to Tagline:
1. **No Opaque Blocks**: Ensure no newly introduced container has solid white background (`bg-white` or opaque `rgba`) covering the 3D video.
2. **Text Contrast**: Verify titles and subtitles have strong contrast against the sunlight and ambient particles.
3. **Type Safety**: Run `npx.cmd tsc --noEmit` and ensure 0 errors.
4. **Endpoint Health**: Test `curl.exe -I http://localhost:3000/` and verify `HTTP 200 OK` with full security headers.
5. **Git Sync**: Commit with clear conventional commit messages and push to `origin main`.
