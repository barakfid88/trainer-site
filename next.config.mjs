/**
 * Static security headers. Vercel already sends HSTS, so it is not repeated
 * here.
 *
 * The CSP is NOT here — it carries a per-request nonce and is built in
 * `src/middleware.js`. A second CSP here would not loosen that one; both would
 * be enforced and the intersection would block the page.
 */
/**
 * The static CSP for the public, prerendered pages. `/admin` is excluded: it
 * gets a stricter nonce-based policy from `src/middleware.js`, and two CSP
 * headers on one response are both enforced, so the intersection would block
 * the page.
 *
 * `'unsafe-inline'` is here because a prerendered page has no request and
 * therefore no nonce. It means this policy is not XSS protection for these
 * pages — what it does buy is frame-ancestors, object-src, base-uri and
 * form-action.
 */
const publicCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "media-src 'self' blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Everything but /admin, which middleware covers with a nonce.
        source: '/((?!admin).*)',
        headers: [{ key: 'Content-Security-Policy', value: publicCsp }],
      },
    ];
  },
};

export default nextConfig;
