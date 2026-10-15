/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  media-src 'self' blob: data: https: https://actions.google.com;
  font-src 'self' data: https:;
  connect-src 'self' https:;
  frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.paypal.com https://*.paypal.com https://commerce.coinbase.com;
  frame-ancestors 'none';
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes in the application
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
