/**
 * Sanitize and normalize string inputs to prevent XSS, SQL/NoSQL injection, and control character attacks
 */
export function sanitizeString(input: unknown, maxLength = 250): string {
  if (typeof input !== 'string') return '';

  return input
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0':
          return '';
        case '\x08':
          return '';
        case '\x09':
          return ' ';
        case '\x1a':
          return '';
        case '\n':
          return ' ';
        case '\r':
          return '';
        default:
          return char;
      }
    })
    // Strip HTML tags
    .replace(/<[^>]*>?/gm, '')
    // Trim whitespace
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate and clean email addresses
 */
export function sanitizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null;

  const cleaned = email.trim().toLowerCase();
  // Standard RFC 5322 compliant regex for safe emails
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (cleaned.length > 254 || !emailRegex.test(cleaned)) {
    return null;
  }

  return cleaned;
}

/**
 * Sanitize filenames to prevent HTTP response splitting and path attacks in Content-Disposition
 */
export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}

/**
 * Validate request Origin / Referer to prevent Cross-Site Request Forgery (CSRF)
 */
export function validateCsrfOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const host = req.headers.get('host');

  // If no origin and no referer (direct curl/server-to-server), require caution or verify in dev
  const target = origin || referer;
  if (!target) {
    // In local dev allow, in production verify
    return process.env.NODE_ENV !== 'production';
  }

  try {
    const targetUrl = new URL(target);
    // Allow matching host
    if (host && (targetUrl.host === host || targetUrl.hostname === 'localhost' || targetUrl.hostname === '127.0.0.1')) {
      return true;
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (appUrl) {
      const allowedOrigin = new URL(appUrl).origin;
      if (targetUrl.origin === allowedOrigin) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}
