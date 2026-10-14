import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { sanitizeString, validateCsrfOrigin } from '@/lib/sanitization';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'admin123';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'tagline_adm_secret_key_99382';

export async function POST(req: Request) {
  // 1. CSRF Protection
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json(
      { error: 'Forbidden cross-origin attempt.' },
      { status: 403 }
    );
  }

  // 2. Brute Force Protection (Max 5 attempts per 15 minutes per IP)
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(`admin_login:${clientIp}`, 5, 900);

  if (!rateLimitResult.allowed) {
    return new NextResponse(
      JSON.stringify({
        error: `Security Lockout: Too many failed administrative login attempts. Please wait ${rateLimitResult.retryAfterSeconds} seconds before trying again.`,
        retryAfter: rateLimitResult.retryAfterSeconds,
        locked: true,
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
    const inputPasscode = sanitizeString(body.passcode || '', 100);

    // Timing-safe comparison to prevent timing attacks
    const inputBuf = Buffer.from(inputPasscode);
    const targetBuf = Buffer.from(ADMIN_PASSCODE);

    const isMatch =
      inputBuf.length === targetBuf.length &&
      crypto.timingSafeEqual(inputBuf, targetBuf);

    if (!isMatch) {
      return NextResponse.json(
        {
          error: `Invalid admin passcode. Attempts remaining: ${rateLimitResult.remaining}`,
          attemptsRemaining: rateLimitResult.remaining,
        },
        { status: 401 }
      );
    }

    // Generate signed session token valid for 4 hours
    const expiresAt = Date.now() + 4 * 60 * 60 * 1000;
    const sessionPayload = Buffer.from(
      JSON.stringify({ role: 'admin', ip: clientIp, exp: expiresAt })
    ).toString('base64url');

    const signature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(sessionPayload)
      .digest('base64url');

    const sessionToken = `${sessionPayload}.${signature}`;

    const response = NextResponse.json({
      success: true,
      message: 'Admin session authenticated.',
      token: sessionToken,
    });

    // Set HTTP-Only, Secure SameSite cookie
    response.cookies.set('tagline_admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 4 * 60 * 60,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Authentication failed due to server error.' },
      { status: 500 }
    );
  }
}
