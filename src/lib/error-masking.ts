import { NextResponse } from 'next/server';

/**
 * Mask internal errors to protect backend architecture and gateway secrets.
 * Logs full diagnostic context to server logs securely without leaking
 * stack traces, API keys, or raw provider payloads to client responses.
 */
export function handleSecureError(
  contextName: string,
  error: unknown,
  customClientMessage = 'Payment could not be processed. Please check your payment details or try another payment method.'
): NextResponse {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  // Log internal diagnostic securely to server stdout
  console.error(`[Secure Payment Error - ${contextName}]:`, {
    message: errorMessage,
    stack: errorStack,
    timestamp: new Date().toISOString(),
  });

  // Return sanitized generic message with safe headers
  return NextResponse.json(
    {
      error: customClientMessage,
      code: 'PAYMENT_PROCESSING_ERROR',
      timestamp: Date.now(),
    },
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

/**
 * Enforce HTTPS transport on sensitive checkout & API requests in production
 */
export function enforceHttps(req: Request): boolean {
  if (process.env.NODE_ENV !== 'production') {
    return true; // Allow localhost in development
  }

  const proto = req.headers.get('x-forwarded-proto');
  const url = new URL(req.url);

  if (proto && proto !== 'https') {
    return false;
  }

  if (url.protocol !== 'https:' && !url.hostname.includes('localhost')) {
    return false;
  }

  return true;
}
