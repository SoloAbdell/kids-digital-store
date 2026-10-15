import { NextResponse } from 'next/server';
import { SAMPLE_PRODUCTS } from '@/lib/products';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { sanitizeString, sanitizeEmail, validateCsrfOrigin } from '@/lib/sanitization';
import { handleSecureError, enforceHttps } from '@/lib/error-masking';
import {
  createStripeCheckoutSession,
  createPayPalOrder,
  createCryptoCharge,
} from '@/lib/payment-gateways';
import { PaymentProvider } from '@/lib/types';

export async function POST(req: Request) {
  // 1. Transport Security Check
  if (!enforceHttps(req)) {
    return NextResponse.json(
      { error: 'Insecure transport rejected. HTTPS is strictly enforced.' },
      { status: 403 }
    );
  }

  // 2. CSRF Origin Validation
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json(
      { error: 'Cross-origin request rejected.' },
      { status: 403 }
    );
  }

  // 3. Rate Limiting Protection (Prevent card testing / spam)
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(`checkout:${clientIp}`, 15, 900); // 15 checkouts per 15 min

  if (!rateLimitResult.allowed) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many checkout requests. Please wait a few moments before trying again.',
        retryAfter: rateLimitResult.retryAfterSeconds,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimitResult.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const body = await req.json();

    // 4. Input Sanitization & Strict Validation
    const productId = sanitizeString(body.productId, 100);
    const customerEmail = sanitizeEmail(body.customerEmail);
    const customerName = sanitizeString(body.customerName || '', 120);
    const rawProvider = sanitizeString(body.provider || 'stripe', 20).toLowerCase();

    const provider: PaymentProvider =
      rawProvider === 'paypal' ? 'paypal' : rawProvider === 'crypto' ? 'crypto' : 'stripe';

    if (!productId) {
      return NextResponse.json({ error: 'Valid product ID is required.' }, { status: 400 });
    }

    if (!customerEmail) {
      return NextResponse.json({ error: 'Valid email address is required for digital delivery.' }, { status: 400 });
    }

    const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found in marketplace catalog.' }, { status: 404 });
    }

    // 5. Initiate Hosted Gateway Session (PCI-DSS: Zero sensitive card/financial details touch our server)
    let sessionResult;
    if (provider === 'paypal') {
      sessionResult = await createPayPalOrder({
        product,
        customerEmail,
        customerName: customerName || 'Valued Parent',
      });
    } else if (provider === 'crypto') {
      sessionResult = await createCryptoCharge({
        product,
        customerEmail,
        customerName: customerName || 'Valued Parent',
      });
    } else {
      // Default: Stripe Credit/Debit Cards
      sessionResult = await createStripeCheckoutSession({
        product,
        customerEmail,
        customerName: customerName || 'Valued Parent',
      });
    }

    // Return hosted checkout URL
    return NextResponse.json({
      url: sessionResult.url,
      orderId: sessionResult.orderId,
      provider: sessionResult.provider,
      gatewayTransactionId: sessionResult.gatewayTransactionId,
    });
  } catch (error: unknown) {
    return handleSecureError('CheckoutRoute', error);
  }
}
