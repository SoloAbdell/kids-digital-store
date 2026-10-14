import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendDeliveryEmail } from '@/lib/email';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { sanitizeEmail, sanitizeString, validateCsrfOrigin } from '@/lib/sanitization';
import { createDownloadToken } from '@/lib/security';

export async function POST(req: Request) {
  // 1. CSRF Origin Validation
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json(
      { error: 'Cross-origin request rejected.' },
      { status: 403 }
    );
  }

  // 2. DDoS & Email Harvesting Prevention (Rate limit per IP)
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(`lead:${clientIp}`, 5, 600); // 5 submissions per 10 minutes

  if (!rateLimitResult.allowed) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests. Please wait a few minutes before submitting again.',
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

    // 3. Strict Input Sanitization
    const email = sanitizeEmail(body.email);
    const childAge = sanitizeString(body.childAge || '3-5', 20);

    if (!email) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    // 4. Save lead in Supabase (if configured)
    try {
      await supabaseAdmin.from('leads').upsert(
        { email, child_age: childAge, source: 'freebie-optin' },
        { onConflict: 'email' }
      );
    } catch (e) {
      // In local mode, gracefully continue
    }

    // 5. Generate secure cryptographically signed download token (valid 24h)
    const orderId = `freebie_${Date.now()}`;
    const freebieToken = createDownloadToken({
      productId: 'freebie_starter',
      orderId,
      email,
      expiryHours: 24,
      maxDownloads: 5,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const downloadUrl = `${appUrl}/api/download/${freebieToken}`;

    // 6. Send delivery email
    await sendDeliveryEmail({
      to: email,
      customerName: 'Valued Parent',
      productTitle: 'Free 5-Page Starter Activity Pack',
      downloadUrl,
    });

    return NextResponse.json({
      success: true,
      downloadUrl,
      message: 'Free sample activity pack is ready! Check your inbox or download below.',
    });
  } catch (error: any) {
    console.error('Lead magnet error:', error);
    return NextResponse.json(
      { error: 'Failed to process request.' },
      { status: 500 }
    );
  }
}
