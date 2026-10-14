import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { SAMPLE_PRODUCTS } from '@/lib/products';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { sanitizeString, sanitizeEmail, validateCsrfOrigin } from '@/lib/sanitization';
import { createDownloadToken } from '@/lib/security';

export async function POST(req: Request) {
  // 1. CSRF Origin Validation
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json(
      { error: 'Cross-origin request rejected.' },
      { status: 403 }
    );
  }

  // 2. DDoS & Carding Prevention (Rate limit checkout sessions per IP)
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(`checkout:${clientIp}`, 15, 900); // 15 requests per 15 minutes

  if (!rateLimitResult.allowed) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many checkout requests initiated. Please wait a few moments before trying again.',
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

    // 3. Input Sanitization & Validation
    const productId = sanitizeString(body.productId, 100);
    const customerEmail = sanitizeEmail(body.customerEmail);
    const customerName = sanitizeString(body.customerName || '', 120);

    if (!productId) {
      return NextResponse.json({ error: 'Valid product ID is required.' }, { status: 400 });
    }

    const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found in marketplace catalog.' }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Generate cryptographically signed token for asset delivery
    const signedDownloadToken = createDownloadToken({
      productId: product.id,
      orderId,
      email: customerEmail || 'guest@tagline.store',
      expiryHours: 48,
      maxDownloads: 5,
    });

    // 4. Handle Demo Mode if Stripe is not configured
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      return NextResponse.json({
        url: `${appUrl}/success?session_id=${orderId}&productId=${product.id}&token=${encodeURIComponent(signedDownloadToken)}&name=${encodeURIComponent(customerName)}`,
      });
    }

    // 5. Create Secure Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: product.currency.toLowerCase(),
            product_data: {
              name: product.title,
              description: `${product.pages_count} Pages • Printable Kids Activity PDF`,
              images: [product.thumbnail_url],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: product.id,
        orderId,
        customerName: customerName || '',
        customerEmail: customerEmail || '',
        downloadToken: signedDownloadToken,
      },
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&productId=${product.id}&token=${encodeURIComponent(signedDownloadToken)}`,
      cancel_url: `${appUrl}/product/${product.slug}?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Checkout session could not be established.' },
      { status: 500 }
    );
  }
}
