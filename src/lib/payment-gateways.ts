import { stripe } from './stripe';
import crypto from 'crypto';
import { Product } from './types';
import { recordInitiatedTransaction } from './transactions';

export interface CheckoutSessionResult {
  url: string;
  orderId: string;
  provider: 'stripe' | 'paypal' | 'crypto';
  gatewayTransactionId: string;
}

/**
 * 1. STRIPE HOSTED CHECKOUT (Credit / Debit Cards)
 * Strictly zero card data touches merchant server.
 */
export async function createStripeCheckoutSession(params: {
  product: Product;
  customerEmail: string;
  customerName: string;
}): Promise<CheckoutSessionResult> {
  const { product, customerEmail, customerName } = params;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const orderId = `ord_str_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // Handle demo / test simulation when Stripe key is placeholder
  const isStripeConfigured =
    process.env.STRIPE_SECRET_KEY &&
    !process.env.STRIPE_SECRET_KEY.includes('placeholder') &&
    process.env.STRIPE_SECRET_KEY.startsWith('sk_');

  if (!isStripeConfigured) {
    const mockSessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    recordInitiatedTransaction({
      orderId,
      provider: 'stripe',
      gatewayTransactionId: mockSessionId,
      productId: product.id,
      amount: product.price,
      currency: product.currency,
      customerEmail,
      customerName,
    });

    return {
      url: `${appUrl}/success?session_id=${mockSessionId}&productId=${product.id}&provider=stripe&name=${encodeURIComponent(customerName)}&email=${encodeURIComponent(customerEmail)}`,
      orderId,
      provider: 'stripe',
      gatewayTransactionId: mockSessionId,
    };
  }

  // Real Stripe Hosted Checkout creation
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
            description: `${product.pages_count || 'Digital'} Pages • Printable PDF / DRM-free Digital Download`,
            images: product.thumbnail_url ? [product.thumbnail_url] : [],
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
      provider: 'stripe',
    },
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&productId=${product.id}&provider=stripe`,
    cancel_url: `${appUrl}/product/${product.slug}?canceled=true`,
  });

  if (session.id) {
    recordInitiatedTransaction({
      orderId,
      provider: 'stripe',
      gatewayTransactionId: session.id,
      productId: product.id,
      amount: product.price,
      currency: product.currency,
      customerEmail,
      customerName,
    });
  }

  return {
    url: session.url || `${appUrl}/success?session_id=${session.id}&productId=${product.id}&provider=stripe`,
    orderId,
    provider: 'stripe',
    gatewayTransactionId: session.id,
  };
}

/**
 * 2. PAYPAL ORDERS V2 (Hosted Checkout Window / JavaScript SDK Approval)
 * Zero customer banking or PayPal credentials touch merchant server.
 */
