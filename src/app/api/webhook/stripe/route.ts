import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { sendDeliveryEmail } from '@/lib/email';
import { SAMPLE_PRODUCTS } from '@/lib/products';
import { createDownloadToken } from '@/lib/security';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: any;

  try {
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata || {};
    const productId = metadata.productId;
    const customerEmail = session.customer_details?.email || metadata.customerEmail;
    const customerName = session.customer_details?.name || metadata.customerName || 'Valued Parent';

    const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
    const productTitle = product ? product.title : 'Kids Activity Pack';

    // 1. Generate unique, time-expiring HMAC signed download token
    const token = createDownloadToken({
      productId,
      orderId: session.id,
      email: customerEmail,
      expiryHours: 48,
      maxDownloads: 5,
    });
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(); // 48 hours

    try {
      // 2. Insert order and token in Supabase
      const { data: orderData } = await supabaseAdmin
        .from('orders')
        .insert({
          customer_name: customerName,
          customer_email: customerEmail,
          product_id: productId,
          amount_paid: (session.amount_total || 0) / 100,
          currency: session.currency?.toUpperCase() || 'USD',
          stripe_session_id: session.id,
          status: 'completed',
        })
        .select()
        .single();

      await supabaseAdmin.from('download_tokens').insert({
        token,
        order_id: orderData?.id || null,
        product_id: productId,
        customer_email: customerEmail,
        max_downloads: 5,
        expires_at: expiresAt,
      });

      // 3. Send automated delivery email
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const downloadUrl = `${appUrl}/api/download/${token}`;

      await sendDeliveryEmail({
        to: customerEmail,
        customerName,
        productTitle,
        downloadUrl,
      });

      console.log(`[Order Completed] Delivered ${productTitle} to ${customerEmail}`);
    } catch (dbErr) {
      console.error('Error recording order/token:', dbErr);
    }
  }

  return NextResponse.json({ received: true });
}
