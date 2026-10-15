import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { fulfillOrderAndDeliver } from '@/lib/transactions';
import { handleSecureError } from '@/lib/error-masking';

export async function POST(req: Request) {
  // 1. Raw Body Reading (strictly required for HMAC hashing)
  const rawBody = await req.text();
  const signature = headers().get('x-cc-webhook-signature');
  const secret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET;

  const isConfigured = secret && !secret.includes('placeholder');

  let event: any;

  if (isConfigured) {
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing x-cc-webhook-signature header.' },
        { status: 400 }
      );
    }

    try {
      // Calculate HMAC SHA-256 over raw text body
      const computedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');

      const sigBuffer = Buffer.from(signature, 'hex');
      const compBuffer = Buffer.from(computedSignature, 'hex');

      if (
        sigBuffer.length !== compBuffer.length ||
        !crypto.timingSafeEqual(sigBuffer, compBuffer)
      ) {
        console.error('[Crypto Webhook] HMAC signature mismatch.');
        return NextResponse.json(
          { error: 'Invalid HMAC cryptographic signature.' },
          { status: 400 }
        );
      }

      event = JSON.parse(rawBody).event;
    } catch (err: any) {
      console.error('[Crypto Webhook Error]:', err.message);
      return NextResponse.json({ error: 'Signature verification error.' }, { status: 400 });
    }
  } else {
    // Development fallback parsing
    try {
      const parsed = JSON.parse(rawBody);
      event = parsed.event || parsed;
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload.' }, { status: 400 });
    }
  }

  try {
    const eventType = event.type;

    // Process confirmed or resolved crypto charges
    if (eventType === 'charge:confirmed' || eventType === 'charge:resolved') {
      const charge = event.data;
      const metadata = charge.metadata || {};

      const gatewayTransactionId = charge.code || charge.id;
      const productId = metadata.productId || 'prod_1';
      const customerEmail = metadata.customerEmail || charge.customer_email || 'crypto@tagline.store';
      const customerName = metadata.customerName || 'Crypto Supporter';
      const amount = parseFloat(charge.pricing?.local?.amount || '0');
      const currency = charge.pricing?.local?.currency || 'USD';

      // Strict fulfillment with idempotency
      const fulfillment = await fulfillOrderAndDeliver({
        provider: 'crypto',
        gatewayTransactionId,
        productId,
        customerEmail,
        customerName,
        amount,
        currency,
      });

      console.log(`[Crypto Webhook Success] Processed ${gatewayTransactionId} - Already fulfilled: ${fulfillment.alreadyFulfilled}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return handleSecureError('CryptoWebhook', err);
  }
}
