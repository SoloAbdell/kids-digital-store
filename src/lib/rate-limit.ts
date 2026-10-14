interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory sliding window store
const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic garbage collection of expired keys every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref();
}

/**
 * Check if a request identifier exceeds rate limits
 * @param identifier Unique key (e.g. IP + endpoint)
 * @param limit Max allowed requests within window
 * @param windowSeconds Duration of window in seconds
 */
export function checkRateLimit(
  identifier: string,
  limit: number,
  windowSeconds: number
): {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const existing = rateLimitStore.get(identifier);

  if (!existing || now > existing.resetTime) {
    // New window
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetTime,
      retryAfterSeconds: windowSeconds,
    };
  }

  if (existing.count >= limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetTime - now) / 1000));
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetTime: existing.resetTime,
      retryAfterSeconds,
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    limit,
    remaining: limit - existing.count,
    resetTime: existing.resetTime,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetTime - now) / 1000)),
  };
}

/**
 * Extract client IP address securely from incoming Request
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    // First IP in list is the original client
    const clientIp = forwarded.split(',')[0].trim();
    if (clientIp) return clientIp;
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  return '127.0.0.1';
}
