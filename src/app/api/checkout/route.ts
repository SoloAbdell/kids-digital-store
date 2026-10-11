import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { SAMPLE_PRODUCTS } from '@/lib/products';

export async function POST(req: Request) {
  try {
    const { productId, customerEmail, customerName } = await req.json();

    const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // If Stripe secret key is not configured, return demo fallback
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      return NextResponse.json({
        url: `${appUrl}/success?session_id=demo_${Date.now()}&productId=${product.id}&email=${encodeURIComponent(customerEmail || '')}&name=${encodeURIComponent(customerName || '')}`,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
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
        customerName: customerName || '',
        customerEmail: customerEmail || '',
      },
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&productId=${product.id}`,
      cancel_url: `${appUrl}/product/${product.slug}?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Checkout creation failed' }, { status: 500 });
  }
}
