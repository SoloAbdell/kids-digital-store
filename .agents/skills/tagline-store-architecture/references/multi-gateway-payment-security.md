# Multi-Gateway Payment Security & Zero-Leakage Architecture

This document specifies the industry-standard, PCI-DSS Level 1 compliant electronic payment processing and digital asset fulfillment architecture built for Tagline.

---

## 1. Compliance & Security Tenets

1. **Zero Cardholder Data Storage**:
   - Card numbers, CVVs, and expiration dates NEVER pass through or touch the application server.
   - All checkouts use hosted/tokenized gateway flows:
     - **Stripe**: Hosted Checkout Sessions (`stripe.checkout.sessions.create`).
     - **PayPal**: Orders API v2 (`/v2/checkout/orders`).
     - **Crypto**: Coinbase Commerce Hosted Charges / Web3 HMAC-signed transactions.

2. **Server-Side Webhook Verification Only**:
   - Downloads are NEVER issued based on client-side frontend redirect callbacks (`/success?status=paid`), because query parameters can be spoofed by attackers.
   - Fulfillment occurs ONLY when the server verifies the raw cryptographic webhook signature from the payment provider.

3. **Strict Idempotency & Replay Attack Defense**:
   - Every incoming webhook event ID (`event.id` or `transmission_id`) is checked against the persistent transaction ledger (`storage/transactions-ledger.json`).
   - If an event ID was already processed, the server immediately returns `HTTP 200 { received: true, idempotent: true }` without generating duplicate download tokens or firing duplicate fulfillment tasks.

4. **Ephemeral, Quota-Limited Private Vault Streaming**:
   - Real asset files (PDFs, MP3s, EPUBs) are kept in `storage/private-vault/` outside public web directories.
   - When payment succeeds, a cryptographically random token (`crypto.randomBytes(32).toString('hex')`) is minted.
   - Tokens expire automatically after 48 hours and have a strict download limit (maximum 3 downloads).
   - Route `/api/download/[token]` verifies token expiry, decrements quota, and streams the binary with `Content-Disposition: attachment; filename="..."`.

---

## 2. Webhook Signature Verification Matrix

| Gateway | Header / Method | Verification Mechanism |
| :--- | :--- | :--- |
| **Stripe** | `stripe-signature` | `stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)` |
| **PayPal** | `PAYPAL-TRANSMISSION-ID`, `PAYPAL-TRANSMISSION-SIG`, `PAYPAL-CERT-URL` | PayPal Webhooks Verification API (`/v1/notifications/verify-webhook-signature`) |
| **Crypto** | `x-cc-webhook-signature` | HMAC-SHA256(`rawBody`, `process.env.CRYPTO_WEBHOOK_SECRET`) === header |

---

## 3. Persistent Transaction Ledger Interface (`src/lib/transactions.ts`)

```typescript
export interface Transaction {
  id: string;
  provider: 'stripe' | 'paypal' | 'crypto';
  externalTransactionId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  items: Array<{ productId: string; quantity: number }>;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  completedAt?: string;
  downloadToken?: string;
  downloadTokenExpiresAt?: string;
  downloadCount: number;
  maxDownloads: number;
}
```

---

## 4. Security Middleware Headers (`src/middleware.ts`)

To prevent clickjacking, MIME sniffing, and cross-site scripting:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy`:
  - `frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.paypal.com https://commerce.coinbase.com;`
  - `frame-ancestors 'none';`
