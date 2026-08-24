/**
 * Security headers. Vercel already sends HSTS, so it is not repeated here.
 *
 * `'unsafe-inline'` stays for scripts and styles (Next's inline bootstrap).
 * The real wins here are frame-ancestors 'none', object-src 'none',
 * base-uri 'self' and form-action 'self'.
 *
 * connect-src has to allow Supabase — the client SDK talks to
 * <project>.supabase.co over both https and websockets.
 */
const isDev = process.env.NODE_ENV === 'development';

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "media-src 'self' blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  `connect-src 'self' https://*.supabase.co wss://*.supabase.co${isDev ? ' ws: wss:' : ''}`,
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
