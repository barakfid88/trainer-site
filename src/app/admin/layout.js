/**
 * The admin area renders per request, always.
 *
 * This exists for the CSP. `src/middleware.js` mints a nonce per request and
 * `/admin` is the surface where a nonce actually matters — it holds the
 * Supabase session, and `/admin/login` is where the password is typed. A
 * prerendered page is built without a request, so its inline scripts carry no
 * nonce and a nonce-bearing CSP blocks them. `/admin` was already dynamic
 * because of the auth check; `/admin/login` was not, and a static login page
 * is the one page least worth prerendering.
 */
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }) {
  return children;
}
