import { NextResponse } from 'next/server';
import { fulfillOrderAndDeliver } from '@/lib/transactions';
import { PaymentProvider } from '@/lib/types';

/**
 * Developer Sandbox Webhook Simulator
 * Allows full end-to-end testing of webhook fulfillment & token generation on localhost:3000
 */
export async function POST(req: Request) {
  // Only allow simulation in non-production or with admin secret
  const adminSecret = req.headers.get('x-admin-secret');
  if (process.env.NODE_ENV === 'production' && adminSecret !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: 'Endpoint disabled in production.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const provider: PaymentProvider = body.provider || 'stripe';
    const gatewayTransactionId =
      body.gatewayTransactionId || `sim_${provider}_${Date.now()}`;
    const productId = body.productId || 'prod_1';
    const customerEmail = body.customerEmail || 'parent@tagline.store';
    const customerName = body.customerName || 'Test Customer';
    const amount = Number(body.amount) || 4.99;
    const currency = body.currency || 'USD';

    const result = await fulfillOrderAndDeliver({
      provider,
      gatewayTransactionId,
      productId,
      customerEmail,
      customerName,
      amount,
      currency,
    });

    return NextResponse.json({
      simulated: true,
      provider,
      gatewayTransactionId,
      result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