export async function createPayPalOrder(params: {
  product: Product;
  customerEmail: string;
  customerName: string;
}): Promise<CheckoutSessionResult> {
  const { product, customerEmail, customerName } = params;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const orderId = `ord_pp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const isPayPalConfigured = clientId && clientSecret && !clientId.includes('placeholder');

  if (!isPayPalConfigured) {
    // Development sandbox simulation
    const mockPaypalOrderId = `PAYPAL-ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    recordInitiatedTransaction({
      orderId,
      provider: 'paypal',
      gatewayTransactionId: mockPaypalOrderId,
      productId: product.id,
      amount: product.price,
      currency: product.currency,
      customerEmail,
      customerName,
    });

    return {
      url: `${appUrl}/success?session_id=${mockPaypalOrderId}&productId=${product.id}&provider=paypal&name=${encodeURIComponent(customerName)}&email=${encodeURIComponent(customerEmail)}`,
      orderId,
      provider: 'paypal',
      gatewayTransactionId: mockPaypalOrderId,
    };
  }

  // Real PayPal API Call (Sandbox or Live)
  const isLive = process.env.PAYPAL_MODE === 'live';
  const paypalHost = isLive ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

  // 1. Fetch OAuth 2.0 Access Token
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
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    throw new Error('Could not authenticate with PayPal Gateway API.');
  }

  // 2. Create PayPal Order
  const orderRes = await fetch(`${paypalHost}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: orderId,
          description: product.title,
          custom_id: `${product.id}|${customerEmail}`,
          amount: {
            currency_code: product.currency.toUpperCase(),
            value: product.price.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: 'Tagline Digital Store',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${appUrl}/success?productId=${product.id}&provider=paypal`,
        cancel_url: `${appUrl}/product/${product.slug}?canceled=true`,
      },
    }),
  });

  const ppOrder = await orderRes.json();
  const approveLink = ppOrder.links?.find((l: any) => l.rel === 'approve')?.href;

  recordInitiatedTransaction({
    orderId,
    provider: 'paypal',
    gatewayTransactionId: ppOrder.id,
    productId: product.id,
    amount: product.price,
    currency: product.currency,
    customerEmail,
    customerName,
  });

  return {
    url: approveLink || `${appUrl}/success?session_id=${ppOrder.id}&productId=${product.id}&provider=paypal`,
    orderId,
    provider: 'paypal',
    gatewayTransactionId: ppOrder.id,
  };
}

/**
 * 3. CRYPTOCURRENCY GATEWAY (Coinbase Commerce / NOWPayments)
 * Hosted checkout with automated blockchain confirmation.
 * Never creates raw unverified wallet scripts or private key handling.
 */
export async function createCryptoCharge(params: {
  product: Product;
  customerEmail: string;
  customerName: string;
}): Promise<CheckoutSessionResult> {
  const { product, customerEmail, customerName } = params;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const orderId = `ord_cry_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const coinbaseApiKey = process.env.COINBASE_COMMERCE_API_KEY;
  const isCryptoConfigured = coinbaseApiKey && !coinbaseApiKey.includes('placeholder');

  if (!isCryptoConfigured) {
    // Development sandbox simulation
    const mockChargeCode = `CRYPTO-CHG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    recordInitiatedTransaction({
      orderId,
      provider: 'crypto',
      gatewayTransactionId: mockChargeCode,
      productId: product.id,
      amount: product.price,
      currency: product.currency,
      customerEmail,
      customerName,
    });

    return {
      url: `${appUrl}/success?session_id=${mockChargeCode}&productId=${product.id}&provider=crypto&name=${encodeURIComponent(customerName)}&email=${encodeURIComponent(customerEmail)}`,
      orderId,
      provider: 'crypto',
      gatewayTransactionId: mockChargeCode,
    };
  }

  // Official Coinbase Commerce Charges API
  const response = await fetch('https://api.commerce.coinbase.com/charges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CC-Api-Key': coinbaseApiKey,
      'X-CC-Version': '2018-03-22',
    },
    body: JSON.stringify({
      name: product.title,
      description: `${product.format} • Digital Download (${product.pages_or_duration || 'Instant'})`,
      pricing_type: 'fixed_price',
      local_price: {
        amount: product.price.toFixed(2),
        currency: product.currency.toUpperCase(),
      },
      metadata: {
        productId: product.id,
        orderId,
        customerEmail,
        customerName,
        provider: 'crypto',
      },
      redirect_url: `${appUrl}/success?productId=${product.id}&provider=crypto`,
      cancel_url: `${appUrl}/product/${product.slug}?canceled=true`,
    }),
  });

  const chargeData = await response.json();
  const charge = chargeData.data;

  recordInitiatedTransaction({
    orderId,
    provider: 'crypto',
    gatewayTransactionId: charge.code || charge.id,
    productId: product.id,
    amount: product.price,
    currency: product.currency,
    customerEmail,
    customerName,
  });

  return {
    url: charge.hosted_url || `${appUrl}/success?session_id=${charge.code}&productId=${product.id}&provider=crypto`,
    orderId,
    provider: 'crypto',
    gatewayTransactionId: charge.code || charge.id,
  };
}
