import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { fulfillOrderAndDeliver } from '@/lib/transactions';
import { handleSecureError } from '@/lib/error-masking';

export async function POST(req: Request) {
  // 1. Raw Body Reading (strictly required for cryptographic signature calculation)
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature && process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  let event: any;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret && !webhookSecret.includes('placeholder')) {
      // Cryptographic signature verification via official Stripe SDK
      event = stripe.webhooks.constructEvent(body, signature as string, webhookSecret);
    } else {
      // Development fallback when testing locally without live Stripe CLI webhook forwarding
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`[Stripe Webhook Signature Failed]:`, err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed.' },
      { status: 400 }
    );
  }

  try {
    // 2. Handle verified payment events
    if (event.type === 'checkout.session.completed' || event.type === 'payment_intent.succeeded') {
      const session = event.data.object;
      const metadata = session.metadata || {};

      const gatewayTransactionId = session.id || session.payment_intent;
      const productId = metadata.productId || session.client_reference_id;
      const customerEmail =
        session.customer_details?.email || metadata.customerEmail || session.receipt_email;
      const customerName =
        session.customer_details?.name || metadata.customerName || 'Valued Customer';
      const amount = (session.amount_total || session.amount || 0) / 100;
      const currency = session.currency || 'USD';

      if (!productId || !customerEmail) {
        console.warn('[Stripe Webhook] Received event without complete product or customer metadata:', session.id);
        return NextResponse.json({ received: true, note: 'Metadata missing' });
      }

      // 3. Fulfill Order with Idempotency & Replay Prevention
      const fulfillment = await fulfillOrderAndDeliver({
        provider: 'stripe',
        gatewayTransactionId,
        productId,
        customerEmail,
        customerName,
        amount,
        currency,
      });

      console.log(`[Stripe Webhook Success] Processed ${gatewayTransactionId} - Already fulfilled: ${fulfillment.alreadyFulfilled}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return handleSecureError('StripeWebhook', err);
  }
}
