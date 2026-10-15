import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { fulfillOrderAndDeliver } from '@/lib/transactions';
import { handleSecureError } from '@/lib/error-masking';

export async function POST(req: Request) {
  // 1. Raw Body Reading (crucial for exact verification)
  const bodyText = await req.text();
  const hdrs = headers();

  const transmissionId = hdrs.get('paypal-transmission-id');
  const transmissionTime = hdrs.get('paypal-transmission-time');
  const transmissionSig = hdrs.get('paypal-transmission-sig');
  const certUrl = hdrs.get('paypal-cert-url');
  const authAlgo = hdrs.get('paypal-auth-algo');

  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  const isConfigured = webhookId && clientId && clientSecret && !clientId.includes('placeholder');

  let event: any;

  if (isConfigured) {
    if (!transmissionId || !transmissionTime || !transmissionSig || !certUrl || !authAlgo) {
      return NextResponse.json(
        { error: 'Missing PayPal webhook transmission signature headers.' },
        { status: 400 }
      );
    }

    try {
      // Authenticate with PayPal to call the verification API
      const isLive = process.env.PAYPAL_MODE === 'live';
      const paypalHost = isLive ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

      const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const tokenRes = await fetch(`${paypalHost}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });
      const tokenData = await tokenRes.json();

      if (!tokenData.access_token) {
        throw new Error('Could not obtain PayPal access token for verification.');
      }

      event = JSON.parse(bodyText);

      // Call PayPal Webhook Signature Verification API
      const verifyRes = await fetch(`${paypalHost}/v1/notifications/verify-webhook-signature`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth_algo: authAlgo,
          cert_url: certUrl,
          transmission_id: transmissionId,
          transmission_sig: transmissionSig,
          transmission_time: transmissionTime,
          webhook_id: webhookId,
          webhook_event: event,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.verification_status !== 'SUCCESS') {
        console.error('[PayPal Webhook] Signature verification failed:', verifyData);
        return NextResponse.json({ error: 'PayPal signature verification failed.' }, { status: 400 });
      }
    } catch (err: any) {
      console.error('[PayPal Webhook Verification Error]:', err.message);
      return NextResponse.json({ error: 'Verification failed.' }, { status: 400 });
    }
  } else {
    // Development fallback parsing
    try {
      event = JSON.parse(bodyText);
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload.' }, { status: 400 });
    }
  }

  try {
    const eventType = event.event_type;

    // Handle payment capture completion
    if (eventType === 'PAYMENT.CAPTURE.COMPLETED' || eventType === 'CHECKOUT.ORDER.APPROVED') {
      const resource = event.resource;
      const gatewayTransactionId =
        resource.id || resource.supplementary_data?.related_ids?.order_id || event.id;

      let productId = 'prod_1';
      let customerEmail = 'customer@tagline.store';
      let customerName = 'PayPal Customer';

      // Parse custom_id if set during order creation (format: "productId|customerEmail")
      const customId = resource.custom_id || resource.purchase_units?.[0]?.custom_id;
      if (customId && customId.includes('|')) {
        const parts = customId.split('|');
        productId = parts[0];
        customerEmail = parts[1];
      }

      const payer = resource.payer || resource.purchase_units?.[0]?.payer;
      if (payer?.email_address) customerEmail = payer.email_address;
      if (payer?.name?.given_name) {
        customerName = `${payer.name.given_name} ${payer.name.surname || ''}`.trim();
      }

      const amount = parseFloat(resource.amount?.value || '0');
      const currency = resource.amount?.currency_code || 'USD';

      // Strict fulfillment with idempotency
      const fulfillment = await fulfillOrderAndDeliver({
        provider: 'paypal',
        gatewayTransactionId,
        productId,
        customerEmail,
        customerName,
        amount,
        currency,
      });

      console.log(`[PayPal Webhook Success] Processed ${gatewayTransactionId} - Already fulfilled: ${fulfillment.alreadyFulfilled}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return handleSecureError('PayPalWebhook', err);
  }
}
