import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'tagline_adm_secret_key_99382';

export async function GET(req: Request) {
  // Check cookie or Authorization header
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(/tagline_admin_session=([^;]+)/);
  const token = match ? match[1] : req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const [payloadBase64, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadBase64)
    .digest('base64url');

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSig);

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8'));
    if (Date.now() > payload.exp) {
      return NextResponse.json({ authenticated: false, error: 'Session expired' }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
