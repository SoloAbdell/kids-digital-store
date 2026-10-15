import { NextResponse } from 'next/server';
import { getTransactionByGatewayId } from '@/lib/transactions';
import { SAMPLE_PRODUCTS } from '@/lib/products';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { sanitizeString } from '@/lib/sanitization';
import { handleSecureError } from '@/lib/error-masking';

export async function GET(req: Request) {
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(`checkout-status:${clientIp}`, 60, 60); // 60 requests per minute
  if (!rateLimitResult.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const sessionId = sanitizeString(searchParams.get('session_id') || '', 120);

    if (!sessionId) {
      return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
    }

    const tx = getTransactionByGatewayId(sessionId);

    // If transaction has not yet been cryptographically verified and fulfilled by a server-side webhook
    if (!tx || tx.status !== 'completed' || !tx.download_token) {
      return NextResponse.json({
        verified: false,
        status: tx ? tx.status : 'pending',
        message: 'Awaiting cryptographic webhook confirmation from payment gateway...',
      });
    }

    const product = SAMPLE_PRODUCTS.find((p) => p.id === tx.product_id);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    return NextResponse.json({
      verified: true,
      status: 'completed',
      orderId: tx.order_id,
      productTitle: product ? product.title : 'Digital Download',
      productId: tx.product_id,
      downloadToken: tx.download_token,
      downloadUrl: `${appUrl}/api/download/${tx.download_token}`,
      fulfilledAt: tx.fulfilled_at,
    });
  } catch (error) {
    return handleSecureError('CheckoutStatus', error);
  }
}
