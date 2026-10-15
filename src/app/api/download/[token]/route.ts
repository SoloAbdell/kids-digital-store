import { NextResponse } from 'next/server';
import fs from 'fs';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyDownloadToken, getVaultFilePath } from '@/lib/security';
import { consumeDownloadTokenAttempt } from '@/lib/transactions';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { sanitizeFilename } from '@/lib/sanitization';

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  // 1. Rate Limiting Protection (Prevent token brute-forcing / DDoS)
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(`download:${clientIp}`, 20, 600); // 20 requests per 10 minutes

  if (!rateLimitResult.allowed) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many download attempts. Please slow down and try again later.',
        retryAfter: rateLimitResult.retryAfterSeconds,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimitResult.retryAfterSeconds),
          'X-RateLimit-Limit': String(rateLimitResult.limit),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  const rawToken = params.token;
  if (!rawToken || typeof rawToken !== 'string') {
    return NextResponse.json(
      { error: 'Download token is required.' },
      { status: 400 }
    );
  }

  // 2. Cryptographic Token Verification
  const verifyResult = verifyDownloadToken(rawToken);

  if (!verifyResult.valid) {
    if (verifyResult.error === 'EXPIRED') {
      return NextResponse.json(
        {
          error: 'This download link has expired (links remain active for 48 hours). Please contact support for an updated access link.',
          code: 'TOKEN_EXPIRED',
        },
        { status: 410 }
      );
    }

    if (verifyResult.error === 'INVALID_SIGNATURE') {
      return NextResponse.json(
        {
          error: 'Invalid download token signature. Access denied.',
          code: 'UNAUTHORIZED_ACCESS',
        },
        { status: 403 }
      );
    }

    // Check if token exists in Supabase DB before final rejection
    try {
      const { data: dbToken } = await supabaseAdmin
        .from('download_tokens')
        .select('*, products(*)')
        .eq('token', rawToken)
        .single();

      if (dbToken) {
        const now = new Date();
        const expiry = new Date(dbToken.expires_at);
        if (now > expiry) {
          return NextResponse.json(
            { error: 'This download link has expired in the database.' },
            { status: 410 }
          );
        }

        if (dbToken.download_count >= dbToken.max_downloads) {
          return NextResponse.json(
            { error: `Download limit reached (${dbToken.max_downloads} allowed).` },
            { status: 403 }
          );
        }

        // Increment count
        await supabaseAdmin
          .from('download_tokens')
          .update({ download_count: dbToken.download_count + 1 })
          .eq('id', dbToken.id);

        // Fetch signed storage URL from private bucket
        const filePath = dbToken.products?.storage_file_path || 'sample.pdf';
        const { data: signedData } = await supabaseAdmin.storage
          .from('digital-products')
          .createSignedUrl(filePath, 60);

        if (signedData?.signedUrl) {
          return NextResponse.redirect(signedData.signedUrl);
        }
      }
    } catch {
      // Continue to reject if not in DB
    }

    return NextResponse.json(
      { error: 'Invalid or forged download token.', code: 'INVALID_TOKEN' },
      { status: 403 }
    );
  }

  // 3. Strict Download Attempt & Expiry Check (Max 3 attempts, 48 hours)
  const attemptResult = consumeDownloadTokenAttempt(rawToken);
  if (!attemptResult.allowed) {
    if (attemptResult.reason === 'LIMIT_REACHED') {
      return NextResponse.json(
        {
          error: 'Maximum download limit reached (max 3 download attempts allowed). Please contact support for an updated access link.',
          code: 'DOWNLOAD_LIMIT_REACHED',
        },
        { status: 403 }
      );
    }
    if (attemptResult.reason === 'EXPIRED') {
      return NextResponse.json(
        {
          error: 'This download link has expired (links remain active for 24–48 hours). Please contact support for an updated access link.',
          code: 'TOKEN_EXPIRED',
        },
        { status: 410 }
      );
    }
  }

  // 4. Resolve Asset from Secure Server Vault (Never exposed via /public)
  const productId = verifyResult.payload?.productId || 'freebie_starter';
  const vaultAsset = getVaultFilePath(productId);

  if (!vaultAsset) {
    return NextResponse.json(
      { error: 'Digital asset file could not be located in secure vault.' },
      { status: 404 }
    );
  }

  try {
    const fileBuffer = fs.readFileSync(vaultAsset.filePath);
    const safeFilename = sanitizeFilename(vaultAsset.fileName);

    // 4. Stream response with anti-sniffing, anti-caching & strict download headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': vaultAsset.mimeType,
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Content-Length': String(fileBuffer.length),
        'Content-Security-Policy': "default-src 'none'",
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-RateLimit-Limit': String(rateLimitResult.limit),
        'X-RateLimit-Remaining': String(rateLimitResult.remaining),
      },
    });
  } catch (err: any) {
    console.error('Error reading vault asset:', err);
    return NextResponse.json(
      { error: 'Failed to stream digital asset.' },
      { status: 500 }
    );
  }
}
